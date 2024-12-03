import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams 임포트
import axios from "axios"; // axios 임포트
import './teamdetail.css';

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
        <div className="header">
          <h1>{team.pjtname}</h1>
          <nav>
            <a href="#">공지사항</a>
            <a href="#">게시판</a>
            <a href="#">채팅</a>
          </nav>
        </div>

        <div className="main-content">
          <div className="project-details">
            <div className="project-description">
            <div className="project-photo">
              <img 
                src={`https://codebase-bucket-gvzby4.s3.ap-northeast-2.amazonaws.com/${team.pjtimg}`} 
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
