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
} from "reactstrap";

function Banner() {


    return (
        <>
        
        
                {/*shape-style- 1 2 3 변경가능*/ }
                <section className="section-profile-cover section-shaped my-0">
                    {/* Circles background */}
                    <div className="shape shape-style-3 shape-default">
                        <span />
                        <span />
                        <span />
                        {/*<span />
                        <span />*/}
                        
                        
                        
                    </div>
                    {/* SVG separator 사선 처리*/}
                    
                </section>

                <section style={{ marginTop: '-400px', marginBottom: '100px' }}>         
                <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="12">
                      <h1 className="display-1 text-white">
                        코드베이스 상점{" "}
                        
                      </h1>
                      <h1 className="display-3 text-white">
                        
                        <span>만들어진 프로젝트를 구매하고 활용하세요!</span>
                      </h1>
                      <p className="lead text-white">
                        The design system comes with four pre-built pages to
                        help you get started faster. You can change the text and
                        images and you're good to go.
                      </p>
                      <div className="btn-wrapper">
                        <Button
                          className="btn-icon mb-3 mb-sm-0"
                          color="info"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alerts?ref=adsr-landing-page"
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-code" />
                          </span>
                          <span className="btn-inner--text">Components</span>
                        </Button>
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-cloud-download-95" />
                          </span>
                          <span className="btn-inner--text">
                            Download React
                          </span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
              </section>                 
        </>
    );


}

export default Banner;
