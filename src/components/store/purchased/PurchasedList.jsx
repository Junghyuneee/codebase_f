import React, { useEffect, useState, useRef, Outlet } from "react";

import { useFetch } from "@/components/store/storeAPI";
import { getMemberId } from "@/api/auth/getset.js";
import apiClient from "@/api/apiClient";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardImg,
  ButtonGroup,
  Container,
  Row,
  Col,
  Badge
} from "reactstrap";
function Page() {
  //const [data, setData] = useState([]);

  // const { data, loading, error } = useFetch(
  //   `/api/store/projectorder/myproject/${getMemberId()}`
  // );
  const { data, loading, error } = useFetch(
    `/api/store/projectorder/myproject`
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);



  return (
    <>
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
            <polygon className="fill-white" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>

      <h1>My Projects</h1>
      {data ? (
        <div>{JSON.stringify(data)}</div> // 데이터를 화면에 표시 (예시)
      ) : (
        <p>Loading...</p>
      )}

      <ProjectCards
      projects = {data}
      />
    </>
  );
}

export default Page;



function OneProjectCard({ thumbnail, name}) {
  return (
    <>
      <Card className="bg-white shadow border-0 card-lift--hover">
        <blockquote className="card-blockquote p-4">
          <CardImg style={{ borderRadius: "10px", width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} alt="..." src={`${import.meta.env.VITE_APP_AWS_BUCKET}/${thumbnail}`} top />
          <h5
            className=" font-weight-bold text-black"
            style={{
              display: "-webkit-box", // Flexbox 사용
              WebkitBoxOrient: "vertical", // 세로 방향으로 정렬
              WebkitLineClamp: 2, // 두 줄까지만 표시
              overflow: "hidden", // 넘치는 텍스트 숨기기
              textOverflow: "ellipsis", // 넘치는 텍스트를 ...으로 표시
              width: "100%",
              height: "50px", // 부모 폭에 맞게 설정
              marginTop: "10px", // 기본 마진 제거
            }}
          >
            {name}
          </h5>
          <br />
          <br />
        </blockquote>

      </Card>
    </>
  );
}

function ProjectCards(data) {


  const [page, setPage] = useState(0);

  
  function next() {
    if (page + 1 < Math.ceil(projects.length / 4)) {
      setPage(page + 1);

    }

  }
  function prev() {
    if (page > 0) {
      setPage(page - 1);
    }

  }
  console.log(" asdf ", data.projects);

  return (
    <>
     
      <section
        className="section  pt-4"

      >
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
          <Row className="row-grid align-items-center">

            {Array.isArray(data.projects) &&
              data.projects.map((project) => (
                <>
                <Col
                  key={project.id}
                  xs="12"
                  sm="12"
                  md="6"
                  lg="4"
                  xl="3"
                  className="p-2"
                >
                  <Link to={`/store/purchase/${project.id}`}>
                    <OneProjectCard
                      thumbnail={project.img}
                      name={project.title} />
                  </Link>
                </Col></>
              ))}

          </Row>
        </div>

        {/* <Button onClick={() => prev()}>이전</Button>
        <Button onClick={() => next()}>이후</Button> */}
      </section>
    </>
  );
}
