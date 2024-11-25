// src/components/post/PostDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Form, Alert, Modal } from 'react-bootstrap';
import { FaThumbsUp, FaThumbsDown, FaExclamationTriangle } from 'react-icons/fa';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = { 
    title: `게시물 ${id}`, 
    content: `내용 ${id}`,
    author: '작성자 A',
    tags: ['해시태그1', '해시태그2']
  };

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [reportMessage, setReportMessage] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [reportCommentIndex, setReportCommentIndex] = useState(null);

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
      setComments([...comments, { author: '작성자', text: comment, id: comments.length, likeCount: 0, dislikeCount: 0 }]);
      setComment('');
    }
  };

  const handleShowReportModal = (index) => {
    setReportCommentIndex(index);
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setReportContent('');
    setReportCommentIndex(null);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (reportCommentIndex !== null) {
      setReportMessage(`댓글이 신고되었습니다. 내용: ${reportContent}`);
      handleCloseReportModal();
    } else {
      setReportMessage(`게시물 ${id}가 신고되었습니다. 내용: ${reportContent}`);
      handleCloseReportModal();
    }
  };

  const handleReportComment = (index) => {
    handleShowReportModal(index);
  };

  const handleEditComment = (index) => {
    const updatedComment = prompt("수정할 댓글을 입력하세요:", comments[index].text);
    if (updatedComment !== null) {
      const updatedComments = [...comments];
      updatedComments[index].text = updatedComment;
      setComments(updatedComments);
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const handleLikePost = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislikePost = () => {
    setDislikeCount(dislikeCount + 1);
  };

  const handleLikeComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].likeCount += 1;
    setComments(updatedComments);
  };

  const handleDislikeComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].dislikeCount += 1;
    setComments(updatedComments);
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
              <Button variant="outline-danger" onClick={handleShowReportModal} className="ms-2 btn-sm">
                <FaExclamationTriangle /> 게시물 신고
              </Button>
              <Button variant="warning" onClick={handleEdit} className="me-2 btn-sm">수정</Button>
              <Button variant="danger" onClick={handleDelete} className="btn-sm">삭제</Button>
            </div>
          </div>
          <div className="mt-3 button-group">
            <Button variant="link" className="me-2" onClick={handleLikePost}>
              <FaThumbsUp /> {likeCount}
            </Button>
            <Button variant="link" onClick={handleDislikePost}>
              <FaThumbsDown /> {dislikeCount}
            </Button>
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
        <Button className="custom-button btn-sm" type="submit">댓글 작성</Button>
      </Form>

      <h5>댓글 목록</h5>
      {comments.length > 0 ? (
        comments.map((c, index) => (
          <Card key={index} className="mb-2">
            <Card.Body>
              <Card.Subtitle className="mb-1 text-muted">{c.author}</Card.Subtitle>
              <Card.Text>{c.text}</Card.Text>
              <div className="button-group">
                <Button variant="link" className="me-2" onClick={() => handleLikeComment(index)}>
                  <FaThumbsUp /> {c.likeCount}
                </Button>
                <Button variant="link" className="me-2" onClick={() => handleDislikeComment(index)}>
                  <FaThumbsDown /> {c.dislikeCount}
                </Button>
                <Button variant="danger" className="me-2" onClick={() => handleReportComment(index)}>
                  <FaExclamationTriangle /> 댓글 신고
                </Button>
                <Button variant="warning" className="me-2" onClick={() => handleEditComment(index)}>수정</Button>
                <Button variant="danger" onClick={() => handleDeleteComment(index)}>삭제</Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>댓글이 없습니다.</p>
      )}

      {reportMessage && (
        <Alert variant="info" className="mt-3">{reportMessage}</Alert>
      )}

      {/* 신고 모달 */}
      <Modal show={showReportModal} onHide={handleCloseReportModal}>
        <Modal.Header closeButton>
          <Modal.Title>{reportCommentIndex !== null ? "댓글 신고" : "게시물 신고"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReportSubmit}>
            <Form.Group controlId="reportContent">
              <Form.Label>신고 내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                required
                placeholder="신고 내용을 입력하세요"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">신고하기</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PostDetail;
