/*
한정현
2024-11-06
*/

// src: /api/review/update/{id}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Button,
	FormGroup,
	Input,
	Container,
	Row,
	Col,
	Form,
} from "reactstrap";

import DemoNavbar from "./DemoNavbar";
import SimpleFooter from "./SimpleFooter";
import ReviewHeader from "./ReviewHeader";

const ReviewUpdate = () => {
	const { id } = useParams(); //URL에서 id 파라미터를 가져옴
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const navigate = useNavigate();

	// 리뷰 데이터 가져오기
	useEffect(() => {
		const fetchReview = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/review/detail/${id}`
				);
				const data = await response.json();
				setTitle(data.title);
				setContent(data.content);
			} catch (error) {
				console.error("리뷰 불러오기 오류:", error);
				alert("리뷰를 불러오는 중 오류가 발생했습니다.");
			}
		};
		fetchReview();
	}, [id]);

	// 수정된 리뷰 서버 전송
	const handleUpdate = async (e) => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) {
			alert("제목과 내용을 모두 입력해주세요.");
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:8080/api/review/update/${id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ title, content }),
				}
			);
			if (response.ok) {
				alert("리뷰가 수정되었습니다.");

				// 수정된 데이터로 다시 리뷰 상세 페이지를 가져오기
				//const updatedReview = await response.json(); //서버에서 수정된 데이터 받아오기
				//setTitle(updatedReview.title); //수정된 제목 반영
				//setContent(updatedReview.content); //수정된 내용 반영

				navigate(`/review/detail/${id}`); //수정 후 해당 리뷰의 상세 페이지로 돌아감
			} else {
				alert("리뷰 수정에 실패했습니다.");
			}
		} catch (error) {
			console.error("리뷰 수정 오류:", error);
			alert("리뷰 수정 중 오류가 발생했습니다.");
		}
	};

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
