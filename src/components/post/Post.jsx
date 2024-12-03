import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DemoNavbar from "./DemoNavbar.jsx"; // Navbar 임포트
import Headroom from 'headroom.js'; // Headroom 임포트

// Lazy loading components
const PostList = lazy(() => import('./PostList'));
const PostDetail = lazy(() => import('./PostDetail'));
const PostEdit = lazy(() => import('./PostEdit'));
const PostCreate = lazy(() => import('./PostCreate'));

// Loading component
const Loading = () => (
  <div className="text-center loading">
    <h2>로딩 중...</h2>
  </div>
);

const Post = () => {
  const [collapseClasses, setCollapseClasses] = useState('');

  useEffect(() => {
    const navbarMain = document.getElementById('navbar-main');
    if (navbarMain) {
      let headroom = new Headroom(navbarMain);
      headroom.init();
    }
  }, []);

  const onExiting = () => {
    setCollapseClasses('collapsing-out');
  };

  const onExited = () => {
    setCollapseClasses('');
  };

  return (
    <div>
      <header className="header-global">
        <DemoNavbar
          collapseClasses={collapseClasses}
          onExiting={onExiting}
          onExited={onExited}
        />
      </header>
      <main>
        <section>
          <Row className="justify-content-center">
            <Col lg="10">
              <h1 className="text-center mb-4"></h1>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<PostList />} />
                  <Route path="new" element={<PostCreate />} />
                  <Route path=":id" element={<PostDetail />} />
                  <Route path=":id/edit" element={<PostEdit />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </Col>
          </Row>
        </section>
      </main>
    </div>
  );
};

export default Post;
