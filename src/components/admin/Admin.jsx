/*
김은지
2024 11 08
*/
import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminNavBar from "./AdminNavBar.jsx";
import DashboardContent from "./DashBoard.jsx";
import MemberManagement from "./MemberManagement.jsx";
import Questions from "./Questions.jsx";

function Admin() {
    return (
        <div className="mt-md ml-3 mr-3" style={{ display: 'flex', flexDirection: 'row' }}>
            <AdminNavBar  style={{ flex: 1 }}/>
            <main style={{ flex: 1 }} className="mt-4">
                <Routes>
                    <Route path="/" element={<h2>관리자 페이지에 오신 것을 환영합니다!</h2>} />
                    <Route path="/dashboard" element={<DashboardContent />} />
                    <Route path="/membermanagement" element={<MemberManagement />} />
                    <Route path="/questions" element={<Questions />} />
                </Routes>
            </main>
        </div>
    );
}

export default Admin;
