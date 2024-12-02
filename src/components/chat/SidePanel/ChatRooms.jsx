import {FaPlus} from 'react-icons/fa';
import {Modal, Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {createChatroom, showChatrooms} from "@/api/chat/chatroom.js";
import PropTypes from "prop-types";

const ChatRooms = ({setCurrentChatroom}) => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [chatRooms, setChatRooms] = useState([]);
    const [activeChatRoomId, setActiveChatRoomId] = useState("");

    useEffect(() => {
        const initChatRooms = async () => {
            const response = await showChatrooms();
            setChatRooms(response)
        }
        initChatRooms();
    }, [])

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    const addChatroom = async () => {
        return await createChatroom(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length > 0) {
            addChatroom().then((response) => {
                setChatRooms([...chatRooms, response]);
            }).then(() => setShow(false));
        }
    }

    const renderChatrooms = (chatRooms) => (
        chatRooms.length > 0 && (
            chatRooms.map((room) => (
                <li key={room.id}
                    onClick={() => {
                        setActiveChatRoomId(room.id);
                        setCurrentChatroom(room)
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
                                onChange={(e) => setName(e.target.value)}
                                type="text" placeholder="채팅방 이름"/>
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

ChatRooms.propTypes = {
    setCurrentChatroom: PropTypes.func.isRequired, // setCurrentChatroom은 필수 함수
};

export default ChatRooms;