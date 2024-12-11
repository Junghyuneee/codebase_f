import VisitorIp from '../../components/admin/VisitorIp.jsx';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import {Container} from "react-bootstrap";
import NavigationBar from "@/components/Navbars/NavigationBar.jsx";

const MainPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<NavigationBar/>
			<main>
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
						<Button onClick={() => navigate('/chat')}>Chat</Button>
						<Button onClick={() => navigate('/review')}>Review</Button>
						<Button onClick={() => navigate('/post')}>Post</Button>
                        <Button onClick={() => navigate('/store')}>store</Button>
                        <Button onClick={() => navigate('/admin')}>Admin</Button>
						<Button onClick={() => navigate('/team')}>Team</Button>
						<VisitorIp/>
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
							<polygon
								className="fill-white"
								points="2560 0 2560 100 0 100"
							/>
						</svg>
					</div>
				</section>

			</main>
		</>
	);
};

export default MainPage;
