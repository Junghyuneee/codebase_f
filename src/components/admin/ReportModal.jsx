import React, { useState } from "react";
import {Modal, Button, ModalHeader, ModalBody, ModalFooter, FormGroup} from "reactstrap";
import {FormCheck} from "react-bootstrap";

const ReportModal = ({category, categoryId, memberId, memberName}) => {

    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 정의

    const openModal = () => { setModalOpen(true); } // 모달 열기 함수

    const closeModal = () => { setModalOpen(false); } // 모달 닫기 함수

    const handleReport = () => { // 신고 처리하는 함수
        console.log(`카테고리: ${category}, 카테고리 id: ${categoryId}`);
        alert("신고가 접수되었습니다.");
        closeModal(); // 모달 닫기
    }

    return (
        <>
            <Button color='danger' outline block onClick={openModal}><i className="ni ni-tag" /> 신고</Button>
            {isModalOpen && (
                <Modal isOpen={isModalOpen}>
                    <ModalHeader>신고 하기</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <FormCheck
                                type="radio"
                                id="option1"
                                name="radioGroup"
                                label="마음에 들지 않아요"
                                value="option1"
                            />
                            <FormCheck
                                type="radio"
                                id="option2"
                                name="radioGroup"
                                label="관련 없는 콘텐츠에요"
                                value="option2"
                            />
                            <FormCheck
                                type="radio"
                                id="option3"
                                name="radioGroup"
                                label="거짓 정보가 포함되어 있어요"
                                value="option3"
                            />
                            <FormCheck
                                type="radio"
                                id="option4"
                                name="radioGroup"
                                label="선정적인 내용이 있어요"
                                value="option4"
                            />
                            <FormCheck
                                type="radio"
                                id="option5"
                                name="radioGroup"
                                label="공격적인 내용이 있어요"
                                value="option5"
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closeModal}>닫기</Button>
                        <Button onClick={handleReport}>신고</Button>
                    </ModalFooter>
                </Modal>
            )}
        </>
    )
}

export default ReportModal;