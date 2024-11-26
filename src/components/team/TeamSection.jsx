import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

function TeamSection() {
  const [teams, setTeams] = useState([]); // 초기 상태 빈 배열
  const [modal, setModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const navigate = useNavigate();

  // 팀 데이터 가져오기
  const fetchTeams = async () => {
    try {
      const response = await axios.get("/api/projectteams");
      const data = response.data;

      // 데이터가 배열인지 확인
      setTeams(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  // 컴포넌트 로드 시 데이터 가져오기
  useEffect(() => {
    fetchTeams();
  }, []);

  // 모달 열기/닫기
  const toggleModal = (team) => {
    setSelectedTeam(team || null);
    setModal(!modal);
  };

  // 팀 삭제
  const deleteTeam = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return; // 삭제 확인
    try {
      await axios.delete(`/api/projectteams/${id}`);
      setTeams((prevTeams) => prevTeams.filter((team) => team.id !== id)); // 상태 업데이트
      alert("팀이 삭제되었습니다!");
      location.reload(true);
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 팀 상세 페이지 이동
  const navigateToTeamdetail = () => {
    navigate("/teamdetail");
  };

  return (
    <section className="section section-lg pt-lg-0">
      <Container>
        <Row className="justify-content-center mt--100 mb-5">
          <Col lg="12">
            <Row className="row-grid">
              {teams.length > 0 ? (
                teams.map((team, index) => (
                  <Col lg="4" key={index}>
                    <Card className="card-lift--hover shadow border-0">
                      <CardImg
                        alt={team.pjtname || "프로젝트 이미지"}
                        src={team.pjtimg || "../../../template/src/assets/img/theme/img-1-1200x1000.jpg"}
                        top
                      />
                      <CardBody className="py-5">
                        <h6 className="text-primary text-uppercase">{team.pjtname}</h6>
                        <p className="description mt-3">{team.pjtdescription}</p>
                        <div>
                          {Array.isArray(team.pjtcategory) &&
                            team.pjtcategory.map((badge, i) => (
                              <Badge color="primary" pill className="mr-1" key={i}>
                                {badge}
                              </Badge>
                            ))}
                        </div>
                        <Button
                          className="mt-2"
                          color="primary"
                          onClick={() => toggleModal(team)}
                        >
                          자세히 보기
                        </Button>
                        <Button
                          className="mt-2"
                          color="danger"
                          onClick={() => deleteTeam(team.pjt_id)}
                        >
                          삭제
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>팀 정보를 불러오는 중입니다...</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      <Modal isOpen={modal} toggle={() => toggleModal(null)}>
        <ModalHeader toggle={() => toggleModal(null)}>
          {selectedTeam?.pjtname || "팀 정보"}
        </ModalHeader>
        <ModalBody>
          <p>{selectedTeam?.pjtdescription || "팀 설명이 없습니다."}</p>
          <div>
            {Array.isArray(selectedTeam?.pjtcategory) &&
              selectedTeam.pjtcategory.map((badge, index) => (
                <Badge color="primary" pill className="mr-1" key={index}>
                  {badge}
                </Badge>
              ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={navigateToTeamdetail}>
            팀원 되기
          </Button>
          <Button color="secondary" onClick={() => toggleModal(null)}>
            닫기
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}


export default TeamSection;
