// src/pages/post/PostList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form, Pagination, Dropdown } from 'react-bootstrap';
import PostService from './PostService'; // API 호출을 위한 서비스
import './PostList.css'; // CSS 파일 import

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('최신순');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const postsPerPage = 3;

  // 게시물 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await PostService.getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('게시물 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 게시물 정렬
  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortOption) {
      case '최신순':
        return b.id - a.id;
      case '추천순':
        return b.likes - a.likes;
      case '댓글순':
        return 0; // 댓글 수 데이터가 없으므로 0으로 설정
      case '조회순':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  // 게시물 필터링
  const filteredPosts = sortedPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션 관련 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">자유게시판 목록</h1>
      <Link to="/post/new">
        <Button variant="primary" className="mb-3" size="sm">작성하기</Button>
      </Link>

      <Form className="mb-4">
        <Form.Control 
          type="text" 
          placeholder="커뮤니티 내에서 검색" 
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Form>

      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {sortOption}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {['최신순', '추천순', '댓글순', '조회순'].map(option => (
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
        {loading ? (
          <Col className="text-center">
            <h5>로딩 중...</h5>
          </Col>
        ) : currentPosts.length > 0 ? (
          currentPosts.map(post => (
            <Col md={4} key={post.id} className="mb-4">
              <Card className="post-card shadow-sm">
                <Card.Body>
                  <Card.Title className="font-weight-bold">{post.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">작성자: {post.author}</Card.Subtitle>
                  <Card.Text>
                    {post.tags.map((tag, index) => (
                      <span key={index} className="badge bg-secondary me-1">{tag}</span>
                    ))}
                  </Card.Text>
                  <Card.Text>
                    <span>좋아요: {post.likes}</span> | <span>조회수: {post.views}</span>
                  </Card.Text>
                  <Link to={`/post/${post.id}`}>
                    <Button variant="info" className="w-100">상세보기</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <h5>게시물이 없습니다.</h5>
          </Col>
        )}
      </Row>

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)} />
      </Pagination>
    </Container>
  );
};

export default PostList;
