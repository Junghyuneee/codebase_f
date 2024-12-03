import ChatRooms from "./ChatRooms"

const SidePanel = () => {
    return (
        <div
            style={{
                backgroundColor: '#7b83eb',
                padding: '2rem',
                minHeight: '100vh',
                color: 'white',
                minWidth: '275px'
            }}
        >
            <ChatRooms/>
        </div>
    )
}

export default SidePanel