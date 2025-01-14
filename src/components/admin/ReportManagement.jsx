/*
김은지
2024 11 19
*/
import {useState, useEffect} from 'react';

import '/src/components/admin/Admin.css';
import {Link, useLocation, useSearchParams} from "react-router-dom";
import axios from "axios";
import ReportDetailModal from "@/components/admin/ReportDetailModal.jsx";
import {Button, Pagination, PaginationItem, PaginationLink} from "reactstrap";
import apiClient from "@/api/apiClient.js";
import {Dropdown} from "react-bootstrap";

const ReportManagement = () => {
    const [isHoveredAll, setIsHoveredAll] = useState(false); // 카테고리 버튼 스타일 지정
    const [isHoveredProject, setIsHoveredProject] = useState(false);
    const [isHoveredPost, setIsHoveredPost] = useState(false);
    const [isHoveredComment, setIsHoveredComment] = useState(false);
    const [isHoveredReview, setIsHoveredReview] = useState(false);

    // 신고 처리별 분류
    const [processOption, setProcessOption] = useState('전체')

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
                const response = await apiClient.get(`/reports/read/${category}`,
                    {params: {page: currentPage, size: pageSize}});
                const processOptionData = response.data.data.filter((item) => {
                    if(processOption === "전체") return true;
                    else if(processOption === "처리함") return item.completed === true;
                    else return item.completed === false;
                })
                setReports(processOptionData);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
                setError("신고 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports(currentPage);
    }, [category, currentPage, processOption]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const processReport = (reportId) => {
        const userResponse = confirm("신고 처리를 진행하시겠습니까?");

        if (userResponse) {
            const response = apiClient.post(`/reports/process/${reportId}`);
            alert("'" + response.data.title + "'" + response.data.message)
        }
    }

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <div className='mb-1 d-flex justify-content-between'>
                <span>
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
                </span>
                <span>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="light"
                                         style={{
                                             backgroundColor: 'gray',
                                             color: "white",
                                             margin: '0px'
                                         }}>
                            <span className="mr-2">{processOption}</span>
                            <span>&#9660;</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        {['전체', '처리함', '처리안함'].map(option => (
                            <Dropdown.Item
                                key={option}
                                onClick={() => {
                                    setProcessOption(option);
                                    setCurrentPage(1);
                                }}
                            >
                                {option}
                            </Dropdown.Item>
                        ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </span>
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
            <nav aria-label="Page navigation example">
                <Pagination className="pagination justify-content-center">
                    <PaginationItem disabled={currentPage === 1}>
                        {/* 이전 페이지지 */}
                        <PaginationLink
                            onClick={() => handlePageChange(currentPage - 1)}
                            previous
                        />
                    </PaginationItem>
                    {(() => {
                        const totalNumbersToShow = 10; // 최대 표시할 페이지 수
                        const half = Math.floor(totalNumbersToShow / 2); // 앞뒤로 나눌 개수
                        let start = Math.max(currentPage - half, 1); // 시작 페이지
                        let end = Math.min(currentPage + half, totalPages); // 끝 페이지

                        // Adjust start and end if there aren't enough pages at the beginning or end
                        if (currentPage <= half) {
                            start = 1;
                            end = Math.min(totalNumbersToShow, totalPages);
                        } else if (currentPage + half > totalPages) {
                            start = Math.max(totalPages - totalNumbersToShow + 1, 1);
                            end = totalPages;
                        }

                        const pageNumbers = [];
                        if (start > 1) pageNumbers.push(1); // 항상 첫 번째 페이지 표시
                        if (start > 2) pageNumbers.push("..."); // 앞부분 생략 표시

                        for (let i = start; i <= end; i++) {
                            pageNumbers.push(i);
                        }

                        if (end < totalPages - 1) pageNumbers.push("..."); // 뒷부분 생략 표시
                        if (end < totalPages) pageNumbers.push(totalPages); // 항상 마지막 페이지 표시

                        return pageNumbers.map((number, index) => (
                            <PaginationItem
                                key={index} // "..." 같은 중복 요소를 허용하기 위해 index 사용
                                active={number === currentPage}
                                disabled={number === "..."} // "..."는 클릭되지 않도록 처리
                            >
                                {number === "..." ? (
                                    <PaginationLink disabled>{number}</PaginationLink>
                                ) : (
                                    <PaginationLink onClick={() => handlePageChange(number)}>
                                        {number}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ));
                    })()}
                    <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink
                            onClick={() => handlePageChange(currentPage + 1)}
                            next
                        />
                    </PaginationItem>
                </Pagination>
            </nav>
        </div>
    );
};

export default ReportManagement;