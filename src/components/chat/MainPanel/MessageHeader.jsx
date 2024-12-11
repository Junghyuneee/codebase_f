import {
    Button,
    Container,
    Row,
} from "react-bootstrap"
import {useContext, useEffect, useState} from "react";
import {ChatRoomContext, ChatRoomDispatchContext} from "@/pages/chat/ChatPage.jsx";
import MemberSearchModal from "@/components/auth/MemberSearchModal.jsx";
import {joinChatroom} from "@/api/chat/chatroom.js";

function MessageHeader() {

    const {currentChatRoom} = useContext(ChatRoomContext);
    const {onDelete, onLeave} = useContext(ChatRoomDispatchContext);
    const [show, setShow] = useState(false);
    const [member, setMember] = useState(null);

    const handleLeaveChatRoom = async () => {
        if (window.confirm("채팅방을 나가시겠습니까?")) {
            if (await onDelete(currentChatRoom.id)) {
                window.alert("채팅방을 나갔습니다.");
                onLeave();
            }
        }
    }

    useEffect(() => {
        const addMember = async () => {
            if (member !== null && window.confirm(`${member.name}님을 초대하시겠습니까?`)) {
                const response = await joinChatroom(currentChatRoom.id, member.email);
                console.log(response);
            }
        }
        addMember();
    }, [currentChatRoom, member]);

    return (<div style={{
            width: '100%',
            height: '4rem',
            border: '.2rem solid #ececec',
            borderRadius: '4px',
            padding: '0.5rem',
            marginBottom: '1rem',
            alignContent: "center",
        }}>
            <Container>
                <Row
                    className="d-flex justify-content-between align-items-center"
                >
                    {currentChatRoom && currentChatRoom.title}
                    <Button className="bg-primary border-0" onClick={() => setShow(true)}>
                        초대하기
                    </Button>
                    <Button className="bg-danger border-0" onClick={handleLeaveChatRoom}>
                        채팅방 나가기
                    </Button>
                </Row>
            </Container>
            <MemberSearchModal show={show} setShow={setShow} setMember={setMember}/>
        </div>
    );
}

export default MessageHeader