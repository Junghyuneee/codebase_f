/*
한정현
2024-11-06
*/
import { Container, Row, Col } from 'reactstrap';

function ReviewHeader() {
	return (
		<>
			<div className="position-relative">
				<section className="section section-lg section-shaped pb-250">
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
										Review Page <span>리뷰 페이지</span>
									</h1>
									<p className="lead text-white">
										The design system comes with four pre-built pages to help
										you get started faster. You can change the text and images
										and good to go.
									</p>
								</Col>
							</Row>
						</div>
					</Container>
				</section>
			</div>
		</>
	);
}

export default ReviewHeader;
