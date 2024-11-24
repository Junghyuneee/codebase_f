import { useState } from "react";
import {Modal, Button, ModalHeader, ModalBody, ModalFooter, FormGroup} from "reactstrap";
import {FormCheck} from "react-bootstrap";

const ComplaintModal = () => {

    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 정의

    const openModal = () => { setModalOpen(true); } // 모달 열기 함수

    const closeModal = () => { setModalOpen(false); } // 모달 닫기 함수

    return (
        <>
            <button onClick={openModal}>신고</button>
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
                        <Button>신고</Button>
                    </ModalFooter>
                </Modal>
            )}
        </>
    )
}

export default ComplaintModal;