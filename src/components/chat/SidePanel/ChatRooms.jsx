import {FaCircle, FaCommentDots, FaPlus} from 'react-icons/fa';
import {Modal, Button, Form} from "react-bootstrap";
import {useContext, useEffect, useRef, useState} from "react";
import {ChatRoomContext, ChatRoomDispatchContext,} from "@/pages/chat/ChatPage.jsx";

const ChatRooms = () => {

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [activeChatRoomId, setActiveChatRoomId] = useState("");
    const createChatroomRef = useRef(null);

    const chatRooms = useContext(ChatRoomContext).chatRoomList;
    const {onCreate, onSelect} = useContext(ChatRoomDispatchContext);

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        if(show){
            createChatroomRef.current.focus();
        }
    }, [show]);

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

    const onKeyDown = async (e) => {
        if (e.key === "Enter") {
            await handleSubmit(e);
        }
    }

    const renderChatrooms = (chatRooms) => (
        chatRooms.length > 0 && (
            chatRooms.map((room) => (
                <li key={room.id}
                    className="p-2 align-items-center m-0 d-flex align-items-center justify-content-between"
                    onClick={() => {
                        room.hasNewMessage=false
                        setActiveChatRoomId(room.id);
                        onSelect(room);
                    }}
                    style={{cursor: 'pointer', backgroundColor: room.id === activeChatRoomId && "#FFFFFF45"}}
                >
                    <div className="d-flex align-items-center" style={{gap:'.5rem'}}><h4 className="text-white m-0">{room.title} </h4>
                        ({room.memberCount})</div>
                    {room.hasNewMessage && <FaCircle className="text-red"/>}
                </li>
            ))
        )
    )

    return (
        <div>
            <div className="justify-content-between px-2" style={{
                width: '100%',                display: 'flex', alignItems: 'center',
                textAlign: "center"
            }}>
                <div className="d-flex align-items-center" style={{gap:'.5rem'}}><h2 className="text-white align-items-center">
                    <FaCommentDots/>
                </h2> &nbsp; {''} ( {chatRooms.length} )</div>
                <FaPlus style={{
                     cursor: 'pointer'
                }} onClick={handleShow}/>

            </div>
            <hr className="border-white"/>
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
                                ref={createChatroomRef}
                                onKeyDown={onKeyDown}
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