/*cart*/
import React, { useEffect, useState, useRef, Outlet } from "react";
import { redirect, useNavigate } from 'react-router-dom';
// nodejs library that concatenates classes
import Thumbnail from "../../assets/img/theme/team-3-800x800.jpg";
// reactstrap components
import classnames from "classnames";
import axios from "axios";
import { postData } from './storeAPI';
import apiClient from "@/api/apiClient";
// reactstrap components
import {
  Label,
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  Form,
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

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [price, setPrice] = useState('');
  const [free, setFree] = useState(false);
  const navigate = useNavigate();


  //price 유효성
  useEffect(() => {
    let fix = price.toString();
    fix = fix.replace(/^0|\D/g, ""); //맨앞 0이랑 숫자 아닌 문자 삭제
    setPrice(fix);
    document.getElementById("price").value = fix;
  }, [price]); // (onchange 이벤트 중)


  useEffect(() => {
    if (free) {
      document.getElementById("price").disabled = true;
      setPrice(1000);//0

    } else {
      document.getElementById("price").disabled = false;
      setPrice(1000);
    }


  }, [free]); // (onchange 이벤트 중)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // 선택된 파일 가져오기
    setFile(selectedFile); // 상태 업데이트
  };

  const handleFileChange2 = (e) => {
    const selectedFile = e.target.files[0]; // 선택된 파일 가져오기
    setFile2(selectedFile); // 상태 업데이트
  };


  function valid() {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return false;
    }
    if (price < 1000){
      alert('최소금액은 1000원 입니다.');
      return false;
    }
    return true;
  }

  const [preview, setPreview] = useState("");
  const [preview2, setPreview2] = useState("");

  useEffect(() => {
    console.log("file change", file);

    if (!file) {
      setPreview(""); // 파일이 없으면 미리보기 초기화
      return;
    }

    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not an image");
      setPreview("");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      setPreview(event.target.result); // 파일 내용을 상태로 저장
    };

    reader.readAsDataURL(file);

    // 리소스 정리
    return () => reader.abort();


  }, [file]);

  useEffect(() => {
    console.log("file2 change", file2);

    if (!file2) {
      setPreview2(""); // 파일이 없으면 미리보기 초기화
      return;
    }

    if (!file2.type.startsWith("image/")) {
      console.error("Selected file is not an image");
      setPreview2("");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      setPreview2(event.target.result); // 파일 내용을 상태로 저장
    };

    reader.readAsDataURL(file2);

    // 리소스 정리
    return () => reader.abort();


  }, [file2]);

  function filevalid() {
    
    if (file) {
      console.log('업로드할 파일:', file);
      // 파일을 서버에 업로드하는 로직 추가
      //zip 파일 확인 코드 추가예정
      /* accept 속성 주석친거 안으로 넣기 ㅠㅅ ㅠ*/
      //return true;
    } else {
      console.log('파일이 선택되지 않았습니다.');
      alert("썸네일 파일을 게시해주세요");
      return false;
    }
    if (file) {
      console.log('업로드할 파일:', file2);
      return true;
    } else {
      console.log('파일이 선택되지 않았습니다.');
      alert("상세이미지 파일을 게시해주세요");
      return false;
    }

 
  }




  async function submit(event) {

    if (!valid()) {
      return;
    }
    if (!filevalid()) {
      return;
    }


    let realPrice = 0;
    if (price != '') {
      realPrice = parseInt(price);
    }
    const myprice = document.getElementById("price").value;

    // const formData = new FormData();
    // formData.append('title', title);
    // formData.append('content', content);
    // formData.append('price', realPrice);
    // formData.append('file', file);
    // formData.append('file2', file2);
    const formData = new FormData();
    formData.append('project', new Blob([JSON.stringify({
      title: title,
      content: content,
      price: realPrice
  })], { type: 'application/json' }));
    formData.append('file', file);
    formData.append('file2', file2);
    
    console.log(formData);


    if (window.confirm(`정말 ${title} 프로젝트를 게시하시겠습니까?`)) {
      const result = await postData('/api/u/store/add', formData);

      alert("게시되었습니다.");
      navigate(`/store/${result}`);
    }
    else {
      //확인창에서 취소
      return;
    }

  };


  return (
    <>
      <section className="section section-lg pt-lg-0 section-contact-us mt-7">
        <Row className="justify-content-center">
          <Col lg="10">
            <Card className="bg-gradient-secondary shadow">
              <CardBody className="p-lg-5">
                <h4 className="mb-1">프로젝트 등록신청서</h4>
                <p className="mt-0">프로젝트 등록신청서를 작성해주세요.</p>
                <div className="mb-4">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-user-run" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="프로젝트 명"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={77}
                    />
                  </InputGroup>
                </div>
                <div className="mb-4">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-user-run" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="가격"
                      type="text"
                      onChange={(e) => setPrice(e.target.value)}
                      id="price"
                      maxLength={10}
                    />
                    <FormGroup
                      check
                      inline
                      className="pl-2"
                    >
                      <Input type="checkbox" id="free" onChange={(e) => setFree(e.target.checked)} />
                      <Label check>
                        1000원
                      </Label>
                    </FormGroup>
                  </InputGroup>
                </div>

                <div className="mb-4">
                  <Input
                    className="form-control-alternative"
                    cols="40"
                    name="content"
                    placeholder="프로젝트 설명"
                    onChange={(e) => setContent(e.target.value)}
                    rows="10"
                    type="textarea"
                    maxLength={500}
                  />
                </div>


                <InputGroup className="input-group-alternative">




                </InputGroup>

                <Row xs="2 pb-4">
                  <Col className="">
                    썸네일
                  </Col>
                  <Col className="">
                    상세 이미지
                  </Col>
                </Row>

                <Row xs="2 pb-4">
                  <Col className="">
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      accept="images/*"
                    />
                    {/*preview && <img src={preview} alt="Preview" style={{ display: "block", maxWidth: "100%" }} />*/}
                    {preview && (
                      <div
                        style={{
                          maxWidth: "300px",  // 컨테이너의 최대 너비 설정
                          maxHeight: "300px", // 컨테이너의 최대 높이 설정
                          overflow: "auto",   // 스크롤바 활성화
                          border: "1px solid #ccc", // 컨테이너에 테두리 추가
                          padding: "5px",
                          marginTop: "10px",
                        }}
                      >
                        <img
                          src={preview}
                          alt="Preview"
                          style={{
                            display: "block",
                            maxWidth: "100%", // 이미지를 컨테이너 너비에 맞춤
                            maxHeight: "100%", // 이미지를 컨테이너 높이에 맞춤
                          }}
                        />
                      </div>
                    )}
                  </Col>
                  <Col className="">
                    <Input
                    type="file"
                    onChange={handleFileChange2}

                    />

                      {preview2 && (
                      <div
                        style={{
                          maxWidth: "300px",  // 컨테이너의 최대 너비 설정
                          maxHeight: "300px", // 컨테이너의 최대 높이 설정
                          overflow: "auto",   // 스크롤바 활성화
                          border: "1px solid #ccc", // 컨테이너에 테두리 추가
                          padding: "5px",
                          marginTop: "10px",
                        }}
                      >
                        <img
                          src={preview2}
                          alt="Preview"
                          style={{
                            display: "block",
                            maxWidth: "100%", // 이미지를 컨테이너 너비에 맞춤
                            maxHeight: "100%", // 이미지를 컨테이너 높이에 맞춤
                          }}
                        />
                      </div>
                    )}
                    {/*accept=".zip"*/}
                  </Col>
                </Row>




                <div>
                  <Button
                    onClick={(e) => submit(e)}
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
    </>
  );
}

function Page() {
  return (
    <>
      <main>
        <section className="section section-lg section-shaped my-0">
          {/* Circles background */}
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
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
        </section>
        
        <Container>{ProjectForm()}</Container>
        
      </main>

      {/* <main className="bg-secondary">
        <Banner_mini />
        <Container>{ProjectForm()}</Container>
      </main> */}


    </>
  );
}

export default Page;
