/* store
배다원 
2024 10 30
*/

import React, { useEffect, useState, useRef, Outlet } from 'react';
import { Link } from "react-router-dom";
// nodejs library that concatenates classes

//nav 테스트
import Banner from "./Banner";
import Banner_mini from "./Banner_mini";
import img from "../../assets/img/theme/img-1-1200x1000.jpg";

import {
  Button,
  Card,
  CardImg,

  CardBody,
  FormGroup,

  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Badge
} from "reactstrap";


function OneProjectCard({ name, price }) {

  return (
    <>
      <Card className="bg-white shadow border-0 card-lift--hover">

        <blockquote className="card-blockquote p-4">
          <CardImg style={{ borderRadius: '10px' }}
            alt="..."
            src={img}
            top
          />
          <h4 className="display-4 font-weight-bold text-black"
            style={{
              display: '-webkit-box',          // Flexbox 사용
              WebkitBoxOrient: 'vertical',     // 세로 방향으로 정렬
              WebkitLineClamp: 2,              // 두 줄까지만 표시
              overflow: 'hidden',               // 넘치는 텍스트 숨기기
              textOverflow: 'ellipsis',         // 넘치는 텍스트를 ...으로 표시
              width: '100%',                    // 부모 폭에 맞게 설정
              margin: 0                         // 기본 마진 제거
            }}
          >
            {name}
          </h4>
          <br /><br />


        </blockquote>

        <Badge color="secondary" pill className="mr-1"
          style={{
            fontSize: '14px',
            position: 'absolute', // 절대 위치 설정
            bottom: '30px',      // 하단에서 10px
            left: '30px'        // w좌측에서 10px
          }}>
          {price}원
        </Badge>
      </Card>


    </>
  );

}


function ProjectCards() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // 데이터 가져오기
    fetch('http://localhost:8080/api/store')
      .then((response) => {
        if (!response.ok) {
          throw new Error('데이터를 가져오는데 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error('API 호출 에러:', error);
      });
  }, []);

  return (
    <>
      <section className="section bg-secondary "
        style={{
          display: 'flex',
          justifyContent: 'center', // 가로 가운데 정렬
          padding: '0px',
          maxWidth: '100vw'
        }}>
        <div style={{ marginLeft: '10%', marginRight: '10%' }}>

          <Row className="row-grid align-items-center">

            {projects.map((project) => (
              <Col xs="12" sm="12" md="6" lg="4" xl="3" className='p-2'>
                <OneProjectCard name={project.name} price={project.price} />
              </Col>
            ))}

          </Row>
        </div>
      </section>
    </>
  );
}

function Page() {

  return (
    <>
      <Banner/>
      <Banner_mini/>
      <main>
        
        <ProjectCards />
      </main>
    </>
  );

}

export default Page;


