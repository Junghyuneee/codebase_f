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

                <section className="section section-shaped" style={{ marginTop: '-520px', marginBottom: '100px' }}>         
    
          <Container className="py-md">
            <Row className="justify-content-between align-items-center">
              <Col className="mb-5 mb-lg-0" lg="5">
                <h1 className="display-2 text-white font-weight-light">
                  CODEBASE 상점
                </h1>
                <p className="lead text-white mt-4">
                  Argon Design System comes with four pre-built pages to help
                  you get started faster. You can change the text and images and
                  you're good to go.
                </p>
                <Button
                  className="btn-white mt-4"
                  color="default"
                  href="/store"
                >
                  See all components
                </Button>
              </Col>
              <Col className="mb-lg-auto" lg="6">
                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                  <UncontrolledCarousel items={items} />
                </div>
              </Col>
            </Row>
          </Container>
          
        </section>
        </>
    );


}

export default Banner;
