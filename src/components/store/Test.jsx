
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

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
import classnames from "classnames";
import img from "../../assets/img/theme/img-1-1200x1000.jpg";

//import Typography from "codebase/codebase_f/template/src/views/IndexSections/Typography"

import Banner from "./Banner.jsx";

export function ProjectCard(project) {

    return (

        <section className="section">
            <div class="">

                <Card className="card-profile shadow">
                    <div className="px-4">
                        <CardImg className="py-5" style={{ borderRadius: '10px' }}
                            alt="..."
                            src={img}
                            top
                        />


                        <div className="text-center mt-5">
                            <h3>
                                Jessica Jones
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
                        <div className="mt-5 py-5 border-top text-center">
                            <Row className="justify-content-center">
                                <Col lg="9">
                                    <p>
                                        An artist of considerable range, Ryan — the name taken
                                        by Melbourne-raised, Brooklyn-based Nick Murphy —
                                        writes, performs and records all of his own music,
                                        giving it a warm, intimate feel with a solid groove
                                        structure. An artist of considerable range.
                                    </p>
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        Show more
                                    </a>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>
            </div>
        </section>

    );
}

function ProjectExplain(project) {
    return (<>
        <div class="section">

            <Card className='card-profile shadow'>
                <div className="text-center mt-5">
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
                <div className="mt-5 py-5 border-top ">
                    <Row className="justify-content-center mb-5">
                        <Col lg="9">
                            <p>
                                An artist of considerable range, Ryan — the name taken
                                by Melbourne-raised, Brooklyn-based Nick Murphy —
                                writes, performs and records all of his own music,
                                giving it a warm, intimate feel with a solid groove
                                structure. An artist of considerable range.
                            </p>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                Show more
                            </a>

                        </Col>
                    </Row>


                    <div className='p-4'>
                        <h1 className='font-weight-bold'>
                            123456원
                        </h1>
                        <br />
                        <Row className='mb-2'>
                            <Col>
                                <Button size='lg' color='success' outline block> <i className="ni ni-cart" /> 장바구니</Button>
                            </Col>
                            <Col style={{ paddingLeft: '0' }}>
                                <Button size='lg' color='success' block><i className="ni ni-money-coins" /> 즉시구매</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button color='default' outline block><i className="ni ni-chat-round" /> 채팅</Button>
                            </Col>
                            <Col style={{ padding: '0' }}>
                                <Button color='default' outline block><i className="ni ni-favourite-28" /> 찜하기</Button>
                            </Col>
                            <Col>
                                <Button color='danger' outline block><i className="ni ni-tag" /> 신고</Button>
                            </Col>
                        </Row>
                    </div>

                </div>

            </Card>
        </div>

    </>
    );
}

function ProjectDetail(project) {

    return (
        <>
            <Container>
                <div className='section'>
                    <h1 className='font-weight-bold'>상세설명</h1>
                    {/*<Typography />*/}
                </div>
            </Container>
        </>
    );
}

function getProject(id) {


    const [project, setProject] = useState([]);

    useEffect(() => {
        // 데이터 가져오기
        fetch(`http://localhost:8080/api/store/project/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('데이터를 가져오는데 실패했습니다.');
                }

                return response.json();
            })
            .then((data) => {

                setProject(data);

            })
            .catch((error) => {
                console.error('API 호출 에러:', error);
            });
    }, []);

    return project;
}
function Page() {

    // 현재 페이지의 URL을 가져옵니다.
    const currentUrl = window.location.href;

    // URL 객체를 생성합니다.
    const url = new URL(currentUrl).pathname;
    console.log(url);
    const id = url.replace("/store/", "");
    console.log("id ",id);


    const project = getProject(parseInt(id, 10));
    console.log("project : ", project);

    return (
        <>

            <Banner />


            <main >
                <Container>




                    <Row>
                        <Col lg="7">

                            {ProjectCard()}


                        </Col>
                        <Col lg="5">

                            {ProjectExplain()}

                        </Col>
                    </Row>
                </Container>

                {ProjectDetail()}

            </main>


        </>
    );
    //}
}

export default Page;
