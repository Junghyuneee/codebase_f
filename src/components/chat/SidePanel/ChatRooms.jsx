import {FaPlus} from 'react-icons/fa';
import {Modal, Button, Form} from "react-bootstrap";
import {useContext, useState} from "react";
import {ChatRoomContext, ChatRoomDispatchContext,} from "@/pages/chat/ChatPage.jsx";

const ChatRooms = () => {

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [activeChatRoomId, setActiveChatRoomId] = useState("");

    const chatRooms = useContext(ChatRoomContext).chatRoomList;
    const {onCreate, onSelect} = useContext(ChatRoomDispatchContext);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.length > 0) {
            await onCreate(title);
            setShow(false);
        }
    }

    const renderChatrooms = (chatRooms) => (
        chatRooms.length > 0 && (
            chatRooms.map((room) => (
                <li key={room.id}
                    onClick={() => {
                        setActiveChatRoomId(room.id);
                        onSelect(room);
                    }}
                    style={{cursor: 'pointer', backgroundColor: room.id === activeChatRoomId && "#FFFFFF45"}}
                >
                    # {room.title}
                </li>
            ))
        )
    )

    return (
        <div>
            <div style={{
                position: 'relative', width: '100%',
                display: 'flex', alignItems: 'center',
                textAlign: "center"
            }}>
                채팅방 {''} ( {chatRooms.length} )
                <FaPlus style={{
                    position: 'absolute',
                    right: 0, cursor: 'pointer'
                }} onClick={handleShow}/>

            </div>

            <ul style={{listStyleType: 'none', padding: 0}}>
                {renderChatrooms(chatRooms)}
            </ul>

            {/* ADD CHAT ROOM MODAL*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>채팅방 생성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>방 이름</Form.Label>
                            <Form.Control
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="채팅방 이름"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        만들기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ChatRooms;