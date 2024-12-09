/*
김은지
2024 11 19
*/
import {useState, useEffect} from 'react';

import '/src/components/admin/Admin.css';
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import ReportDetailModal from "@/components/admin/ReportDetailModal.jsx";

const ReportManagement = () => {
    const [activeReportId, setActiveReportId] = useState(null); // 현재 활성화된 reportId 관리

    const [isReportDetailModalOpen, setIsReportDetailModalOpen] = useState(false);
    const openReportDetailModal = (reportId) => { // 모달 열기 함수
        if(!isReportDetailModalOpen) {
            setActiveReportId(reportId);
        }
    }
    const closeReportDetailModal = () => { setActiveReportId(null); } // 모달 닫기 함수


    const [reports, setReports] = useState([]);
    const [searchParams] = useSearchParams(); // url에서 파라미터 가져오기
    const rawCategory = searchParams.get("category"); // 파라미터에서 category 뽑아내기
    const [category, setCategory] = useState(null); // 백엔드로 넘길 카테고리 정보, 숫자로 정의
    useEffect(() => {
        if(!rawCategory) return;
        const updateCategory = (rawCategory) => {
            if (rawCategory === "readAll") {
                setCategory(4);
            } else if (rawCategory === "readProject") {
                setCategory(0);
            } else if (rawCategory === "readPost") {
                setCategory(1);
            } else if (rawCategory === "readPostComment") {
                setCategory(2);
            } else {
                setCategory(3);
            }
        }
        console.log(category);
        updateCategory(rawCategory); // 백엔드 엔드포인트에 넣을 카테고리 셋
    },[rawCategory]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            if(category === null || category === undefined) {
                console.error("카테고리가 설정되지 않았습니다.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/reports/read/${category}`);
                setReports(response.data); // 서버에서 데이터 가져오기
                console.log(response.data);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
                setError("신고 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [category]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h3 className="mb-3 text-center">
                {category === 4 ? "전체 "
                : category === 0 ? "프로젝트 "
                : category === 1 ? "자유게시판 " 
                : category === 2 ? "자유게시판 댓글 "
                : "리뷰 "}
                신고 사항 관리 페이지
            </h3>
            <table className="table-layout">
                <thead>
                    <tr>
                        <th className="column-1">번호</th>
                        <th className="column-1">카테고리</th>
                        <th className="column-3">게시글 제목</th>
                        <th className="column-3">신고 수</th>
                        <th className="column-1">처리 여부</th>
                        <th className="column-1">처리</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.reportId}>
                            <td>{report.reportId}</td>
                            <td className="border-left">
                                {report.category === 0
                                ? "프로젝트"
                                : report.category === 1
                                ? "자유게시판"
                                : report.category === 2
                                ? "자유게시판 댓글"
                                : "리뷰"}
                            </td>
                            <td className="border-left">
                                <span onClick={() => openReportDetailModal(report.reportId)}>
                                    {report.categoryTitle}
                                </span>
                            </td>
                            {activeReportId === report.reportId && ( // 활성화된 reportId에만 모달 표시
                                <ReportDetailModal
                                    isReportDetailModalOpen={activeReportId === report.reportId}
                                    reportId={report.reportId}
                                    categoryTitle={report.categoryTitle}
                                    closeReportDetailModal={closeReportDetailModal} // 닫기 함수 전달
                                />
                            )}
                            <td className="border-left">{report.count}</td>
                            <td className="border-left">
                                {report.completed === true
                                    ? "O"
                                    : "X"}
                            </td>
                            <td className="border-left">
                                <button onClick={(e) => e.preventDefault()}>처리</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportManagement;