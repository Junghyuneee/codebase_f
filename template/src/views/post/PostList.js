// src/views/post/PostList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form, Pagination } from 'react-bootstrap';
import './PostList.css'; // CSS 파일 import

const PostList = () => {
  const posts = [
    { id: 1, title: '첫 번째 게시물', author: '작성자 A', tags: ['해시태그1'], likes: 73 },
    { id: 2, title: '두 번째 게시물', author: '작성자 B', tags: ['해시태그2'], likes: 45 },
    { id: 3, title: '세 번째 게시물', author: '작성자 C', tags: ['해시태그3'], likes: 30 },
    { id: 4, title: '네 번째 게시물', author: '작성자 D', tags: ['해시태그4'], likes: 50 },
    { id: 5, title: '다섯 번째 게시물', author: '작성자 E', tags: ['해시태그5'], likes: 20 },
    { id: 6, title: '여섯 번째 게시물', author: '작성자 F', tags: ['해시태그6'], likes: 10 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3; // 페이지당 게시물 수
  const totalPages = Math.ceil(posts.length / postsPerPage); // 총 페이지 수

  // 현재 페이지에 해당하는 게시물 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">자유게시판 목록</h1>
      <Link to="/post/new">
        <Button variant="primary" className="mb-3">작성하기</Button>
      </Link>
      <Form className="mb-4">
        <Form.Control type="text" placeholder="커뮤니티 내에서 검색" className="search-bar" />
      </Form>
      <Row>
        {currentPosts.map(post => (
          <Col md={4} key={post.id} className="mb-4">
            <Card className="post-card">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">작성자: {post.author}</Card.Subtitle>
                <Card.Text>
                  {post.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary me-1">{tag}</span>
                  ))}
                </Card.Text>
                <Card.Text>
                  <span>좋아요: {post.likes}</span>
                </Card.Text>
                <Link to={`/post/${post.id}`}>
                  <Button variant="info" className="w-100">상세보기</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
};

export default PostList;
