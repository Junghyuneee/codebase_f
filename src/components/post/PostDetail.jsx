import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Form, Alert, Card, Modal } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import ReportModal from "@/components/admin/ReportModal.jsx";
import { getAccessToken, getName } from '@/api/auth/getset.js'; // 사용자 이름 가져오기

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
  const [currentUserName, setCurrentUserName] = useState(''); // 현재 사용자 이름 저장
  const [userLiked, setUserLiked] = useState(false); // 사용자가 좋아요를 눌렀는지 여부
  const [userDisliked, setUserDisliked] = useState(false); // 사용자가 싫어요를 눌렀는지 여부
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [editCommentId, setEditCommentId] = useState(null); // 수정할 댓글 ID 저장
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태 추가
  const [showChatModal, setShowChatModal] = useState(false); // 채팅방 모달 표시 여부

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

        // 현재 사용자의 좋아요/싫어요 상태 가져오기
        const token = getAccessToken();
        if (token) {
          setIsLoggedIn(true); // 로그인 상태 설정
          const userId = getName(); // 로그인한 사용자의 ID를 가져옴
          const likeStatusResponse = await fetch(`http://localhost:8080/api/post/${id}/like-status?userId=${encodeURIComponent(userId)}`);
          if (likeStatusResponse.ok) {
            const likeStatusData = await likeStatusResponse.json();
            setUserLiked(likeStatusData.liked);
            setUserDisliked(likeStatusData.disliked);
          }
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

        // 댓글 작성 후 페이지 새로고침
        window.location.reload();
      } catch (err) {
        console.error('댓글 저장 중 오류:', err);
        alert('댓글 저장에 실패했습니다.');
      }
    }
  };

  const handleEditComment = (index) => {
    setEditCommentId(comments[index].id); // 수정할 댓글 ID 설정
    setEditCommentContent(comments[index].content);
    setShowEditModal(true);
  };

  const handleSaveEditedComment = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/comments/${editCommentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editCommentContent }),
      });

      if (!response.ok) {
        throw new Error('댓글 수정 실패');
      }

      // 댓글 수정 후 페이지 새로고침
      window.location.reload();
    } catch (err) {
      console.error('댓글 수정 중 오류:', err);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (index) => {
    const commentId = comments[index].id;
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/comments/${commentId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('댓글 삭제 실패');

        // 댓글 삭제 후 페이지 새로고침
        window.location.reload();
      } catch (err) {
        console.error('댓글 삭제 중 오류:', err);
        alert('댓글 삭제에 실패했습니다.');
      }
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/post/like/${id}?userId=${encodeURIComponent(currentUserName)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        if (userLiked) {
          // 좋아요 취소
          setLikes(likes - 1);
          setUserLiked(false);
        } else {
          // 좋아요 추가
          setLikes(likes + 1);
          setUserLiked(true);
          // 만약 사용자가 싫어요를 눌렀다면 싫어요 취소
          if (userDisliked) {
            setDislikes(dislikes - 1);
            setUserDisliked(false);
          }
        }
      }
    } catch (error) {
      console.error('좋아요 요청 중 오류 발생: ', error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/post/dislike/${id}?userId=${encodeURIComponent(currentUserName)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        if (userDisliked) {
          // 싫어요 취소
          setDislikes(dislikes - 1);
          setUserDisliked(false);
        } else {
          // 싫어요 추가
          setDislikes(dislikes + 1);
          setUserDisliked(true);
          // 만약 사용자가 좋아요를 눌렀다면 좋아요 취소
          if (userLiked) {
            setLikes(likes - 1);
            setUserLiked(false);
          }
        }
      }
    } catch (error) {
      console.error('싫어요 요청 중 오류 발생: ', error);
    }
  };

  return (
    <Container className="post-detail-container mt-4">
      {loading && <Alert variant="info">리뷰 정보를 불러오는 중...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      
      <div className="d-flex justify-content-between mb-3">
        <Button variant="secondary" onClick={() => navigate('/post')}>
          목록
        </Button>
        <Button variant="primary" onClick={() => setShowChatModal(true)}>
          채팅
        </Button>
      </div>

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
              <Button variant="link" onClick={handleLike} disabled={!isLoggedIn}>
                <FaThumbsUp /> {likes}
              </Button>
              <Button variant="link" onClick={handleDislike} disabled={!isLoggedIn}>
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
          <Button variant="primary" type="submit">댓글 작성</Button>
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

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header>
          <Modal.Title>댓글 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editComment">
              <Form.Label>댓글 내용</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={editCommentContent} 
                onChange={(e) => setEditCommentContent(e.target.value)} 
                placeholder="댓글을 수정하세요" 
                required 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>취소</Button>
          <Button variant="primary" onClick={handleSaveEditedComment}>저장</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showChatModal} onHide={() => setShowChatModal(false)}>
        <Modal.Header>
          <Modal.Title>채팅</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>채팅방으로 이동하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChatModal(false)}>취소</Button>
          <Button variant="primary" onClick={() => navigate('/chat')}>이동</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PostDetail;