import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Alert, Spinner } from "react-bootstrap";

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState({
    title: '',
    content: '',
    topic: '',
  });
  const [error, setError] = useState(''); // 에러 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

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
        });
      } catch (err) {
        console.error(err.message);
        setError(err.message); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 완료
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
        body: JSON.stringify(post), // 직접 post 객체 사용
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '게시물 수정 실패');
      }
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err.message);
      setError('게시물 수정 중 오류가 발생했습니다: ' + err.message);
    }
  };

  if (loading) {
    return <Spinner animation="border" />; // 로딩 스피너 표시
  }

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
        <Button variant="primary" type="submit" className="mt-3">수정하기</Button>
      </Form>
    </Container>
  );
};

export default PostEdit;
