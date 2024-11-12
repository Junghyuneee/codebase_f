import React, { useEffect, useState, useRef, Outlet } from 'react';
import axios from 'axios';
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardImg,
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,

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
} from "reactstrap";


//nav 테스트
import { Link } from "react-router-dom";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Banner from './Banner';
import { ProjectCard } from "./ProjectDetail";





function Page() {
    const myInputRef = useRef(null);

    useEffect(() => {
        if (myInputRef.current) {
            myInputRef.current.focus();
        }
    }, []);

    return (
        <>
            <DemoNavbar />
            <Banner />

            <main ref={myInputRef} >

                <Container>




                    <Row>
                        <Col lg="10">

                            {ProjectCard()}


                        </Col>
                        <Col lg="2">

                           
                                <div className='section'>
                                    <Button>이미 구매함</Button>
                                    
                                </div>
                      

                        </Col>
                    </Row>
                </Container>



            </main>


        </>
    );
}
export default Page;

