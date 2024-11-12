// src/views/post/PostList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form, Pagination, Dropdown } from 'react-bootstrap';
import './PostList.css'; // CSS 파일 import

const PostList = () => {
  const initialPosts = [
    { id: 1, title: '첫 번째 게시물', author: '작성자 A', tags: ['해시태그1'], likes: 73, views: 100 },
    { id: 2, title: '두 번째 게시물', author: '작성자 B', tags: ['해시태그2'], likes: 45, views: 200 },
    { id: 3, title: '세 번째 게시물', author: '작성자 C', tags: ['해시태그3'], likes: 30, views: 150 },
    { id: 4, title: '네 번째 게시물', author: '작성자 D', tags: ['해시태그4'], likes: 50, views: 300 },
    { id: 5, title: '다섯 번째 게시물', author: '작성자 E', tags: ['해시태그5'], likes: 20, views: 50 },
    { id: 6, title: '여섯 번째 게시물', author: '작성자 F', tags: ['해시태그6'], likes: 10, views: 75 },
    { id: 7, title: '일곱 번째 게시물', author: '작성자 G', tags: ['해시태그7'], likes: 50, views: 300 },
    { id: 8, title: '여덟 번째 게시물', author: '작성자 H', tags: ['해시태그8'], likes: 20, views: 50 },
    { id: 9, title: '아홉 번째 게시물', author: '작성자 Y', tags: ['해시태그9'], likes: 10, views: 75 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('최신순');
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const postsPerPage = 3; // 페이지당 게시물 수
  const totalPages = Math.ceil(initialPosts.length / postsPerPage); // 총 페이지 수

  // 게시물 정렬
  const sortedPosts = [...initialPosts].sort((a, b) => {
    switch (sortOption) {
      case '최신순':
        return b.id - a.id; // ID로 최신순 정렬
      case '추천순':
        return b.likes - a.likes; // 좋아요로 추천순 정렬
      case '댓글순':
        return 0; // 댓글 수에 대한 데이터가 없으므로 0으로 설정
      case '조회순':
        return b.views - a.views; // 조회수로 정렬
      default:
        return 0;
    }
  });

  // 검색 기능 구현: 제목 또는 작성자에 검색어가 포함된 게시물 필터링
  const filteredPosts = sortedPosts.filter(post =>
    post.title.includes(searchTerm) || post.author.includes(searchTerm)
  );

  // 현재 페이지에 해당하는 게시물 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">자유게시판 목록</h1>
      <Link to="/post/new">
        <Button variant="primary" className="mb-3 custom-button" size="sm">작성하기</Button>
      </Link>

      <Form className="mb-4">
        <Form.Control 
          type="text" 
          placeholder="커뮤니티 내에서 검색" 
          className="search-bar" 
          value={searchTerm} // 검색어 상태를 Form.Control의 value에 바인딩
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // 검색 시 페이지를 1로 리셋
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
                setCurrentPage(1); // 페이지를 1로 리셋
              }}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Row>
        {currentPosts.map(post => (
          <Col md={4} key={post.id} className="mb-4">
            <Card className="post-card shadow-sm"> {/* 카드에 그림자 추가 */}
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
        ))}
      </Row>
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1} {/* 현재 페이지 숫자만 표시 */}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)} />
      </Pagination>
    </Container>
  );
};

export default PostList;
