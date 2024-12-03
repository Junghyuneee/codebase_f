// eslint-disable-next-line react/prop-types
const ChatList = ({chatRooms, setSelectedChatroom}) => {
    return (
        chatRooms &&
        <div className="w-100 h-100 bg-secondary">
            {/* eslint-disable-next-line react/prop-types */}
            {chatRooms.map((chatroom, index) => (
                <div
                    onClick={() => setSelectedChatroom(chatroom)}
                    className="w-100 text-center border-top"
                    key={chatroom.id + index}
                >
                    <h3 className="text-white">{chatroom.title}</h3>
                </div>
            ))}
        </div>
    )
}

export default ChatList;