/*전현식
2024 11 03
*/
// src/views/post/PostEdit.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 게시물 수정 로직 추가 필요
    navigate(`/post/${id}`); // 수정 후 상세페이지로 이동
  };

  return (
    <div>
      <h1>게시물 수정: {id}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="제목" required />
        <textarea placeholder="내용" required></textarea>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default PostEdit;

