/*
한정현
2024-11-06
*/

// src: api/reviews
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// reactstrap components
import { Badge, Button, Card, CardBody, Container, Row, Col } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import ReviewHeader from 'views/review/ReviewHeader.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';

function ReviewDetail() {
	const { id } = useParams(); // URL에서 id 파라미터를 가져옴
	const [review, setReview] = useState(null); // 리뷰 데이터
	const [loading, setLoading] = useState(true); // 로딩 상태
	const [error, setError] = useState(null); // 오류 상태
	const navigate = useNavigate(); // useNavigate로 리다이렉션 처리

	// 페이지가 로드되었을 때 해당 리뷰를 가져옴
	useEffect(() => {
		const fetchReviewDetail = async () => {
			try {
				const response = await axios.get(`/api/review/detail/${id}`);
				setReview(response.data);
				setLoading(false);
			} catch (error) {
				setError('리뷰 정보를 가져오는 중 오류가 발생했습니다.');
				setLoading(false);
			}
		};

		fetchReviewDetail();
	}, [id]);

	// 삭제 함수
	const handleDelete = async () => {
		try {
			await axios.delete('/api/review/delete/${id}');
			alert('리뷰가 삭제되었습니다.');
			navigate('/review'); //삭제 후 리뷰 목록 페이지로 리다이렉트
		} catch (error) {
			alert('리뷰 삭제 중 오류가 발생했습니다.');
		}
	};

	return (
		<>
			<DemoNavbar />
			<main>
				<ReviewHeader />
				<section className="section">
					<Container>
						<Row className="justify-content-center">
							<Col lg="8">
								<Card className="shadow border-0">
									<CardBody>
										{/* 로딩 중일 때와 에러 발생 시 처리를 조건부 렌더링 */}
										{loading && <div>리뷰 정보를 불러오는 중...</div>}
										{error && <div>{error}</div>}
										{/* 리뷰 데이터를 가져왔을 때만 해당 내용 표시 */}
										{review && !loading && !error && (
											<>
												<h2>{review.title}</h2>
												<p>{review.content}</p>
												<Badge color="info">
													{new Date(review.createdDate).toLocaleString()}
												</Badge>
												<br />
												{/* 조회수는 읽기 전용 */}
												<small>조회수: {review.views}</small>
												<hr />
												{/* 수정 버튼 및 삭제 버튼 */}
												<Button color="primary" href={`/review/update/${id}`}>
													수정하기
												</Button>
												<Button
													color="danger"
													className="ml-2"
													onClick={handleDelete}
												>
													삭제하기
												</Button>
											</>
										)}
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				</section>
			</main>
			<SimpleFooter />
		</>
	);
}

export default ReviewDetail;
