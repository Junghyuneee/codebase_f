/*
한정현
2024-11-06
*/

// src: /api/review/update/{id}
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const ReviewUpdate = () => {
	const { id } = useParams(); //URL에서 id 파라미터를 가져옴
	//const [review, setReview] = useState({ title: '', content: ''}); // 수정할 리뷰 데이터
	const [loading, setLoading] = useState(true); // 로딩 상태
	const [error, setError] = useState(null); // 오류 상태
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const navigate = useNavigate(); // 리다이렉션 처리

	// 리뷰 데이터 가져오기
	useEffect(() => {
		const fetchReview = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/review/detail/${id}`
				);
				const data = await response.json();
				//setReview(data);
				setLoading(false);
				setTitle(data.title);
				setContent(data.content);
			} catch (error) {
				//console.error('리뷰 불러오기 오류:', error);
				//alert('리뷰를 불러오는 중 오류가 발생했습니다.');
				setError('리뷰 정보를 가져오는 중 오류가 발생했습니다.');
				setLoading(false);
			}
		};
		fetchReview();
	}, [id]);

	// 수정된 리뷰 서버 전송
	const handleUpdate = async (e) => {
		e.preventDefault(); //폼 제출 기본 동작 막기
		const updatedReview = { title, content };
		//if (!title.trim() || !content.trim()) {
		//	alert('제목과 내용을 모두 입력해주세요.');
		//	return;
		//}

		// id, title, content 값을 콘솔에 출력하여 확인
		//console.log('id:', id);
		//console.log('title:', title);
		//console.log('content:', content);

		try {
			const response = await fetch(
				`http://localhost:8080/api/review/update/${id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(updatedReview), // 수정된 리뷰 데이터 전송
				}
			);
			//const responsebody = await response.json();
			//console.log(responsebody); //응답 본문 로그 확인

			if (response.ok) {
				// 수정된 데이터로 다시 리뷰 상세 페이지를 가져오기
				//const updatedReview = await response.json(); //서버에서 수정된 데이터 받아오기
				//const updatedReview = JSON.parse(responsebody);
				//setTitle(updatedReview.title); //수정된 제목 반영
				//setContent(updatedReview.content); //수정된 내용 반영
				alert('리뷰가 수정되었습니다.');
				//navigate(`/review/detail/${id}`); //수정 후 해당 리뷰의 상세 페이지로 돌아감
				navigate(`/review`);
			} else {
				//const errorData = await response.json();
				//const errorData = JSON.parse(responsebody);
				//alert(
				//	`리뷰 수정에 실패: ${errorData.message || '알 수 없는 오류'} ${
				//		response.statusText
				//	}`
				//);
				throw new Error('리뷰 수정 실패');
			}
		} catch (error) {
			console.error('리뷰 수정 오류:', error);
			alert('리뷰 수정 중 오류가 발생했습니다.');
		}
	};

	// 로딩 중, 오류 처리
	if (loading) {
		return <div>리뷰 정보를 불러오는 중...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			<DemoNavbar />
			<main>
				<ReviewHeader />
				<section className="section">
					<Container>
						<div className="bg-gradient-secondary shadow mt-3 p-3">
							<Row className="justify-content-center">
								<Col lg="12">
									<Form onSubmit={handleUpdate}>
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
										<Button
											block
											className="btn-round"
											color="default"
											size="lg"
											type="submit"
										>
											수정하기
										</Button>
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

export default ReviewUpdate;
