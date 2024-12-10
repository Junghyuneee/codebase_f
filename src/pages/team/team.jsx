/*!
서승환 2024 11 01
*/
import React, { useState, useEffect } from 'react';
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
import Navbar from "../../components/team/Navbar.jsx";
import TeamSection from "../../components/team/TeamSection.jsx";
import TeamCreationModal from "../../components/team/TeamCreationModal.jsx";
import { getMemberId } from "../../api/auth/getset.js";

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
  const [searchFocused, setSearchFocused] = useState(false);
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
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    
    fetchProjects();
    
    const memberId = getMemberId();
    if (memberId) {
      setFormData(prev => ({ ...prev, memberId }));
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
      memberId: formData.memberId
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
    const matchesSearch = 
      project?.pjtname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project?.pjtdescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project?.pjcategory?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const projectCategories = project?.pjcategory?.split(',').map(cat => cat.trim()) || [];
    
    const matchesCategories = 
      selectedCategories.length === 0 ||
      selectedCategories.some(category => 
        projectCategories.includes(category)
      );

    return matchesSearch && matchesCategories;
  }) || [];

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projectteams');
      const projectData = Array.isArray(response.data) ? response.data : response.data.content;
      setProjects(projectData);
      setTotalPages(Math.ceil(projectData.length / 6));
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const getCurrentPageProjects = () => {
    const startIndex = currentPage * 6;
    const endIndex = startIndex + 6;
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
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
                      <Button className="btn-icon mb-3 mb-sm-0" color="info" onClick={toggle}>
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-plus-circle" />
                          </span>
                          <span className="btn-inner--text">프로젝트 등록하기</span>
                      </Button>
                      <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
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
              <section className="mt-4">
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
                          placeholder="프로젝트나 기술 스택을 검색해보세요"
                          type="text"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          onFocus={() => setSearchFocused(true)}
                          onBlur={() => setSearchFocused(false)}
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
                        <DropdownMenu>
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
        />
        <TeamCreationModal 
          isOpen={modal}
          toggle={toggle}
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />
      </main>
    </>
  );
}

export default Team;