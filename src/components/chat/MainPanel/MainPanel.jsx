import {useContext, useEffect, useRef, useState} from 'react'
import Message from "./Message.jsx"
import MessageForm from "./MessageForm.jsx"
import MessageHeader from "@/components/chat/MainPanel/MessageHeader.jsx";
import {ChatRoomContext} from "@/pages/chat/ChatPage.jsx";
import {Stomp} from "@stomp/stompjs";
import {getAccessToken} from "@/api/auth/getset.js";
import {getMessages} from "@/api/chat/message.js";

const MainPanel = () => {

    const chatRoom = useContext(ChatRoomContext).currentChatRoom;
    const [messages, setMessages] = useState([]);
    const stompClient = useRef(null);
    const subscriptionRef = useRef(null);
    const messageEndRef = useRef(null);

    useEffect(() => {

        if (!stompClient.current || !stompClient.current.connected) {
            stompClient.current = Stomp.client(`ws://${import.meta.env.VITE_APP_BACKEND_DEPLOY}/stomp/chats`);
            stompClient.current.connect(
                {
                    Authorization: getAccessToken(),
                },
                () => {
                    console.log('Connected to chat room', chatRoom?.id);
                },
                (error) => console.error('WebSocket error: ', error)
            );
        }

        const subscribeToChatRoom = async () => {
            if (chatRoom && chatRoom.id && stompClient.current.connected) {

                const response = await getMessages(chatRoom.id);
                setMessages(response);

                if (subscriptionRef.current) {
                    console.log('Unsubscribing from previous chat room');
                    subscriptionRef.current.unsubscribe();
                }

                console.log('Connected to chat room', chatRoom.id);
                subscriptionRef.current = stompClient.current.subscribe(
                    `/sub/chats/${chatRoom.id}`,
                    (chatMessage) => {
                        console.log('Received message:', chatMessage.body);
                        setMessages((prevMessages) => [...prevMessages, JSON.parse(chatMessage.body)]);
                    },
                    {Authorization: `${getAccessToken()}`}
                );
            }
        }

        subscribeToChatRoom();

        return () => {
            if (subscriptionRef.current) {
                console.log('Cleaning up subscription for chat room:', chatRoom?.id);
                subscriptionRef.current.unsubscribe();
                setMessages([]);
            }
        }
    }, [chatRoom]);

    // 새로운 메시지 발생 시 스크롤 아래로 고정
    useEffect(()=>{
        if(messageEndRef.current){
            messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, [messages])

    const renderMessages = (messages) => (
        messages.length > 0 &&
        messages.map(message =>
            <Message
                key={message.id}
                message={message}
            />
        )
    )
    return (
        <div style={{padding: '2rem 2rem 0 2rem'}}>
            {chatRoom && <MessageHeader/>}
            <div style={{
                width: '100%',
                height: '30rem',
                border: '.2rem solid #ececec',
                borderRadius: '4px',
                padding: '1rem',
                marginBottom: '1rem',
                overflowY: 'auto'
            }}>
                {/*{searchTerm ?*/}
                {/*    this.renderMessages(searchResults)*/}
                {/*    :*/}
                {renderMessages(messages)}
                {/*}*/}
                <div  ref={messageEndRef}></div>
            </div>
            <MessageForm
                stompClient={stompClient}
            />
        </div>
    )
}

export default MainPanel;


