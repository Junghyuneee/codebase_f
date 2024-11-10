/*
한정현
2024--11-06
*/

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
import Navbar from 'views/review/Navbar.js';
import Footer from 'views/review/Footer.js';
// import Tabs from 'views/review/Tabs.js';
import ReviewHeader from 'views/review/Header.js';

function Review() {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8080/api/reviews')
			.then((response) => setReviews(response.data))
			.catch((error) => console.error('Error fetching reviews:', error));
	}, []);

	return (
		<>
			<Navbar />
			<main>
				<ReviewHeader />
				<section className="section">
					<Container>
						<div className="btn-wrapper ml-auto text-right">
							<Button className="btn-icon mb-3 mb-sm-0 ml-auto" color="info">
								<Link to="/review/create" className="">
									<span className="btn-inner--text">등록하기</span>
								</Link>
							</Button>
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
											<td>{review.title}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</Container>
				</section>
			</main>
			<Footer />
		</>
	);
}

export default Review;
