/*
김은지
2024 11 18
*/
import React, {useEffect, useState} from 'react';
import axios from "axios"

import './Admin.css';

const MemberManagement = () => {
    const [members, setMembers] = useState([]);

    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                const response = await axios.post(`http://localhost:8080/manage/changeMemberRole/${memberId}`);
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
                            >변경</button>
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
