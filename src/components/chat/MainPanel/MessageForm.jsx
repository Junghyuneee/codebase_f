import {useContext, useEffect, useRef, useState} from 'react'
import {Col, Form,  Row} from "react-bootstrap"
import {getAccessToken, } from "@/api/auth/getset.js";
import PropTypes from "prop-types";
import {ChatRoomContext} from "@/pages/chat/ChatPage.jsx";

function MessageForm({stompClient}) {

    const [content, setContent] = useState("");
    const [errors, setErrors] = useState("");
    const chatRoom = useContext(ChatRoomContext).currentChatRoom;
    const contentRef = useRef(null);


    useEffect(() => {
        setContent("");
        contentRef.current.focus();
    }, [chatRoom])

    const sendMessage = () => {
        stompClient.publish({
            destination: `/pub/chats/${chatRoom.id}`,
            headers: {
                'Authorization': getAccessToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'message': content
            })
        });
        setContent("");
    }

    const onKeyDown = async (e) =>{
        if(e.key === 'Enter' && e.shiftKey){
            e.preventDefault();
            await handleSubmit(e);
        }
    }

    const handleSubmit = async () => {
        if (!content) {
            setErrors('Type contents first');
            return;
        }
        setErrors("");
        sendMessage();
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control ref={contentRef}
                                  as="textarea"
                                  disabled={!(chatRoom && chatRoom?.id)} rows={3} value={content}
                                  onKeyDown={onKeyDown}
                                  onChange={(e) => setContent(e.target.value)}/>
                </Form.Group>
            </Form>

            <div>
                {errors.length > 0 &&
                    <p style={{color: 'red'}}>
                        {errors}
                    </p>}
            </div>

            <Row>
                <Col>
                    <button
                        className="message-form-button"
                        style={{width: '100%'}}
                        onClick={handleSubmit}
                        disabled={!(chatRoom && chatRoom?.id)}
                    >
                        SEND
                    </button>
                </Col>
                {/*<Col>*/}
                {/*  <button*/}
                {/*    onClick={handleImageOpenRef}*/}
                {/*    className="message-form-button"*/}
                {/*    style={{ width: '100%' }}*/}
                {/*    disabled={loading?true:false}*/}
                {/*  >*/}
                {/*    UPLOAD*/}
                {/*  </button>*/}
                {/*</Col>*/}
            </Row>

            {/*<input accept='image/jpeg, image/png' type='file' style={{ display: 'none' }} ref={inputOpenImageRef} onChange={handleUploadImage} />*/}

        </div>
    )
}

MessageForm.propTypes = {
    stompClient: PropTypes.shape({
            publish: PropTypes.func.isRequired,
    })
}

export default MessageForm