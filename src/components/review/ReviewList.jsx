/*
한정현
2024--11-06
*/

// src: /api/review
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ReviewList.css";
import { getAccessToken } from "@/api/auth/getset.js"; // 토큰을 가져오는 함수

import {
	Button,
	Container,
	InputGroup,
	Input,
	InputGroupAddon,
	InputGroupText,
	Pagination,
	PaginationItem,
	PaginationLink,
} from "reactstrap";

import NavigationBar from "@/components/Navbars/NavigationBar.jsx";
import SimpleFooter from "./SimpleFooter";
import ReviewHeader from "./ReviewHeader";

const ReviewList = () => {
	const [review, setReview] = useState([]); // 기본값을 빈 배열로 설정
	const [search, setSearch] = useState(""); // 검색어 상태
	const [filteredReview, setFilteredReview] = useState([]); // 검색된 목록
	const [currentPage, setCurrentPage] = useState(1); //현재 페이지 번호
	const [reviewPerPage] = useState(10); //한 페이지당 표시할 리뷰 개수
	const navigate = useNavigate();

	// 페이지가 로드되었을 때 리뷰 목록을 가져옴
	useEffect(() => {
		// 데이터 가져오기
		fetch(`http://localhost:8080/api/review`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("데이터를 가져오는데 실패했습니다.");
				}
				return response.json();
			})
			.then((data) => {
				// 최신 글 순서로 정렬
				const sortedData = data.sort(
					(a, b) => new Date(b.createdDate) - new Date(a.createdDate)
				);
				setReview(sortedData);
				setFilteredReview(sortedData); // 초기화 시 전체 목록 표시
			})
			.catch((error) => {
				console.error("API 호출 에러:", error);
			});
	}, [navigate]);

	// 등록하기 버튼 핸들러
	const handleReviewCreate = () => {
		// 로그인 상태 확인
		if (!getAccessToken()) {
			alert("로그인이 필요합니다.");
			navigate("/login", { state: { from: "/review" } });
		} else {
			navigate("/review/create");
		}
	};

	// 검색 입력 핸들러
	const handleSearchChange = (e) => {
		const keyword = e.target.value.toLowerCase(); //검색어 소문자 변환
		setSearch(keyword);
		// 검색어가 없으면 전체 데이터를 보여줌
		if (keyword === "") {
			setFilteredReview(review);
			return;
		}
		// 검색어가 있는 경우 필터링
		const filtered = review.filter(
			(review) => review.title.toLowerCase().includes(search.toLowerCase())
			//|| review.author.toLowerCase().includes(search.toLowerCase())
		);
		setFilteredReview(filtered);
	};

	// 조회수 핸들러
	const handleReviewClick = async (id) => {
		// 로그인 확인
		if (!getAccessToken()) {
			alert("로그인이 필요합니다.");
			navigate("/review", { state: { from: `/review/detail/${id}` } });
		} else {
			try {
				const response = await fetch(
					`http://localhost:8080/api/review/increaseViews/${id}`,
					{
						method: "PUT",
					}
				);
				//console.log("응답 상태: ${reponse.status}"); //응답 상태 확인
				if (!response.ok) {
					throw new Error("조회수 증가 요청 실패");
				}
				//setReview((prevReviews) =>
				//prevReviews.map((review) =>
				//	review.id === id ? { ...review, views: review.views + 1 } : review
				//)
				//);
				navigate(`/review/detail/${id}`);
			} catch (error) {
				console.error("조회수 증가 오류:", error);
			}
		}
	};

	// 현재 페이지에 해당하는 리뷰만 추출
	const indexOfLastReview = currentPage * reviewPerPage;
	const indexOfFirstReview = indexOfLastReview - reviewPerPage;
	const currentReview = filteredReview.slice(
		indexOfFirstReview,
		indexOfLastReview
	);

	// 페이지 변경 시 호출되는 함수
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// 페이지 번호 생성 (총 페이지 수)
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(filteredReview.length / reviewPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<>
			<NavigationBar />
			<main>
				<ReviewHeader />
				<section className="section">
					<Container>
						<div className="d-flex justify-content-between">
							{/*검색창*/}
							<InputGroup className="mb-4" style={{ width: "15rem" }}>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="ni ni-zoom-split-in" />
									</InputGroupText>
								</InputGroupAddon>
								<Input
									placeholder="Search"
									type="text"
									value={search}
									onChange={handleSearchChange} // 검색어 변경 시 필터링
								/>
							</InputGroup>

							{/*등록버튼*/}
							{/* <Link to="/review/create" className=""> */}
							<Button
								className="btn-icon mb-3 mb-sm-0 ml-auto"
								color="info"
								style={{ width: "7rem" }}
								onClick={handleReviewCreate}
							>
								<span className="btn-inner--text">등록하기</span>
							</Button>
							{/* </Link> */}
						</div>
						<div className="">
							<table
								className="col-lg-12"
								style={{ borderCollapse: "collapse", width: "100%" }}
							>
								<thead>
									<tr>
										<th className="col-lg-1">번호</th>
										<th className="col-lg-4">제목</th>
										<th className="col-lg-1">작성자</th>
										<th className="col-lg-3">작성일자</th>
										<th className="col-lg-1">조회수</th>
									</tr>
								</thead>

								<tbody>
									{/* 필터링된 리뷰 데이터만 표시 */}
									{/* list.map을 사용해서 반복문 구현 */}
									{currentReview.map((review) => (
										<tr
											key={review.id}
											style={{
												borderTop: "1px solid #ddd",
												borderBottom:
													review.id === review[review.length - 1]
														? "2px solid #ccc"
														: "none",
											}}
										>
											<td style={{ padding: "10px" }}>{review.id}</td>
											<td style={{ padding: "10px" }}>
												<Link
													to={`/review/detail/${review.id}`}
													onClick={() => handleReviewClick(review.id)} // 클릭시 조회수 증가
												>
													{review.title}
												</Link>
											</td>
											<td>{review.author}</td>
											<td style={{ padding: "10px" }}>
												{new Date(review.createdDate).toLocaleString("ko-KR", {
													year: "numeric", //4자리 연도
													month: "2-digit", //2자리 월
													day: "2-digit", //2자리 일
												})}
											</td>
											<td style={{ padding: "10px" }}>{review.views}</td>
										</tr>
									))}
								</tbody>
							</table>
							{/* 검색 결과가 없을 때 메시지 표시 */}
							{filteredReview.length === 0 && (
								<div style={{ textAlign: "center", marginTop: "20px" }}>
									<p>검색 결과가 없습니다</p>
								</div>
							)}

							{/* 페이징 */}
							<nav aria-label="Page navigation example">
								<Pagination className="pagination justify-content-end">
									<PaginationItem disabled={currentPage === 1}>
										<PaginationLink
											onClick={() => paginate(currentPage - 1)}
											previous
										/>
									</PaginationItem>
									{pageNumbers.map((number) => (
										<PaginationItem
											key={number}
											active={number === currentPage}
										>
											<PaginationLink onClick={() => paginate(number)}>
												{number}
											</PaginationLink>
										</PaginationItem>
									))}

									<PaginationItem disabled={currentPage === pageNumbers.length}>
										<PaginationLink
											onClick={() => paginate(currentPage + 1)}
											next
										/>
									</PaginationItem>
								</Pagination>
							</nav>
						</div>
					</Container>
				</section>
			</main>
			<SimpleFooter />
		</>
	);
};

export default ReviewList;
