/*
김은지
2024 11 08
*/
import {Routes, Route, Link, useNavigate} from "react-router-dom";

import AdminNavBar from "./AdminNavBar.jsx";
import DashboardContent from "./DashBoard.jsx";
import MemberManagement from "./MemberManagement.jsx";
import ReportManagement from "./ReportManagement.jsx";
import NavigationBar from "@/components/Navbars/NavigationBar.jsx";
import {Container} from "reactstrap";
import Questions from "./Questions.jsx";
import {isAdmin} from "@/components/admin/isAdmin.js";
import {useEffect} from "react";
import {getAccessToken} from "@/api/auth/getset.js";

function Admin() {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            alert("관리자 계정으로 로그인하세요.");
            if(!getAccessToken()) navigate('/login'); // 로그인 X, 로그인 페이지로 이동
            else navigate('/') // 로그인 O, 메인 페이지로 이동
        }
    }, [isAdmin, navigate]);

    return (
        <>
            <div className="position-relative">
                <section className="section section-shaped my-0"
                        style={{marginRight: 'auto', marginLeft: 'auto'}}>
                    {/* Circles background */}
                    <div className="shape shape-style-1 shape-default">
                        <span/>
                        <span/>
                    </div>
                    <NavigationBar/>
                    <Link to="/admin">
                        <h2
                             style={{
                                 backgroundColor: '',
                                 position: 'absolute',
                                 bottom: 'auto',
                                 width: '100%',
                                 textAlign: 'center',
                                 color: 'white'
                             }}>
                            관리자 페이지
                        </h2>
                    </Link>
                </section>
            </div>
            <Container style={{padding: '0px', paddingTop: '10px'}}>
                <div className="ml-3 mr-3" style={{display: 'flex', flexDirection: 'row'}}>
                    <AdminNavBar style={{flex: 1}}/>
                    <main style={{flex: 1}}>
                        <Routes>
                            <Route path="/" element={<h2>관리자 페이지에 오신 것을 환영합니다!</h2>}/>
                            <Route path="/dashboard" element={<DashboardContent/>}/>
                            <Route path="/membermanagement" element={<MemberManagement/>}/>
                            <Route path="/questions" element={<Questions/>}/>
                            <Route path="/reports" element={<ReportManagement/>}/>
                        </Routes>
                    </main>
                </div>
            </Container>


        </>
    );
}

export default Admin;
