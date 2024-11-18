/*
김은지
2024 11 18
*/
import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from "axios"

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
        <div className="container mt-5">
            <h3 className="mb-4">회원 관리 페이지</h3>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>이메일</th>
                    <th style={{borderLeft: '1px solid #dee2e6'}}>삭제</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>홍길동</td>
                    <td>aaaa@codebase</td>
                    <td style={{borderLeft: '1px solid #dee2e6'}}>
                        <Button className="btn-danger" onClick={(e) => e.preventDefault()}>삭제</Button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>홍길동</td>
                    <td>aaaa@codebase</td>
                    <td style={{borderLeft: '1px solid #dee2e6'}}>
                        <Button className="btn-danger" onClick={(e) => e.preventDefault()}>삭제</Button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>홍길동</td>
                    <td>aaaa@codebase</td>
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
