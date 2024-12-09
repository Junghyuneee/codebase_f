import ChatRooms from "./ChatRooms"

const SidePanel = () => {
    return (
        <div
            style={{
                backgroundColor: 'dimgray',
                padding: '2rem',
                minHeight: '100vh',
                color: 'white',
                minWidth: '275px',
            }}
            className={"rounded-5 rounded-left"}
        >
            <ChatRooms/>
        </div>
    )
}

export default SidePanel