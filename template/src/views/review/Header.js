/*
한정현
2024--11-06
*/

import React from 'react';

import { Button, Container, Row, Col } from 'reactstrap';

function ReviewHeader() {
	return (
		<div className="position-relative">
			{/* shape Hero */}
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
								<h1 className="display-3 text-white">
									Review Page <span>review CURD page</span>
								</h1>
								<p className="lead text-white">
									The design system comes with four pre-built pages to help you
									get started faster. You can change the text and images and
									you're good to go.
								</p>
							</Col>
						</Row>
					</div>
				</Container>
				{/* SVG separator */}
				<div className="separator separator-bottom separator-skew">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="none"
						version="1.1"
						viewBox="0 0 2560 100"
						x="0"
						y="0"
					>
						<polygon className="fill-white" points="2560 0 2560 100 0 100" />
					</svg>
				</div>
			</section>
		</div>
	);
}

export default ReviewHeader;
