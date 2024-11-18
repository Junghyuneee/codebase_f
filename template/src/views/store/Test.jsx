
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

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

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Typography from "views/IndexSections/Typography"

import Banner from "views/store/Banner.js";


/*function ProjectForm(){

  handleSubmit((event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        
    };

    sendToBackend(formData);
  });

  return (<>
  <form id="contactForm" onsubmit="handleSubmit(event)">
        <label for="name">이름:</label>
        <input type="text" id="name" name="name" required/>

        <label for="나이">나이:</label>
        <input type="number" id="age" name="age" required/>

        <button type="submit">제출</button>
    </form>

  </>);
}
function clearForm() {
  document.getElementById('contactForm').reset(); // 폼 초기화
}
function sendToBackend(data) {
  console.log(data);
  axios.post("/project/add", data)
      .then(response => {
          alert(response.data); // 응답 데이터 표시
          clearForm(); // 폼 초기화
      })
      .catch(error => {
          if (error.response) {
              // 요청이 이루어졌고, 서버가 상태 코드로 응답했지만
              // 요청이 실패한 경우
              alert(error.response.data); // 서버에서 보낸 오류 메시지 표시
          } else {
              // 요청이 이루어지지 않았거나, 다른 오류 발생
              console.error("오류", error);
          }
      });
}*/
function ProjectForm() {
  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 방지

    const formData = {
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
    };
    console.log(formData);
    sendToBackend(formData);
  };

  const sendToBackend = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:8080/api/store', data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const clearForm = () => {
    document.getElementById('contactForm').reset(); // 폼 초기화
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

  //ref 대체
  const myInputRef = useRef(null);  // useRef 훅 사용

  useEffect(() => {
    // 컴포넌트가 마운트된 후 포커스를 입력 필드에 설정
    if (myInputRef.current) {
      myInputRef.current.focus();
    }
  }, []);


  //render() {
  return (
    <>
      <DemoNavbar />

      <Banner />


      <main ref={myInputRef} >
        <Container>

          {ProjectForm()}




        </Container>

      </main>

      <SimpleFooter />
    </>
  );
  //}
}

export default Page;

