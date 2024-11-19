import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function TeamSection({ teams }) {
  // 모달 상태 관리
  const [modal, setModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const toggleModal = (team) => {
    setSelectedTeam(team);
    setModal(!modal);
  };
  
  const navigate = useNavigate();

  const navigateToTeamdetail = () => {
    navigate("/teamdetail");
  };

  return (
    <section className="section section-lg pt-lg-0">
      <Container>
        <Row className="justify-content-center mt--100 mb-5">
          <Col lg="12">
            <Row className="row-grid">
              {teams.map((team, index) => (
                <Col lg="4" key={index}>
                  <Card className="card-lift--hover shadow border-0">
                    <CardImg alt="..." src={team.image} top />
                    <CardBody className="py-5">
                      <h6 className="text-primary text-uppercase">{team.name}</h6>
                      <p className="description mt-3">{team.description}</p>
                      <div>
                        {team.badges.map((badge, i) => (
                          <Badge color="primary" pill className="mr-1" key={i}>
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <Button className="mt-2" color="primary" onClick={() => toggleModal(team)}>
                        자세히 보기
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      <Modal isOpen={modal} toggle={() => toggleModal(null)}>
        <ModalHeader toggle={() => toggleModal(null)}>
          {selectedTeam?.name || "팀 정보"}
        </ModalHeader>
        <ModalBody>
          <p>{selectedTeam?.description}</p>
          <div>
            {selectedTeam?.badges.map((badge, index) => (
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

// default export 추가
export default TeamSection;
