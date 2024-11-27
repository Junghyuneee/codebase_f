/*cart*/
import React, { useEffect, useState, useRef, Outlet } from "react";
// nodejs library that concatenates classes
import Thumbnail from "../../assets/img/theme/team-3-800x800.jpg";
// reactstrap components
import classnames from "classnames";
import axios from "axios";
import {postData} from './storeAPI';
import apiClient from "@/api/apiClient";
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
import Banner_mini from "./Banner_mini";

function ProjectForm() {
  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const formData = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
    };
    console.log(formData);
    //sendToBackend(formData);
    postData('/api/store', formData);
  };

  const sendToBackend = async (data) => {
    console.log(data);
    try {
      const response = await apiClient.post(
        "/api/store",
        data
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const clearForm = () => {
    document.getElementById("contactForm").reset(); // 폼 초기화
  };

  return (
    <>
      <form id="contactForm" onSubmit={handleSubmit}>
        <label htmlFor="name">이름:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="age">나이:</label>
        <input type="number" id="age" name="age" required />

        <button type="submit">제출</button>
      </form>
    </>
  );
}

function Page() {
  return (
    <>
      <main className="bg-secondary">
        <Banner_mini />

        <section className="section section-lg pt-lg-0 section-contact-us mt-7">
          <Row className="justify-content-center">
            <Col lg="10">
              <Card className="bg-gradient-secondary shadow">
                <CardBody className="p-lg-5">
                  <h4 className="mb-1">프로젝트 등록신청서</h4>
                  <p className="mt-0">프로젝트 등록신청서를 작성해주세요.</p>
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
                        onFocus={(e) => this.setState({ nameFocused: true })}
                        onBlur={(e) => this.setState({ nameFocused: false })}
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
                      <Input type="file" />
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

          <Container>{ProjectForm()}</Container>
        </section>
      </main>
    </>
  );
}

export default Page;
