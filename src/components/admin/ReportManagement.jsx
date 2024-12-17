/*
김은지
2024 11 19
*/
import {useState, useEffect} from 'react';

import '/src/components/admin/Admin.css';
import {Link, useLocation, useSearchParams} from "react-router-dom";
import axios from "axios";
import ReportDetailModal from "@/components/admin/ReportDetailModal.jsx";
import {Button} from "reactstrap";

const ReportManagement = () => {
    const [isHoveredAll, setIsHoveredAll] = useState(false); // 카테고리 버튼 스타일 지정
    const [isHoveredProject, setIsHoveredProject] = useState(false);
    const [isHoveredPost, setIsHoveredPost] = useState(false);
    const [isHoveredComment, setIsHoveredComment] = useState(false);
    const [isHoveredReview, setIsHoveredReview] = useState(false);

    // 신고 디테일 모달 관련
    const [activeReportId, setActiveReportId] = useState(null); // 현재 활성화된 reportId 관리

    const [isReportDetailModalOpen, setIsReportDetailModalOpen] = useState(false);
    const openReportDetailModal = (reportId) => { // 모달 열기 함수
        if (!isReportDetailModalOpen) {
            setActiveReportId(reportId);
        }
    }
    const closeReportDetailModal = () => {
        setActiveReportId(null);
    } // 모달 닫기 함수

    // 신고 리스트
    const [reports, setReports] = useState([]);

    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;

    const [searchParams] = useSearchParams(); // url에서 파라미터 가져오기
    const rawCategory = searchParams.get("category"); // 파라미터에서 category 뽑아내기
    const [category, setCategory] = useState(null); // 백엔드로 넘길 카테고리 정보, 숫자로 정의
    useEffect(() => {
        if (!rawCategory) return;
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
    }, [rawCategory]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async (currentPage) => {
            if (category === null || category === undefined) {
                console.error("카테고리가 설정되지 않았습니다.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/reports/read/${category}`,
                    {params: {page: currentPage, size: pageSize}});
                console.log(response.data.data)
                setReports(response.data.data);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
                console.log(response.data);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
                setError("신고 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports(currentPage);
    }, [category, currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const processReport = (reportId) => {
        const userResponse = confirm("신고 처리를 진행하시겠습니까?");

        if (userResponse) {
            const response = axios.post(`http://localhost:8080/reports/process/${reportId}`);
            alert("'" + response.data.title + "'" + response.data.message)
        }
    }

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <div className='mb-1 mr-1'>
                <Button to="/admin/reports?category=readAll" tag={Link}
                        style={{
                            backgroundColor: category === 4 ? "#5e72e4" :
                                isHoveredAll ? "#5e72e4" : "white",
                            color: category === 4 ? 'white' :
                                isHoveredAll ? 'white' : 'black',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={() => setIsHoveredAll(true)}
                        onMouseLeave={() => setIsHoveredAll(false)}>
                    전체
                </Button>
                <Button to="/admin/reports?category=readProject" tag={Link}
                        style={{
                            backgroundColor: category === 0 ? "#5e72e4" :
                                isHoveredProject ? "#5e72e4" : "white",
                            color: category === 0 ? 'white' :
                                isHoveredProject ? 'white' : 'black',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={() => setIsHoveredProject(true)}
                        onMouseLeave={() => setIsHoveredProject(false)}>
                    프로젝트
                </Button>
                <Button to="/admin/reports?category=readPost" tag={Link}
                        style={{
                            backgroundColor: category === 1 ? "#5e72e4" :
                                isHoveredPost ? "#5e72e4" : "white",
                            color: category === 1 ? 'white' :
                                isHoveredPost ? 'white' : 'black',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={() => setIsHoveredPost(true)}
                        onMouseLeave={() => setIsHoveredPost(false)}>
                    게시판
                </Button>
                <Button to="/admin/reports?category=readPostComment" tag={Link}
                        style={{
                            backgroundColor: category === 2 ? "#5e72e4" :
                                isHoveredComment ? "#5e72e4" : "white",
                            color: category === 2 ? 'white' :
                                isHoveredComment ? 'white' : 'black',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={() => setIsHoveredComment(true)}
                        onMouseLeave={() => setIsHoveredComment(false)}>
                    댓글
                </Button>
                <Button to="/admin/reports?category=readReview" tag={Link}
                        style={{
                            backgroundColor: category === 3 ? "#5e72e4" :
                                isHoveredReview ? "#5e72e4" : "white",
                            color: category === 3 ? 'white' :
                                isHoveredReview ? 'white' : 'black',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={() => setIsHoveredReview(true)}
                        onMouseLeave={() => setIsHoveredReview(false)}>
                    리뷰
                </Button>
            </div>
            <table className="table-layout">
                <thead>
                <tr>
                    <th className="column-1">번호</th>
                    <th className="column-1">카테고리</th>
                    <th className="column-3">게시글 제목</th>
                    <th className="column-1">신고 수</th>
                    <th className="column-1">처리여부</th>
                    <th className="column-1">처리</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report, index) => (
                    <tr key={report.reportId}>
                        <td>{(currentPage - 1) * pageSize + index + 1}</td>
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
                                <span onClick={() => openReportDetailModal(report.reportId)}
                                      style={{cursor: "pointer"}}>
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
                            {report.completed !== true
                                ? <button
                                    onClick={() => processReport(report.reportId)}
                                >처리</button>
                                : <button
                                    style={{background: '#d3d3d3', cursor: 'default'}}
                                    onClick={() => e.preventDefault()}
                                >처리</button>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    이전
                </button>
                <span>
                    {totalPages !== 0
                        ? `${currentPage} / ${totalPages}`
                        : 1}
                </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    다음
                </button>
            </div>
        </div>
    );
};

export default ReportManagement;