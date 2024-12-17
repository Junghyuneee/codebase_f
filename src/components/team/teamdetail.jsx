import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams 임포트
import axios from "axios"; // axios 임포트
import {
  Container,
  
} from "reactstrap"; // reactstrap 컴포넌트 추가
import './teamdetail.css';
import Navbar from '../Navbars/NavigationBar.jsx'

const Teamdetail = () => {
  const { id } = useParams(); // URL에서 ID를 추출
  const [team, setTeam] = useState(null);
  
  // 팀 데이터 로드
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`/api/projectteams/${id}`);
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team detail:", error);
      }
    };

    fetchTeam();
  }, [id]);

  if (!team) {
    return <p>팀 정보를 불러오는 중입니다...</p>;
  }

  return (
    <>
      <div className="app-container">
        <Navbar />
        
        <div className="position-relative">
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              {[...Array(9)].map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <Container className="py-lg-md d-flex">
              <h1>{team.pjtname}</h1>
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
              
            </Container>
          </section>
        </div>

        <div className="main-content mt--200">
          <div className="project-details">
            <div className="project-description">
            <div className="project-photo">
              <img 
                src={`${import.meta.env.VITE_APP_AWS_BUCKET}/${team.pjtimg}`}
                alt={team.pjtname || "프로젝트 이미지"} 
              />
            </div>

              <div className="hashtags">#해시태그</div>
            </div>
            <div className="project-content">{team.pjtdescription}</div>
          </div>

          <aside className="team-list">
            <h2>프로젝트 팀원 목록</h2>
            <ul>
              <li>팀원 1</li>
              <li>팀원 2</li>
              <li>팀원 3</li>
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Teamdetail;
