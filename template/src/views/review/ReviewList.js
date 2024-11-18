/*
한정현
2024--11-06
*/
// api/reviews/selectReview/{id}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// reactstrap components
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardImg,
	FormGroup,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
} from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';

// import Tabs from 'views/review/Tabs.js';
import ReviewHeader from 'views/review/ReviewHeader.js';

function ReviewList() {
	const [reviews, setReviews] = useState([]);

	// 페이지가 로드되었을 때 리뷰 목록을 가져옴
	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await axios.get('/api/reviews');
				setReviews(response.data);
			} catch (error) {
				console.error('리뷰 목록 가져오기 오류:', error);
				alert('리뷰 목록을 가져오는 중 오류가 발생했습니다.');
			}
		};

		fetchReviews();
	}, []);

	return (
		<>
			<DemoNavbar />
			<main>
				<ReviewHeader />
				<section className="section">
					<Container>
						<div className="btn-wrapper ml-auto text-right">
							<Link to="/api/reviews/createReview" className="">
								<Button className="btn-icon mb-3 mb-sm-0 ml-auto" color="info">
									<span className="btn-inner--text">등록하기</span>
								</Button>
							</Link>
						</div>
						<div className="mt-5">
							<table className="col-lg-12">
								<thead>
									<tr>
										<th className="col-lg-2">번호</th>
										<th className="col-lg-6">제목</th>
										<th className="col-lg-2">작성일자</th>
										<th className="col-lg-2">조회수</th>
									</tr>
								</thead>
								<tbody>
									{/* list.map을 사용해서 반복문 구현 */}
									{reviews.map((review) => (
										<tr key={review.id}>
											<Link to={`/api/reviews/selectReview/${review.id}`}>
												{review.title}
											</Link>
											{/* <td>{review.content}</td> */}
											<td>{new Date(review.createdDate).toLocaleString()}</td>
											<td>{review.views}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</Container>
				</section>
			</main>
			<SimpleFooter />
		</>
	);
}

export default ReviewList;
