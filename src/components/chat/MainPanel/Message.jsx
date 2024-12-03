import moment from "moment/moment"
import {getEmail} from "@/api/auth/getset.js";
import PropTypes from "prop-types";

function Message({message}) {

    const timeFromNow = timestamp => moment(timestamp).fromNow();

    // const isImage = message => {
    //   return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
    // }

    const isMessageMine = (message) => {
        if (getEmail()) {
            return getEmail() === message.sender
        }
    }

    return (
        <div className={`media ${isMessageMine(message) ? 'justify-content-end' : 'justify-content-start'}`} style={{marginBottom: '3px'}}>
            {/*<img className="mr-3" src={message.user.image} alt={message.user.name}*/}
            {/*  style={{ borderRadius: '10px' }}*/}
            {/*  width={48}*/}
            {/*  height={48}*/}
            {/*/>*/}
                <div className="px-3 py-2 rounded-lg"
                     style={{backgroundColor: isMessageMine(message) ? "lightgoldenrodyellow": "whitesmoke"}}>
                    <h6 >{message.sender}{' '}
                        <span style={{fontSize: '10px', color: 'gray', alignSelf: 'center'}}>
                            {timeFromNow(message.timestamp)}
                        </span>
                    </h6>
                    {/*{isImage(message) ?*/}
                    {/*    <img style={{maxWidth: '300px'}} alt='이미지' src={message.image}/>*/}
                    {/*    :*/}
                    <p className="m-0" style={{whiteSpace: 'pre-wrap'}}>
                        {message.message}
                    </p>
                    {/*}*/}
                </div>
        </div>
    )
}

Message.propTypes = {
    message: PropTypes.shape({
        timestamp: PropTypes.string,
        message: PropTypes.string,
        sender: PropTypes.string,
    })
}

export default Message