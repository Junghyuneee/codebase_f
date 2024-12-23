/*
김은지
2024 11 24
*/
import { useState } from "react";
import {Modal, Button, ModalHeader, ModalBody, ModalFooter, FormGroup} from "reactstrap";
import {FormCheck} from "react-bootstrap";
import {FaExclamationTriangle} from "react-icons/fa";
import {getMemberId} from "@/api/auth/getset.js";
import {CanReport} from "@/components/admin/CanReport.js";
import {useNavigate} from "react-router-dom";
import apiClient from "@/api/apiClient.js";

const ReportModal = ({category, categoryId, categoryTitle, style}) => {

    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 정의

    const openModal = () => { setModalOpen(true); } // 모달 열기 함수

    const closeModal = () => { setModalOpen(false); } // 모달 닫기 함수

    const [isSubmitting, setSubmitting] = useState(false); // 신고 데이터 전송 상태 관리
    const [selectedContent, setSelectedContent] = useState(""); // 신고 내용 라디오 버튼 선택 값 관리

    const navigate = useNavigate();

    const handleCanReport = () => { // 신고 시 로그인 체크
        if(CanReport(navigate)) { // 로그인 O
            openModal();
        }
    }

    const validate = () => {
        if(category === null || category === undefined || category === "" ||
            categoryId === null || categoryId === undefined || categoryId === "" ||
            categoryTitle === null || categoryTitle === undefined || categoryTitle === "") {
            // 각 데이터가 0일 수 있어서 !데이터로 안됨
            alert("신고 데이터가 입력되지 않았습니다. 다시 시도해주세요.");
            return false;
        } else if(!getMemberId()) {
            alert("로그인 후 신고를 진행해주세요.")
            navigate('/login');
            return false;
        }
    }

    const handleReport = async () => { // 신고 처리하는 함수
        if(!selectedContent) {
            alert("신고 사유를 선택해주세요.");
            return;
        }

        setSubmitting(true); // 전송 시작

        try {
            validate();
            // response : 응답 객체
            const response = await apiClient.post("/reports/create",{
                category: category,
                categoryId: categoryId,
                categoryTitle: categoryTitle,
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
            <Button style={style} color='danger' outline onClick={handleCanReport} className="ms-2 btn-sm">
                <FaExclamationTriangle /> 신고
            </Button>
            {isModalOpen && (
                <Modal className="modal-sm" isOpen={isModalOpen}>
                    <ModalHeader className="flex-row">
                        <span style={{ fontWeight: 'bold'}}>{categoryTitle}</span>
                        <span> 신고 하기</span>
                    </ModalHeader>
                    <ModalBody style={{padding: '20px'}}>
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
                    <ModalFooter style={{padding: '10px'}}>
                        <Button className="btn-outline-default text-default"
                                style={{backgroundColor: 'white'}}
                                onClick={closeModal}>닫기</Button>
                        <Button className="btn-outline-danger text-danger"
                                style={{backgroundColor: 'white'}}
                                onClick={handleReport}>신고</Button>
                    </ModalFooter>
                </Modal>
            )}
        </>
    )
}

export default ReportModal;