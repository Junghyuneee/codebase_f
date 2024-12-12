import {useCallback, useEffect, useRef, useState} from "react";
import useChatConnect from "@/hooks/chat/useChatConnect.js";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import Message from "@/components/chat/MainPanel/Message.jsx";
import MessageForm from "@/components/chat/Modal/MessageForm.jsx";
import {getMessages} from "@/api/chat/message.js";
import {getAccessToken} from "@/api/auth/getset.js";

const ChatMainModal = ({show, setShow, chatRoom}) => {
    const stompClient = useRef(null);
    const messageEndRef = useRef(null);
    const [messages, setMessages] = useState([]);

    const subscribeToChatRoom = useCallback(async () => {
        if (chatRoom && chatRoom.id && stompClient.current.connected) {

            const response = await getMessages(chatRoom.id);
            setMessages(response);

            console.log('Connected to chat room', chatRoom.id);
            stompClient.current.subscribe(
                `/sub/chats/${chatRoom.id}`,
                (chatMessage) => {
                    setMessages((prevMessages) => [...prevMessages, JSON.parse(chatMessage.body)]);
                },
                {Authorization: `${getAccessToken()}`}
            );
        }
    }, [chatRoom]);

    useChatConnect(stompClient, subscribeToChatRoom);

    // 새로운 메시지 발생 시 스크롤 아래로 고정
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
    }, [messages])

    const handleClose = () => {
        setShow(false);
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
    }

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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>{chatRoom.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{
                    width: '100%',
                    minHeight: '20rem',
                    maxHeight: '20rem',
                    border: '.2rem solid #ececec',
                    borderRadius: '4px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    overflowY: 'auto',
                    scrollbarWidth: "thin",
                    scrollbarColor: '#ccc #f9f9f9'
                }}>
                    {renderMessages(messages)}
                    <div ref={messageEndRef}></div>
                </div>
                <MessageForm
                    stompClient={stompClient.current}
                    chatRoom={chatRoom}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ChatMainModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    chatRoom: PropTypes.object,
}

export default ChatMainModal;