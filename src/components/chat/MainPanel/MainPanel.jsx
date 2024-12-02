import {useEffect, useState} from 'react'
import Message from "./Message.jsx"
import MessageForm from "./MessageForm.jsx"
import MessageHeader from "@/components/chat/MainPanel/MessageHeader.jsx";
import PropTypes from "prop-types";

const MainPanel = ({chatRoom, stompClient, setChatRoom}) => {

    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(true);

    useEffect(() => {
        const getMessages = async () => {
            // const messages = await getMessages();
        }

        getMessages();
    }, []);

    const renderMessages = (messages) => (
        messages.length > 0 &&
        messages.map(message =>
            <Message
                key={message.timestamp}
                message={message}
                user={this.props.user}
            />
        )
    )
    return (
        <div style={{padding: '2rem 2rem 0 2rem'}}>
            {chatRoom && <MessageHeader chatRoom={chatRoom} setChatRoom={setChatRoom}/>}
            <div style={{
                width: '100%',
                height: '450px',
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
            </div>
            <MessageForm
                chatRoom={chatRoom}
                stompClient={stompClient}
            />
        </div>
    )
}
MainPanel.propTypes = {
    chatRoom: PropTypes.string.isRequired,
    stompClient: PropTypes.object.isRequired,
    setChatRoom: PropTypes.func.isRequired,
}

export default MainPanel;