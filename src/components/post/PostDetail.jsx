// src/components/post/PostDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form, Alert, Modal } from 'react-bootstrap';
import { FaThumbsUp, FaThumbsDown, FaExclamationTriangle } from 'react-icons/fa';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState('');
  const [reportCommentIndex, setReportCommentIndex] = useState(null);
  const [reportMessage, setReportMessage] = useState('');

  const reportReasons = [
    "마음에 들지 않아요", "관련 없는 콘텐츠예요", "거짓 정보가 포함되어 있어요",
    "선정적인 내용이 있어요", "공격적인 내용이 있어요"
  ];

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
      setComments([...comments, { author: '작성자', text: comment }]);
      setComment('');
    }
  };

  const handleShowReportModal = (index) => {
    setReportCommentIndex(index);
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setSelectedReportReason('');
    setReportCommentIndex(null);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!selectedReportReason) {
      alert('신고 사유를 선택해 주세요.');
      return;
    }
    setReportMessage(reportCommentIndex !== null 
      ? `댓글이 신고되었습니다. 사유: ${selectedReportReason}` 
      : `게시물 ${id}가 신고되었습니다. 사유: ${selectedReportReason}`);
    handleCloseReportModal();
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
              <Button variant="danger" onClick={() => handleShowReportModal(null)}><FaExclamationTriangle /> 신고</Button>
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
        <Button variant="primary" type="submit">댓글 작성</Button>
      </Form>

      <h5>댓글 목록</h5>
      {comments.length > 0 ? comments.map((c, index) => (
        <Card key={index} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Subtitle className="mb-1 text-muted">{c.author}</Card.Subtitle>
            <Card.Text>{c.text}</Card.Text>
            <Button variant="danger" onClick={() => handleShowReportModal(index)}><FaExclamationTriangle /> 신고</Button>
          </Card.Body>
        </Card>
      )) : <p>댓글이 없습니다.</p>}

      {reportMessage && <Alert variant="info" className="mt-3">{reportMessage}</Alert>}

      {/* 신고 모달 */}
      <Modal show={showReportModal} onHide={handleCloseReportModal}>
        <Modal.Header closeButton>
          <Modal.Title>{reportCommentIndex !== null ? "댓글 신고" : "게시물 신고"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReportSubmit}>
            <Form.Group controlId="reportReason">
              <Form.Label>신고 사유</Form.Label>
              {reportReasons.map((reason, index) => (
                <Form.Check key={index} type="radio" label={reason} name="reportReason" value={reason} checked={selectedReportReason === reason} onChange={(e) => setSelectedReportReason(e.target.value)} />
              ))}
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">신고하기</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PostDetail;
