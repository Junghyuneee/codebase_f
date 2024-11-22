import {
	Button,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col,
	UncontrolledTooltip,
} from 'reactstrap';

const SimpleFooter = () => {
	return (
		<>
			<footer className=" footer">
				<Container>
					<Row className=" row-grid align-items-center mb-5">
						<Col className="text-lg-center btn-wrapper" lg="13">
							<Button
								className="btn-icon-only rounded-circle"
								color="twitter"
								href="https://twitter.com/creativetim"
								id="tooltip475038074"
								target="_blank"
							>
								<span className="btn-inner--icon">
									<i className="fa fa-twitter" />
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
									<i className="fa fa-facebook-square" />
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
									<i className="fa fa-dribbble" />
								</span>
							</Button>
							<UncontrolledTooltip delay={0} target="tooltip829810202">
								Follow us
							</UncontrolledTooltip>
							<Button
								className="btn-icon-only rounded-circle ml-1"
								color="github"
								href="https://github.com/Junghyuneee/codebase_f/blob/main/README.md"
								id="tooltip495507257"
								target="_blank"
							>
								<span className="btn-inner--icon">
									<i className="fa fa-github" />
								</span>
							</Button>
							<UncontrolledTooltip delay={0} target="tooltip495507257">
								Star on Github
							</UncontrolledTooltip>
						</Col>
					</Row>
					<hr />
					<Row className=" align-items-center justify-content-md-between">
						<Col md="6">
							<div className=" copyright">
								© {new Date().getFullYear()}{' '}
								<a
									href="https://www.creative-tim.com?ref=adsr-footer"
									target="_blank"
								>
									Codebase
								</a>
								.
							</div>
						</Col>
						<Col md="6">
							<Nav className=" nav-footer justify-content-end">
								<NavItem>
									<NavLink href="/" target="_blank">
										Codebase
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
										href="https://github.com/Junghyuneee/codebase_f/blob/main/README.md"
										target="_blank"
									>
										License
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

export default SimpleFooter;
