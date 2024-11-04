/*전현식
2024 11 03
*/
// src/views/post/Post.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostEdit from './PostEdit';
import PostCreate from './PostCreate'; // PostCreate 컴포넌트 가져오기

const Post = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/new" element={<PostCreate />} /> {/* 새 게시물 작성 라우트 추가 */}
        <Route path="/:id" element={<PostDetail />} />
        <Route path="/:id/edit" element={<PostEdit />} />
      </Routes>
    </div>
  );
};

export default Post;

