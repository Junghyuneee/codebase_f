// src/pages/post/PostList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form, Pagination, Dropdown, Alert } from 'react-bootstrap';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('최신순');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const postsPerPage = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/post');
        if (!response.ok) throw new Error('게시물 가져오기 실패');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateComparison = new Date(b.created_at) - new Date(a.created_at);
      switch (sortOption) {
        case '최신순': return dateComparison;
        case '추천순': return b.likes - a.likes;
        case '조회순': return b.views - a.views;
        default: return 0;
      }
    });
  }, [posts, sortOption]);

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedPosts, searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">자유게시판 목록</h1>
      <Link to="/post/new">
        <Button variant="primary" className="mb-3">작성하기</Button>
      </Link>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="mb-4">
        <Form.Control 
          type="text" 
          placeholder="검색" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </Form>
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="success">{sortOption}</Dropdown.Toggle>
        <Dropdown.Menu>
          {['최신순', '추천순', '조회순'].map(option => (
            <Dropdown.Item 
              key={option} 
              onClick={() => { 
                setSortOption(option); 
                setCurrentPage(1); 
              }}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Row>
        {currentPosts.map(post => (
          <Col md={4} key={post.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">작성자: {post.author}</Card.Subtitle>
                <Card.Text>
                  <span>주제: {post.topic}</span><br /> {/* 토픽 추가 */}
                  <span>등록일: {new Date(post.created_at).toLocaleString()}</span><br />
                  <span>좋아요 수: {post.likes}</span><br />
                  <span>조회수: {post.views}</span><br />
                  <span>본문: {post.content}</span> {/* 본문 내용 추가 */}
                </Card.Text>
                <Link to={`/post/${post.id}`}>
                  <Button variant="info">상세보기</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item 
            key={index + 1} 
            active={index + 1 === currentPage} 
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
};

export default PostList;
