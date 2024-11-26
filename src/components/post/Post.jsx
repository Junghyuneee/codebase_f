import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div
      style={{
        backgroundColor: '#f0f4f8',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '20px',
        position: 'relative', // 물방울 모양을 위해 상대적 위치 설정
      }}
    >
      <main
        style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '40px 20px', // 패딩 조정
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          borderRadius: '10px',
          position: 'relative', // 물방울 모양을 위해 상대적 위치 설정
        }}
      >
        {/* 물방울 모양 추가 */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '100px',
            backgroundColor: '#007bff',
            borderRadius: '50%',
            filter: 'blur(20px)',
            zIndex: -1,
          }}
        />

        <section>
          <Container className="pt-lg-7">
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
          </Container>
        </section>
      </main>
    </div>
  );
};

export default Post;
