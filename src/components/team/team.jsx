/*!
서승환 2024 11 01
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import DemoNavbar from "./Navbar.jsx";
import TeamSection from "./TeamSection.jsx";

function Team() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    pjtname: '',
    pjtowner: '',
    pjtimg: '',
    pjtdescription: '',
    pjcategory: ''
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/projectteams', formData); // Backend API 호출
      if (response.status === 200) {
        alert('프로젝트가 성공적으로 생성되었습니다!');
        toggle(); // 모달 닫기
        // 필요한 경우, 상태 초기화 또는 리스트 갱신 로직 추가
      }
    } catch (error) {
      console.error('프로젝트 생성 중 오류 발생:', error);
      alert('프로젝트 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const [projects, setProjects] = useState([]); // 프로젝트 데이터를 저장할 상태

  // 데이터 가져오기
  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projectteams'); // Spring Boot API 호출
      setProjects(response.data); // 상태에 데이터 저장
    } catch (error) {
      if (error.response) {
        // 서버에서 반환한 오류 응답 처리
        console.error('Failed to fetch projects:', error.response.status, error.response.data);
      } else if (error.request) {
        // 요청은 보내졌지만 응답을 받지 못한 경우
        console.error('No response from server:', error.request);
      } else {
        // 요청 설정 중 발생한 에러
        console.error('Error setting up request:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchProjects(); // 컴포넌트 로드 시 데이터 가져오기
  }, []);

  return (
    <>
      <DemoNavbar />
      <main>
        <div className="position-relative">
          {/* Hero Section */}
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              {[...Array(9)].map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="12">
                    <h3 className="display-3 text-white">
                      당신의 프로젝트 팀을 조직해보세요!
                    </h3>
                    <p className="lead text-white">
                      프로젝트 팀 구성과 협업을 위한 페이지입니다.
                    </p>
                    <div className="d-flex justify-content-end">
                      <Button className="btn-icon mb-3 mb-sm-0" color="info" onClick={toggle}>
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-code" />
                          </span>
                          <span className="btn-inner--text">팀 등록하기</span>
                      </Button>
                      <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-cloud-download-95" />
                          </span>
                          <span className="btn-inner--text">팀원으로 등록</span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
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
            <Container>
              <section className="mt-4">
                <Row>
                  <Col lg="10">
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-zoom-split-in" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Search"
                        type="text"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </section>
            </Container>
          </section>
        </div>

        <TeamSection/>
        {/* Modal for Team Creation */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>새 프로젝트 생성</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="pjtname">프로젝트 이름</Label>
                <Input
                  type="text"
                  name="pjtname"
                  id="pjtname"
                  value={formData.pjtname}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="pjtowner">프로젝트 소유자</Label>
                <Input
                  type="text"
                  name="pjtowner"
                  id="pjtowner"
                  value={formData.pjtowner}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="pjtimg">이미지</Label>
                <Input
                  type="text"
                  name="pjtimg"
                  id="pjtimg"
                  value={formData.pjtimg}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="pjtdescription">설명</Label>
                <Input
                  type="textarea"
                  name="pjtdescription"
                  id="pjtdescription"
                  value={formData.pjtdescription}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="pjcategory">카테고리</Label>
                <Input
                  type="text"
                  name="pjcategory"
                  id="pjcategory"
                  value={formData.pjcategory}
                  onChange={handleChange}
                />
              </FormGroup>
              <Button color="primary" type="submit">
                프로젝트 생성
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                취소
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </main>
    </>
  );
}

export default Team;
