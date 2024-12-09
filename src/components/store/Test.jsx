
import React, { useEffect, useState, useRef } from 'react';
import { getData, postData } from './storeAPI';
import { getAccessToken } from "@/api/auth/getset.js";

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
import ReportModal from "@/components/admin/ReportModal.jsx";




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
            </div>
        </section>

    );
}

function existCart(id) {
    const data = getData(`/cart/ciexist/${id}`);
    console.log("asdfasdfas", data);
    if (data == "") {
        return false;
    }
    else {
        return true;
    }
}



function ProjectExplain(project) {

    const [inCart, setInCart] = useState(false);

    
    // 상태를 토글하는 함수
    const toggleCart = () => {
        setInCart(!inCart); // 현재 상태를 반대로 변경
    };

   

    function addCartItem(project) {

        let formData = new FormData();
        formData.append("title", project.title);
        formData.append("price", project.price);
        formData.append("project_id", project.id);
    
        postData(`/cart/add`, formData);
        toggleCart();
    
    }



    return (<>
        <div class="section">

            <Card className='card-profile shadow'>
                <div className=" mt-5">
                    <h3 className='text-center'>
                        {project.title}


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
                                <Button size='lg' color='success' outline block> <i className="ni ni-cart" /> 장바구니</Button>
                                {/* {existCart(project.id) &&
                                    <h2>
                                        <Button size='lg' color='success' onClick={() => addCartItem(project)} outline block> <i className="ni ni-cart" /> 담았음</Button>

                                    </h2>
                                }
                                {!existCart(project.id) &&
                                    <h2>
                                        <Button size='lg' color='success' onClick={() => addCartItem(project)} outline block> <i className="ni ni-cart" /> 장바구니</Button>

                                    </h2>
                                } */}


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
                                <Button size='lg' color='success' block><i className="ni ni-money-coins" /> 즉시구매</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button color='default' outline block><i className="ni ni-chat-round" /> 채팅</Button>
                            </Col>
                            <Col style={{ padding: '0' }}>
                                <Button color='default' outline block><i className="ni ni-favourite-28" /> 리뷰쓰기</Button>
                            </Col>
                            <Col>
                                <ReportModal
                                    category={0}
                                    categoryId={project.id}
                                    categoryTitle={project.title}
                                    memberId={0}
                                    memberName={""}
                                    style={{
                                        width: '100%', padding: '.375rem .75rem', fontSize: '1rem'
                                    }} // 여기 스타일 지정하면 신고 버튼에 적용 가능
                                />
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
                    <hr />
                    <h3>{project.content}</h3>
                </div>
            </Container>
        </>
    );
}





function Page() {
    const [project, setProject] = useState(null); // 데이터 상태
   
    // 현재 페이지의 URL을 가져옵니다.
    const currentUrl = window.location.href;

    // URL 객체를 생성합니다.
    const url = new URL(currentUrl).pathname;
    //console.log(url);
    let id = url.replace("/store/", "");
    console.log("id ", id);


    //const project = getProject(parseInt(id, 10));
    id = parseInt(id, 10);
    //const project = getData(`/api/store/${id}`);
    setProject(getData(`/api/store/${id}`));

    console.log("project : ", project);

    const token = getAccessToken();
    console.log("token: ", token);

    existCart(id);

    return (
        <>

            <Banner />


            <main >
                <Container>




                    <Row>
                        <Col lg="7">

                            {ProjectCard(project)}


                        </Col>
                        <Col lg="5">

                            {ProjectExplain(project)}

                        </Col>
                    </Row>
                </Container>

                {ProjectDetail(project)}

            </main>


        </>
    );
    //}
}

export default Page;
