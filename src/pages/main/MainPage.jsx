import VisitorIp from '../../components/admin/VisitorIp.jsx';
import { Button } from 'reactstrap';
import { postSignOut } from '@/api/auth/auth.js';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
	const navigate = useNavigate();
	return (
		<div className="container-fluid">
			MainPage
			<Button onClick={() => navigate('/login')}>Login</Button>
			<Button onClick={() => navigate('/register')}>Register</Button>
			<Button onClick={() => navigate('/chat')}>Chat</Button>
			<Button onClick={postSignOut}>Logout</Button>
			<Button onClick={() => navigate('/review')}>Review</Button>
			<Button onClick={() => navigate('/post')}>Post</Button>
			<Button onClick={() => navigate('/admin')}>Admin</Button>
			<VisitorIp />
		</div>
	);
};

export default MainPage;
