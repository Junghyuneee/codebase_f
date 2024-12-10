/*banner mini
2024 11 15
배다원*/
import React from 'react';

import {useNavigate, Link } from "react-router-dom";
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

import img from "../../assets/img/brand/argon-react.png";
import {postSignOut} from "@/api/auth/auth.js";


function Banner_mini() {
    const navigate = useNavigate();
    return (
        <>

            <Navbar className="navbar-dark bg-info pt-7" expand="lg">
                <Container>
                    <NavbarBrand href="/store">
                        CODEBASE
                    </NavbarBrand>
                    <button className="navbar-toggler" id="navbar-primary">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <UncontrolledCollapse navbar toggler="#navbar-primary">
                        <div className="navbar-collapse-header">
                            <Row>
                                <Col className="collapse-brand" xs="6">
                                    <Link to="/">
                                        <img
                                            alt="..."
                                            src={img}
                                        />
                                    </Link>
                                </Col>
                                <Col className="collapse-close" xs="6">
                                    <button className="navbar-toggler" id="navbar-primary">
                                        <span />
                                        <span />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav className="ml-lg-auto" navbar>
                            <NavItem>
                                <NavLink href="/store">
                                    상점 홈 <span className="sr-only">(current)</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/store/cart">
                                    장바구니
                                </NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>마이페이지 <i className="ni ni-tag" /></DropdownToggle>
                                <DropdownMenu
                                    aria-labelledby="navbar-primary_dropdown_1"
                                    right
                                >
                                    <DropdownItem
                                        href="/store/test"
                                        
                                    >
                                        테스트페이지
                                    </DropdownItem>
                                    <DropdownItem
                                        
                                        onClick={() => navigate("/login")}
                                        
                                    >
                                        로그인
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem
                                        
                                        onClick={postSignOut}
                                        
                                    >
                                        로그아웃
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>


        </>
    );
}

export default Banner_mini;