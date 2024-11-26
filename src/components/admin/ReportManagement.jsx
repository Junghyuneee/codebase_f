/*
김은지
2024 11 19
*/
import React, {useState, useEffect, Outlet} from 'react';

import '/src/components/admin/Admin.css';
import ReportModal from './ReportModal.jsx';
import apiClient from "@/api/apiClient.js";
import {useParams, useSearchParams} from "react-router-dom";

const ReportManagement = () => {
    const [reports, setReports] = useState([]);
    const [searchParams] = useSearchParams(); // url에서 파라미터 가져오기
    const rawCategory = searchParams.get("category"); // 파라미터에서 category 뽑아내기
    const [category, setCategory] = useState(null); // 백엔드로 넘길 카테고리 정보, 숫자로 정의
    useEffect(() => {
        if(!rawCategory) return;
        const updateCategory = (rawCategory) => {
            if (rawCategory === "readAll") {
                setCategory(3);
            } else if (rawCategory === "readProject") {
                setCategory(0);
            } else if (rawCategory === "readPost") {
                setCategory(1);
            } else {
                setCategory(2);
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
                const response = await apiClient.get(`/reports/${category}`);
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
                {category === 3 ? "전체 "
                : category === 0 ? "프로젝트 "
                : category === 1 ? "자유게시판 "
                : "리뷰 "}
                신고 사항 관리 페이지
            </h3>
            <table className="table-layout">
                <thead>
                    <tr>
                        <th className="column-1">번호</th>
                        <th className="column-1">이름</th>
                        <th className="column-1">카테고리</th>
                        <th className="column-3">게시글 제목</th>
                        <th className="column-3">신고 내용</th>
                        <th className="column-1">처리 여부</th>
                        <th className="column-1">처리</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.reportId}>
                            <td>{report.reportId}</td>
                            <td className="border-left">{report.memberName}</td>
                            <td className="border-left">
                                {report.category === 0
                                ? "프로젝트"
                                :report.category === 1
                                ? "자유게시판"
                                : "리뷰"}
                            </td>
                            <td className="border-left">{report.categoryTitle}</td>
                            <td className="border-left">{report.content}</td>
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