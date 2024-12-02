import moment from "moment/moment"
import {getEmail} from "@/api/auth/getset.js";

function Message({message}) {

    const timeFromNow = timestamp => moment(timestamp).fromNow();

    // const isImage = message => {
    //   return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
    // }

    const isMessageMine = (message) => {
        if (getEmail()) {
            // eslint-disable-next-line react/prop-types
            return getEmail() === message.sender
        }
    }

    return (
        <div className="media" style={{marginBottom: '3px'}}>
            {/*<img className="mr-3" src={message.user.image} alt={message.user.name}*/}
            {/*  style={{ borderRadius: '10px' }}*/}
            {/*  width={48}*/}
            {/*  height={48}*/}
            {/*/>*/}
            <div className="media-body" style={{backgroundColor: isMessageMine(message) && "#ECECEC"}}>
                <h6 className="mt-0">{message.sender}{' '}
                    <span style={{fontSize: '10px', color: 'gray'}}>
            {timeFromNow(message.timestamp)}
          </span>
                </h6>
                {/*{isImage(message) ?*/}
                {/*    <img style={{maxWidth: '300px'}} alt='이미지' src={message.image}/>*/}
                {/*    :*/}
                    <p>
                        {message.content}
                    </p>
                {/*}*/}
            </div>
        </div>
    )
}

export default Message