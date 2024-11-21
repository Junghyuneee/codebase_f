/*
한정현
2024-11-06
*/

// src: /api/review/create
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	Button,
	FormGroup,
	Input,
	Container,
	Row,
	Col,
	Form,
} from 'reactstrap';

import DemoNavbar from './DemoNavbar';
import SimpleFooter from './SimpleFooter';
import ReviewHeader from './ReviewHeader';

const ReviewCreate = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const navigate = useNavigate();

	//리뷰 등록
	const handleSubmit = async (e) => {
		e.preventDefault();

		// 입력값 확인
		if (!title.trim() || !content.trim()) {
			alert('제목과 내용을 모두 입력해주세요.');
			return;
		}

		try {
			// 서버에 데이터 전송
			const response = await fetch(`http://localhost:8080/api/review`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, content }),
			});

			if (response.ok) {
				// 성공적으로 등록되었을 경우
				alert('리뷰가 성공적으로 등록되었습니다.');
				setTitle('');
				setContent('');
				navigate(`/review`); // 목록 페이지로 이동
			} else {
				const errorData = await response.json();
				console.error('리뷰 등록 실패:', errorData);
				alert('리뷰 등록에 실패했습니다.');
			}
		} catch (error) {
			console.error('리뷰 등록 오류:', error.message);
			alert('리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
		}
	};

	//리뷰 목록 돌아가기
	const handleNavigateToList = () => {
		navigate(`/review`); // 'ReviewList' 페이지로 이동
	};

	return (
		<>
			<DemoNavbar />
			<main>
				<ReviewHeader />
				<section className="section">
					<Container>
						{/* 폼 태그 */}
						<div className="bg-gradient-secondary shadow mt-3 p-3">
							{/* 버튼 */}
							<div className="text-right">
								<Button
									className="btn-icon mb-3 mb-sm-0 btn-info"
									color="info"
									onClick={handleNavigateToList}
									style={{ width: '5rem' }}
								>
									<span className="btn-inner--text">목록</span>
								</Button>
							</div>
							<Row className="justify-content-center ">
								<Col lg="12">
									<Form onSubmit={handleSubmit}>
										<FormGroup className="mt-3">
											<Input
												placeholder="제목을 입력하세요."
												type="text"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
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
			<SimpleFooter />
		</>
	);
};

export default ReviewCreate;
