import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import {getAccessToken} from "@/api/auth/getset.js";
import {Button, Container, Input} from "reactstrap";
import {createChatroom, showChatrooms} from "@/api/chat/chatroom.js";
import DemoNavbar from "@/components/review/DemoNavbar.jsx";
import ChatList from "@/components/chat/ChatList.jsx";

const ChatPage = () => {
    const stompClient = useRef(Stomp.client(`ws://${import.meta.env.VITE_APP_BACKEND_DEPLOY}/stomp/chats`));
    const accessToken = getAccessToken();
    const myName = "tmp";
    const [chatRooms, setChatRooms] = useState();
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

            const response = await showChatrooms();
            setChatRooms(response);
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
        if(chatTitle.length > 0) {
            const response = await createChatroom(chatTitle);
            console.log(response);
        }
    }

    return (
        <div className="w-100 bg-primary">
            <DemoNavbar/>
            <Container>
                <div className="row w-100" style={{margin: '1rem'}}>
                    {/* 1:4 비율 */}
                    <div className="col-3">
                        {/* 여기에는 화면의 1 부분에 해당하는 내용 */}
                        <Input
                            value={chatTitle}
                            onChange={(e) => setChatTitle(e.target.value)}
                        />
                        <ChatList chatRooms={chatRooms} setSelectedChatroom={setSelectedChatroom}/>
                    </div>
                    <div className="col-9">
                        {/* 여기에는 화면의 4 부분에 해당하는 내용 */}
                        <Button onClick={handleCreateChatRoom}>
                            채팅방 생성
                        </Button>
                    </div>
                </div>
            </Container>
        </div>

    )
}

export default ChatPage;