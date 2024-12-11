import {useEffect, useRef, useState} from "react";
import {getMessages} from "@/api/chat/message.js";
import {getAccessToken} from "@/api/auth/getset.js";
import {exitChatroom} from "@/api/chat/chatroom.js";

const useSubscribeToChatRoom = (chatRoomId, stompClient) => {

    const [messages, setMessages] = useState([]);
    const subscriptionRef = useRef(null);

    useEffect(() => {
        const get = async () => {
            const response = await getMessages(chatRoomId);
            setMessages(response);
        }
        
        if(chatRoomId && stompClient.connected) {
            get();
            if (subscriptionRef.current) {
                console.log('Unsubscribing from previous chat room');
                subscriptionRef.current.unsubscribe();
            }

            console.log('Connected to chat room', chatRoomId);
            subscriptionRef.current = stompClient.subscribe(
                `/sub/chats/${chatRoomId}`,
                (chatMessage) => {
                    setMessages((prevMessages) => [...prevMessages, JSON.parse(chatMessage.body)]);
                },
                {Authorization: `${getAccessToken()}`}
            );
        }

        return () => {
            if(subscriptionRef.current) {
                console.log('Cleaning up subscription for chat room:', chatRoomId);
                exitChatroom(chatRoomId);
                subscriptionRef.current.unsubscribe();
                setMessages([]);
            }
        }
        
    }, [chatRoomId, stompClient]);

    return messages;
}

export default useSubscribeToChatRoom;