import { getMemberId } from "@/api/auth/getset";
import { getMyProjectList } from "@/api/auth/profile";
import TeamSection from "@/components/auth/profile/TeamSection";
import { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';

const ProjectList = ({ name }) => {

  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentMemberId, setCurrentMemberId] = useState(null);


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

  useEffect(() => {
    (async () => {
      const response = await getMyProjectList(name);
      setProjects(response);

      const memberId = getMemberId();
      if (memberId) {
        setCurrentMemberId(memberId);
      }

    })();
  }, [name]);

  useEffect(() => {
    const newTotalPages = Math.ceil(projects.length / itemsPerPage);
    setTotalPages(newTotalPages);

    if (currentPage >= newTotalPages) {
      setCurrentPage(0);
    }
  }, [currentPage, projects.length]);

  const getCurrentPageProjects = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return projects.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  // 팀원 등록 버튼 클릭 시 호출
  const openApplyModal = () => { };

  return (
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
  )
}

ProjectList.propTypes = {
  name: PropTypes.string
}

export default ProjectList;