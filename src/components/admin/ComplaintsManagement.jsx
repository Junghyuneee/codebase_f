/*
김은지
2024 11 19
*/
import React, { useState } from 'react';
import axios from "axios"

import '/src/components/admin/Admin.css';
import ComplaintModal from './ComplaintModal.jsx';

// 신고 버튼 옮기면 지우기
import {Button, Modal} from "reactstrap";

const ComplaintsManagement = () => {

    return (
        <div className="container">
            <h3 className="mb-3 text-center">신고 사항 관리 페이지</h3>
            <ComplaintModal />
            <table className="table-layout">
                <thead>
                <tr>
                    <th className="column-1">번호</th>
                    <th className="column-1">이름</th>
                    <th className="column-1">카테고리</th>
                    <th className="column-3">신고 내용</th>
                    <th className="column-1">처리 여부</th>
                    <th className="column-1">처리</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td className="border-left">홍길동</td>
                    <td className="border-left">프로젝트</td>
                    <td className="border-left">신고1</td>
                    <td className="border-left">X</td>
                    <td className="border-left">
                        <button onClick={(e) => e.preventDefault()}>처리</button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td className="border-left">홍길동</td>
                    <td className="border-left">자유게시판</td>
                    <td className="border-left">신고1</td>
                    <td className="border-left">O</td>
                    <td className="border-left">
                        <button onClick={(e) => e.preventDefault()}>처리</button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td className="border-left">홍길동</td>
                    <td className="border-left">리뷰</td>
                    <td className="border-left">신고1</td>
                    <td className="border-left">O</td>
                    <td className="border-left">
                        <button onClick={(e) => e.preventDefault()}>처리</button>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    );
};

export default ComplaintsManagement;