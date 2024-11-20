/*
김은지
2024 11 18
*/
import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from "axios"

import './Admin.css'; // CSS 파일 가져오기

const MemberManagement = () => {

    return (
        <div className="container">
            <h3 className="mb-3 text-center">문의 사항 관리 페이지</h3>
            <table className="table-layout">
                <thead>
                <tr>
                    <th className="column-1">번호</th>
                    <th className="column-1">이름</th>
                    <th className="column-1">이메일</th>
                    <th className="column-3">문의 제목</th>
                    <th className="column-1">삭제</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td className="border-left">홍길동</td>
                    <td className="border-left">aaaa@codebase</td>
                    <td className="border-left">제목1</td>
                    <td className="border-left">
                        <button onClick={(e) => e.preventDefault()}>삭제</button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td className="border-left">홍길동</td>
                    <td className="border-left">aaaa@codebase</td>
                    <td className="border-left">제목1</td>
                    <td className="border-left">
                        <button onClick={(e) => e.preventDefault()}>삭제</button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td className="border-left">홍길동</td>
                    <td className="border-left">aaaa@codebase</td>
                    <td className="border-left">제목1</td>
                    <td className="border-left">
                        <button onClick={(e) => e.preventDefault()}>삭제</button>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    );
};

export default MemberManagement;
