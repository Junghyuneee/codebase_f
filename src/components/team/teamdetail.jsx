import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams 임포트
import axios from "axios"; // axios 임포트
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge
} from "reactstrap"; // reactstrap 컴포넌트 추가
import './teamdetail.css';
import Navbar from '../Navbars/NavigationBar.jsx'

const Teamdetail = () => {
  const { id } = useParams(); // URL에서 ID를 추출
  const [team, setTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]); // 팀원 목록 상태 추가
  
  // 팀 데이터와 팀원 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 팀 정보 가져오기
        const teamResponse = await axios.get(`/api/projectteams/${id}`);
        setTeam(teamResponse.data);

        // 팀원 목록 가져오기
        const membersResponse = await axios.get(`/api/team-applications/${id}/members`);
        setTeamMembers(membersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

              <div className="hashtags">
                <h3>적용기술</h3>
                <div className="tech-stack">
                  {team.pjcategory?.split(',').map((tech, index) => (
                    <Badge 
                      key={index}
                      color="primary" 
                      pill 
                      className="mr-2 mb-2"
                    >
                      {tech.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="project-content">{team.pjtdescription}</div>
          </div>

          <aside className="team-list">
            <h2>프로젝트 팀원 목록</h2>
            <div className="team-members">
              {teamMembers.length > 0 ? (
                <Row>
                  {teamMembers.map((member, index) => (
                    <Col md="6" key={index}>
                      <Card className="mb-3">
                        <CardBody>
                          <h5>{member.name || `팀원 ${index + 1}`}</h5>
                          <Badge color="info" className="mr-2">
                            {member.techstack || member.tech_stack || '기술스택 미지정'}
                          </Badge>
                          <p className="text-muted mb-0">
                            {member.status === 'ACCEPTED' ? '승인됨' : '대기중'}
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p>등록된 팀원이 없습니다.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Teamdetail;
