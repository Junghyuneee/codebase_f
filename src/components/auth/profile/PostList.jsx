import {useState, useEffect, useMemo} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Card, Button, Container, Row, Col, Form, Pagination, Dropdown, Alert, Spinner} from "react-bootstrap";
import {getAccessToken} from '@/api/auth/getset.js';
import {getMyPostList} from "@/api/auth/profile.js";
import PropTypes from "prop-types"; // 토큰을 가져오는 함수

const PostList = ({name = ""}) => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('최신순');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const postsPerPage = 3;
    const navigate = useNavigate(); // useNavigate 훅 추가

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getMyPostList(name);
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchPosts();
    }, [navigate]);

    // 정렬 로직
    const sortedPosts = useMemo(() => {
        return [...posts].sort((a, b) => {
            const createdateA = new Date(a.createDate);
            const createdateB = new Date(b.createDate);
            switch (sortOption) {
                case '최신순':
                    return createdateB - createdateA;
                case '오래된순':
                    return createdateA - createdateB;
                case '추천순':
                    return b.likes - a.likes;
                case '조회순':
                    return b.views - a.views;
                default:
                    return 0;
            }
        });
    }, [posts, sortOption]);

    // 필터링 로직
    const filteredPosts = useMemo(() => {
        return sortedPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [sortedPosts, searchTerm]);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    // 조회수 증가 핸들러
    const handleViewIncrease = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/post/increaseViews/${id}`, {
                method: 'PUT',
            });
            if (!response.ok) throw new Error('조회수 증가 실패');

            // 조회수 업데이트
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === id ? {...post, views: post.views + 1} : post
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    // 작성하기 버튼 핸들러
    const handlePostCreate = () => {
        if (!getAccessToken()) {
            alert('로그인이 필요합니다.');
            navigate('/login', {state: {from: '/post'}}); // 로그인 페이지로 리다이렉트
        } else {
            navigate('/post/new'); // 게시물 작성 페이지로 이동
        }
    };

    if (loading) {
        return <Spinner animation="border"/>; // 로딩 스피너 표시
    }

    return (
        <Container className="mt-4">
            <Button variant="primary" className="mb-3" onClick={handlePostCreate}>
                작성하기
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form>
            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="success">{sortOption}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {['최신순', '오래된순', '추천순', '조회순'].map(option => (
                        <Dropdown.Item
                            key={option}
                            onClick={() => {
                                setSortOption(option);
                                setCurrentPage(1);
                            }}
                        >
                            {option}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Row>
                {currentPosts.map(post => (
                    <Col md={4} key={post.id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">작성자: {post.author}</Card.Subtitle>
                                <Card.Text>
                                    <span>주제: {post.topic}</span><br/>
                                    <span>등록일: {new Date(post.createDate).toLocaleString('ko-KR')}</span><br/>
                                    <span>좋아요 수: {post.likes}</span><br/>
                                    <span>조회수: {post.views}</span><br/>
                                </Card.Text>
                                <Link to={`/post/${post.id}`} onClick={() => handleViewIncrease(post.id)}>
                                    <Button variant="info">상세보기</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}/>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}/>
            </Pagination>
        </Container>
    );
};

PostList.propTypes = {
    name: PropTypes.string,
}

export default PostList;
