/*
한정현
2024-11-06
*/

// src: /api/review/detail/{id}
// src: /api/review/delete/{id}
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button, Container, Row, Col } from 'reactstrap';

import DemoNavbar from './DemoNavbar';
import SimpleFooter from './SimpleFooter';
import ReviewHeader from './ReviewHeader';

const ReviewDetail = () => {
	const { id } = useParams(); // URL에서 id 파라미터를 가져옴
	const [review, setReview] = useState(null); // 리뷰 데이터
	const [loading, setLoading] = useState(true); // 로딩 상태
	const [error, setError] = useState(null); // 오류 상태
	const [likes, setLikes] = useState(0); // 좋아요 카운트
	const [dislikes, setDislikes] = useState(0); // 싫어요 카운트
	const [comments, setComments] = useState([]); // 댓글 목록
	const [newComment, setNewComment] = useState(''); // 새 댓글 내용
	const navigate = useNavigate(); // useNavigate로 리다이렉션 처리

	// 페이지가 로드되었을 때 해당 리뷰를 가져옴
	useEffect(() => {
		const fetchReviewDetail = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/review/detail/${id}`
				);
				const data = await response.json();
				console.log(data); //응답 데이터 출력

				setReview(data);
				setLikes(data.likes || 0); // 초기 좋아요 수 설정
				setDislikes(data.dislikes || 0); // 초기 싫어요 수 설정
				setLoading(false);
			} catch (error) {
				setError('리뷰 정보를 가져오는 중 오류가 발생했습니다.');
				setLoading(false);
			}
		};

		fetchReviewDetail();
		//fetchComments();
	}, [id]);

	// 댓글 가져오기
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/review/comment/${id}`
				);
				const data = await response.json();
				setComments(data.comments || []); // comments 배열 설정
			} catch (error) {
				console.error('댓글 정보를 가져오는 중 오류가 발생했습니다:', error);
			}
		};
		fetchComments();
	}, [id]);

	// 댓글 추가
	const handleAddComment = async () => {
		if (!newComment.trim()) {
			alert('댓글 내용을 입력해주세요.');
			return;
		}

		try {
			await fetch(`http://localhost:8080/api/review/comment/add`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ reviewId: id, content: newComment }),
			});
			setNewComment('');
			//fetchComments(); // 댓글 목록 갱신
		} catch (error) {
			console.error('댓글 추가 중 오류가 발생했습니다:', error);
		}
	};

	// 삭제 함수
	const handleDelete = async () => {
		try {
			//id값 확인
			console.log('삭제할 리뷰 id:', { id });

			const response = await fetch(
				`http://localhost:8080/api/review/delete/${id}`,
				{
					method: 'DELETE',
				}
			);

			if (response.ok) {
				alert('리뷰가 삭제되었습니다');
				navigate('/review');
			} else {
				throw new Error('리뷰 삭제 실패');
			}
		} catch (error) {
			console.error('삭제 요청 중 오류 발생: ', error);
			alert('리뷰 삭제 중 오류가 발생했습니다.');
		}
	};

	// 좋아요 버튼 클릭 핸들러
	const handleLike = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/review/like/${id}`,
				{
					method: 'POST',
				}
			);
			if (response.ok) {
				setLikes(likes + 1);
			}
		} catch (error) {
			console.error('좋아요 요청 중 오류 발생: ', error);
		}
	};

	// 싫어요 버튼 클릭 핸들러
	const handleDislike = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/review/dislike/${id}`,
				{
					method: 'POST',
				}
			);
			if (response.ok) {
				setDislikes(dislikes + 1);
			}
		} catch (error) {
			console.error('싫어요 요청 중 오류 발생: ', error);
		}
	};

	if (error) return <div>{error}</div>;

	return (
		<>
			<DemoNavbar />
			<main>
				<ReviewHeader />
				<section className="section">
					<Container>
						<div className="px-4">
							<Col className="justify-content-center">
								{/* 로딩 중일 때와 에러 발생 시 처리를 조건부 렌더링 */}
								{loading && <div>리뷰 정보를 불러오는 중...</div>}
								{error && <div>{error}</div>}
								{/* 리뷰 데이터를 가져왔을 때만 해당 내용 표시 */}
								{review && !loading && !error && (
									<>
										<Row className="justify-content-center">
											<Col className="order-lg-2 text-center" lg="3">
												<h1 className="display-4">{review.title}</h1>
											</Col>
											<Col
												className="order-lg-1 text-lg-left align-self-lg-center"
												lg="4"
											>
												<div>
													<Button
														className="float-left"
														color="default"
														href={`/review`}
														size="sm"
													>
														목록
													</Button>
												</div>
											</Col>
											<Col
												className="order-lg-3 text-lg-right align-self-lg-center"
												lg="4"
											>
												<div>
													<Button
														color="default"
														href={`/review/update/${id}`}
														size="sm"
													>
														수정하기
													</Button>
													<Button
														color="danger"
														size="sm"
														onClick={handleDelete}
													>
														삭제하기
													</Button>
												</div>
											</Col>
										</Row>

										<div className="mt-4 py-4 border-top text-center">
											<Row>
												<Col sm="6">
													<small className="float-left ml-1">
														{new Date(review.createdDate).toLocaleString()}
													</small>
												</Col>
												<Col sm="6">
													<small className="float-right mr-1">
														조회수: {review.views}
													</small>
												</Col>
											</Row>
											<Row className="py-5">
												<Col className="text-lg-left">
													<strong>{review.content}</strong>
												</Col>
											</Row>

											{/*좋아요와 싫어요 버튼 및 카운트 표시*/}
											<Row className="mt-4">
												<Col>
													<Button color="success" onClick={handleLike}>
														👍 좋아요 {likes}
													</Button>
													<Button color="danger" onClick={handleDislike}>
														👎 싫어요 {dislikes}
													</Button>
												</Col>
											</Row>
										</div>
									</>
								)}
							</Col>
						</div>

						<div>
							<h4>댓글</h4>
							{comments.length > 0 ? (
								comments.map((comment) => (
									<div key={comment.id}>
										<p>{comment.content}</p>
									</div>
								))
							) : (
								<p>댓글이 없습니다.</p>
							)}
						</div>
						{/*댓글 목록*/}
						<div className="mt-4">
							<h4>댓글</h4>
							{comments.map((comment) => (
								<div key={comment.id}>
									<p>{comment.content}</p>
									<small>
										{new Date(comment.createdDate).toLocaleString()}
									</small>
								</div>
							))}
						</div>
						{/*댓글 추가*/}
						<div className="mt-3">
							<input
								type="text"
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder="댓글을 입력하세요"
							></input>
							<Button color="primary" size="sm" onClick={handleAddComment}>
								댓글 추가
							</Button>
						</div>
					</Container>
				</section>
			</main>
			<SimpleFooter />
		</>
	);
};

export default ReviewDetail;
