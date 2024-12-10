/*
김은지
2024 11 18
*/
import React, {useEffect, useState} from 'react';
import { Table, Button } from 'reactstrap';
import axios from "axios"

import './Admin.css'; // CSS 파일 가져오기

const MemberManagement = () => {
    const [members, setMembers] = useState([]);

    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async (currentPage) => {

            try {
                const response = await axios.get(`http://localhost:8080/manage/member`,
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

        fetchMembers(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // 멤버 권한 변경 구현

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h3 className="mb-3 text-center">회원 관리 페이지</h3>
            <table className="table-layout">
                <thead>
                <tr>
                    <th className="column-1">번호</th>
                    <th className="column-3">이름</th>
                    <th className="column-3">이메일</th>
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
                            <button onClick={(e) => e.preventDefault()}>권한 변경</button>
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

export default MemberManagement;
