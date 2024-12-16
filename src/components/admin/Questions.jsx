/*
김은지
2024 11 18
*/
import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import './Admin.css';
import {createChatroom, leaveChatroom, showChatrooms} from "@/api/chat/chatroom.js";
import useChatConnect from "@/hooks/chat/useChatConnect.js";
import SidePanel from "@/components/chat/SidePanel/SidePanel.jsx";
import MainPanel from "@/components/chat/MainPanel/MainPanel.jsx";
import {ChatRoomContext, ChatRoomDispatchContext} from "@/pages/chat/ChatPage.jsx";
import { Modal, ModalBody } from "reactstrap";

const chatRoomListReducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return action.data;
        case 'CREATE':
            return [...state, action.data];
        case 'UPDATE': {
            const stateMap = new Map(state.map(it => [it.id, it]));
            const pending = action.data;
            pending.forEach(it => {
                if (stateMap.has(it)) {
                    stateMap.get(it).hasNewMessage = true;
                }
            });
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

const Questions = () => {

    const [chatRoomList, chatRoomListDispatch] = useReducer(chatRoomListReducer, []);
    const [currentChatRoom, chatRoomDispatch] = useReducer(chatRoomReducer, null);
    const [pendingUpdates, setPendingUpdates] = useState(new Set());
    const stompClient = useRef(null);

    // 채팅창 모달
    const [isChatRoomModalOpen, setIsChatRoomModalOpen] = useState(false);
    const openChatRoomModalOpen = () => { // 모달 열기 함수
        if(!isChatRoomModalOpen) {
            setIsChatRoomModalOpen(true);
        }
    }
    const closeChatRoomModalOpen = () => { setIsChatRoomModalOpen(false); } // 모달 닫기 함수

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

    const subNewMessages = useCallback(() => {
        if (stompClient.current?.connected) {
            stompClient.current.subscribe('/sub/chats/news', (chatMessage) => {
                setPendingUpdates((prev) => {
                    const updatedPending = new Set(prev);
                    updatedPending.add(parseInt(chatMessage.body));
                    return updatedPending;
                });

            });
        } else {
            console.warn('WebSocket is not connected, cannot subscribe to new messages.');
        }
    }, [stompClient]);

    useChatConnect(stompClient, subNewMessages);

    useEffect(() => {
        const fetchChatRooms = async () => {
            const response = await showChatrooms();
            chatRoomListDispatch({type: 'INIT', data: response});
        };
        fetchChatRooms();
    }, []); // 채팅방 읽어들이기

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
        if(currentChatRoom !== null) openChatRoomModalOpen()
    }, [currentChatRoom, onUpdate, pendingUpdates]);


    return (
        <div className="container">
            {stompClient.current &&
                    <ChatRoomContext.Provider value={{chatRoomList, currentChatRoom}}>
                        <ChatRoomDispatchContext.Provider value={{onCreate, onUpdate, onDelete, onSelect, onLeave}}>
                            <div className="vh-100">
                                {/*채팅 목록 띄우는 부분*/}
                                <SidePanel/>
                                {/*채팅창 띄우는 부분*/}
                                <Modal isOpen={isChatRoomModalOpen}>
                                    <div style={{display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
                                        <button
                                            style={{top: '1rem', backgroundColor: 'white', color: 'black'}}
                                            className="btn-sm btn-clipboard"
                                            onClick={closeChatRoomModalOpen}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 17 17">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <ModalBody style={{padding: '0px', paddingBottom: '2rem'}}>
                                        <MainPanel stompClient={stompClient.current}/>
                                    </ModalBody>
                                </Modal>
                            </div>
                        </ChatRoomDispatchContext.Provider>
                    </ChatRoomContext.Provider>
            }
        </div>
    );
};

export default Questions;
