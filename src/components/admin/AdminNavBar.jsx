/*
김은지
2024 11 07
*/

// reactstrap components
import {
    UncontrolledCollapse,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
} from "reactstrap";
import {Link, useLocation} from "react-router-dom";

function AdminNavBar() {
    const location = useLocation();

    return (
        <>
            <Row>
                <Col>
                    <Navbar className="navbar-dark bg-primary rounded mb-3 vh-100 align-items-start"
                            style={{padding: '0', paddingTop: '10px'}} expand="lg">
                        <Container className="flex-column align-items-start"  >
                            <button className="navbar-toggler" id="nav-inner-primary">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <UncontrolledCollapse navbar toggler="#nav-inner-primary">
                                <Nav className="flex-column" navbar>
                                    <NavItem style={{margin: '0'}}>
                                        <NavLink
                                            to="/admin/dashboard" tag={Link}
                                            className="text-center"
                                            style={{
                                                width: 'inherit',
                                                fontWeight: location.pathname === "/admin/dashboard" ? "bold" : "normal",
                                                color: location.pathname === "/admin/dashboard" ? "black" : "white",
                                                textDecoration: location.pathname === "/admin/dashboard" ? "underline" : "none",
                                                backgroundColor: location.pathname === "/admin/dashboard" ? "white" : "inherit"
                                            }}
                                        >
                                            대시보드
                                        </NavLink>
                                    </NavItem>
                                    <NavItem style={{margin: '0'}}>
                                        <NavLink
                                            to="/admin/memberManagement" tag={Link}
                                            className="text-center"
                                            style={{
                                                width: 'inherit',
                                                fontWeight: location.pathname === "/admin/memberManagement" ? "bold" : "normal",
                                                color: location.pathname === "/admin/memberManagement" ? "black" : "white",
                                                textDecoration: location.pathname === "/admin/memberManagement" ? "underline" : "none",
                                                backgroundColor: location.pathname === "/admin/memberManagement" ? "white" : "inherit"
                                            }}
                                        >
                                            회원관리
                                        </NavLink>
                                    </NavItem>
                                    <NavItem style={{margin: '0'}}>
                                        <NavLink
                                            to="/admin/questions" tag={Link}
                                            className="text-center"
                                            style={{
                                                width: 'inherit',
                                                fontWeight: location.pathname === "/admin/questions" ? "bold" : "normal",
                                                color: location.pathname === "/admin/questions" ? "black" : "white",
                                                textDecoration: location.pathname === "/admin/questions" ? "underline" : "none",
                                                backgroundColor: location.pathname === "/admin/questions" ? "white" : "inherit"
                                            }}
                                        >
                                            문의사항
                                        </NavLink>
                                    </NavItem>
                                    <NavItem style={{margin: '0'}}>
                                        <NavLink
                                            to="/admin/reports?category=readAll" tag={Link}
                                            className="text-center"
                                            style={{
                                                width: 'inherit',
                                                fontWeight: location.pathname === "/admin/reports" ? "bold" : "normal",
                                                color: location.pathname === "/admin/reports" ? "black" : "white",
                                                textDecoration: location.pathname === "/admin/reports" ? "underline" : "none",
                                                backgroundColor: location.pathname === "/admin/reports" ? "white" : "inherit"
                                            }}
                                        >
                                            게시글 신고
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </UncontrolledCollapse>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
        </>
    );
}



export default AdminNavBar;
