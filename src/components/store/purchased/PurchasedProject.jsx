import React, { useEffect, useState, useRef } from 'react';
import { postData, useFetch } from '../storeAPI';
import { getMemberId } from "@/api/auth/getset.js";
import { useNavigate } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";

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
    NavLink,
    Nav,
} from "reactstrap";

import Banner from "../Sidebar";
import ReportModal from "@/components/admin/ReportModal.jsx";
import { randomId } from "../random"
const { VITE_STORE_ID, VITE_CHANNEL_KEY } = import.meta.env
import PortOne from "@portone/browser-sdk/v2"
import apiClient from '@/api/apiClient';


export function ProjectCard({ project }) {


    return (

        <section className="section">
            <div class="">

                <Card className="card-profile shadow">
                    <div className="px-4">
                        <CardImg className="py-5" style={{ borderRadius: '10px', width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
                            alt="..."
                            src={`${import.meta.env.VITE_APP_AWS_BUCKET}/${project.img}`}
                            top
                        />

                        <div className="text-center mt-5 mb-5">
                            <h3>

                                {project.title}

                            </h3>
                            <div className="h6 font-weight-300">
                                <i className="ni location_pin mr-2" />
                                제작자 : {project.username}
                            </div>

                        </div>

                    </div>
                </Card>
                <a href={`${import.meta.env.VITE_APP_AWS_BUCKET}/${project.img}`}>
                    <button>이미지</button>
                </a>

            </div>
        </section>

    );
}





function ProjectExplain({ project }) {

    const navigate = useNavigate();


    return (<>
        <div class="section">
           

            <Card className='card-profile shadow'>
                <div className=" mt-5">
                    <h3 className='text-center'>
                        {/*project.title*/}


                    </h3>
                    <div className="text-center h6 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        제작자 : {project.username}
                    </div>
                    <div className="h6 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />

                    </div>
                    <Container>
                        <div>
                            <i className="ni education_hat mr-2" />
                            {project.content}
                        </div>
                    </Container>
                </div>
                <div className="mt-5 py-5 border-top ">
                    <div className='p-4'>
                        <h1 className='font-weight-bold'>
                            구매 함
                        </h1>
                        <br />
                        <Row className='mb-2'>
                            <Col>
                            <Button
                                            size="lg"
                                            color="success"
                                            onClick={() => {
                                              
                                            }}
                                            outline
                                            block
                                        >
                                            <i className="ni ni-cart" /> 내려받기
                                        </Button>

                               
                            </Col>


                        </Row>

                        <Row>
                            <Col>
                                <Button color='default' outline block><i className="ni ni-chat-round" /> 채팅</Button>
                            </Col>
                            <Col style={{ padding: '0' }}>
                                <Button color='default' outline block><i className="ni ni-favourite-28" /> 리뷰</Button>
                            </Col>
                            <Col><Button color='danger' outline block onClick={() => {
                                    
                                    console.log();
                                }}><VscChromeClose /> 삭제 </Button></Col>
                        </Row>
                    </div>

                </div>

            </Card>
        </div>

    </>
    );
}

function ProjectDetail({ project }) {

    return (
        <>
            <Container>
                <div className='section'>
                    <h1 className='font-weight-bold'>상세설명</h1>
                    <hr />
                    <h3>{project.content}</h3>
                </div>
            </Container>
        </>
    );
}





function Page() {

    const [project, setProject] = useState({}); // 데이터 상태

    // 현재 페이지의 URL을 가져옵니다.
    const currentUrl = window.location.href;
    // URL 객체를 생성합니다.
    const url = new URL(currentUrl).pathname;
    let id = url.replace("/store/purchase/", "");
    //console.log("id ", id);
    id = parseInt(id, 10);
    console.log(id);
    const { data, loading, error } = useFetch(`/api/u/store/projectorder/myproject/${id}`);
    useEffect(() => {
        console.log(data);
        if (data) {
           
            setProject(data);
            console.log(project);
        }
    }, [data]); // data가 변경될 때마다 실행

    useEffect(() => {
        
    }, [project]);




    return (
        <>

            <section className="section section-lg section-shaped my-0">
                {/* Circles background */}
                <div className="shape shape-style-1 shape-default">
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


            <main >

                 <Container>
                
                
                
                
                                    <Row>
                                        <Col lg="7">
                                            {loading && <p>Loading...</p>}
                                            {!loading &&
                                                <ProjectCard project={project} />}
                
                
                
                
                                        </Col>
                                        <Col lg="5">
                
                                            {/* {ProjectExplain(project)} */}
                                            {loading && <p>Loading...</p>}
                                            {!loading &&
                                                <ProjectExplain project={project} />}
                
                                        </Col>
                                    </Row>
                                </Container>
                
                                {/* {ProjectDetail(project)} */}
                                {loading && <p>Loading...</p>}
                                {!loading &&
                                    <ProjectDetail project={project} />}

            </main>

            <Banner />
        </>
    );
    //}
}

export default Page;
