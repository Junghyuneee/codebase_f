import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Headroom from 'headroom.js';

import logoWhite from '../../assets/img/brand/argon-react-white.png';
import logo from '../../assets/img/brand/argon-react.png';

import {
    UncontrolledCollapse,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap';

import {
    Navbar,
    Nav,
    Container,
    Col,
    Row,

} from 'react-bootstrap';
import isAuthenticated from "@/utils/auth/isAuthenticated.js";
import {postSignOut} from "@/api/auth/auth.js";

const NavigationBar = () => {
    const [collapseClasses, setCollapseClasses] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const navbarMain = document.getElementById('navbar-main');
        if (navbarMain) {
            let headroom = new Headroom(navbarMain);
            headroom.init();
        }
        setIsLogin(isAuthenticated());

    }, []); //빈 배열을 넣어서 처음 렌더링될 때만 실행

    const onExiting = () => {
        setCollapseClasses('collapsing-out');
    };

    const onExited = () => {
        setCollapseClasses('');
    };

    return (
        <>
            <header className="header-global">
                <Navbar
                    className="navbar-main navbar-transparent navbar-light headroom"
                    expand="lg"
                    id="navbar-main"
                >
                    <Container>
                        <Navbar.Brand
                            style={{cursor:"pointer"}} className="mr-lg-5"
                            onClick={()=>{navigate("/")}}
                        >
                            <img alt="..." src={logoWhite}/>
                        </Navbar.Brand>
                        <button className="navbar-toggler" id="navbar_global">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <UncontrolledCollapse
                            toggler="#navbar_global"
                            navbar
                            className={collapseClasses}
                            onExiting={onExiting}
                            onExited={onExited}
                        >
                            <div className="navbar-collapse-header">
                                <Row>
                                    <Col className="collapse-brand" xs="6">
                                        <Link to="/">
                                            <img alt="..." src={logo}/>
                                        </Link>
                                    </Col>
                                    <Col className="collapse-close" xs="6">
                                        <button className="navbar-toggler" id="navbar_global">
                                            <span/>
                                            <span/>
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                            <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle nav>
                                        <i className="ni ni-collection d-lg-none mr-1"/>
                                        <span className="nav-link-inner--text">Examples</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem to="/team" tag={Link}>
                                            <i className="ni ni-single-02 mr-2"/>
                                            팀 소개
                                        </DropdownItem>
                                        <DropdownItem to="/projects" tag={Link}>
                                            <i className="ni ni-building mr-2"/>
                                            프로젝트
                                        </DropdownItem>
                                        <DropdownItem to="/contact" tag={Link}>
                                            <i className="ni ni-email-83 mr-2"/>
                                            문의하기
                                        </DropdownItem>
                                        <DropdownItem to="/about" tag={Link}>
                                            <i className="ni ni-collection mr-2"/>
                                            회사 소개
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                            <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
                                {isLogin ?
                                    <><Nav.Item>
                                        <Nav.Link className={"nav-link-icon pointer"}
                                                  onClick={()=>navigate("/profile")}>
                                            마이페이지
                                        </Nav.Link>
                                    </Nav.Item>
                                        <Nav.Item>
                                        <Nav.Link className={"nav-link-icon pointer"}
                                                  onClick={postSignOut}
                                        >
                                            로그아웃
                                        </Nav.Link>
                                    </Nav.Item></> :
                                    <>
                                        <Nav.Item>
                                            <Nav.Link className={"nav-link-icon pointer"}
                                                      onClick={() => navigate('/login')}
                                            >
                                                로그인
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className={"nav-link-icon pointer"}
                                                      onClick={() => navigate('/register')}
                                            >
                                                회원가입
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                                }
                            </Nav>
                        </UncontrolledCollapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default NavigationBar;
