/*해당파일 파일전송 엔드포인트 : 'http://localhost:8080/api/store*/
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import {

  Container,

} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import Banner from "views/store/Banner.js";


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

