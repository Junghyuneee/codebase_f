import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const EditCommentModal = ({ show, handleClose, comment, handleSave }) => {
  const [editedComment, setEditedComment] = useState(comment.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(editedComment);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>댓글 수정</Modal.Title>
        {/* Close button을 제거하거나 숨길 수 있습니다. */}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="editComment">
            <Form.Label>댓글 내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditCommentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired
  }).isRequired,
  handleSave: PropTypes.func.isRequired
};

export default EditCommentModal;
