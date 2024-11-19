/*
김은지
2024 11 18
*/
import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from "axios"

import './Admin.css'; // CSS 파일 가져오기

const MemberManagement = () => {
    // const [members, setMembers] = useState([]);
    // const [name, setName] = useState('');
    //
    // const addMember = () => {
    //     if (name) {
    //         setMembers([...members, { id: members.length + 1, name }]);
    //         setName('');
    //     }
    // };
    //
    // const deleteMember = (id) => {
    //     setMembers(members.filter(member => member.id !== id));
    // };

    return (
        <div className="container">
            <h3 className="mb-3 text-center">회원 관리 페이지</h3>
            <table className="table-layout">
                <thead>
                <tr>
                    <th className="column-1">번호</th>
                    <th className="column-1">이름</th>
                    <th className="column-3">이메일</th>
                    <th className="column-1">삭제</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td className="border-left">홍길동</td>
                    <td className="border-left">aaaa@codebase</td>
                    <td className="border-left">
                        <button onClick={(e) => e.preventDefault()}>삭제</button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td className="border-left">홍길동</td>
                    <td className="border-left">aaaa@codebase</td>
                    <td className="border-left">
                        <button onClick={(e) => e.preventDefault()}>삭제</button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td className="border-left">홍길동</td>
                    <td className="border-left">aaaa@codebase</td>
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
