import {createContext, useEffect, useReducer} from "react";
import DemoNavbar from "@/components/review/DemoNavbar.jsx";
import SidePanel from "@/components/chat/SidePanel/SidePanel.jsx";
import MainPanel from "@/components/chat/MainPanel/MainPanel.jsx";
import {createChatroom, leaveChatroom, showChatrooms} from "@/api/chat/chatroom.js";

const chatRoomListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return action.data;
        case 'CREATE':
            return [...state, action.data];
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
            <DemoNavbar/>
            <ChatRoomContext.Provider value={{chatRoomList, currentChatRoom}}>
                <ChatRoomDispatchContext.Provider value={{onCreate, onDelete, onSelect, onLeave}}>
                    <div style={{display: 'flex'}}>
                        <div style={{width: '300px'}}>
                            <SidePanel/>
                        </div>
                        <div style={{width: '100%'}}>
                            <MainPanel/>
                        </div>
                    </div>
                </ChatRoomDispatchContext.Provider>
            </ChatRoomContext.Provider></>
    )
}

export default ChatPage;