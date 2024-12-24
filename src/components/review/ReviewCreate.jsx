/*
한정현
2024-11-06
*/

// src: /api/review/create
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Button,
	FormGroup,
	Input,
	Container,
	Row,
	Col,
	Form,
} from "reactstrap";

import NavigationBar from "@/components/Navbars/NavigationBar.jsx";
import SimpleFooter from "./SimpleFooter";
import ReviewHeader from "./ReviewHeader";
import { getAccessToken, getName } from "@/api/auth/getset.js"; // 토큰을 가져오는 함수

const ReviewCreate = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [author, setAuthor] = useState("");
	const [projectteam, setProjecttem] = useState([]); // 프로젝트 목록 상태
	const [selectedProjectteam, setSelectedProjectteam] = useState(""); // 선택한 프로젝트
	const [selectedCategory, setSelectedCategory] = useState(""); // 선택한 카테고리
	const navigate = useNavigate();

	useEffect(() => {
		// 로그인 상태 확인
		if (!getAccessToken()) {
			alert("로그인이 필요합니다.");
			navigate("/review");
			return;
		}

		const name = getName();
		if (name) {
			setAuthor(name);
		} else {
			alert("사용자 정보를 가져오지 못했습니다.");
			//navigate("/login");
		}

		// 팀원 프로젝트 목록 가져오기
		const fetchProjectTeam = async () => {
			try {
				const response = await fetch(`http://localhost:8080/api/projectteams`); // 프로젝트 등록 리스트 API
				if (response.ok) {
					const data = await response.json();
					// 작성한 프로젝트만 필터링 (author와 일치하는 pjt_id)
					const filteredProjects = data.filter(
						(projectteam) => projectteam.pjtowner === name
					);
					console.log(filteredProjects);
					setProjecttem(filteredProjects);
				} else {
					console.error(`프로젝트 목록 불러오기 실패`);
				}
			} catch (error) {
				console.error("프로젝트 목록 불러오기 오류:", error);
			}
		};
		fetchProjectTeam();
	}, [navigate]);

	//리뷰 등록
	const handleSubmit = async (e) => {
		e.preventDefault();

		// 입력값 확인
		if (!title.trim() || !content.trim()) {
			alert("제목과 내용을 모두 입력해주세요.");
			return;
		}

		try {
			// 서버에 데이터 전송
			const response = await fetch(`http://localhost:8080/api/review`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title,
					content,
					author,
					pjt_id: selectedProjectteam || null,
					category: selectedCategory || null,
				}),
			});

			if (response.ok) {
				// 성공적으로 등록되었을 경우
				alert("리뷰가 성공적으로 등록되었습니다.");
				setTitle("");
				setContent("");
				setSelectedProjectteam("");
				setSelectedCategory("");
				navigate(`/review`); // 목록 페이지로 이동
			} else {
				const errorData = await response.json();
				console.error("리뷰 등록 실패:", errorData);
				alert("리뷰 등록에 실패했습니다.");
			}
		} catch (error) {
			console.error("리뷰 등록 오류:", error.message);
			alert("리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
		}
	};

	//리뷰 목록 돌아가기
	const handleNavigateToList = () => {
		navigate(`/review`); // 'ReviewList' 페이지로 이동
	};

	return (
		<>
			<NavigationBar />
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
									style={{ width: "5rem" }}
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
										<FormGroup>
											<Input
												type="select"
												value={selectedCategory}
												onChange={(e) => setSelectedCategory(e.target.value)}
											>
												<option value="">게시물 구분 선택</option>
												<option value="팀원">팀원</option>
												<option value="프로젝트">프로젝트</option>
											</Input>
										</FormGroup>
										<FormGroup>
											<Input
												type="select"
												value={selectedProjectteam}
												onChange={(e) => setSelectedProjectteam(e.target.value)}
											>
												<option value="">프로젝트 선택</option>
												{projectteam.map((projectteam) => (
													<option
														key={projectteam.pjt_id}
														value={projectteam.pjt_id}
													>
														{projectteam.pjtname}
													</option>
												))}
											</Input>
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
