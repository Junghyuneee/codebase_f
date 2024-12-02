// import UserPanel from "./UserPanel"
// import Favorited from "./Favorited"
import ChatRooms from "./ChatRooms"
// import DirectMessages from "./DirectMessages"
import PropTypes from "prop-types";

const SidePanel = ({currentChatroom, setCurrentChatroom}) => {
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
            {/*<UserPanel/>*/}

            {/*<Favorited/>*/}

            <ChatRooms currentChatroom={currentChatroom} setCurrentChatroom={setCurrentChatroom}/>

            {/*<DirectMessages/>*/}

        </div>
    )
}

SidePanel.propTypes = {
    setCurrentChatroom: PropTypes.func.isRequired, // setCurrentChatroom은 필수 함수
    currentChatroom: PropTypes.object,
};

export default SidePanel