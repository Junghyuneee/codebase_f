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
                padding: '0px',
                maxWidth: '100vw'
            }}>

                
            <div style={{ marginLeft: '10%', marginRight: '10%'}}>
            
                <Row className="row-grid align-items-center">


                <Col md="3" style={{padding : '0'}}>
                        <Card className="bg-white shadow border-0 card-lift--hover" style={{ position: 'relative', borderRadius: '20px', maxWidth: '400px', maxHeight: '500px', margin : '10px'}}>

                            <blockquote className="card-blockquote p-4">
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
                                <br/><br/>


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
                    </Col>
                    <Col md="3" style={{padding : '0'}}>
                        <Card className="bg-white shadow border-0 card-lift--hover" style={{ position: 'relative', borderRadius: '20px', maxWidth: '400px', maxHeight: '500px', margin : '10px'}}>

                            <blockquote className="card-blockquote p-4">
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
                                <br/><br/>


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
                    </Col>
                    <Col md="3" style={{padding : '0'}}>
                        <Card className="bg-white shadow border-0 card-lift--hover" style={{ position: 'relative', borderRadius: '20px', maxWidth: '400px', maxHeight: '500px', margin : '10px'}}>

                            <blockquote className="card-blockquote p-4">
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
                                <br/><br/>


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
                    </Col>
                    <Col md="3" style={{padding : '0'}}>
                        <Card className="bg-white shadow border-0 card-lift--hover" style={{ position: 'relative', borderRadius: '20px', maxWidth: '400px', maxHeight: '500px', margin : '10px'}}>

                            <blockquote className="card-blockquote p-4">
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
                                <br/><br/>


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
                    </Col>
                    <Col md="3" style={{padding : '0'}}>
                        <Card className="bg-white shadow border-0 card-lift--hover" style={{ position: 'relative', borderRadius: '20px', maxWidth: '400px', maxHeight: '500px', margin : '10px'}}>

                            <blockquote className="card-blockquote p-4">
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
                                <br/><br/>


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
                    </Col>
                    <Col md="3" style={{padding : '0'}}>
                        <Card className="bg-white shadow border-0 card-lift--hover" style={{ position: 'relative', borderRadius: '20px', maxWidth: '400px', maxHeight: '500px', margin : '10px'}}>

                            <blockquote className="card-blockquote p-4">
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
                                <br/><br/>


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
                


                <Navbar className="navbar-light bg-info " expand="lg">


            <Container>
              <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                Danger Color
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar-danger">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar-danger">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/argon-react.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar-danger">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-facebook-square" />
                      <span className="nav-link-inner--text d-lg-none">
                        Facebook
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-twitter" />
                      <span className="nav-link-inner--text d-lg-none">
                        Twitter
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-google-plus" />
                      <span className="nav-link-inner--text d-lg-none">
                        Google +
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-instagram" />
                      <span className="nav-link-inner--text d-lg-none">
                        Instagram
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>




                
                {ProjectOne()}
                {ProjectOne()}








            </main>

            <SimpleFooter />
        </>
    );
    //}
}

export default ProjectList;
