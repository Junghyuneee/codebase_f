import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from "axios";
import apiClient from "@/api/apiClient.js";

const ReportDetailModal = ({ isReportDetailModalOpen, reportId, categoryTitle, closeReportDetailModal }) => {
    const [reportDetails, setReportDetails] = useState(null); // 데이터를 저장할 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    console.log(reportId)
    console.log(categoryTitle)

    useEffect(() => {
        if (isReportDetailModalOpen && reportId) {
            const loadReportDetails = async () => {
                if (reportDetails && reportDetails.reportId === reportId) {
                    // 동일한 데이터가 이미 로드된 경우 중단
                    return;
                }

                setLoading(true);
                try {
                    const response = await apiClient.get(`/reports/details/${reportId}`);
                    setReportDetails(response.data);
                } catch (err) {
                    setError('데이터를 불러오는 중 문제가 발생했습니다.');
                } finally {
                    setLoading(false);
                }
            };

            loadReportDetails();
        }
    }, [isReportDetailModalOpen, reportId]);

    return (
        <Modal className="modal-lg" isOpen={isReportDetailModalOpen}>
            <ModalHeader>'{categoryTitle}' 게시글 신고 사항</ModalHeader>
            <ModalBody>
                {loading && <p>로딩 중...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {reportDetails ? (
                    <div>
                        <table className="table-layout">
                            <thead>
                            <tr>
                                <th className="column-1">번호</th>
                                <th className="column-3">신고자</th>
                                <th className="column-3">신고내용</th>
                                <th className="column-3">신고 날짜</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reportDetails.map((reportDetail, index) => (
                                <tr key={reportDetail.detailId}>
                                    <td>{index + 1}</td>
                                    <td>{reportDetail.memberEmail}</td>
                                    <td>{reportDetail.content}</td>
                                    <td>{reportDetail.reportDate}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    ) : (
                    !loading && <p>데이터가 없습니다.</p>
                    )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={closeReportDetailModal}>
                    닫기
                </Button>
            </ModalFooter>
        </Modal>
);
};

export default ReportDetailModal;
