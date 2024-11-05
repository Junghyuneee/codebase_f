/* 전현식
2024 11 03
*/
// src/views/post/Post.js
import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostEdit from './PostEdit';
import PostCreate from './PostCreate';
import DemoNavbar from "components/Navbars/DemoNavbar.js";

const Post = () => {
  const mainRef = useRef(null); // useRef 훅 사용

  return (
    <div>
      <DemoNavbar />
      <main ref={mainRef}>
        <div className="position-relative">
          <section className="section section-lg section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              {/* Shape elements */}
              <span /><span /><span /><span /><span />
              <span /><span /><span /><span /><span />
            </div>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/new" element={<PostCreate />} />
              <Route path="/:id" element={<PostDetail />} />
              <Route path="/:id/edit" element={<PostEdit />} />
            </Routes>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Post;
