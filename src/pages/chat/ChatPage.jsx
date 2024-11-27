import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import {getAccessToken} from "@/api/auth.js";
import {Button, Input} from "reactstrap";
import {createChatroom} from "@/api/chat/chatroom.js";

const ChatPage = () => {
    const stompClient = useRef(Stomp.client(`ws://${import.meta.env.VITE_APP_BACKEND_DEPLOY}/stomp/chats`));
    const accessToken = getAccessToken();
    const myName = "tmp";
    const [selectedChatroom, setSelectedChatroom] = useState(null);
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

    const handleCreateChatRoom = async () => {
        const response = await createChatroom(chatTitle);
        console.log(response);
    }

    return (
        <div>
            <Input value={chatTitle} onChange={(e) => setChatTitle(e.target.value)}></Input>
            <Button onClick={handleCreateChatRoom}>
                채팅방 생성
            </Button>
        </div>
    )
}

export default ChatPage;