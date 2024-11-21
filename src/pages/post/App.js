// src/post/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostCreate from './PostCreate'; // 경로 확인
import PostList from './PostList'; // 경로 확인
import PostDetail from './PostDetail'; // 경로 확인
import NotFound from './NotFound'; // 404 페이지 컴포넌트 (선택적)

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} /> {/* 기본 경로 */}
        <Route path="/post" element={<PostList />} />
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} /> {/* 404 페이지 */}
      </Routes>
    </Router>
  );
};

export default App;
