// src/pages/post/Post.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostEdit from './PostEdit';
import PostCreate from './PostCreate';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import './Post.css';
import { Container, Row, Col } from 'reactstrap';

const Post = () => {
  return (
    <main>
      <DemoNavbar />
      <section className="section section-lg section-shaped pb-250">
        <div className="shape shape-style-1 shape-default">
          {/* Shape elements */}
          <span /><span /><span /><span /><span />
          <span /><span /><span /><span /><span />
        </div>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="12">
              <h1 className="text-center mb-4">자유게시판</h1>
              <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/new" element={<PostCreate />} />
                <Route path="/:id" element={<PostDetail />} />
                <Route path="/:id/edit" element={<PostEdit />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Post;
