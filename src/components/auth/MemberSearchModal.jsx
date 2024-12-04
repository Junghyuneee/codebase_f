import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import {searchMember} from "@/api/auth/member.js";

const MemberSearchModal = ({show, setShow, setMember}) => {

    const memberSearchRef = useRef(null);
    const [name, setName] = useState("");
    const [members, setMembers] = useState([]);

    useEffect(() => {
        if (show) {
            memberSearchRef.current.focus();
        }
    }, [show])

    const handleClose = () => {
        setShow(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.length > 0) {
            const response = await searchMember(name);
            setMembers(response);
        }
    }

    const onKeydown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await handleSubmit(e);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>사용자 검색</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 d-flex" style={{gap: ".5rem"}} controlId="formBasicEmail">
                        <Form.Control
                            ref={memberSearchRef}
                            onKeyDown={onKeydown}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="사용자 이름 혹은 이메일"/>
                        <Button variant="primary" className="text-nowrap" onClick={handleSubmit}>
                            검색
                        </Button>
                    </Form.Group>
                </Form>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    {members && members.map(member => (
                        <div key={member.id} className="px-3 d-flex align-items-center"
                             style={{gap: ".5rem"}}
                             onClick={()=>setMember(member)}
                        >
                            <p className="m-0">{member.name}</p>
                            <p className="m-0">{member.email}</p>
                        </div>
                    ))
                    }</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

MemberSearchModal.propTypes = {
    show: PropTypes.string.isRequired,
    setShow: PropTypes.func.isRequired,
}

export default MemberSearchModal;