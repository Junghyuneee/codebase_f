// src/views/post/PostCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import './PostCreate.css'; // 스타일을 위한 CSS 파일 import

const PostCreate = () => {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('새 게시물 작성:', { topic, title, tags, content });

    // 여기서 API를 호출하여 게시물을 저장하는 로직을 추가해야 합니다.
    // 예시: await api.createPost({ topic, title, tags, content });

    // 게시물 작성 후 목록 페이지로 이동
    navigate('/post');
  };

  return (
    <Container className="post-create-container mt-4">
      <h1>자유게시판 등록</h1>
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
