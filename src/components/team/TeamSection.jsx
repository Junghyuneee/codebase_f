import { useState } from "react";
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
import isAuthenticated from "@/utils//auth/isAuthenticated";
import PropTypes from 'prop-types';


function TeamSection({ projects, currentPage, totalPages, onPageChange, currentMemberId, openApplyModal }) {
  const [modal, setModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();

  // 모달 열기/닫기
  const toggleModal = (team) => {
    setSelectedTeam(team || null);
    setModal(!modal);
  };

  // 팀 삭제 함수 수정
  const handleDelete = async (teamId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`/api/projectteams/${teamId}`);
      alert("팀이 삭제되었습니다!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const renderDeleteButton = (projectMemberId, team) => {
    if (!isAuthenticated()) {
      return null;
    }
    
    if (Number(currentMemberId) === Number(projectMemberId)) {
      return (
        <Button 
          color="danger" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(team.pjt_id);
          }}
        >
          삭제
        </Button>
      );
    }
    
    return null;
  };

  // 페이지네이션 부분만 수정
  const renderPagination = () => {
    // projects 배열이 없거나 비어있으면 페이지네이션을 표시하지 않음
    if (!projects || projects.length === 0) {
      return null;
    }

    return (
      <Container className="mt-4">
        <Pagination className="d-flex justify-content-center">
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem 
              key={i} 
              active={currentPage === i + 1}
              // projects가 없거나 필터링으로 인해 데이터가 없는 페이지는 비활성화
              disabled={!projects || projects.length === 0}
            >
              <PaginationLink onClick={() => onPageChange(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      </Container>
    );
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
                      style={{ 
                        height: '200px',     // 높이 고정
                        objectFit: 'cover',  // 이미지 비율 유지하면서 영역 채우기
                        objectPosition: 'center' // 이미지 중앙 정렬
                      }}
                    />
                    <CardBody className="py-3">
                      <h6 className="text-primary text-uppercase mb-1">
                        {team.pjtname}
                      </h6>
                      <p className="description mt-2 mb-2">
                        {team.pjtdescription}
                      </p>
                      <div className="mb-2">
                        {team.pjcategory?.split(',').map((category, index) => (
                          <Badge 
                            key={index}
                            color="primary" 
                            pill 
                            className="mr-1 mb-1"
                          >
                            {category.trim()}
                          </Badge>
                        )) || "카테고리 없음"}
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          color="primary"
                          onClick={() => toggleModal(team)}
                        >
                          자세히 보기
                        </Button>
                        {renderDeleteButton(team.memberId, team)}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* 수정된 페이지네이션 렌더링 */}
      {renderPagination()}

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
                style={{ 
                  width: '100%', 
                  maxHeight: '300px',    // 최대 높이 제한
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '8px' 
                }}
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
            onClick={() => {
              if (!isAuthenticated()) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/login');
                return;
              }
              toggleModal(null);
              openApplyModal(selectedTeam?.pjt_id);
            }}
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

TeamSection.propTypes = {
  projects: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  currentMemberId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  openApplyModal: PropTypes.func.isRequired
};

export default TeamSection;
