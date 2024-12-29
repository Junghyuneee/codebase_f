import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, Alert, Card } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import ReportModal from "@/components/admin/ReportModal.jsx";
import EditCommentModal from "@/components/post/EditCommentModal.jsx";
import { getAccessToken, getName } from '@/api/auth/getset.js'; // 추가: 사용자 이름 가져오기

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(''); // 현재 사용자 이름 저장
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/post/detail/${id}`);
        if (!response.ok) throw new Error('게시물 가져오기 실패');
        const data = await response.json();
        setPost(data);
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setViewCount(data.views || 0);
        setLoading(false);

        // 댓글 목록 가져오기
        const commentsResponse = await fetch(`http://localhost:8080/api/comments/post/${id}`);
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();

    // 현재 사용자 이름 설정
    const token = getAccessToken();
    if (token) {
      setCurrentUserName(getName()); // 로그인한 사용자의 이름을 가져옴
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/post/delete/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('게시물 삭제 실패');
        alert('게시물이 삭제되었습니다.');
        navigate('/post');
      } catch (err) {
        console.error(err.message);
        alert('게시물 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!post) {
      alert('게시글을 찾을 수 없습니다.');
      return;
    }
    
    if (comment.trim()) {
      try {
        const commentData = {
          postId: post.id,
          content: comment.trim(),
          author: currentUserName // 로그인한 사용자 이름 사용
        };

        const response = await fetch('http://localhost:8080/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentData)
        });

        if (!response.ok) {
          throw new Error('댓글 저장 실패');
        }

        const savedComment = await response.json();
        setComments([...comments, savedComment]);
        setComment('');
      } catch (err) {
        console.error('댓글 저장 중 오류:', err);
        alert('댓글 저장에 실패했습니다.');
      }
    }
  };

  const handleEditComment = (index) => {
    setEditCommentIndex(index);
    setShowEditModal(true);
  };

  const handleSaveEditedComment = async (editedContent) => {
    const commentId = comments[editCommentIndex].id;
    try {
      const response = await fetch(`http://localhost:8080/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (!response.ok) {
        throw new Error('댓글 수정 실패');
      }

      const updatedComment = await response.json();
      setComments(comments.map((comment, index) => index === editCommentIndex ? updatedComment : comment));
      setShowEditModal(false);
      setEditCommentIndex(null);
    } catch (err) {
      console.error('댓글 수정 중 오류:', err);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleDeleteComment = (index) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      const commentId = comments[index].id;
      fetch(`http://localhost:8080/api/comments/${commentId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) throw new Error('댓글 삭제 실패');
          setComments(comments.filter((_, i) => i !== index));
        })
        .catch(err => {
          console.error('댓글 삭제 중 오류:', err);
          alert('댓글 삭제에 실패했습니다.');
        });
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/post/like/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error('좋아요 요청 중 오류 발생: ', error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/post/dislike/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        setDislikes(dislikes + 1);
      }
    } catch (error) {
      console.error('싫어요 요청 중 오류 발생: ', error);
    }
  };

  return (
    <Container className="post-detail-container mt-4">
      {loading && <Alert variant="info">리뷰 정보를 불러오는 중...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Button variant="secondary" onClick={() => navigate('/post')} className="mb-3">
        목록
      </Button>

      {post && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{post.author}</Card.Subtitle>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.content}</Card.Text>
            <div className="d-flex justify-content-between">
              <span className="badge bg-secondary">{post.topic}</span>
              <div>
                {post.author === currentUserName && ( // 수정 및 삭제 버튼을 작성자만 볼 수 있도록 조건부 렌더링
                  <>
                    <Button variant="warning" onClick={() => navigate(`/post/${id}/edit`)}>수정</Button>
                    <Button variant="danger" onClick={handleDelete}>삭제</Button>
                  </>
                )}
              </div>
            </div>
            <div className="mt-2">
              <small className="text-muted">등록일: {new Date(post.createDate).toLocaleString()}</small>
            </div>
            <div className="mt-3">
              <Button variant="link" onClick={handleLike}>
                <FaThumbsUp /> {likes}
              </Button>
              <Button variant="link" onClick={handleDislike}>
                <FaThumbsDown /> {dislikes}
              </Button>
              <span className="ml-2">조회수: {viewCount}</span>
              <ReportModal
                category={1}
                categoryId={id}
                categoryTitle={post.title}
                style={{borderColor: 'white', fontWeight: '600', fontSize: '0.875rem'}}
              />
            </div>
          </Card.Body>
        </Card>
      )}

      {currentUserName && (
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
          <Button variant="primary" type="submit">{editCommentIndex !== null ? '댓글 수정' : '댓글 작성'}</Button>
        </Form>
      )}

      <h5>댓글 목록</h5>
      {comments.length > 0 ? comments.map((c, index) => (
        <Card key={c.id} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Subtitle className="mb-1 text-muted">{c.author}</Card.Subtitle>
            <Card.Text>{c.content}</Card.Text>
            <div className="d-flex justify-content-end">
              {c.author === currentUserName && (
                <>
                  <Button variant="link" onClick={() => handleEditComment(index)}>수정</Button>
                  <Button variant="link" onClick={() => handleDeleteComment(index)}>삭제</Button>
                </>
              )}
              <ReportModal
                category={2}
                categoryId={c.id}
                categoryTitle={c.content}
              />
            </div>
          </Card.Body>
        </Card>
      )) : <p>댓글이 없습니다.</p>}

      {editCommentIndex !== null && (
        <EditCommentModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          comment={comments[editCommentIndex]}
          handleSave={handleSaveEditedComment}
        />
      )}
    </Container>
  );
};

export default PostDetail;