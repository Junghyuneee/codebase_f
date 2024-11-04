// src/views/post/PostCreate.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 데이터는 API에 POST 요청을 통해 저장하는 것이 일반적입니다.
    console.log('새 게시물 작성:', { title, content });

    // 여기서 API를 호출하여 게시물을 저장하는 로직을 추가해야 합니다.
    // 예시: await api.createPost({ title, content });

    // 게시물 작성 후 목록 페이지로 이동
    navigate('/post');
  };

  return (
    <div>
      <h1>새 게시물 작성</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">게시물 작성</button>
      </form>
    </div>
  );
};

export default PostCreate;
