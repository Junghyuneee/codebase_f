/*
김은지
2024 11 18
*/
import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from "axios"

const MemberManagement = () => {

    return (
        <div className="container mt-5">
            <h3 className="mb-4">문의사항 페이지</h3>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>제목</th>
                    <th style={{borderLeft: '1px solid #dee2e6'}}>삭제</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>홍길동</td>
                    <td>aaaa@codebase</td>
                    <th>제목</th>
                    <td style={{borderLeft: '1px solid #dee2e6'}}>
                        <Button className="btn-danger" onClick={(e) => e.preventDefault()}>삭제</Button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>홍길동</td>
                    <td>aaaa@codebase</td>
                    <th>제목</th>
                    <td style={{borderLeft: '1px solid #dee2e6'}}>
                        <Button className="btn-danger" onClick={(e) => e.preventDefault()}>삭제</Button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>홍길동</td>
                    <td>aaaa@codebase</td>
                    <th>문의 제목</th>
                    <td style={{borderLeft: '1px solid #dee2e6'}}>
                        <Button className="btn-danger" onClick={(e) => e.preventDefault()}>삭제</Button>
                    </td>
                </tr>

                </tbody>
            </Table>
        </div>
    );
};

export default MemberManagement;
