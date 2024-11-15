/*cart*/
import React, { useEffect, useState, useRef, Outlet } from 'react';
// nodejs library that concatenates classes
import Thumbnail from "../../assets/img/theme/team-3-800x800.jpg";
// reactstrap components
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

import Banner from "./Banner_mini";
import Banner_mini from './Banner_mini';

function Page() {
  return(
  <>
    <main className='bg-secondary'>
  <Banner_mini/>


<section className="section section-lg pt-lg-0 section-contact-us mt-7">

              <Row className="justify-content-center">
                <Col lg="10">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="mb-1">프로젝트 등록신청서</h4>
                      <p className="mt-0">
                        프로젝트 등록신청서를 작성해주세요.
                      </p>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-user-run" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="프로젝트 명"
                            type="text"
                            onFocus={(e) =>
                              this.setState({ nameFocused: true })
                            }
                            onBlur={(e) =>
                              this.setState({ nameFocused: false })
                            }
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            <span>&nbsp;&nbsp;&nbsp;프로젝트.zip</span>
                            </InputGroupText>
                            
                          </InputGroupAddon>
                          <Input
                            type="file"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          name="name"
                          placeholder="프로젝트 설명"
                          rows="20"
                          type="textarea"
                        />
                      </FormGroup>
                      <div>
                        <Button
                          block
                          className="btn-round"
                          color="default"
                          size="lg"
                          type="button"
                        >
                          제 출
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
           
          </section>


          </main>

  </>

  );
}

export default Page;


