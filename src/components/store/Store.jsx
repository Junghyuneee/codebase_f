/* store
배다원 
2024 10 30
*/

import React, { useEffect, useState, useRef, Outlet } from "react";
import { Link } from "react-router-dom";
import Banner from "@/components/store/Banner";
import img from "@/assets/img/theme/img-1-1200x1000.jpg";
import { useFetch } from "@/components/store/storeAPI";
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

function OneProjectCard({ thumbnail, name, price }) {
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

  const [page, setPage] = useState(0);


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
    //console.log("정렬변경");

    if (Array.isArray(initprojects)) {// 배열이면(값이 안들어왔을때는 아래코드 동작하지 않음)
      let sortedProjects = [];
      sortedProjects = [...initprojects].sort((a, b) => {
        //console.log("sortOption : ", sortOption);
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


      const startIndex = page * 4;
      const endIndex = startIndex + 4;

      setProjects(sortedProjects.splice(startIndex, endIndex));
    }

  }, [sortOption, initprojects, page]);


  function next() {
    if (page + 1 < Math.ceil(initprojects.length / 4)) {
      setPage(page + 1);

    }

  }
  function prev() {
    if (page > 0) {
      setPage(page - 1);
    }

  }

  const plusHit = (id) => {
    //console.log("프로젝트 카드 클릭", id);
    // 여기에 원하는 함수나 추가 동작을 작성
  };


  return (
    <>
      <div style={{ marginLeft: "10%", marginRight: "10%", paddingTop: "50px" }} >
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
        </ButtonGroup></div>
      <section
        className="section  pt-4"

      >
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
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
                  <Link to={`/store/${project.id}`} onClick={() => plusHit(project.id)}>
                    <OneProjectCard
                      thumbnail={project.img}
                      name={project.title}
                      price={project.price}
                    />
                  </Link>
                </Col>
              ))}

          </Row>
        </div>

        <Button onClick={() => prev()}>이전</Button>
        <Button onClick={() => next()}>이후</Button>
      </section>
    </>
  );
}

function MyBanner() {
  return (
    <>
       <div className="position-relative">
               {/* Hero for FREE version */}
               <section className="section section-hero section-shaped">
                 {/* Background circles */}
                 <div className="shape shape-style-1 shape-default">
                   <span className="span-150" />
                   <span className="span-50" />
                   <span className="span-50" />
                   <span className="span-75" />
                   <span className="span-100" />
                   <span className="span-75" />
                   <span className="span-50" />
                   <span className="span-100" />
                   <span className="span-50" />
                   <span className="span-100" />
                 </div>
                 <Container className="shape-container d-flex py-lg">
                   <div className="col px-0">
                     <Row className="">
                       <Col className="" lg="6">
                         <img
                           alt="..."
                           className="img-fluid"
                           src={img}
                           style={{ width: "200px" }}
                         />
                         <h1 className="text-white">ㅋㄷㅂㅇㅅ ㅅㅈ</h1>
                         <div className="btn-wrapper mt-5">
                           <Button
                             className="btn-white btn-icon mb-3 mb-sm-0"
                             color="default"
                             href="/store/cart"
                             size="lg"
                           >
                             <span className="btn-inner--icon mr-1">
                               <i className="ni ni-cloud-download-95" />
                             </span>
                             <span className="btn-inner--text">장바구니</span>
                           </Button>
                           <Button
                             className="btn-icon mb-3 mb-sm-0"
                             color="github"
                             href="/store/add"
                             size="lg"
                             //target="_blank"
                           >
                             <span className="btn-inner--icon mr-1">
                               <i className="fa fa-github" />
                             </span>
                             <span className="btn-inner--text">
                               <span className="text-warning mr-1">프로젝트</span>
                               등록하기
                             </span>
                           </Button>
                         </div>
                         <div className="mt-5">
                           <small className="text-white font-weight-bold mb-0 mr-2">
                             ******ㅁ*ㄴㅇㄹ*ㅁㅇㄹ*
                           </small>
                           <img
                             alt="..."
                             src={img}
                             className="ml-1"
                             style={{ height: "28px" }}
                            
                           />
                         </div>
                       </Col>
                     </Row>
                   </div>
                 </Container>
                 {/* SVG separator */}
                 <div className="separator separator-bottom separator-skew zindex-100">
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
             </div>
    </>);
}
function Page() {

  return (
    <>
      {/* <section className="section-profile-cover section-shaped my-0 pb-7">
        
        <div className="shape shape-style-1 shape-default alpha-4">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        
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
      </section> */}
      <MyBanner></MyBanner>


      <main>
        <ProjectCards />
        <Container></Container>
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



