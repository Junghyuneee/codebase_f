/*
김은지
2024 11 18
*/
import {useEffect, useState} from 'react';

import './Admin.css';
import apiClient from "@/api/apiClient.js";
import {Button, Pagination, PaginationItem, PaginationLink} from "reactstrap";
import MemberSearchModal from "@/components/auth/member/MemberSearchModal.jsx";
import {useNavigate} from "react-router-dom";

const MemberManagement = () => {
    const [members, setMembers] = useState([]);

    // 멤버 찾기
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(member){
            navigate(`/profile/${member.name}`)
        }
    }, [member, navigate]);

    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMembers = async (currentPage) => {
        try {
            const response = await apiClient.get(`/manage/member`,
                {params: { page: currentPage, size: pageSize }});
            setMembers(response.data.data);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
            setError("회원 데이터를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // 멤버 권한 변경 구현
    const changeRole = async (memberId) => {
        const userResponse = confirm("멤버 권한 변경을 진행하시겠습니까?");

        if (userResponse) {
            try {
                const response = await apiClient.post(`/manage/changeMemberRole/${memberId}`);
                alert("'" + response.data.memberName + "' " + response.data.message);
                await fetchMembers();
            } catch (error) {
                console.error("Error changing member role:", error);
                alert("권한 변경 중 오류가 발생했습니다. 다시 시도해 주세요.");
            }
        }
    };


    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <Button onClick={()=>setShow(true)}>Search Member</Button>
            <table className="table-layout">
                <thead>
                <tr>
                    <th className="column-1">번호</th>
                    <th className="column-2">이름</th>
                    <th className="column-2">이메일</th>
                    <th className="column-1">권한</th>
                    <th className="column-1">권한 변경</th>
                </tr>
                </thead>
                <tbody>
                {members.map((member, index) => (
                    <tr key={member.id}>
                        <td>{(currentPage - 1) * pageSize + index + 1}</td>
                        <td className="border-left">{member.name}</td>
                        <td className="border-left">{member.email}</td>
                        <td className="border-left">
                            {member.role === false
                                ? "user"
                                : "admin"}
                        </td>
                        <td className="border-left">
                            <button
                                onClick={() => changeRole(member.id)}
                            >변경
                            </button>
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
            <MemberSearchModal show={show} setShow={setShow} setMember={setMember}/>
        </div>
    );
};

export default MemberManagement;
