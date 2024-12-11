import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Alert } from "react-bootstrap";

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState({
    title: '',
    content: '',
    topic: '',
    tags: '' // 태그 상태 추가
  });
  const [error, setError] = useState(''); // 에러 상태 추가

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/post/detail/${id}`);
        if (!response.ok) throw new Error('게시물 가져오기 실패');
        const data = await response.json();
        setPost({
          title: data.title,
          content: data.content,
          topic: data.topic,
          tags: data.tags ? data.tags.join(', ') : '' // 태그를 쉼표로 구분된 문자열로 변환
        });
      } catch (err) {
        console.error(err.message);
        setError(err.message); // 에러 메시지 설정
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // 이전 에러 메시지 초기화

    // 입력값 확인
    if (!post.title || !post.content || !post.topic) {
      setError('모든 필드를 채워주세요.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/post/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          topic: post.topic,
          tags: post.tags.split(',').map(tag => tag.trim()) // 태그를 배열로 변환
        }),
      });

      if (!response.ok) throw new Error('게시물 수정 실패');
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err.message);
      setError('게시물 수정 중 오류가 발생했습니다: ' + err.message);
    }
  };

  return (
    <Container className="mt-4">
      <h1>게시물 수정</h1>
      {error && <Alert variant="danger">{error}</Alert>} {/* 에러 메시지 표시 */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="content" className="mt-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            rows={5}
            value={post.content}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="topic" className="mt-3">
          <Form.Label>주제</Form.Label>
          <Form.Control
            type="text"
            name="topic"
            value={post.topic}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="tags" className="mt-3">
          <Form.Label>태그</Form.Label>
          <Form.Control
            type="text"
            name="tags"
            value={post.tags}
            onChange={handleChange}
            placeholder="쉼표로 구분하여 입력"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">수정하기</Button>
      </Form>
    </Container>
  );
};

export default PostEdit;
