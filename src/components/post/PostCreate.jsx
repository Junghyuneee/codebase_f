// src/pages/post/PostCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import './PostCreate.css'; // CSS 파일 import

const PostCreate = () => {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(''); // author 상태 추가
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // 이전 에러 메시지 초기화

    // 입력값 확인
    if (!topic || !title || !content || !author) {
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
          tags: tags.split(',').map(tag => tag.trim()), // 태그를 쉼표로 구분하여 배열로 변환
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
          <Form.Label>토픽</Form.Label>
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
        <Form.Group controlId="author">
          <Form.Label>작성자</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="mb-3"
          />
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>태그</Form.Label>
          <Form.Control
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="쉼표로 구분하여 입력"
            className="mb-3"
          />
        </Form.Group>
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
