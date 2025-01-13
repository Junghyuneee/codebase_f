import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import {searchMember} from "@/api/auth/member.js";

const MemberSearchMultiSelectModal = ({show, setShow, setMember}) => {

    const memberSearchRef = useRef(null);
    const [name, setName] = useState("");
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState(new Set());

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

    const handleInviteMembers = async () => {
        if(selectedMembers.size > 0){
            setMember([...selectedMembers]);
            setMembers([]);
            setSelectedMembers(new Set());
            setShow(false);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className={"d-flex justify-content-between align-items-center"}>
                <Modal.Title>사용자 검색</Modal.Title>
                <Button className={"bg-gradient-primary"} onClick={handleInviteMembers}>초대하기</Button>
            </Modal.Header>
            <Modal.Body>
                {selectedMembers.size > 0 &&
                    <div className={"d-flex justify-content-start align-items-center"}
                         style={{
                             gap: "1rem",
                             overflowY: "auto", // Enable vertical scrolling
                             padding: "0.5rem", // Optional padding for better appearance
                             scrollbarWidth: "thin",
                             scrollbarColor: '#ccc #f9f9f9'
                         }}>
                        {[...selectedMembers].map(member => (
                            <Button
                                variant={"secondary"}
                                key={member}
                                className={"text-nowrap "}
                                style={{position: "relative", padding: "0.5rem",}}
                                onClick={() => {
                                    setSelectedMembers(prevSelected => {
                                        const updatedSet = new Set(prevSelected);
                                        updatedSet.delete(member); // Set에서 항목 제거
                                        return updatedSet;
                                    });
                                }}
                            >
                                <div
                                    className={"position-absolute top--1 right--1 bg-gray d-flex align-items-center justify-content-center text-white"}
                                    style={{
                                        position: "absolute", // 부모 div 내에서 위치 고정
                                        width: "16px", // 원 크기
                                        height: "16px", // 원 크기
                                        borderRadius: "50%", // 원 형태로 만들기
                                        fontSize: "12px", // `x` 글자 크기
                                        fontWeight: "bold",
                                        cursor: "pointer", // 커서를 포인터로 변경
                                    }}
                                >
                                    X
                                </div>
                                {member}
                            </Button>

                        ))}
                    </div>
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="my-3 d-flex" style={{gap: ".5rem"}} controlId="formBasicEmail">
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
                             style={{
                                 gap: ".5rem",
                                 cursor: selectedMembers.has(member.name) ? "default" : "pointer",
                                 backgroundColor: selectedMembers.has(member.name) ? "#f0f0f0" : "transparent"
                             }}
                             aria-disabled={selectedMembers.has(member.name)}
                             onClick={() => {
                                 if (!selectedMembers.has(member.name)) {
                                     setSelectedMembers(prevSelected => {
                                         const updatedSet = new Set(prevSelected);
                                         updatedSet.add(member.name); // Set의 add 메서드를 사용해 추가
                                         return updatedSet; // 새로운 Set 반환
                                     });
                                 }
                             }}
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

MemberSearchMultiSelectModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    setMember: PropTypes.func.isRequired,
}

export default MemberSearchMultiSelectModal;