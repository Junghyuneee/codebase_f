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

function AdminNavBar() {

        return (
            <>
                <Row>
                    <Col>
                        <a href="/codebase_f/src/components/admin/Admin"><h3 className="h4 text-success text-center font-weight-bold mb-4">관리자 페이지</h3></a>
                        <Navbar className="navbar-dark bg-primary rounded mb-3 vh-100 align-items-start" expand="lg">
                            <Container className="flex-column align-items-start">
                                <button className="navbar-toggler" id="nav-inner-primary">
                                    <span className="navbar-toggler-icon"/>
                                </button>
                                <UncontrolledCollapse navbar toggler="#nav-inner-primary">
                                    <Nav className="flex-column w-100" navbar>
                                        <NavItem>
                                            <NavLink
                                                href="/admin/dashboard"
                                            >
                                                대시보드 <span className="sr-only">(current)</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="/admin/membermanagement"
                                            >
                                                회원관리 <span className="sr-only">(current)</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="/admin/questions"
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
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    프로젝트
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    자유게시판
                                                </DropdownItem>
                                                <DropdownItem
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
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
