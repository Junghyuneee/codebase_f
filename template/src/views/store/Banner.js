import React, { useEffect, useState, useRef } from 'react';
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
  UncontrolledCarousel
} from "reactstrap";
const items = [
  {
    src: require("assets/img/theme/img-1-1200x1000.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("assets/img/theme/img-2-1200x1000.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
];




function Banner() {


  return (
    <>

      <div className="position-relative">
        {/* shape Hero */}
        <section className="section section-lg section-shaped pb-100">
          <div className="shape shape-style-3 shape-default">
            <span />
            <span />
            <span />

          </div>
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row className='mt-5'>
                <Col lg="6">
                  <h1 className="display-2 text-white font-weight-bold">
                    CODEBASE 상점
                  </h1>
                  <p className="lead text-white">
                    코드베이스에서 다양한 프로젝트를 <br />
                    판매, 공유할 수 있습니다.<br />
                    내게 맞는 프로젝트가 있다면<br />
                    참여하거나 구매해 보세요.
                  </p>

                  <Container>
                    <section className="mt-4">
                        <Row>
                            <Col lg="12" className='p-0'>
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

                  <Button
                    className="btn-white mt-4"
                    color="default"
                    href="/store"
                  >
                    내 프로젝트 등록하기
                  </Button>


                </Col>
                <Col lg="6">
                  <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                    <UncontrolledCarousel items={items} />
                  </div>

                </Col>
              </Row>
            </div>
          </Container>

        </section>
        {/* 1st Hero Variation */}
      </div>



    </>
  );


}

export default Banner;
