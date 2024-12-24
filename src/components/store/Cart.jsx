/*cart
2024 11 15
배다원
*/
import React, { useEffect, useState, useRef, Outlet } from 'react';
// nodejs library that concatenates classes
import Thumbnail from "../../assets/img/theme/team-3-800x800.jpg";
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

import { useFetch } from "@/components/store/storeAPI";
import Banner from "./Banner_mini";
import apiClient from '@/api/apiClient';

function Page() {

    const [cartItems, setCartItems] = useState([]);
    const { data, loading, error } = useFetch(`/api/cart/my`);

    // 데이터가 로딩 중이 아니고, 에러가 없을 경우
    useEffect(() => {
        if (data) {
            console.log(data);
            setCartItems(data); // 데이터를 받아오면 setItem을 호출하여 상태를 업데이트

        }
    }, [data]); // data가 변경될 때마다 실행

    useEffect(() => {
        
    }, [cartItems]); //


    const deleteItem = async (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
        //console.log(`/api/cart/delete-item/${id}`);
        const response = await apiClient.delete(`/api/cart/deleteitem/${id}`,);
        //alert(response.data);
    };

    const sampleCI = [
        { id: 1, cart_id: 4, name: '브리츠 노이즈 캔슬링 블루투스 헤드폰', price: 10000, project_id: 13, username: '먀먀먀' },
        { id: 2, cart_id: 4, name: '풀무원 스팀쿡 플러스 에어프라이어 15L AV15D11', price: 10000, project_id: 13, username: '먀먀먀' },
        { id: 3, cart_id: 4, name: '인스탁스 스퀘어 SQ40 폴라로이드 즉석카메라+필름 40장+선물세트', price: 10000, project_id: 13, username: '먀먀먀' },
        { id: 4, cart_id: 4, name: '복숭아', price: 10000, project_id: 13, username: '먀먀먀' },
        { id: 5, cart_id: 4, name: '조아', price: 10000, project_id: 13, username: '먀먀먀' },
        { id: 6, cart_id: 6, name: '딱복싫어물복', price: 999999, project_id: 13, username: '물복싫어딱복' }

    ];

    return (
        <>
            <Banner></Banner>
            <main>

                <Container>




                    <Row>
                        <Col lg="8">


                            {/* <CartItem /> */}
                            {CartItem(cartItems, deleteItem)}

                        </Col>
                        <Col lg="4">


                            {Invoice(cartItems)}


                        </Col>

                        
                    </Row>
                </Container>



            </main>
        </>

    );
}

export default Page;


function CartItem(CartItem, deleteItem) {


    return (<>

        <div className='section'>
            <Button>전체삭제</Button>

            <Card className='card shadow'>

                <div className='p-2'>

                    <Row className="align-items-center py-2" >
                        {/* Thumbnail */}
                        <Col xs="3" sm="3" lg="2" xl="2" className="text-center">
                            <img
                                alt="Thumbnail"
                                className="img-fluid rounded"
                                src={Thumbnail}
                                style={{ width: "120px", height: "auto" }}
                            />
                        </Col>

                        {/* Title/Description */}
                        <Col xs="5" sm="5" lg="6" xl="6">
                            <div>
                                <small className="d-block text-uppercase font-weight-bold">
                                    Sample
                                </small>
                                <span className="text-muted">
                                    이것은 샘플
                                </span>
                            </div>
                        </Col>

                        {/* Value */}
                        <Col xs="2" sm="2" lg="2" xl="2" className="text-center">
                            <small className="d-block text-uppercase font-weight-bold mt-3">
                                $123
                            </small>
                        </Col>

                        {/* Remove Button */}
                        <Col xs="2" sm="2" lg="2" xl="2" className="text-center">
                            <Button className="text-danger" size="sm">
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </Button>
                        </Col>
                    </Row>




                </div>

            </Card>

            {CartItem.map((item) => (
                // <Col xs="12" sm="12" md="6" lg="4" xl="3" className='p-2'>
                //      <a href={`/store/${project.id}`} ><OneProjectCard name={project.name} price={project.price} /></a>
                // </Col>


                    <Card className='card shadow'>

                        <div className='p-2'>

                            <Row className="align-items-center py-2" >
                                {/* Thumbnail */}
                                <Col xs="3" sm="3" lg="2" xl="2" className="text-center">
                                    <img
                                        alt="Thumbnail"
                                        className="img-fluid rounded"
                                        src={Thumbnail}
                                        style={{ width: "120px", height: "auto" }}
                                    />
                                </Col>

                                {/* Title/Description */}
                                <Col xs="5" sm="5" lg="6" xl="6">
                                    <div>
                                        <span className="d-block text-uppercase font-weight-bold">
                                            {item.title}
                                        </span>

                                    </div>
                                </Col>

                                {/* Value */}
                                <Col xs="2" sm="2" lg="2" xl="2" className="text-center">
                                    <small className="d-block text-uppercase font-weight-bold mt-3">
                                        {item.price}원
                                    </small>
                                </Col>

                                {/* Remove Button */}
                                <Col xs="2" sm="2" lg="2" xl="2" className="text-center">
                                    <Button className="text-danger" size="sm">
                                        <i className="fa fa-trash" aria-hidden="true" onClick={() => {
                                            deleteItem(item.id);    
                                            }}>{item.id}삭제</i>
                                    </Button>
                                </Col>
                            </Row>




                        </div>

                    </Card>
                


            ))}


        </div>


    </>);

}


function Invoice(CartItem) {
    var total = 0;
    CartItem.forEach(function (item) {
        total = total + item.price;
    });

    return (<>

        <div className='section'>
            <Card className='card shadow'>
                <blockquote className="card-blockquote">
                    <div className=" mt-5">
                        <h3>
                            {total}원

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

                    <Button>구매</Button>

                </blockquote>
            </Card>
        </div>

    </>);

}

