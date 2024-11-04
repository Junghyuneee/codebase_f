/*전현식
2024 11 03
*/
// src/views/post/PostDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 실제 데이터는 API에서 가져오는 것이 일반적입니다.
  const post = { title: `게시물 ${id}`, content: `내용 ${id}` };

  const handleDelete = () => {
    // 삭제 로직 추가 (예: API 호출)
    console.log(`게시물 ${id}가 삭제되었습니다.`);
    
    // 삭제 후 목록 페이지로 이동
    navigate('/post');
  };

  const handleEdit = () => {
    // 수정 페이지로 이동
    navigate(`/post/${id}/edit`);
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={handleEdit} style={{ marginRight: '10px' }}>
        수정하기
      </button>
      <button onClick={handleDelete} style={{ color: 'red' }}>
        삭제
      </button>
    </div>
  );
};

export default PostDetail;
