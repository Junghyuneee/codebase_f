import {useState, useEffect, useRef, useCallback, memo} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Headroom from 'headroom.js';

import logoWhite from '../../assets/img/brand/argon-react-white.png';
import logo from '../../assets/img/brand/argon-react.png';

import {
    Navbar,
    Nav,
    Container,
    Col,
    Row,
    NavDropdown
} from 'react-bootstrap';
import isAuthenticated from "@/utils/auth/isAuthenticated.js";
import {postSignOut} from "@/api/auth/auth.js";
import NotificationToggle from "./notifications/NotificationToggle";
import {NavItem, NavLink} from "reactstrap";
import {isAdmin} from "@/components/admin/isAdmin.js";

const menuItems = [
    {path: "/store", icon: "ni ni-shop", text: "Project"},
    {path: "/team", icon: "ni ni-single-02", text: "Team"},
    {path: "/review", icon: "ni ni-single-copy-04", text: "Review"},
    {path: "/post", icon: "ni ni-collection", text: "Post"},
    {path: "/chat", icon: "ni ni-chat-round", text: "Chat"}
];

const NavigationBar = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    const [expanded, setExpanded] = useState(false);

    const navRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const navbarMain = document.getElementById('navbar-main');
        if (navbarMain) {
            let headroom = new Headroom(navbarMain);
            headroom.init();
        }
        setIsLogin(isAuthenticated());

        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setExpanded(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);


        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const renderAuthLinks = useCallback(() => isLogin ? (
        <>
            <Nav.Link onClick={() => {
                navigate("/profile");
                setExpanded(false);
            }}
                      style={{whiteSpace: "nowrap"}}>마이페이지</Nav.Link>
            <Nav.Link onClick={() => {
                postSignOut();
                setExpanded(false);
            }}
                      style={{whiteSpace: "nowrap"}}>로그아웃</Nav.Link>
        </>
    ) : (
        <>
            <Nav.Link onClick={() => {
                navigate('/login');
                setExpanded(false);
            }}>로그인</Nav.Link>
            <Nav.Link onClick={() => {
                navigate('/register');
                setExpanded(false);
            }}>회원가입</Nav.Link>
        </>
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ), [isLogin]);

    const renderMenuItems = useCallback(() => {
        if (isMobile) {
            return menuItems.map((item, index) => (
                <Nav.Link
                    key={index}
                    as={Link}
                    to={item.path}
                    onClick={() => setExpanded(false)}
                >
                    <i className={`${item.icon} mr-2`}/>
                    {item.text}
                </Nav.Link>
            ));
        }

        return (
            <Nav navbar>
                {menuItems.map((item, index) => (
                    <NavItem key={index}>
                        <NavLink
                            to={item.path} tag={Link}
                            className="text-center">
                            <i className={`${item.icon} mr-2`}/>
                            {item.text}
                        </NavLink>
                    </NavItem>
                ))}
                {isAdmin() && <NavItem>
                    <NavLink
                        to={'/admin'} tag={Link}
                        className="text-center">
                        <i className={"ni ni-archive-2"}/>
                        Admin
                    </NavLink>
                </NavItem>}
            </Nav>
        );
    }, [isMobile, showDropdown]);

    return (
        <Navbar
            ref={navRef}
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
            expanded={expanded}
            onToggle={(expanded) => setExpanded(expanded)}
        >
            <Container>
                <Navbar.Brand
                    style={{cursor: "pointer"}}
                    className="mr-lg-5"
                    onClick={() => {
                        navigate("/");
                        setExpanded(false);
                    }}
                >
                    <img alt="..." src={logoWhite}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="navbar-collapse-header">
                        <Row>
                            <Col className="collapse-brand" xs="6">
                                <Link to="/" onClick={() => setExpanded(false)}>
                                    <img alt="..." src={logo}/>
                                </Link>
                            </Col>
                        </Row>
                    </div>

                    <Nav className="navbar-nav-hover align-items-lg-center">
                        {renderMenuItems()}
                    </Nav>

                    <Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto">
                        {isLogin && !isMobile && <NotificationToggle/>}
                        {renderAuthLinks()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default memo(NavigationBar);
