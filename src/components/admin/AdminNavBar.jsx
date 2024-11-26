/*
김은지
2024 11 07
*/
import React from "react";

// reactstrap components
import {
    UncontrolledCollapse,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
} from "reactstrap";
import {Link} from "react-router-dom";

function AdminNavBar() {

    return (
        <>
            <Row>
                <Col>
                    <a href="/admin">
                        <h3 className="h4 text-success text-center font-weight-bold mb-4">
                            관리자 페이지
                        </h3>
                    </a>
                    <Navbar className="navbar-dark bg-primary rounded mb-3 vh-100 align-items-start" expand="lg">
                        <Container className="flex-column align-items-start">
                            <button className="navbar-toggler" id="nav-inner-primary">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <UncontrolledCollapse navbar toggler="#nav-inner-primary">
                                <Nav className="flex-column w-100" navbar>
                                    <NavItem>
                                        <NavLink
                                            to="/admin/dashboard" tag={Link}
                                        >
                                            대시보드 <span className="sr-only">(current)</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            to="/admin/memberManagement" tag={Link}
                                        >
                                            회원관리 <span className="sr-only">(current)</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            to="/admin/questions" tag={Link}
                                        >
                                            문의사항
                                        </NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav>신고사항관리</DropdownToggle>
                                        <DropdownMenu
                                            aria-labelledby="nav-inner-primary_dropdown_1"
                                            left
                                        >
                                            <DropdownItem
                                                to="/admin/reports?category=readAll" tag={Link}
                                            >
                                                전체
                                            </DropdownItem>
                                            <DropdownItem
                                                to="/admin/reports?category=readProject" tag={Link}
                                            >
                                                프로젝트
                                            </DropdownItem>
                                            <DropdownItem
                                                to="/admin/reports?category=readPost" tag={Link}
                                            >
                                                자유게시판
                                            </DropdownItem>
                                            <DropdownItem
                                                to="/admin/reports?category=readReview" tag={Link}
                                            >
                                                리뷰
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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
