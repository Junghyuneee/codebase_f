/*banner mini
2024 11 15
배다원*/ 
import React from 'react';
import { Link } from "react-router-dom";
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

function Banner_mini() {
    return (
        <>

<Navbar className="navbar-dark bg-info" expand="lg">
            <Container>
              <NavbarBrand>
               <a href='/store' className='text-white'>CODEBASE STORE</a>
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
                    <NavLink>
                        <a href='/store' className='text-white'>상점 홈</a>
                    </NavLink>
                   
                  </NavItem>
                  <NavItem>
                    <NavLink>
                        <a href='/store/cart' className='text-white'>장바구니</a>
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>마이페이지 <i className="ni ni-tag" /></DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="navbar-primary_dropdown_1"
                      right
                    >
                      <DropdownItem>
                        <a href='/store/test' className='text-black'>테스트 페이지</a>
                      </DropdownItem>
                      <DropdownItem>
                        <a href='/store' className='text-black'>메인화면으로</a>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <a href='/store' className='text-black'>로그아웃</a>
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