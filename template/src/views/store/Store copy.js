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


import Banner from "views/store/Banner.js";

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


function ProjectOne() {

    return (

        <section className="section bg-secondary "
            style={{
                display: 'flex',
                justifyContent: 'center', // 가로 가운데 정렬
                padding: '40px',
                maxWidth: '100vw'
            }}>
            <div style={{ marginLeft: '10%', marginRight: '10%' }}>
                <Row className="row-grid align-items-center">


                    <Col md="3">
                        <Card className="bg-white shadow border-0 card-lift--hover" style={{ position: 'relative', borderRadius: '20px', maxWidth: '300px', minHeight: '380px' }}>

                            <blockquote className="card-blockquote">
                                <CardImg style={{ borderRadius: '10px' }}
                                    alt="..."
                                    src={require("assets/img/theme/img-1-1200x1000.jpg")}
                                    top
                                />
                                <h4 className="display-4 font-weight-bold text-black"
                                    style={{
                                        display: '-webkit-box',          // Flexbox 사용
                                        WebkitBoxOrient: 'vertical',     // 세로 방향으로 정렬
                                        WebkitLineClamp: 2,              // 두 줄까지만 표시
                                        overflow: 'hidden',               // 넘치는 텍스트 숨기기
                                        textOverflow: 'ellipsis',         // 넘치는 텍스트를 ...으로 표시
                                        width: '100%',                    // 부모 폭에 맞게 설정
                                        margin: 0                         // 기본 마진 제거
                                    }}
                                >
                                    New Project DUCK'S TRIP
                                </h4>


                            </blockquote>
                            <Badge color="secondary" pill className="mr-1"
                                style={{
                                    fontSize : '14px',
                                    position: 'absolute', // 절대 위치 설정
                                    bottom: '30px',      // 하단에서 10px
                                    left: '30px'        // w좌측에서 10px
                                }}>
                                13500원
                            </Badge>
                        </Card>
                    </Col><Col md="3">
                        <Card className="bg-white shadow border-0 card-lift--hover" style={{ position: 'relative', borderRadius: '20px', maxWidth: '300px', minHeight: '380px' }}>

                            <blockquote className="card-blockquote">
                                <CardImg style={{ borderRadius: '10px' }}
                                    alt="..."
                                    src={require("assets/img/theme/img-1-1200x1000.jpg")}
                                    top
                                />
                                <h4 className="display-4 font-weight-bold text-black"
                                    style={{
                                        display: '-webkit-box',          // Flexbox 사용
                                        WebkitBoxOrient: 'vertical',     // 세로 방향으로 정렬
                                        WebkitLineClamp: 2,              // 두 줄까지만 표시
                                        overflow: 'hidden',               // 넘치는 텍스트 숨기기
                                        textOverflow: 'ellipsis',         // 넘치는 텍스트를 ...으로 표시
                                        width: '100%',                    // 부모 폭에 맞게 설정
                                        margin: 0                         // 기본 마진 제거
                                    }}
                                >
                                    연습용 프로젝트 사가실 분
                                </h4>


                            </blockquote>
                            <Badge color="secondary" pill className="mr-1"
                                style={{
                                    fontSize : '14px',
                                    position: 'absolute', // 절대 위치 설정
                                    bottom: '30px',      // 하단에서 10px
                                    left: '30px'        // w좌측에서 10px
                                }}>
                                16500원
                            </Badge>
                        </Card>
                    </Col><Col md="3">
                        <Card className="bg-white shadow border-0 card-lift--hover" style={{ position: 'relative', borderRadius: '20px', maxWidth: '300px', minHeight: '380px' }}>

                            <blockquote className="card-blockquote">
                                <CardImg style={{ borderRadius: '10px' }}
                                    alt="..."
                                    src={require("assets/img/theme/img-1-1200x1000.jpg")}
                                    top
                                />
                                <h4 className="display-4 font-weight-bold text-black"
                                    style={{
                                        display: '-webkit-box',          // Flexbox 사용
                                        WebkitBoxOrient: 'vertical',     // 세로 방향으로 정렬
                                        WebkitLineClamp: 2,              // 두 줄까지만 표시
                                        overflow: 'hidden',               // 넘치는 텍스트 숨기기
                                        textOverflow: 'ellipsis',         // 넘치는 텍스트를 ...으로 표시
                                        width: '100%',                    // 부모 폭에 맞게 설정
                                        margin: 0                         // 기본 마진 제거
                                    }}
                                >
                                    KKDUNG-For automatic message sending
                                </h4>


                            </blockquote>
                            <Badge color="secondary" pill className="mr-1"
                                style={{
                                    fontSize : '14px',
                                    position: 'absolute', // 절대 위치 설정
                                    bottom: '30px',      // 하단에서 10px
                                    left: '30px'        // w좌측에서 10px
                                }}>
                                45000원
                            </Badge>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Card className="bg-white shadow border-0 card-lift--hover" style={{ position: 'relative', borderRadius: '20px', maxWidth: '300px', minHeight: '380px' }}>

                            <blockquote className="card-blockquote">
                                <CardImg style={{ borderRadius: '10px' }}
                                    alt="..."
                                    src={require("assets/img/theme/img-1-1200x1000.jpg")}
                                    top
                                />
                                <h4 className="display-4 font-weight-bold text-black"
                                    style={{
                                        display: '-webkit-box',          // Flexbox 사용
                                        WebkitBoxOrient: 'vertical',     // 세로 방향으로 정렬
                                        WebkitLineClamp: 2,              // 두 줄까지만 표시
                                        overflow: 'hidden',               // 넘치는 텍스트 숨기기
                                        textOverflow: 'ellipsis',         // 넘치는 텍스트를 ...으로 표시
                                        width: '100%',                    // 부모 폭에 맞게 설정
                                        margin: 0                         // 기본 마진 제거
                                    }}
                                >
                                    인덱싱 자동화 프로그램 입니다.
                                </h4>


                            </blockquote>
                            <Badge color="secondary" pill className="mr-1"
                                style={{
                                    fontSize : '14px',
                                    position: 'absolute', // 절대 위치 설정
                                    bottom: '30px',      // 하단에서 10px
                                    left: '30px'        // w좌측에서 10px
                                }}>
                                무료
                            </Badge>
                        </Card>
                    </Col>



                </Row>
            </div>
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

            <Banner />


            <main ref={myInputRef} >


                <Container>
                    <section className="mt-4">
                        <Row>
                            <Col lg="5">
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-zoom-split-in" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Search"
                                        type="text"
                                        onFocus={(e) => this.setState({ searchFocused: true })}
                                        onBlur={(e) => this.setState({ searchFocused: false })}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </section>
                </Container>

                {/*mt--300을 이용해서 배너에 데이터 올리기 <section className="section section-lg pt-lg-0 mt--300">*/}
                <section className="section section-lg pt-lg-0 mt-2">

                    <Container>

                        <Row className="justify-content-center">
                            <Col lg="12">
                                <Row className="row-grid">
                                    <Col lg="4">
                                        {/*card-lift--hover 옵션 제거시 반응x */}
                                        <Card className="shadow border-0">
                                            <CardImg
                                                alt="..."
                                                src={require("assets/img/theme/img-1-1200x1000.jpg")}
                                                top
                                            />
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








            </main>

            <SimpleFooter />
        </>
    );
    //}
}

export default ProjectList;
