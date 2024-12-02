import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import {getAccessToken} from "@/api/auth/getset.js";
import DemoNavbar from "@/components/review/DemoNavbar.jsx";
import SidePanel from "@/components/chat/SidePanel/SidePanel.jsx";
import MainPanel from "@/components/chat/MainPanel/MainPanel.jsx";
import {showChatrooms} from "@/api/chat/chatroom.js";

const ChatPage = () => {
    const stompClient = useRef(Stomp.client(`ws://${import.meta.env.VITE_APP_BACKEND_DEPLOY}/stomp/chats`));
    const accessToken = getAccessToken();
    const [currentChatRoom, setCurrentChatRoom] = useState(null);
    const [chatTitle, setChatTitle] = useState("");


    useEffect(() => {
        const initializeStompClient = async () => {
            stompClient.current.connect(
                {
                    Authorization: `${accessToken}`,
                },
                () => {
                    stompClient.current.subscribe('/sub/chats', (chatMessage) => {
                        console.log(JSON.parse(chatMessage.body));
                    });
                    stompClient.current.publish({
                        destination: 'pub/chats',
                        body: JSON.stringify({
                            'sender': "tmp",
                            'message': 'connected'
                        }),
                    })
                },
                function (error, result) {
                    alert(result);
                }
            );
        };
        initializeStompClient();
        return () => {
            if (stompClient) {
                stompClient.disconnect(() => {
                    console.log("Disconnected");
                })
            }
        }
    }, [accessToken]);


    return (
        <>
            <DemoNavbar/>
            <div style={{display: 'flex'}}>
                <div style={{width: '300px'}}>
                    <SidePanel currentChatroom={currentChatRoom} setCurrentChatroom={setCurrentChatRoom}/>
                </div>
                <div style={{width: '100%'}}>
                    <MainPanel
                        chatRoom={currentChatRoom}
                        stompClient={stompClient}
                        setChatRoom={setCurrentChatRoom}
                    />
                </div>
            </div>
        </>
    )
}

export default ChatPage;