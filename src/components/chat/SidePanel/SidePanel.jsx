import ChatRooms from "./ChatRooms"

const SidePanel = () => {
    return (
        <div
            style={{
                backgroundColor: 'dimgray',
                padding: '2rem',
                color: 'white',
                minWidth: '275px',
            }}
            className={"rounded-5 rounded-left h-100"}
        >
            <ChatRooms/>
        </div>
    )
}

export default SidePanel