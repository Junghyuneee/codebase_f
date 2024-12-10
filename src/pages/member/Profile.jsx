import { Button, Card, Container, Row, Col } from "react-bootstrap";
import NavigationBar from "@/components/Navbars/NavigationBar.jsx";
import {useEffect, useState} from "react";
import {getMember} from "@/api/auth/member.js";
import {useNavigate, useParams} from "react-router-dom";
import {getEmail} from "@/api/auth/getset.js";

const Profile = () => {

    const { id } = useParams();
    const [member, setMember] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await getMember(id);
            setMember(response);
        }
        fetchMembers();
    }, []);

    return (
        (member ? <>
            <NavigationBar/>
            <main className="profile-page">
                <section className="section-profile-cover section-shaped my-0">
                    {/* Circles background */}
                    <div className="shape shape-style-1 shape-default alpha-4">
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                    </div>
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
                <section className="section">
                    <Container>
                        <Card className="card-profile shadow mt--300">
                            <div className="px-4">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <a href="#" onClick={(e) => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    src={"./assets/img/theme/team-4-800x800.jpg"}
                                                />
                                            </a>
                                        </div>
                                    </Col>
                                    <Col
                                        className="order-lg-3 text-lg-right align-self-lg-center"
                                        lg="4"
                                    >
                                        <div className="card-profile-actions py-4 mt-lg-0">
                                            {member.email === getEmail() && <Button
                                                className="mr-4"
                                                color="info"
                                                href="#pablo"
                                                onClick={(e) => navigate("/changeinfo")}
                                                size="sm"
                                            >
                                                정보수정
                                            </Button>}
                                            <Button
                                                className="float-right"
                                                color="default"
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                Message
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col className="order-lg-1" lg="4">
                                        <div className="card-profile-stats d-flex justify-content-center">
                                            <div>
                                                <span className="heading">22</span>
                                                <span className="description">Friends</span>
                                            </div>
                                            <div>
                                                <span className="heading">10</span>
                                                <span className="description">Photos</span>
                                            </div>
                                            <div>
                                                <span className="heading">89</span>
                                                <span className="description">Comments</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="text-center mt-5">
                                    <h3>
                                        {member.name}
                                    </h3>
                                    <div className="h6 font-weight-300">
                                        <i className="ni location_pin mr-2"/>
                                        {member.email}
                                    </div>
                                    <div className="h6 mt-4">
                                        <i className="ni business_briefcase-24 mr-2"/>
                                        {member.addr}
                                    </div>
                                    <div>
                                        <i className="ni education_hat mr-2"/>
                                        프로젝트 생성 남은 횟수: {member.projectCount}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Container>
                </section>
            </main>
        </>:
                <div>
                    Loading
                </div>
        )
    )
}

export default Profile;