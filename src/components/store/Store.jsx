/* store
배다원 
2024 10 30
*/

import React, { useEffect, useState, useRef, Outlet } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes

//nav 테스트
import Banner from "@/components/store/Banner";
import Banner_mini from "@/components/store/Banner_mini";
import img from "@/assets/img/theme/img-1-1200x1000.jpg";
import { getData, useFetch } from "@/components/store/storeAPI";

import {
  Button,
  Card,
  CardImg,
  ButtonGroup,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Badge,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

function OneProjectCard({ name, price }) {
  return (
    <>
      <Card className="bg-white shadow border-0 card-lift--hover">
        <blockquote className="card-blockquote p-4">
          <CardImg style={{ borderRadius: "10px" }} alt="..." src={img} top />
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

        <Badge
          color="secondary"
          pill
          className="mr-1"
          style={{
            fontSize: "14px",
            position: "absolute", // 절대 위치 설정
            bottom: "30px", // 하단에서 10px
            left: "30px", // w좌측에서 10px
          }}
        >
          {price}원
        </Badge>
      </Card>
    </>
  );
}

function ProjectCards() {
  //const initprojects = GetProject();

  const { data, loading, error } = useFetch("/api/store");
  const [initprojects, setInitprojects] = useState(null); // 다른 상태를 위한 setItem
  const [sortOption, setSortOption] = useState(null); //기본값 (최신순)
  const [projects, setProjects] = useState(null);

  // 데이터가 로딩 중이 아니고, 에러가 없을 경우
  useEffect(() => {
    if (data) {
      console.log(data);
      setInitprojects(data); // 데이터를 받아오면 setItem을 호출하여 상태를 업데이트
      setSortOption("최신순"); //기본값, useEffect 트리거용
      //setProjects(data);
    }
  }, [data]); // data가 변경될 때마다 실행

  useEffect(() => {
    console.log("정렬변경");
    let sortedProjects = [];
    
    if (Array.isArray(initprojects)) {// 배열이면(값이 안들어왔을때는 아래코드 동작하지 않음)
       sortedProjects = [...initprojects].sort((a, b) => {
        console.log("sortOption : ", sortOption);
        switch (sortOption) {
          case "최신순":
            return b.id - a.id; // ID로 최신순 정렬
          case "조회순":
            return b.hit - a.hit; // 조회수로 정렬
          case "이름순":
            return a.title.localeCompare(b.title, "ko"); // 가나다 정렬
          default:
            return 0;
        }
      });
    }
    setProjects(sortedProjects);
  }, [sortOption]); // data가 변경될 때마다 실행

 

  return (
    <>
      <section
        className="section bg-secondary pt-4"
        style={{
          display: "flex",
          justifyContent: "center", // 가로 가운데 정렬
          padding: "0px",
          maxWidth: "100vw",
        }}
      >
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
          <ButtonGroup>
            <Button
              color="primary"
              outline
              onClick={() => setSortOption("최신순")}
              active={sortOption === "최신순"}
            >
              최신순
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => setSortOption("조회순")}
              active={sortOption === "조회순"}
            >
              조회순
            </Button>
            <Button
              color="primary"
              outline
              onClick={() => setSortOption("이름순")}
              active={sortOption === "이름순"}
            >
              이름순
            </Button>
          </ButtonGroup>

          <Row className="row-grid align-items-center">

            {loading && <p>Loading...</p>}
            {!loading &&
              Array.isArray(projects) &&
              projects.map((project) => (
                <Col
                  key={project.id}
                  xs="12"
                  sm="12"
                  md="6"
                  lg="4"
                  xl="3"
                  className="p-2"
                >
                  <a href={`/store/${project.id}`}>
                    <OneProjectCard
                      name={project.title}
                      price={project.price}
                    />
                  </a>
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
      <Banner />
      <Banner_mini />
      <main>
        <ProjectCards />
      </main>
      <br />
      <br />
      <br />
      <br />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Page;
