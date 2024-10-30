/*배다원 
2024 10 30
*/

import React, { useEffect, useState, useRef } from 'react';
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
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

//함수명 첫글자 대문자
function GetStuff() {

    //상태변수
    const [stuffs, setStuffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 데이터 받기
    useEffect(() => {
        axios.get('http://localhost:8080/getprojectlist') // 백엔드의 API 엔드포인트
            .then(response => {
                setStuffs(response.data); // 데이터를 상태 변수에 저장
                setLoading(false); // 로딩 상태를 false로 변경
            })
            .catch(error => {
                setError(error); // 에러가 발생하면 에러 상태로 저장
                setLoading(false); // 로딩 상태를 false로 변경
            });
    }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행

    // 로딩 중일 때
    if (loading) {
        return <p>Loading...</p>;
    }

    // 에러가 발생했을 때
    if (error) {
        return <p>Error occurred: {error.message}</p>;
    }

    return (
        <div>
            <h1>Stuff List</h1>
            <ul>
                {/* 화면에 표시 */}
                {stuffs.map(stuff => (
                    <li key={stuff.id}>{stuff.name}</li>
                ))}
            </ul>
        </div>
    );
}


function ProjectOne(){

    return(

        <section className="section bg-secondary">
            <Container>
              <Row className="row-grid align-items-center">
                <Col md="4">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/theme/img-1-1200x1000.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-bg"
                        preserveAspectRatio="none"
                        viewBox="0 0 583 95"
                      >
                        <polygon
                          className="fill-default"
                          points="0,52 583,95 0,95"
                        />
                        <polygon
                          className="fill-default"
                          opacity=".2"
                          points="0,42 583,95 683,0 0,95"
                        />
                      </svg>
                      <h4 className="display-3 font-weight-bold text-white">
                        Design System
                      </h4>
                      <p className="lead text-italic text-white">
                        The Arctic Ocean freezes every winter and much of the
                        sea-ice then thaws every summer, and that process will
                        continue whatever happens.
                      </p>
                    </blockquote>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/theme/img-1-1200x1000.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-bg"
                        preserveAspectRatio="none"
                        viewBox="0 0 583 95"
                      >
                        <polygon
                          className="fill-default"
                          points="0,52 583,95 0,95"
                        />
                        <polygon
                          className="fill-default"
                          opacity=".2"
                          points="0,42 583,95 683,0 0,95"
                        />
                      </svg>
                      <h4 className="display-3 font-weight-bold text-white">
                        Design System
                      </h4>
                      <p className="lead text-italic text-white">
                        The Arctic Ocean freezes every winter and much of the
                        sea-ice then thaws every summer, and that process will
                        continue whatever happens.
                      </p>
                    </blockquote>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/theme/img-1-1200x1000.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-bg"
                        preserveAspectRatio="none"
                        viewBox="0 0 583 95"
                      >
                        <polygon
                          className="fill-default"
                          points="0,52 583,95 0,95"
                        />
                        <polygon
                          className="fill-default"
                          opacity=".2"
                          points="0,42 583,95 683,0 0,95"
                        />
                      </svg>
                      <h4 className="display-3 font-weight-bold text-white">
                        Design System
                      </h4>
                      <p className="lead text-italic text-white">
                        The Arctic Ocean freezes every winter and much of the
                        sea-ice then thaws every summer, and that process will
                        continue whatever happens.
                      </p>
                    </blockquote>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>

    );
}

function ProjectList() {

    //ref 대체
    const myInputRef = useRef(null);  // useRef 훅 사용

    useEffect(() => {
        // 컴포넌트가 마운트된 후 포커스를 입력 필드에 설정
        if (myInputRef.current) {
            myInputRef.current.focus();
        }
    }, []);


    //render() {
    return (
        <>
            <DemoNavbar />


                

            <main ref={myInputRef} >
                <section className="section-profile-cover section-shaped my-0">
                    {/* Circles background */}
                    <div className="shape shape-style-1 shape-default alpha-4">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    {/* SVG separator */}
                    <div className="separator separator-bottom separator-skew">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="fill-white"
                                points="2560 0 2560 100 0 100"
                            />
                        </svg>
                    </div>
                </section>


                



                <section className="section section-lg pt-lg-0 mt--200">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg="12">
                                <Row className="row-grid">
                                    <Col lg="4">
                                        <Card className="card-lift--hover shadow border-0">
                                            <CardBody className="py-5">
                                                <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                                                    <i className="ni ni-check-bold" />
                                                </div>
                                                <h6 className="text-primary text-uppercase">
                                                    Download Argon
                                                </h6>
                                                <p className="description mt-3">
                                                    Argon is a great free UI package based on Bootstrap
                                                    4 that includes the most important components and
                                                    features.
                                                </p>
                                                <div>
                                                    <Badge color="primary" pill className="mr-1">
                                                        design
                                                    </Badge>
                                                    <Badge color="primary" pill className="mr-1">
                                                        system
                                                    </Badge>
                                                    <Badge color="primary" pill className="mr-1">
                                                        creative
                                                    </Badge>
                                                </div>
                                                <Button
                                                    className="mt-4"
                                                    color="primary"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Learn more
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="4">
                                        <Card className="card-lift--hover shadow border-0">
                                            <CardBody className="py-5">
                                                <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                                    <i className="ni ni-istanbul" />
                                                </div>
                                                <h6 className="text-success text-uppercase">
                                                    Build Something
                                                </h6>
                                                <p className="description mt-3">
                                                    Argon is a great free UI package based on Bootstrap
                                                    4 that includes the most important components and
                                                    features.
                                                </p>
                                                <div>
                                                    <Badge color="success" pill className="mr-1">
                                                        business
                                                    </Badge>
                                                    <Badge color="success" pill className="mr-1">
                                                        vision
                                                    </Badge>
                                                    <Badge color="success" pill className="mr-1">
                                                        success
                                                    </Badge>
                                                </div>
                                                <Button
                                                    className="mt-4"
                                                    color="success"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Learn more
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="4">
                                        <Card className="card-lift--hover shadow border-0">
                                            <CardBody className="py-5">
                                                <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                                                    <i className="ni ni-planet" />
                                                </div>
                                                <h6 className="text-warning text-uppercase">
                                                    Prepare Launch
                                                </h6>
                                                <p className="description mt-3">
                                                    Argon is a great free UI package based on Bootstrap
                                                    4 that includes the most important components and
                                                    features.
                                                </p>
                                                <div>
                                                    <Badge color="warning" pill className="mr-1">
                                                        marketing
                                                    </Badge>
                                                    <Badge color="warning" pill className="mr-1">
                                                        product
                                                    </Badge>
                                                    <Badge color="warning" pill className="mr-1">
                                                        launch
                                                    </Badge>
                                                </div>
                                                <Button
                                                    className="mt-4"
                                                    color="warning"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Learn more
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>


                            {GetStuff()}

                        </Row>
                    </Container>
                </section>


                
                




                



                {ProjectOne()}
                {ProjectOne()}
                {ProjectOne()}
                {ProjectOne()}
                {ProjectOne()}


                




            </main>

            <SimpleFooter />
        </>
    );
    //}
}

export default ProjectList;
