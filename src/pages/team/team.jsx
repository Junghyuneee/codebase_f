/*!
서승환 2024 11 01
*/
import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Navbar from "../../components/Navbars/NavigationBar.jsx";
import TeamSection from "../../components/team/TeamSection.jsx";
import TeamCreationModal from "../../components/team/TeamCreationModal.jsx";
import { getMemberId } from "../../api/auth/getset.js";
import { useNavigate } from 'react-router-dom';
import isAuthenticated from "@/utils/auth/isAuthenticated.js";
import TeamApplyModal from "../../components/team/TeamApplyModal.jsx"; // 추가


// CATEGORIES 배열 추가
const CATEGORIES = [
  'React',
  'JavaScript',
  'Python',
  'Java',
  'Spring',
  'Node.js',
  'Vue.js',
  'Angular',
  'TypeScript',
  'PHP'
];

function Team() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formData, setFormData] = useState({
    pjtname: '',
    pjtowner: '',
    pjtimg: '',
    pjtdescription: '',
    pjcategory: '',
    memberId: ''
  });
  const [applyModal, setApplyModal] = useState(false);
  const [applyFormData, setApplyFormData] = useState({ 
    tech_stack: "",
    memberId: ''
  });
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentMemberId, setCurrentMemberId] = useState(null);


  const toggleApplyModal = () => setApplyModal(!applyModal);

  const handleApplyChange = (e) => {
    const { name, value } = e.target;
    setApplyFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  // 팀원 등록 버튼 클릭 시 호출
  const openApplyModal = (teamId) => {
    const memberId = getMemberId();
    setApplyFormData(prev => ({
      ...prev,
      member_id: memberId
    }));
    setSelectedTeamId(teamId);
    toggleApplyModal();
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projectteams');
      if (response.status === 200) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error('프로젝트 목록 조회 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    
    fetchProjects();
    
    const memberId = getMemberId();
    console.log("memberId ㅠㅅ ㅠ : ",memberId);
    if (memberId) {
      setCurrentMemberId(memberId);
      setFormData(prev => ({ ...prev, memberId }));
      setApplyFormData(prev => ({ 
        ...prev, 
        member_id: memberId,
        tech_stack: prev.tech_stack || "" 
      }));
    }
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("projectTeam", JSON.stringify({
      pjtname: formData.pjtname,
      pjtowner: formData.pjtowner,
      pjtdescription: formData.pjtdescription,
      pjcategory: formData.pjcategory,
      memberId: formData.memberId,
      deadline: formData.deadline
    }));
    data.append("file", formData.pjtimg);
  
    try {
      const response = await axios.post('/api/projectteams', data);
      if (response.status === 200) {
        alert('프로젝트가 성공적으로 생성되었습니다!');
        toggle();
        fetchProjects();
      }
    } catch (error) {
      console.error('프로젝트 생성 중 오류 발생:', error);
    }
  };

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = searchTerm === '' || (
      project?.pjtname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project?.pjtdescription?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const projectCategories = project?.pjcategory?.split(',').map(cat => cat.trim()) || [];
    const matchesCategories = 
      selectedCategories.length === 0 ||
      selectedCategories.every(category =>
        projectCategories.includes(category)
      );

    return matchesSearch && matchesCategories;
  }) || [];

  const itemsPerPage = 6;

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    setTotalPages(newTotalPages);
    
    if (currentPage >= newTotalPages) {
      setCurrentPage(0);
    }
  }, [currentPage, filteredProjects.length]);

  const getCurrentPageProjects = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        pjtimg: file,
      }));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
    setCurrentPage(0);
  };

  

  const handleProjectCreate = () => {
    if (!isAuthenticated()) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    toggle();
  };

  const handleTeamJoin = (teamId = 0) => {
    if (!isAuthenticated()) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    openApplyModal(teamId);
  };

  const handleGeneralApply = () => {
    handleTeamJoin(0);
  };
  

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    const data = {
      member_id: currentMemberId,
      pjt_id: selectedTeamId,
      tech_stack: applyFormData.tech_stack,
      status: "PENDING"
    };

    try {
      const response = await axios.post("/api/team-applications", data);
      if (response.status === 200 || response.status === 201) {
        alert("팀원 등록이 완료되었습니다!");
        toggleApplyModal();
        setApplyFormData({
          tech_stack: "",
          memberId: currentMemberId
        });
        
        if (selectedTeamId === 0) {
          window.location.reload();
        } else {
          navigate(`/teamdetail/${selectedTeamId}`);
        }
      }
    } catch (error) {
      console.error('팀원 등록 중 오류 발생:', error);
      alert('팀원 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <Navbar/>
      <main>
        <div className="position-relative">
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              {[...Array(9)].map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="12">
                    <h3 className="display-3 text-white">
                      당신의 프로젝트 팀을 조직해보세요!
                    </h3>
                    <p className="lead text-white">
                      프로젝트 팀 구성과 협업을 위한 페이지입니다.
                    </p>
                    <div className="d-flex justify-content-end">
                      <Button 
                        className="btn-icon mb-3 mb-sm-0" 
                        color="info" 
                        onClick={handleProjectCreate}
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="fa fa-plus-circle" />
                        </span>
                        <span className="btn-inner--text">프로젝트 등록하기</span>
                      </Button>
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                        color="default"
                        onClick={handleGeneralApply}
                      >
                        <span className="btn-inner--icon mr-1" >
                          <i className="fa fa-user-plus" />
                        </span>
                        <span className="btn-inner--text">팀원으로 등록</span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
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
              <section className="mt-4" style={{ position: 'relative', zIndex: 100 }}>
                <Row>
                  <Col lg="10">
                    <div className="d-flex">
                      <InputGroup className="mb-4 mr-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-zoom-split-in" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="프로젝트를 검색해보세요"
                          type="text"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </InputGroup>                      
                    </div>
                  </Col>
                  <Col lg="2">
                    <UncontrolledDropdown>
                        <DropdownToggle caret color="primary">
                          {selectedCategories.length > 0 
                            ? `기술 스택 (${selectedCategories.length})`
                            : '기술 스택'}
                        </DropdownToggle>
                        <DropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                          {CATEGORIES.map((category) => (
                            <DropdownItem 
                              key={category}
                              onClick={() => handleCategorySelect(category)}
                              className="d-flex align-items-center"
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => {}}
                                className="mr-2"
                              />
                              {category}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                  </Col>
                </Row>
              </section>
            </Container>
          </section>
        </div>

        <TeamSection 
          projects={getCurrentPageProjects()}
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          selectedCategories={selectedCategories}
          onCategorySelect={handleCategorySelect}
          currentMemberId={currentMemberId}
          openApplyModal={openApplyModal}
        />
        <TeamCreationModal 
          isOpen={modal}
          toggle={toggle}
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />

        <TeamApplyModal
          isOpen={applyModal}
          toggle={toggleApplyModal}
          formData={applyFormData}
          handleChange={handleApplyChange}
          handleSubmit={handleApplySubmit}
        />
      </main>
    </>
  );
}

export default Team;