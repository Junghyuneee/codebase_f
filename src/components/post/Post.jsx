import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Post.css'; // 스타일을 위한 CSS 파일 import

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
  return (
    <div className="post-container d-flex justify-content-center align-items-center">
      <main className="main-content">
        <section className="section section-lg section-shaped pb-250">
          <div className="shape shape-style-1 shape-default">
            <span /><span /><span /><span /><span />
            <span /><span /><span /><span /><span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="8"> {/* 넓은 컬럼 설정 */}
                <h1 className="text-center mb-4">자유게시판</h1>
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
          </Container>
        </section>
      </main>
    </div>
  );
};

export default Post;
