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

function CartItem() {
    return (<>

        <div className='section'>
            <Button>전체삭제</Button>
            <Card className='card shadow'>
                <blockquote className="card-blockquote">
                </blockquote>
            </Card>
            <Card className='card shadow'>

                <div className='p-2'>
                
                    <Row>
                        <Col xs="3" sm="3" lg="2" xl="2" >
                            <img
                                alt="..."
                                className="img-fluid rounded"
                                src={require("assets/img/theme/team-3-800x800.jpg")}
                                style={{ width: "150px" }}
                            />
                        </Col>
                        <Col  xs="5" sm="5" lg="6" xl="6">
                            <small className="d-block text-uppercase font-weight-bold">
                                Raised
                            </small>
                        </Col>
                        <Col  xs="3" sm="3" lg="3" xl="3">
                            <small className="d-block text-uppercase font-weight-bold mt-5">
                                값
                            </small>
                        </Col>
                        <Col  xs="1" sm="1" lg="1" xl="1" className='p-0'>
                            <Badge className='text-red'>X</Badge>
                        </Col>
                    </Row>
                 </div>
                
            </Card>

            <Card className='card shadow'>
                <blockquote className="card-blockquote">

                </blockquote>
            </Card>
        </div>


    </>);

}

function Invoice() {
    return (<>

        <div className='section'>
            <Card className='card shadow'>
                <blockquote className="card-blockquote">
                    <div className=" mt-5">
                        <h3>
                            Jessica Jones{" "}
                            <span className="font-weight-light">, 27</span>
                        </h3>
                        <div className="h6 font-weight-300">
                            <i className="ni location_pin mr-2" />
                            Bucharest, Romania
                        </div>
                        <div className="h6 mt-4">
                            <i className="ni business_briefcase-24 mr-2" />
                            Solution Manager - Creative Tim Officer
                        </div>
                        <div>
                            <i className="ni education_hat mr-2" />
                            University of Computer Science
                        </div>
                        

                    </div>
                    <Button>찜</Button>
                    <Button>구매</Button>
                    <Button>신고</Button>
                </blockquote>
            </Card>
        </div>

    </>);

}



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
                        <Col lg="8">


                            {CartItem()}

                        </Col>
                        <Col lg="4">


                            {Invoice()}


                        </Col>
                    </Row>
                </Container>



            </main>


        </>
    );
}
export default Page;

