/*
김은지
2024 11 24
*/
import { useState } from "react";
import {Modal, Button, ModalHeader, ModalBody, ModalFooter, FormGroup} from "reactstrap";
import {FormCheck} from "react-bootstrap";
import {FaExclamationTriangle} from "react-icons/fa";
import axios from "axios";

const ReportModal = ({category, categoryId, categoryTitle, memberId, memberName, style}) => {

    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 정의

    const openModal = () => { setModalOpen(true); } // 모달 열기 함수

    const closeModal = () => { setModalOpen(false); } // 모달 닫기 함수

    const [isSubmitting, setSubmitting] = useState(false); // 신고 데이터 전송 상태 관리
    const [selectedContent, setSelectedContent] = useState(""); // 신고 내용 라디오 버튼 선택 값 관리

    const handleReport = async () => { // 신고 처리하는 함수
        if(!selectedContent) {
            alert("신고 사유를 선택해주세요.");
            return;
        }

        console.log(`카테고리: ${category}, 카테고리 id: ${categoryId}`);
        alert("신고가 접수되었습니다.");

        setSubmitting(true); // 전송 시작

        try {
            // response : 응답 객체
            const response = await axios.post("http://localhost:8080/reports/create",{
                category: category,
                categoryId: categoryId,
                categoryTitle: categoryTitle,
                memberId: memberId,
                memberName: memberName,
                content: selectedContent
                // 전송할 데이터를 JSON 형식으로 작성
            });

            alert("'" + response.data.title + "'" + response.data.message)

        } catch (error) { // 실패하게 어떻게 하지..? 작동 확인을 못하겠는데....
            console.error("신고 중 에러 발생:", error);
            // 에러 응답 처리
            if (error.response) {
                // 서버가 반환한 에러 응답
                alert("'" + error.response.data.title + "'" + error.response.data.message)
            } else {
                // 네트워크 문제 또는 서버 응답 없음
                alert("신고 요청에 실패했습니다. 네트워크를 확인해주세요.");
            }
        } finally {
            setSubmitting(false);
            closeModal(); // 모달 닫기
        }
    }

    return (
        <>
            <Button style={style} color='danger' outline onClick={openModal} className="ms-2 btn-sm">
                <FaExclamationTriangle /> 신고
            </Button>
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
                                value="마음에 들지 않아요"
                                onChange={(e) => setSelectedContent(e.target.value)}
                                checked={selectedContent === "마음에 들지 않아요"}
                            />
                            <FormCheck
                                type="radio"
                                id="option2"
                                name="radioGroup"
                                label="관련 없는 콘텐츠에요"
                                value="관련 없는 콘텐츠에요"
                                onChange={(e) => setSelectedContent(e.target.value)}
                                checked={selectedContent === "관련 없는 콘텐츠에요"}
                            />
                            <FormCheck
                                type="radio"
                                id="option3"
                                name="radioGroup"
                                label="거짓 정보가 포함되어 있어요"
                                value="거짓 정보가 포함되어 있어요"
                                onChange={(e) => setSelectedContent(e.target.value)}
                                checked={selectedContent === "거짓 정보가 포함되어 있어요"}
                            />
                            <FormCheck
                                type="radio"
                                id="option4"
                                name="radioGroup"
                                label="선정적인 내용이 있어요"
                                value="선정적인 내용이 있어요"
                                onChange={(e) => setSelectedContent(e.target.value)}
                                checked={selectedContent === "선정적인 내용이 있어요"}
                            />
                            <FormCheck
                                type="radio"
                                id="option5"
                                name="radioGroup"
                                label="공격적인 내용이 있어요"
                                value="공격적인 내용이 있어요"
                                onChange={(e) => setSelectedContent(e.target.value)}
                                checked={selectedContent === "공격적인 내용이 있어요"}
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