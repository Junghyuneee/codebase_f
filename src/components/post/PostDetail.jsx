import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form, Alert,} from 'react-bootstrap';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import ReportModal from "@/components/admin/ReportModal.jsx";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const [editCommentIndex, setEditCommentIndex] = useState(null);



  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/post/detail/${id}`);
        if (!response.ok) throw new Error('게시물 가져오기 실패');
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/post/delete/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('게시물 삭제 실패');
        navigate('/post');
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      if (editCommentIndex !== null) {
        const updatedComments = comments.map((c, index) =>
          index === editCommentIndex ? { ...c, text: comment } : c
        );
        setComments(updatedComments);
        setEditCommentIndex(null);
      } else {
        setComments([...comments, { author: '작성자', text: comment }]);
      }
      setComment('');
    }
  };

  const handleEditComment = (index) => {
    setEditCommentIndex(index);
    setComment(comments[index].text);
  };

  const handleDeleteComment = (index) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      setComments(comments.filter((_, i) => i !== index));
    }
  };

  return (
    <Container className="post-detail-container mt-4">
      {post ? (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{post.author}</Card.Subtitle>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <div className="d-flex justify-content-between">
              <span className="badge bg-secondary">{post.topic}</span>
              <div>
                <Button variant="warning" onClick={() => navigate(`/post/${id}/edit`)}>수정</Button>
                <Button variant="danger" onClick={handleDelete}>삭제</Button>
              </div>
            </div>
            <div className="mt-3">
              <Button variant="link" onClick={() => setLikeCount(likeCount + 1)}><FaThumbsUp /> {likeCount}</Button>
              <Button variant="link" onClick={() => setDislikeCount(dislikeCount + 1)}><FaThumbsDown /> {dislikeCount}</Button>
              <ReportModal
                category={1}
                categoryId={id}
                categoryTitle={post.title}
                memberId={0}
                memberName={""}
              />
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="danger">게시물을 로드하는 중입니다...</Alert>
      )}

      <Form onSubmit={handleCommentSubmit} className="mb-4">
        <Form.Group controlId="comment">
          <Form.Label>댓글 작성</Form.Label>
          <Form.Control as="textarea" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="댓글을 입력하세요" required />
        </Form.Group>
        <Button variant="primary" type="submit">{editCommentIndex !== null ? '댓글 수정' : '댓글 작성'}</Button>
      </Form>

      <h5>댓글 목록</h5>
      {comments.length > 0 ? comments.map((c, index) => (
        <Card key={index} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Subtitle className="mb-1 text-muted">{c.author}</Card.Subtitle>
            <Card.Text>{c.text}</Card.Text>
            <div className="d-flex justify-content-end">
              <Button variant="link" onClick={() => handleEditComment(index)}>수정</Button>
              <Button variant="link" onClick={() => handleDeleteComment(index)}>삭제</Button>
              <ReportModal
                category={1}
                categoryId={id}
                categoryTitle={post.title}
                memberId={0}
                memberName={""}
              />
            </div>
          </Card.Body>
        </Card>
      )) : <p>댓글이 없습니다.</p>}

    </Container>
  );
};

export default PostDetail;
