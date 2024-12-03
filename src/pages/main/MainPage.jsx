import VisitorIp from '../../components/admin/VisitorIp.jsx';
import { Button } from 'reactstrap';
import { postSignOut } from '@/api/auth.js';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
	const navigate = useNavigate();
	return (
		<div className="container-fluid">
			MainPage
			<Button onClick={postSignOut}>Logout</Button>
			<Button onClick={() => navigate('/review')}>Review</Button>
			<VisitorIp />
		</div>
	);
};

export default MainPage;
