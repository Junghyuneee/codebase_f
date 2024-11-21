/*
한정현
2024--11-06
*/

// src: api/reviews
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

// reactstrap components
import {
	Button,
	Container,
	FormGroup,
	Col,
	Row,
	InputGroup,
	Input,
	InputGroupAddon,
	InputGroupText,
} from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';
//import Input from 'views/review/Inputs.js';

// import Tabs from 'views/review/Tabs.js';
import ReviewHeader from 'views/review/ReviewHeader.js';

function ReviewList() {
	const [review, setReview] = useState([]);
	//const [search, setSearch] = useState('');

	// 페이지가 로드되었을 때 리뷰 목록을 가져옴
	useEffect(() => {
		const fetchReview = async () => {
			try {
				const response = await axios.get('/api/review');
				setReview(response.data);
			} catch (error) {
				console.error('리뷰 목록 가져오기 오류:', error);
				alert('리뷰 목록을 가져오는 중 오류가 발생했습니다.');
			}
		};

		fetchReview();
	}, []); //search 추가

	// 조회수
	const handleReviewClick = async (id) => {
		try {
			await axios.put(`/api/review/increaseViews/${id}`);
			setReview((prevReviews) =>
				prevReviews.map((review) =>
					review.id === id ? { ...review, views: review.views + 1 } : review
				)
			);
		} catch (error) {
			console.error('조회수 증가 오류:', error);
		}
	};

	return (
		<>
			<DemoNavbar />
			<main>
				<ReviewHeader />
				<section className="section">
					<Container>
						<div className="d-flex justify-content-between mb-4">
							{/*검색창*/}
							<InputGroup className="mb-4" style={{ width: '15rem' }}>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="ni ni-zoom-split-in" />
									</InputGroupText>
								</InputGroupAddon>
								<Input
									placeholder="Search"
									type="text"
									//value={search}
									//onChange={(e) => setSearch(e.target.value)} // 검색어 상태 업데이트
								/>
							</InputGroup>

							{/*목록버튼*/}
							<Link to="/review/create" className="">
								<Button
									className="btn-icon mb-3 mb-sm-0 ml-auto"
									color="info"
									style={{ width: '7rem' }}
								>
									<span className="btn-inner--text">등록하기</span>
								</Button>
							</Link>
						</div>
						<div className="mt-5">
							<table
								className="col-lg-12"
								style={{ borderCollapse: 'collapse', width: '100%' }}
							>
								<thead>
									<tr>
										<th
											className="col-lg-1"
											style={{
												padding: '10px',
												textAlign: 'left',
												backgroundColor: '#f8f9fa',
											}}
										>
											번호
										</th>
										<th
											className="col-lg-4"
											style={{
												padding: '10px',
												textAlign: 'left',
												backgroundColor: '#f8f9fa',
											}}
										>
											제목
										</th>
										<th
											className="col-lg-1"
											style={{
												padding: '10px',
												textAlign: 'left',
												backgroundColor: '#f8f9fa',
											}}
										>
											작성자
										</th>
										<th
											className="col-lg-3"
											style={{
												padding: '10px',
												textAlign: 'left',
												backgroundColor: '#f8f9fa',
											}}
										>
											작성일자
										</th>
										<th
											className="col-lg-1"
											style={{
												padding: '10px',
												textAlign: 'left',
												backgroundColor: '#f8f9fa',
											}}
										>
											조회수
										</th>
									</tr>
								</thead>
								<tbody>
									{/* list.map을 사용해서 반복문 구현 */}
									{review.map((review) => (
										<tr
											key={review.id}
											style={{
												borderTop: '1px solid #ddd',
												borderBottom:
													review.id === review[review.length - 1]
														? '2px solid #ccc'
														: 'none',
											}}
										>
											<td style={{ padding: '10px' }}>{review.id}</td>
											<td style={{ padding: '10px' }}>
												<Link
													to={`/review/detail/${review.id}`}
													onClick={() => handleReviewClick(review.id)} // 클릭시 조회수 증가
												>
													{review.title}
												</Link>
											</td>
											<td>{review.author}</td>
											<td style={{ padding: '10px' }}>
												{new Date(review.createdDate).toLocaleString()}
											</td>
											<td style={{ padding: '10px' }}>{review.views}</td>
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
