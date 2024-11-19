import React from "react";
import './teamdetail.css';

const Teamdetail = () => {
  return (
    <>
  
  <div className="app-container">
  <div className="header">
    <h1>프로젝트 제목</h1>
    <nav>
      <a href="#">공지사항</a>
      <a href="#">게시판</a>
      <a href="#">채팅</a>
    </nav>
  </div>

  <div className="main-content">
    <div className="project-details">
      <div className="project-description">
        <div className="project-photo">프로젝트 사진</div>
        <div className="hashtags">#해시태그</div>
      </div>
      <div className="project-content">프로젝트 내용</div>
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
  )
};

export default Teamdetail;