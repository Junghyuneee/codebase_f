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
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../../template/src/assets/img/theme/img-1-1200x1000.jpg";


function TeamSection({ projects, currentPage, totalPages, onPageChange }) {
  const [modal, setModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();

  // 모버깅을 위한 콘솔 로그 추가
  useEffect(() => {
    console.log('TeamSection Props:', { projects, currentPage, totalPages });
  }, [projects, currentPage, totalPages]);

  // 모달 열기/닫기
  const toggleModal = (team) => {
    setSelectedTeam(team || null);
    setModal(!modal);
  };

  // 팀 삭제
  const deleteTeam = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`/api/projectteams/${id}`);
      alert("팀이 삭제되었습니다!");
      location.reload(true);
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="section section-lg pt-lg-0 mt--200">
      <Container>
        <Row className="justify-content-center">
          <Col lg="12">
            <Row className="row-grid" style={{ gap: '2rem 0' }}>
              {Array.isArray(projects) && projects.map((team, index) => (
                <Col lg="4" md="6" className="px-4" key={team.pjt_id || index}>
                  <Card className="card-lift--hover shadow border-0">
                    <CardImg
                      alt={team.pjtname || "프로젝트 이미지"}
                      src={
                        team.pjtimg
                          ? `${import.meta.env.VITE_APP_AWS_BUCKET}/${team.pjtimg}`
                          : defaultImage
                      }
                      top
                    />
                    <CardBody className="py-5">
                      <h6 className="text-primary text-uppercase">{team.pjtname}</h6>
                      <p className="description mt-3">{team.pjtdescription}</p>
                      <div>
                        <Badge color="primary" pill className="mr-1">
                          {team.pjcategory}
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <Button
                          className="mt-2"
                          color="primary"
                          onClick={() => toggleModal(team)}
                        >
                          자세히 보기
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => deleteTeam(team.pjt_id)}
                        >
                          삭제
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Container className="mt-4">
          <Pagination className="d-flex justify-content-center">
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i} active={currentPage === i + 1}>
                <PaginationLink onClick={() => onPageChange(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
        </Container>
      )}

      {/* Modal */}
      <Modal isOpen={modal} toggle={() => toggleModal(null)} size="lg">
        <ModalHeader toggle={() => toggleModal(null)}>
          {selectedTeam?.pjtname || "팀 정보"}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="4">
              <img
                src={
                  selectedTeam?.pjtimg
                    ? `${import.meta.env.VITE_APP_AWS_BUCKET}/${selectedTeam.pjtimg}`
                    : defaultImage
                }
                alt={selectedTeam?.pjtname}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Col>
            <Col md="8">
              <h5>프로젝트 설명</h5>
              <p>{selectedTeam?.pjtdescription || "팀 설명이 없습니다."}</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h5>사용 기술</h5>
              <div>
                {selectedTeam?.pjcategory?.split(',').map((tech, index) => (
                  <Badge color="primary" pill className="mr-2 mb-2" key={index}>
                    {tech.trim()}
                  </Badge>
                )) || "등록된 기술이 없습니다."}
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => navigate(`/teamdetail/${selectedTeam?.pjt_id}`)}
          >
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
