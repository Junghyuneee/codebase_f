// src/pages/post/PostEdit.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import './PostEdit.css'; // 스타일을 위한 CSS 파일 import

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(''); // 토픽 상태
  const [title, setTitle] = useState(''); // 제목 상태
  const [tags, setTags] = useState(''); // 태그 상태
  const [content, setContent] = useState(''); // 내용 상태

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('게시물 수정:', { id, topic, title, tags, content });
    navigate(`/post/${id}`); // 수정 후 상세페이지로 이동
  };

  return (
    <Container className="post-edit-container mt-4">
      <h1>자유게시판 수정</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="topic">
          <Form.Label>토픽</Form.Label>
          <Form.Control
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="토픽을 입력하세요"
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
            placeholder="제목을 입력하세요"
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
          수정하기
        </Button>
      </Form>
    </Container>
  );
};

export default PostEdit;
