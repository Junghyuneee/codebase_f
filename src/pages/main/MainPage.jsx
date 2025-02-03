import VisitorIp from '../../components/admin/VisitorIp.jsx';
import {Button, Container, Badge, CardImg, Col, Card, Row, Nav, NavItem, NavLink} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import NavigationBar from "@/components/Navbars/NavigationBar.jsx";
import {useEffect, useState} from "react";
import apiClient from "@/api/apiClient.js";

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

	// 프로젝트 카드 띄우기
	const [startIndex, setStartIndex] = useState(0); // 카드 시작 인덱스
	const [projectCards, setProjectCards] = useState([]);
	const visibleCards = 3; // 한 번에 보이는 카드 개수

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiClient.get('/main/projectCard');
				setProjectCards(response.data);
				console.log('After setState:', response.data); // 최신 데이터 출력
			} catch (error) {
				console.error('메인 프로젝트 카드 에러', error);
			}
		};
		fetchData()
	}, []);

	// 프로젝트 카드 왼쪽/오른쪽 버튼 클릭 핸들러
	const handleLeftClick = () => {
		setStartIndex((prevIndex) => (prevIndex - 1 + projectCards.length) % projectCards.length);
	};

	const handleRightClick = () => {
		setStartIndex((prevIndex) => (prevIndex + 1) % projectCards.length);
	};

	const displayedProject = projectCards.length > 0
		? Array.from({ length: Math.min(visibleCards, projectCards.length) }, (_, i) => {
		const index = (startIndex + i) % projectCards.length; // 순환적인 인덱스 계산
		return projectCards[index];
	}) : [];

	// 프로젝트 개수가 3개보다 작으면 양쪽 버튼 비활성화
	const isDisabled = projectCards.length < visibleCards;

	return (
		<>
			<NavigationBar/>
			<main>
				<VisitorIp/>
				<section className="section section-shaped my-0 pt-8 pb-3">
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
				<section className="section section-shaped my-0">
					<Container>
						<Row className="row-grid align-items-center justify-content-center">
							<Button className="btn-primary btn-icon-only rounded-circle ml-1"
									onClick={handleLeftClick} disabled={isDisabled}>
							<span className="btn-inner--icon">
								<i className="ni ni-bold-left"/>
							</span>
							</Button>
							{displayedProject.map((project) => (
								// eslint-disable-next-line react/jsx-key
								<Col
									key={project.id}
									xs="12"
									sm="12"
									md="6"
									lg="4"
									xl="3"
									className="p-2"
								>
									<Card className="bg-white shadow border-0 card-lift--hover">
										<blockquote className="card-blockquote p-4">
											<CardImg style={{ borderRadius: "10px", width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} alt="..." src={`${import.meta.env.VITE_APP_AWS_BUCKET}/${project.img}`} top />
											<h6
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
												{project.title}
											</h6>
											<br />
											<br />
										</blockquote>

										<Badge
											pill
											className="mr-1 bg-light"
											style={{
												fontSize: "14px",
												position: "absolute", // 절대 위치 설정
												bottom: "30px", // 하단에서 10px
												left: "30px", // w좌측에서 10px
											}}
										>
											{project.price}원
										</Badge>
									</Card>
								</Col>
							))}
							<Button className="btn-primary btn-icon-only rounded-circle ml-1"
									onClick={handleRightClick} disabled={isDisabled}>
							<span className="btn-inner--icon">
								<i className="ni ni-bold-right"/>
							</span>
							</Button>
						</Row>
					</Container>
				</section>
				<section className="section section-shaped my-0">
					<Container>
					<div className="text-center mb-5">
						<h4 className="display-4">
							프로젝트 팀 찾기
						</h4>
						<Row className="justify-content-center">
							<Col lg="2" xs="4">
								<Button style={{backgroundColor: "white", borderColor: "white", boxShadow: "none"}}
										onClick={() => navigate('/team')}
								>
									<img
										alt="..."
										src="https://img.icons8.com/?size=100&id=asWSSTBrDlTW&format=png&color=000000"
									/>
								</Button>
							</Col>
							<Col lg="2" xs="4">
								<Button style={{backgroundColor: "white", borderColor: "white", boxShadow: "none"}}
										onClick={() => navigate('/team')}
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://img.icons8.com/?size=100&id=13679&format=png&color=000000"
									/>
								</Button>
							</Col>
							<Col lg="2" xs="4">
								<Button style={{backgroundColor: "white", borderColor: "white", boxShadow: "none"}}
										onClick={() => navigate('/team')}
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://img.icons8.com/?size=100&id=13441&format=png&color=000000"
									/>
								</Button>
							</Col>
							<Col lg="2" xs="4">
								<Button style={{backgroundColor: "white", borderColor: "white", boxShadow: "none"}}
										onClick={() => navigate('/team')}
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://img.icons8.com/?size=100&id=90519&format=png&color=000000"
									/>
								</Button>
							</Col>
							<Col lg="2" xs="4">
								<Button style={{backgroundColor: "white", borderColor: "white", boxShadow: "none"}}
										onClick={() => navigate('/team')}
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://img.icons8.com/?size=100&id=54087&format=png&color=000000"
									/>
								</Button>
							</Col>
							<Col lg="2" xs="4">
								<Button style={{backgroundColor: "white", borderColor: "white", boxShadow: "none"}}
										onClick={() => navigate('/team')}
								>
									<img
										alt="..."
										className="img-fluid"
										src="https://img.icons8.com/?size=100&id=71257&format=png&color=000000"
									/>
								</Button>
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
