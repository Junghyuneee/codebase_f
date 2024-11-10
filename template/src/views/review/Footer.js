/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from 'react';
// reactstrap components
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

class SimpleFooter extends React.Component {
	render() {
		return (
			<>
				<footer className=" footer">
					<Container>
						<Row className=" align-items-center justify-content-md-between">
							<Col md="6">
								<div className=" copyright">
									© {new Date().getFullYear()}{' '}
									<a
										href="https://www.creative-tim.com?ref=adsr-footer"
										target="_blank"
									>
										CodeBase
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
	}
}

export default SimpleFooter;
