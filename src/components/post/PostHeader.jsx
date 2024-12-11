
import { Container, Row, Col } from "react-bootstrap";

function PostHeader() {
	return (
		<>
			<div className="position-relative">
				<section className="section section-lg section-shaped pb-100">
					<div className="shape shape-style-1 shape-default">
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
						<span />
					</div>
					<Container className="py-lg-md d-flex">
						<div className="col px-0">
							<Row>
								<Col lg="6">
									<h1 className="display-3 text-white right">
										 <span>자유게시판 페이지</span>
									</h1>
								</Col>
							</Row>
						</div>
					</Container>
				</section>
			</div>
		</>
	);
}

export default PostHeader;
