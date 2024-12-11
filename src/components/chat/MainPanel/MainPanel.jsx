import {useContext, useEffect, useRef} from 'react'
import Message from "./Message.jsx"
import MessageForm from "./MessageForm.jsx"
import MessageHeader from "@/components/chat/MainPanel/MessageHeader.jsx";
import {ChatRoomContext} from "@/pages/chat/ChatPage.jsx";
import PropTypes from "prop-types";
import useSubscribeToChatRoom from "@/hooks/chat/useSubscribeToChatRoom.js";

const MainPanel = ({stompClient}) => {

    const chatRoom = useContext(ChatRoomContext).currentChatRoom;
    const messageEndRef = useRef(null);
    const messages = useSubscribeToChatRoom(chatRoom?.id, stompClient);

    // 새로운 메시지 발생 시 스크롤 아래로 고정
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
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
                minHeight: '20rem',
                maxHeight: '30rem',
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
                stompClient={stompClient}
            />
        </div>
    )
}

MainPanel.propTypes = {
    stompClient: PropTypes.shape({
        current: PropTypes.func
    }).isRequired
}

export default MainPanel;


