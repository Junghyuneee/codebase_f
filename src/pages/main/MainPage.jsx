import VisitorIp from '../../components/admin/VisitorIp.jsx';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Container} from "react-bootstrap";
import NavigationBar from "@/components/Navbars/NavigationBar.jsx";
import React, {useEffect, useState} from "react";
import MemberSearchModal from "@/components/auth/member/MemberSearchModal.jsx";
import {isAdmin} from "@/components/admin/isAdmin.js";
import {Badge, CardImg, Col, Card, Row, UncontrolledTooltip, Nav, NavItem, NavLink} from "reactstrap";

const MainPage = () => {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [member, setMember] = useState(null);

	useEffect(() => {
		if(member){
			navigate(`/profile/${member.name}`)
		}
	}, [member, navigate]);

	// 멤버 찾기 모달 버튼
	//<MemberSearchModal show={show} setShow={setShow} setMember={setMember}/>

	const [startIndex, setStartIndex] = useState(0); // 현재 카드 시작 인덱스
	const cards = [
		{ id: 1, title: "플젝1" },
		{ id: 2, title: "플젝2" },
		{ id: 3, title: "플젝3" },
		{ id: 4, title: "플젝4" },
		{ id: 5, title: "플젝5" },
	];
	const visibleCards = 3; // 한 번에 보이는 카드 개수

	// 왼쪽 버튼 클릭 핸들러
	const handleLeftClick = () => {
		setStartIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
	};

	// 오른쪽 버튼 클릭 핸들러
	const handleRightClick = () => {
		setStartIndex((prevIndex) => (prevIndex + 1) % cards.length);
	};

	// 현재 표시할 카드 계산
	const displayedCards = Array.from({ length: visibleCards }, (_, i) => {
		const index = (startIndex + i) % cards.length; // 순환적인 인덱스 계산
		return cards[index];
	});

	return (
		<>
			<NavigationBar/>
			<main>
				<VisitorIp/>
				<section className="section section-lg section-shaped my-0">
					{/* Circles background */}
					<div className="shape shape-style-1 shape-default">
						<span/>
						<span/>
						<span/>
						<span/>
						<span/>
						<span/>
						<span/>
					</div>
					<Container>
						<Row className="row-grid align-items-center">
							<Col className="order-md-2" md="6">
								<img
									alt="..."
									className="img-fluid floating"
									src={"assets/img/theme/promo-1.png"}
								/>
							</Col>
							<Col className="order-md-1" md="6">
								<div className="pr-md-5">
									<h4>당신의 프로젝트 여정, 여기서 시작됩니다!</h4>
									<p className="text-white">
										개발자들을 위한 창의적이고 협력적인 커뮤니티 플랫폼
									</p>
									<p className="text-white">
										아이디어를 현실로! 당신의 프로젝트를 사고팔고, 팀을 구성하며, 경험을 공유할 수 있는 최적의 공간을 제공합니다.
									</p>
								</div>
							</Col>
						</Row>

					</Container>
				</section>
				<section className="section section-lg section-shaped my-0">
					<Container>
						<Row className="row-grid align-items-center justify-content-center">
							<Button className="btn-primary btn-icon-only rounded-circle ml-1" onClick={handleLeftClick}>
							<span className="btn-inner--icon">
								<i className="ni ni-bold-left"/>
							</span>
							</Button>
							{displayedCards.map((card) => (
								// eslint-disable-next-line react/jsx-key
								<Col
									xs="12"
									sm="12"
									md="6"
									lg="4"
									xl="3"
									className="p-2"
								>
									<Card className="bg-white shadow border-0 card-lift--hover">
										<blockquote className="card-blockquote p-4">
											<CardImg style={{
												borderRadius: "10px",
												width: '100%',
												aspectRatio: '1/1',
												objectFit: 'cover'
											}} alt="..."/>
											<h5
												className=" font-weight-bold text-black"
												style={{
													display: "-webkit-box", // Flexbox 사용
													WebkitBoxOrient: "vertical", // 세로 방향으로 정렬
													WebkitLineClamp: 2, // 두 줄까지만 표시
													overflow: "hidden", // 넘치는 텍스트 숨기기
													textOverflow: "ellipsis", // 넘치는 텍스트를 ...으로 표시
													width: "100%",
													height: "50px", // 부모 폭에 맞게 설정
													marginTop: "10px", // 기본 마진 제거
												}}
											>
												{card.title}
											</h5>
											<br/>
											<br/>
										</blockquote>

										<Badge
											color="secondary"
											pill
											className="mr-1"
											style={{
												fontSize: "14px",
												position: "absolute", // 절대 위치 설정
												bottom: "30px", // 하단에서 10px
												left: "30px", // w좌측에서 10px
											}}
										>
											원
										</Badge>
									</Card>
								</Col>
							))}
							<Button className="btn-primary btn-icon-only rounded-circle ml-1"
									onClick={handleRightClick}>
							<span className="btn-inner--icon">
								<i className="ni ni-bold-right"/>
							</span>
							</Button>
						</Row>
					</Container>
				</section>
				<section>
					<Container>
					<div className="text-center">
						<h4 className="display-4 mb-5 mt-5">
							팀 찾기
						</h4>
						<Row className="justify-content-center">
							<Col lg="2" xs="4">
								<a
									href="https://www.creative-tim.com/product/argon-design-system?ref=adsr-landing-page"
									id="tooltip255035741"
									target="_blank"
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/bootstrap.jpg"
									/>
								</a>
								<UncontrolledTooltip delay={0} target="tooltip255035741">
									Bootstrap 4 - Most popular front-end component library
								</UncontrolledTooltip>
							</Col>
							<Col lg="2" xs="4">
								<a
									href="https://www.creative-tim.com/product/vue-argon-design-system?ref=adsr-landing-page"
									id="tooltip265846671"
									target="_blank"
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/vue.jpg"
									/>
								</a>
								<UncontrolledTooltip delay={0} target="tooltip265846671">
									Vue.js - The progressive javascript framework
								</UncontrolledTooltip>
							</Col>
							<Col lg="2" xs="4">
								<a
									href="https://www.creative-tim.com/product/argon-design-system-angular?ref=adsr-landing-page"
									id="tooltip233150499"
									target="_blank"
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/angular.jpg"
									/>
								</a>
								<UncontrolledTooltip delay={0} target="tooltip233150499">
									Angular - One framework. Mobile & Desktop
								</UncontrolledTooltip>
							</Col>
							<Col lg="2" xs="4">
								<a
									href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
									id="tooltip308866163"
									target="_blank"
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/react.jpg"
									/>
								</a>
								<UncontrolledTooltip delay={0} target="tooltip308866163">
									React - A JavaScript library for building user
									interfaces
								</UncontrolledTooltip>
							</Col>
							<Col lg="2" xs="4">
								<a
									href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
									id="tooltip76119384"
									target="_blank"
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/sketch.jpg"
									/>
								</a>
								<UncontrolledTooltip delay={0} target="tooltip76119384">
									Sketch - Digital design toolkit
								</UncontrolledTooltip>
							</Col>
							<Col lg="2" xs="4">
								<a
									href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
									id="tooltip646643508"
									target="_blank"
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/ps.jpg"
									/>
								</a>
								<UncontrolledTooltip delay={0} target="tooltip646643508">
									Adobe Photoshop - Software for digital images
									manipulation
								</UncontrolledTooltip>
							</Col>
						</Row>
					</div>
					</Container>
				</section>
			</main>
			<footer className=" footer">
				<Container>
					<Row className=" row-grid align-items-center mb-5">
						<Col lg="6">
							<h3 className=" text-primary font-weight-light mb-2">
								Thank you for supporting us!
							</h3>
							<h4 className=" mb-0 font-weight-light">
								{"Let's get in touch on any of these platforms."}
							</h4>
						</Col>
						<Col className="text-lg-center btn-wrapper" lg="6">
							<Button
								className="btn-icon-only rounded-circle"
								color="twitter"
								href="https://twitter.com/creativetim"
								id="tooltip475038074"
								target="_blank"
							>
                  <span className="btn-inner--icon">
                    <i className="fa fa-twitter"/>
                  </span>
							</Button>
							<UncontrolledTooltip delay={0} target="tooltip475038074">
								Follow us
							</UncontrolledTooltip>
							<Button
								className="btn-icon-only rounded-circle ml-1"
								color="facebook"
								href="https://www.facebook.com/creativetim"
								id="tooltip837440414"
								target="_blank"
							>
                  <span className="btn-inner--icon">
                    <i className="fa fa-facebook-square"/>
                  </span>
							</Button>
							<UncontrolledTooltip delay={0} target="tooltip837440414">
								Like us
							</UncontrolledTooltip>
							<Button
								className="btn-icon-only rounded-circle ml-1"
								color="dribbble"
								href="https://dribbble.com/creativetim"
								id="tooltip829810202"
								target="_blank"
							>
                  <span className="btn-inner--icon">
                    <i className="fa fa-dribbble"/>
                  </span>
							</Button>
							<UncontrolledTooltip delay={0} target="tooltip829810202">
								Follow us
							</UncontrolledTooltip>
							<Button
								className="btn-icon-only rounded-circle ml-1"
								color="github"
								href="https://github.com/creativetimofficial"
								id="tooltip495507257"
								target="_blank"
							>
                  <span className="btn-inner--icon">
                    <i className="fa fa-github"/>
                  </span>
							</Button>
							<UncontrolledTooltip delay={0} target="tooltip495507257">
								Star on Github
							</UncontrolledTooltip>
						</Col>
					</Row>
					<hr/>
					<Row className=" align-items-center justify-content-md-between">
						<Col md="6">
							<div className=" copyright">
								© {new Date().getFullYear()}{" "}
								<a
									href="https://www.creative-tim.com?ref=adsr-footer"
									target="_blank"
								>
									Creative Tim
								</a>
								.
							</div>
						</Col>
						<Col md="6">
							<Nav className=" nav-footer justify-content-end">
								<NavItem>
									<NavLink
										href="https://www.creative-tim.com?ref=adsr-footer"
										target="_blank"
									>
										Creative Tim
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										href="https://www.creative-tim.com/presentation?ref=adsr-footer"
										target="_blank"
									>
										About Us
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										href="http://blog.creative-tim.com?ref=adsr-footer"
										target="_blank"
									>
										Blog
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										href="https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md"
										target="_blank"
									>
										MIT License
									</NavLink>
								</NavItem>
							</Nav>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
};

export default MainPage;
