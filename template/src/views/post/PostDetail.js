// src/views/post/PostDetail.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form } from 'react-bootstrap';
import './PostDetail.css'; // 스타일을 위한 CSS 파일 import

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 실제 데이터는 API에서 가져오는 것이 일반적입니다.
  const post = { 
    title: `게시물 ${id}`, 
    content: `내용 ${id}`,
    author: '작성자 A',
    tags: ['해시태그1', '해시태그2']
  };

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleDelete = () => {
    console.log(`게시물 ${id}가 삭제되었습니다.`);
    navigate('/post');
  };

  const handleEdit = () => {
    navigate(`/post/${id}/edit`);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      setComments([...comments, { author: '작성자', text: comment }]);
      setComment('');
    }
  };

  return (
    <Container className="mt-4 post-detail-container">
      <Card className="mb-4">
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{post.author}</Card.Subtitle>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <div className="d-flex justify-content-between">
            <div>
              {post.tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-1">{tag}</span>
              ))}
            </div>
            <div>
              <Button variant="warning" onClick={handleEdit} className="me-2">수정</Button>
              <Button variant="danger" onClick={handleDelete}>삭제</Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Form onSubmit={handleCommentSubmit} className="mb-4">
        <Form.Group controlId="comment">
          <Form.Label>댓글 작성</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">댓글 작성</Button>
      </Form>

      <h5>댓글 목록</h5>
      {comments.length > 0 ? (
        comments.map((c, index) => (
          <Card key={index} className="mb-2">
            <Card.Body>
              <Card.Subtitle className="mb-1 text-muted">{c.author}</Card.Subtitle>
              <Card.Text>{c.text}</Card.Text>
              <div>
                <Button variant="danger" className="me-2">신고</Button>
                <Button variant="success">좋아요</Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </Container>
  );
};

export default PostDetail;
