import {createContext, useEffect, useReducer} from "react";
import NavigationBar from "@/components/Navbars/NavigationBar.jsx";
import SidePanel from "@/components/chat/SidePanel/SidePanel.jsx";
import MainPanel from "@/components/chat/MainPanel/MainPanel.jsx";
import {createChatroom, leaveChatroom, showChatrooms} from "@/api/chat/chatroom.js";
import {Container} from "react-bootstrap";

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
            console.log(pending);
            pending.forEach(it => {
                if (stateMap.has(it)) {
                    stateMap.get(it).hasNewMessage = true;
                }
            })

            console.log(Array.from(stateMap.values()));

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

    useEffect(() => {
        const fetchChatRooms = async () => {
            const response = await showChatrooms();
            chatRoomListDispatch({type: 'INIT', data: response});
        }
        fetchChatRooms();
    }, [])

    const onCreate = async (title) => {
        const response = await createChatroom(title);
        chatRoomListDispatch({type: 'CREATE', data: response});
    }

    const onUpdate = (chatroomList) => {
        chatRoomListDispatch({type: 'UPDATE', data: chatroomList});
    }

    const onDelete = async (id) => {
        const response = await leaveChatroom(id);
        if (response) {
            chatRoomListDispatch({type: 'DELETE', data: id})
        }
        return response;
    }

    const onSelect = (chatroom) => {
        chatRoomDispatch({type: 'SELECT', data: chatroom})
    }

    const onLeave = () => {
        chatRoomDispatch({type: 'LEAVE'})
    }

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
                                    <MainPanel/>
                                </div>
                            </div>
                        </Container>
                    </ChatRoomDispatchContext.Provider>
                </ChatRoomContext.Provider></section>
        </>
    )
}

export default ChatPage;