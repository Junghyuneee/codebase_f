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
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";

import NavigationBar from "@/components/Navbars/NavigationBar.jsx";
import SimpleFooter from "./SimpleFooter";
import ReviewHeader from "./ReviewHeader";

const ReviewList = () => {
	const [review, setReview] = useState([]); // 기본값을 빈 배열로 설정
	const [search, setSearch] = useState(""); // 검색어
	const [filteredReview, setFilteredReview] = useState([]); // 검색/정렬된 목록
	const [currentPage, setCurrentPage] = useState(1); //현재 페이지 번호
	const [reviewPerPage] = useState(10); //한 페이지당 표시할 리뷰 개수
	const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태
	const [selectedSort, setSelectedSort] = useState("최신순"); // 기본 정렬 기준 : 최신순
	const [selectedTab, setSelectedTab] = useState("전체"); // 기본 선택 탭 (전체)
	const [projectteams, setProjectteams] = useState([]); // 프로젝트팀 목록
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
				setReview(sortedData); // 전체 리뷰 목록 저장
				setFilteredReview(sortedData); // 필터링된 리뷰 목록 초기화
			})
			.catch((error) => {
				console.error("API 호출 에러:", error);
			});

		// 프로젝트 목록 가져오기
		fetch(`http://localhost:8080/api/projectteams`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("프로젝트 목록을 가져오는데 실패했습니다.");
				}
				return response.json();
			})
			.then((data) => {
				setProjectteams(data);
			})
			.catch((error) => {
				console.error("프로젝트 목록 가져오기 에러:", error);
			});
	}, [navigate]);

	// 리뷰 목록을 정렬하는 함수
	const sortReviews = (data, 정렬기준) => {
		switch (정렬기준) {
			case "조회순":
				// 조회수 내림차순으로 정렬
				return data.sort((a, b) => b.views - a.views);
			case "오래된 순":
				// 작성일 오름차순으로 정렬
				return data.sort(
					(a, b) => new Date(a.createdDate) - new Date(b.createdDate)
				);
			case "추천순":
				// 추천순 내림차순으로 정렬
				return data.sort((a, b) => b.likes - a.likes);
			case "최신순":
				// 최신순으로 정렬(기본값)
				return data.sort(
					(a, b) => new Date(b.createdDate) - new Date(a.createDate)
				);
		}
	};

	// 탭 변경 함수
	const handleTabChange = (tab) => {
		setSelectedTab(tab);
		filterReviewsByTab(tab);
	};

	// 탭에 따라 리뷰를 필터링하는 함수
	const filterReviewsByTab = (tab) => {
		if (tab === "프로젝트") {
			// "프로젝트" 탭 선택 시 프로젝트 관련 게시글만 필터링
			const projectReviews = review.filter((r) => r.category === "프로젝트");
			setFilteredReview(projectReviews);
		} else if (tab === "팀원") {
			// "팀원" 탭 선택 시 팀원 관련 게시글만 필터링
			const teamReviews = review.filter((r) => r.category === "팀원");
			setFilteredReview(teamReviews);
		} else {
			// "전체" 탭 선택 시 모든 게시글 표시
			setFilteredReview(review);
		}
	};

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
			(review) => review.title.toLowerCase().includes(keyword) // 제목에서 검색어가 포함되는지 확인
			//|| review.author.toLowerCase().includes(search.toLowerCase()) // 필요 시 작성자도 포함하여 검색할 수 있음
		);
		setFilteredReview(filtered);
	};

	// 조회수 핸들러
	const handleReviewClick = async (id) => {
		// 로그인 확인
		// if (!getAccessToken()) {
		// 	alert("로그인이 필요합니다.");
		// 	navigate("/review", { state: { from: `/review/detail/${id}` } });
		// } else {
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
		//}
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

	// 드롭다운 열기
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	// 정렬 방식 변경 함수
	const handleSortChange = (정렬기준) => {
		setSelectedSort(정렬기준); // 선택된 정렬 방식 상태 업데이트
		const sortedReviews = sortReviews([...review], 정렬기준); // 리뷰 목록 정렬
		setFilteredReview(sortedReviews); // 정렬된 리뷰 목록을 필터링된 리뷰로 설정
	};

	// 프로젝트명 찾기
	const getProjectName = (pjtId) => {
		const project = projectteams.find((p) => p.id === pjtId);
		return project ? project.name : "Unknown"; // 프로젝트명이 없으면 'Unknown' 반환
	};

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

							{/* 정렬 드롭다운 */}
							<Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
								<DropdownToggle caret>{selectedSort}</DropdownToggle>{" "}
								{/* 상태로 텍스트 변경 */}
								<DropdownMenu>
									<DropdownItem onClick={() => handleSortChange("최신순")}>
										최신순
									</DropdownItem>
									<DropdownItem onClick={() => handleSortChange("오래된 순")}>
										오래된 순
									</DropdownItem>
									<DropdownItem onClick={() => handleSortChange("조회순")}>
										조회순
									</DropdownItem>
									<DropdownItem onClick={() => handleSortChange("추천순")}>
										추천순
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>

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
						</div>

						{/* Tab Navigation */}
						<Nav tabs>
							<NavItem>
								<NavLink
									className={selectedTab === "전체" ? "active" : ""}
									onClick={() => handleTabChange("전체")}
								>
									전체
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={selectedTab === "프로젝트" ? "active" : ""}
									onClick={() => handleTabChange("프로젝트")}
								>
									프로젝트
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={selectedTab === "팀원" ? "active" : ""}
									onClick={() => handleTabChange("팀원")}
								>
									팀원
								</NavLink>
							</NavItem>
						</Nav>
						<div className="">
							<table
								className="col-lg-12"
								style={{ borderCollapse: "collapse", width: "100%" }}
							>
								<thead>
									<tr>
										<th className="col-lg-1">번호</th>
										<th className="col-lg-1">구분</th>
										<th className="col-lg-1">프로젝트명</th>
										<th className="col-lg-4">제목</th>
										<th className="col-lg-1">작성자</th>
										<th className="col-lg-2">작성일자</th>
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
											<td style={{ padding: "10px" }}>{review.category}</td>
											<td style={{ padding: "10px" }}>{review.pjtName}</td>
											{/* 구분 데이터 표시 */}
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
												{new Date(review.createdDate).toLocaleDateString(
													"ko-KR",
													{
														year: "numeric", // 4자리 연도
														month: "2-digit", // 2자리 월
														day: "2-digit", // 2자리 일
													}
												)}
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
										{/* 이전 페이지지 */}
										<PaginationLink
											onClick={() => paginate(currentPage - 1)}
											previous
										/>
									</PaginationItem>
									{/* 페이지 번호호 */}
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
									{/* 다음 페이지 */}
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
