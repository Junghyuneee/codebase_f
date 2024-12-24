// src/pages/post/PostCreate.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Alert } from "react-bootstrap";
import { getAccessToken, getName } from '@/api/auth/getset.js'; // 토큰과 사용자 이름을 가져오는 함수


const PostCreate = () => {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(''); // 작성자 상태
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 확인 및 작성자 이름 설정
    if (!getAccessToken()) {
      alert('로그인이 필요합니다.');
      navigate('/login', { state: { from: '/post/create' } }); // 로그인 페이지로 리다이렉트
    } else {
      const name = getName(); // 로그인한 사용자의 이름을 가져옴
      if (name) {
        setAuthor(name); // 작성자 이름 설정
      } else {
        setError('작성자 정보를 가져올 수 없습니다.');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // 이전 에러 메시지 초기화

    // 입력값 확인
    if (!topic || !title || !content) {
      setError('모든 필드를 채워주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          title,
          content,
          author, // author 값을 포함
        }),
      });

      if (response.ok) {
        navigate('/post'); // 게시물 목록 페이지로 이동
      } else {
        const errorData = await response.json();
        setError('게시물 등록 실패: ' + errorData.message);
      }
    } catch (err) {
      setError('게시물 작성 중 오류가 발생했습니다: ' + err.message);
      console.error(err);
    }
  };

  return (
    <Container className="post-create-container mt-4">
      <h1>자유게시판 등록</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="topic">
          <Form.Label>주제</Form.Label>
          <Form.Control
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="mb-3"
          />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mb-3"
          />
        </Form.Group>
        {/* 작성자 입력란 제거 */}
        <Form.Group controlId="content">
          <Form.Label>본문</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className="mb-3"
          />
          <Form.Text className="text-muted">
            여러분의 생각을 자유롭게 표현해 주세요. 함께 의견을 나누는 것이 중요합니다.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          등록하기
        </Button>
      </Form>
    </Container>
  );
};

export default PostCreate;
