import {createContext, useCallback, useEffect, useReducer, useRef, useState} from "react";
import NavigationBar from "@/components/Navbars/NavigationBar.jsx";
import SidePanel from "@/components/chat/SidePanel/SidePanel.jsx";
import MainPanel from "@/components/chat/MainPanel/MainPanel.jsx";
import {createChatroom, leaveChatroom, showChatrooms} from "@/api/chat/chatroom.js";
import {Container} from "react-bootstrap";
import {Stomp} from "@stomp/stompjs";
import {getAccessToken} from "@/api/auth/getset.js";

const chatRoomListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return action.data;
        case 'CREATE':
            return [...state, action.data];
        case 'UPDATE': {
            const stateMap = new Map(state.map(it =>
                [it.id, it]));
            const pending = action.data;
            pending.forEach(it => {
                if (stateMap.has(it)) {
                    stateMap.get(it).hasNewMessage = true;
                }
            })
            return Array.from(stateMap.values());
        }
        case 'DELETE':
            return state.filter((item) => item.id !== action.data);
        default:
            return state;
    }
}

const chatRoomReducer = (state, action) => {
    switch (action.type) {
        case 'LEAVE':
            return null;
        case 'SELECT':
            return action.data;
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export const ChatRoomContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const ChatRoomDispatchContext = createContext();

const ChatPage = () => {
    const [chatRoomList, chatRoomListDispatch] = useReducer(chatRoomListReducer, []);
    const [currentChatRoom, chatRoomDispatch] = useReducer(chatRoomReducer, null);
    const [pendingUpdates, setPendingUpdates] = useState(new Set());

    const stompClient = useRef(null);

    const onCreate = useCallback(async (title) => {
        const response = await createChatroom(title);
        chatRoomListDispatch({type: 'CREATE', data: response});
    }, []);

    const onUpdate = useCallback((chatroomList) => {
        chatRoomListDispatch({type: 'UPDATE', data: chatroomList});
    }, []);

    const onDelete = useCallback(async (id) => {
        const response = await leaveChatroom(id);
        if (response) {
            chatRoomListDispatch({type: 'DELETE', data: id})
        }
        return response;
    }, []);

    const onSelect = useCallback((chatroom) => {
        chatRoomDispatch({type: 'SELECT', data: chatroom})
    }, []);

    const onLeave = useCallback(() => {
        chatRoomDispatch({type: 'LEAVE'})
    }, []);

    useEffect(() => {
        const fetchChatRooms = async () => {
            const response = await showChatrooms();
            chatRoomListDispatch({type: 'INIT', data: response});
        }
        fetchChatRooms();

        if (!stompClient.current || !stompClient.current.connected) {
            stompClient.current = Stomp.client(`ws://${import.meta.env.VITE_APP_BACKEND_DEPLOY}/stomp/chats`);
            stompClient.current.connect(
                {
                    Authorization: getAccessToken(),
                },
                () => {
                    stompClient.current.subscribe('/sub/chats/news',
                        (chatMessage) => {
                            setPendingUpdates((prev) => {
                                    const updatedPending = new Set(prev);
                                    updatedPending.add(parseInt(chatMessage.body));
                                    return updatedPending;
                                }
                            );
                        });
                },
                (error) => console.error('WebSocket error: ', error)
            );
        }

        return() => {
            if(stompClient.current){
                console.log('Disconnect Chat Room');
                stompClient.current.disconnect();
            }
        }

    }, [])

    useEffect(() => {
        if (pendingUpdates.size > 0) {
            const timeoutId = setTimeout(() => {
                pendingUpdates.delete(currentChatRoom?.id);
                onUpdate(pendingUpdates);
            }, 100);
            return () => {
                clearTimeout(timeoutId)
                pendingUpdates.clear();
                setPendingUpdates(pendingUpdates);
            };
        }
    }, [currentChatRoom, onUpdate, pendingUpdates]);

    return (
        <>
            <NavigationBar/>
            <section className={"section section-lg section-shaped my-0"}>
                <div className="shape shape-style-1 shape-default">
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>
                <ChatRoomContext.Provider value={{chatRoomList, currentChatRoom}}>
                    <ChatRoomDispatchContext.Provider value={{onCreate, onUpdate, onDelete, onSelect, onLeave}}>
                        <Container>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '30%'}} className="min-vh-50">
                                    <SidePanel/>
                                </div>
                                <div style={{width: '70%'}} className={"bg-white rounded-right py-3"} >
                                    <MainPanel stompClient={stompClient}/>
                                </div>
                            </div>
                        </Container>
                    </ChatRoomDispatchContext.Provider>
                </ChatRoomContext.Provider></section>
        </>
    )
}

export default ChatPage;