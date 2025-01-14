/*
한정현
2024-11-06
*/

// src: /api/review/detail/{id}
// src: /api/review/delete/{id}
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button, Container, Row, Col } from "react-bootstrap";

import NavigationBar from "@/components/Navbars/NavigationBar.jsx";
import SimpleFooter from "./SimpleFooter";
import ReviewHeader from "./ReviewHeader";
import ReportModal from "@/components/admin/ReportModal.jsx";
import { getAccessToken, getName } from "@/api/auth/getset.js";

const ReviewDetail = () => {
	const { id } = useParams(); // URL에서 id 파라미터를 가져옴
	const [review, setReview] = useState(null); // 리뷰 데이터
	const [loading, setLoading] = useState(true); // 로딩 상태
	const [error, setError] = useState(null); // 오류 상태
	const [likes, setLikes] = useState(0); // 좋아요 카운트
	const [dislikes, setDislikes] = useState(0); // 싫어요 카운트
	const [liked, setLiked] = useState(false); // 좋아요 여부
	const [disliked, setDisliked] = useState(false); // 싫어요 여부
	const [author, setAuthor] = useState(false); // 현재 로그인한 사용자가 리뷰 작성자인지 여부
	const [currentName, setCurrentName] = useState(""); // 로그인한 사용자 이름
	//const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
	const navigate = useNavigate(); // useNavigate로 리다이렉션 처리

	useEffect(() => {
		// 로그인 상태가 아니라도 리뷰를 볼 수 있도록 로그인 체크
		const name = getName(); // 로그인한 사용자의 이름을 로컬 스토리지에서 가져오기
		if (name) {
			setCurrentName(name); // 이름을 상태에 저장
		}

		const token = getAccessToken(); // getAccessToken으로 토큰 가져오기
		if (!token && !name) {
			navigate("/login"); // 토큰도 없고 이름도 없으면 로그인 페이지로 리다이렉트
			return;
		}
	}, [navigate]);

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

				if (data.author === currentName) {
					setAuthor(true); // 작성자와 로그인한 사용자의 이름이 일치하면 수정/삭제 표시
				} else {
					setAuthor(false); // 일치하지 않으면 버튼을 숨김
				}
			} catch (error) {
				setError("리뷰 정보를 가져오는 중 오류가 발생했습니다.");
				setLoading(false);
			}
		};

		fetchReviewDetail();
	}, [id, currentName]);

	// 삭제 함수
	const handleDelete = async () => {
		try {
			//id값 확인
			console.log("삭제할 리뷰 id:", { id });

			const response = await fetch(
				`http://localhost:8080/api/review/delete/${id}`,
				{
					method: "DELETE",
				}
			);

			if (response.ok) {
				alert("리뷰가 삭제되었습니다");
				navigate("/review");
			} else {
				throw new Error("리뷰 삭제 실패");
			}
		} catch (error) {
			console.error("삭제 요청 중 오류 발생: ", error);
			alert("리뷰 삭제 중 오류가 발생했습니다.");
		}
	};

	// 좋아요 버튼 클릭 핸들러
	const handleLike = async () => {
		if (likes >= 20 && !liked) {
			alert("최대 20번의 상호작용만 가능합니다.");
			return;
		}

		try {
			if (liked) {
				await fetch(`http://localhost:8080/api/review/unlike/${id}`, {
					method: "POST",
				});
				setLikes(likes - 1);
			} else {
				await fetch(`http://localhost:8080/api/review/like/${id}`, {
					method: "POST",
				});
				setLikes(likes + 1);
			}
			setLiked(!liked);
		} catch (error) {
			console.error("좋아요 처리 중 오류:", error);
		}
	};

	// 싫어요 버튼 클릭 핸들러
	const handleDislike = async () => {
		if (dislikes >= 20 && !disliked) {
			alert("최대 20번의 상호작용만 가능합니다.");
			return;
		}

		try {
			if (disliked) {
				await fetch(`http://localhost:8080/api/review/undislike/${id}`, {
					method: "POST",
				});
				setDislikes(dislikes - 1);
			} else {
				await fetch(`http://localhost:8080/api/review/dislike/${id}`, {
					method: "POST",
				});
				setDislikes(dislikes + 1);
			}
			setDisliked(!disliked);
		} catch (error) {
			console.error("싫어요 처리 중 오류:", error);
		}
	};
	// 좋아요 버튼 클릭 핸들러
	// const handleLike = async () => {
	// 	try {
	// 		if (likes < 20) {
	// 			const response = await fetch(
	// 				`http://localhost:8080/api/review/like/${id}`,
	// 				{
	// 					method: "POST",
	// 				}
	// 			);
	// 			if (response.ok) {
	// 				setLikes(likes + 1);
	// 			}
	// 		} else {
	// 			alert("좋아는 최대 20번까지만 가능합니다.");
	// 		}
	// 	} catch (error) {
	// 		console.error("좋아요 요청 중 오류 발생: ", error);
	// 	}
	// };

	// 싫어요 버튼 클릭 핸들러
	// const handleDislike = async () => {
	// 	try {
	// 		if (dislikes < 20) {
	// 			const response = await fetch(
	// 				`http://localhost:8080/api/review/dislike/${id}`,
	// 				{
	// 					method: "POST",
	// 				}
	// 			);
	// 			if (response.ok) {
	// 				setDislikes(dislikes + 1);
	// 			}
	// 		} else {
	// 			alert("싫어요는 최대 20번까지만 가능합니다.");
	// 		}
	// 	} catch (error) {
	// 		console.error("싫어요 요청 중 오류 발생: ", error);
	// 	}
	// };

	return (
		<>
			<NavigationBar />
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
								{review && (
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
													{/* 작성자와 현재 사용자 비교 */}
													{author && (
														<>
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
														</>
													)}
													<ReportModal
														category={3}
														categoryId={id}
														categoryTitle={review.title}
														style={{
															fontSize: "0.75rem",
														}} // 여기 스타일 지정하면 신고 버튼에 적용 가능
													/>
												</div>
											</Col>
										</Row>

										<div className="mt-4 py-4 border-top text-center">
											<Row>
												<Col sm="6">
													<small className="float-left ml-1">
														{new Date(review.createdDate).toLocaleString(
															"ko-KR",
															{
																year: "numeric", // 4자리 연도
																month: "2-digit", // 2자리 월
																day: "2-digit", // 2자리 일
															}
														)}
													</small>
												</Col>
												<Col sm="6">
													<small className="float-right mr-1">
														조회수: {review.views}
													</small>
												</Col>
											</Row>

											{/* 프로젝트 불러오기*/}
											{review.pjtName && review.pjtImg && (
												<Row className="mt-4 align-items-center">
													<>
														<Col xs="auto" className="text-center">
															<img
																src={
																	review.pjtImg
																		? `${import.meta.env.VITE_APP_AWS_BUCKET}/${
																				review.pjtImg
																		  }`
																		: defaultImage
																}
																alt={review.pjtName || "프로젝트 이미지"}
																className="img-fluid"
																style={{ maxHeight: "100px", width: "auto" }}
															/>
														</Col>
														<Col className="text-left">
															<strong
																style={{
																	color: "#f5365c",
																}}
															>
																{review.category}
															</strong>
															<h4>{review.pjtName}</h4>
														</Col>
													</>
												</Row>
											)}

											<Row className="py-5">
												<Col className="text-lg-left">
													<strong>{review.content}</strong>
												</Col>
											</Row>

											{/*좋아요와 싫어요 버튼 및 카운트 표시*/}
											<Row className="mt-4">
												<Col>
													<Button
														color={liked ? "success" : "secondary"}
														onClick={handleLike}
														disabled={liked && disliked}
													>
														👍 좋아요 {likes}
													</Button>
													<Button
														color={disliked ? "danger" : "secondary"}
														onClick={handleDislike}
														disabled={liked && disliked}
													>
														👎 싫어요 {dislikes}
													</Button>
												</Col>
											</Row>
										</div>
									</>
								)}
							</Col>
						</div>
					</Container>
				</section>
			</main>
			<SimpleFooter />
		</>
	);
};

export default ReviewDetail;
