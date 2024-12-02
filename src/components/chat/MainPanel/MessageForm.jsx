import {useRef, useState} from 'react'
import {Col, Form, ProgressBar, Row} from "react-bootstrap"
import {getAccessToken, getEmail} from "@/api/auth/getset.js";
import apiClient from "@/api/apiClient.js";
import PropTypes from "prop-types";

// import { mime } from 'mime-types';

function MessageForm({chatRoom, stompClient}) {

    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    const sendMessage = () => {
        stompClient.publish({
            destination: `http://${import.meta.env.VITE_APP_BACKEND_DEPLOY}/pub/chats/${chatRoom.id}`,
            headers: {
                'Authorization': getAccessToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'sender': getEmail(),
                'message': content
            })
        });
        setContent("");
    }

    const handleSubmit = async () => {
        if (!content) {
            setErrors(prev => prev.concat('Type contents first'));
            return;
        }
        sendMessage();
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)}/>
                </Form.Group>
            </Form>

            <div>
                {errors.map(errorMsg =>
                    <p style={{color: 'red'}} key={errorMsg}>
                        {errorMsg}
                    </p>)}
            </div>

            <Row>
                <Col>
                    <button
                        className="message-form-button"
                        style={{width: '100%'}}
                        onClick={handleSubmit}
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
    chatRoom: PropTypes.object,
    stompClient: PropTypes.shape({
        publish: PropTypes.func.isRequired,
    })
}

export default MessageForm