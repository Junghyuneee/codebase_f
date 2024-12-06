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

  const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [price ,setPrice] = useState(0);
	const navigate = useNavigate();


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // 선택된 파일 가져오기
    setFile(selectedFile); // 상태 업데이트
  };  


  function valid(){
    if (!title.trim() || !content.trim()) {
			alert('제목과 내용을 모두 입력해주세요.');
			return false;
		}
    return true;
  }
 
  function filevalid(){
    if (file) {
      console.log('업로드할 파일:', file);
      // 파일을 서버에 업로드하는 로직 추가
      //zip 파일 확인 코드 추가예정
      /* accept 속성 주석친거 안으로 넣기 ㅠㅅ ㅠ*/
      return true;
    } else {
      console.log('파일이 선택되지 않았습니다.');
      alert("프로젝트 파일을 게시해주세요");
      return false;
    }

  }

  function submit(event){

    if(!valid()){
      return;
    }
    if(!filevalid()){
      return;
    }
    
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);
    formData.append('file', file);
    console.log(formData);


    if (window.confirm(`정말 ${title} 프로젝트를 게시하시겠습니까?`)) {
      postData('/api/store/add', formData);

      alert("게시되었습니다.");
      navigate("/store");
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
                      onChange={(e) => setTitle(e.target.value)}
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
                    onChange={handleFileChange}
              
                    />
                    {/*accept=".zip"*/}
                    
                  </InputGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-user-run" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="가격"
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Input
                    className="form-control-alternative"
                    cols="80"
                    name="content"
                    placeholder="프로젝트 설명"
                    onChange={(e) => setContent(e.target.value)}
                    rows="20"
                    type="textarea"
                  />
                </FormGroup>
                <div>
                  <Button
                    onClick={(e)=>submit(e)}
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
      <main className="bg-secondary">
        <Banner_mini />
        <Container>{ProjectForm()}</Container>
      </main>
    </>
  );
}

export default Page;
