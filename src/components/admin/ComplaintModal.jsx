import { useState } from "react";
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
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
                        <FormCheck
                            type="radio"
                            id="option1"
                            name="radioGroup"
                            label="옵션 1"
                            value="option1"
                        />
                        <FormCheck
                            type="radio"
                            id="option2"
                            name="radioGroup"
                            label="옵션 2"
                            value="option2"
                        />
                        <FormCheck
                            type="radio"
                            id="option3"
                            name="radioGroup"
                            label="옵션 3"
                            value="option3"
                        />
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