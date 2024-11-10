/*
한정현
2024-11-06
*/

import React, { useState } from 'react';
import axios from 'axios';

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
	Form,
} from 'reactstrap';

// core components
import Navbar from 'views/review/Navbar.js';
import Footer from 'views/review/Footer.js';
import ReviewHeader from 'views/review/Header.js';

function ReviewCreate() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('새로운 리뷰 작성:', { title, content });
		// 서버로 데이터 전송 로직 추가 기능
	};

	const handleNavigateToList = () => {
		window.location.href = '/review'; // '/review' 페이지로 이동
	};

	return (
		<>
			<Navbar />
			<main>
				<ReviewHeader />
				<section className="section">
					<Container>
						{/* 버튼 */}
						<div className="btn-wrapper ml-auto text-right">
							<Button
								className="btn-icon mb-3 mb-sm-0 ml-auto"
								color="info"
								onClick={handleNavigateToList}
							>
								<span className="btn-inner--text">목록</span>
							</Button>
							<Button className="btn-icon mb-3 mb-sm-0 ml-auto" color="info">
								<span className="btn-inner--text">수정하기</span>
							</Button>
							<Button className="btn-icon mb-3 mb-sm-0 ml-auto" color="info">
								<span className="btn-inner--text">삭제하기</span>
							</Button>
						</div>
						{/* 폼 태그 */}
						<div className="bg-gradient-secondary shadow mt-5">
							<Row className="justify-content-center ">
								<Col lg="12">
									<Form onSubmit={handleSubmit}>
										<FormGroup className="mt-5">
											<InputGroup className="input-group-alternative">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="ni ni-user-run" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
													placeholder="제목을 입력하세요."
													type="text"
													value={title}
													onChange={(e) => setTitle(e.target.value)}
												/>
											</InputGroup>
										</FormGroup>
										<FormGroup className="mb-4">
											<Input
												className="form-control-alternative"
												cols="200"
												name="content"
												placeholder="내용을 입력하세요."
												rows="20"
												type="textarea"
												value={content}
												onChange={(e) => setContent(e.target.value)}
											/>
										</FormGroup>
										<div>
											<Button
												block
												className="btn-round"
												color="default"
												size="lg"
												type="submit"
											>
												등록하기
											</Button>
										</div>
									</Form>
								</Col>
							</Row>
						</div>
					</Container>
				</section>
			</main>
			<Footer />
		</>
	);
}

export default ReviewCreate;
