
import React, { useEffect, useState, useRef } from 'react';
import { postData, useFetch } from './storeAPI';
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
import img from "../../assets/img/theme/img-1-1200x1000.jpg";
import Banner from "./Sidebar";
import ReportModal from "@/components/admin/ReportModal.jsx";
import { randomId } from "./random"
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

    const [inCart, setInCart] = useState(false);
    const [isWaitingPayment, setWaitingPayment] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState({
        status: "IDLE",
    })
    //console.log( getMemberId(), project.maker_id);
    const maker = getMemberId() == project.maker_id ? true : false;

    const purchasedResponse = apiClient(`/api/store/payment/exist/${project.id}`)
    const purchased = purchasedResponse.data;

    const handleSubmit = async (e) => {
        e.preventDefault()
        setWaitingPayment(true)
        const paymentId = randomId()
        const payment = await PortOne.requestPayment({
            storeId: VITE_STORE_ID,
            channelKey: VITE_CHANNEL_KEY,
            paymentId,
            orderName: project.title,
            totalAmount: project.price,
            currency: "KRW",
            payMethod: "CARD",
            customData: {
                project: project.id,
            },
        })
        if (payment.code != null) {
            setWaitingPayment(false)
            setPaymentStatus({
                status: "FAILED",
                message: payment.message,
            })
            return
        }
        // const completeResponse = await fetch("http://localhost:8080/api/store/payment/complete", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         paymentId: payment.paymentId,
        //         project_id: project.id,
        //         price: project.price
        //     }),
        // })
        const completeResponse = await apiClient.post("api/store/payment/complete", {
            paymentId: payment.paymentId,
            project_id: project.id,
            price: project.price
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        setWaitingPayment(false)
        if (completeResponse.ok) {
            const paymentComplete = await completeResponse.json()
            setPaymentStatus({
                status: paymentComplete.status,
            })
        } else {
            setPaymentStatus({
                status: "FAILED",
                message: await completeResponse.text(),
            })
        }
    }



    const handleClose = () =>
        setPaymentStatus({
            status: "IDLE",
        })


    function addCartItem(project) {

        let formData = new FormData();
        formData.append("title", project.title);
        formData.append("price", project.price);
        formData.append("project_id", project.id);

        postData(`/api/cart/add`, formData);

    }
    // function deleteCartItem(project) {
    //     postData(`/api/cart/delete/${project.id}`,);
    // }

    const deleteCartItem = async (project) => {
        const response = await apiClient.delete(`/api/cart/delete/${project.id}`);

    };



    // 상태를 토글하는 함수
    const toggleCart = () => {
        if (inCart) {
            //DB 삭제요청
            deleteCartItem(project);

        }
        else {
            addCartItem(project);
        }

        setInCart(!inCart); // 현재 상태를 반대로 변경
    };

    const deleteProject = async () => {
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
        if (isConfirmed) {
            const response = await apiClient.delete(`/api/project/delete/${project.id}`);
            //console.log(response.data);
            alert(response.data);

            navigate("/store");
        } else {
            console.log("삭제 취소");
            return;
        }



    }
    useEffect(() => {
        console.log("구매함? ", purchased);
        console.log(inCart);
    }, [inCart]);

    const { data, loading, error } = useFetch(`/api/cart/ciexist/${project.id}`);


    useEffect(() => {
        if (data) {
            //console.log("카트에 존재함");
            setInCart(true);
        }
    }, [data]);



    const fakePurchase = async () => {
        await apiClient.post("api/store/payment/complete", {
            paymentId: '0000',
            project_id: project.id,
            price: project.price
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    return (<>
        <div class="section">
            <Button
                size="lg"
                color="success"
                onClick={() => {
                    fakePurchase();
                }}
            >
                %%%%%%%% 구매 테스트 %%%%%%%%
            </Button>

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
                            {project.content}상세설명의 내용이 담김 줄바꿈 2줄 설정하기
                        </div>
                    </Container>
                </div>
                <div className="mt-5 py-5 border-top ">
                    <div className='p-4'>
                        <h1 className='font-weight-bold'>
                            {project.price}원
                        </h1>
                        <br />
                        <Row className='mb-2'>
                            <Col>

                                {inCart ? (
                                    <h2>
                                        <Button
                                            size="lg"
                                            color="success"
                                            onClick={() => {
                                                toggleCart();
                                                console.log(`Removed project ${project.id} from cart`);
                                            }}
                                            outline
                                            block
                                        >
                                            <i className="ni ni-cart" /> 담았음
                                        </Button>
                                    </h2>
                                ) : (
                                    <h2>
                                        <Button
                                            size="lg"
                                            color="success"
                                            onClick={() => {
                                                toggleCart();
                                                console.log(`Added project ${project.id} to cart`);
                                            }}
                                            outline
                                            block
                                        >
                                            <i className="ni ni-cart" /> 장바구니
                                        </Button>
                                    </h2>
                                )}
                            </Col>
                            <Col style={{ paddingLeft: '0' }}>

                                <form onSubmit={handleSubmit}>
                                    <Button size='lg' color='success' block><i className="ni ni-money-coins" type="submit"
                                        aria-busy={isWaitingPayment}
                                        disabled={isWaitingPayment} /> 즉시구매</Button>

                                </form>


                            </Col>

                        </Row>

                        <Row>
                            <Col>
                                <Button color='default' outline block><i className="ni ni-chat-round" /> 채팅</Button>
                            </Col>
                            <Col style={{ padding: '0' }}>
                                <Button color='default' outline block><i className="ni ni-favourite-28" /> 리뷰</Button>
                            </Col>
                            {maker ?
                                <Col><Button color='danger' outline block onClick={() => {
                                    deleteProject();
                                    console.log();
                                }}><VscChromeClose /> 삭제</Button></Col>
                                :
                                <Col>
                                    <ReportModal
                                        category={0}
                                        categoryId={project.id}
                                        categoryTitle={project.title}
                                        style={{
                                            width: '100%', padding: '0.625rem 1.25rem', fontSize: '0.875rem'
                                        }} // 여기 스타일 지정하면 신고 버튼에 적용 가능
                                    />
                                </Col>
                            }
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
    let id = url.replace("/store/", "");
    //console.log("id ", id);
    id = parseInt(id, 10);

    const { data, loading, error } = useFetch(`/api/store/${id}`);
    useEffect(() => {

        if (data) {
            setProject(data);
        }
    }, [data]); // data가 변경될 때마다 실행

    useEffect(() => {
        //console.log("아 제ㅂㄹ ", project.id);
    }, [project]);

    //const token = getAccessToken();
    //console.log("token: ", token);



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
