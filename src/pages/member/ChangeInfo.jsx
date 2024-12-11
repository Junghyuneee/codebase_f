import {Button, Card, CardBody,  Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import Postcode from "@/components/auth/DaumAddress.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getMember} from "@/api/auth/member.js";

const ChangeInfo = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState();
    const [addressDetail, setAddressDetail] = useState("");
    const [postcode, setPostcode] = useState();
    const [tel, setTel] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await getMember();
            setUsername(response.name);
            setEmail(response.email);
            setAddress(response.address);
            setPostcode(response.postcode);
            setTel(response.tel);
        }
        fetchMembers();
    }, []);


    const handleSignUp = async () => {
        if (window.confirm('회원가입 하시겠습니까?')) {
            console.log("test");
        }
    }

    return (
        <main>
            <section className="section section-shaped section-lg">
                <div className="shape shape-style-1 bg-gradient-default">
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>
                <Container className="pt-lg-7">
                    <Row className="justify-content-center">
                        <Col lg="5">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody className="px-lg-5 py-lg-5">
                                    <Form role="form">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroup.Text>
                                                    <i className="ni ni-hat-3"/>
                                                </InputGroup.Text>
                                                <Form.Control placeholder="Name" type="text"
                                                              value={username}
                                                              onChange={(e) => setUsername(e.target.value)}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroup.Text>
                                                    <i className="ni ni-email-83"/>
                                                </InputGroup.Text>
                                                <Form.Control placeholder="Email" type="email"
                                                              disabled
                                                              value={email}
                                                              onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <Form.Control placeholder="Phone Number" type="text"
                                                              value={tel}
                                                              onChange={(e) => setTel(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup>
                                            <div className="d-flex mb-2" style={{gap: '1rem'}}>
                                                <Form.Control type="text" disabled value={postcode}
                                                              placeholder="Postcode"
                                                />
                                                <Postcode setAddress={setAddress} setPostCode={setPostcode}/>
                                            </div>

                                            <InputGroup className="input-group-alternative">
                                                <Form.Control
                                                    placeholder="주소"
                                                    type="text"
                                                    autoComplete="off"
                                                    disabled
                                                    value={address}
                                                />
                                            </InputGroup>
                                            <InputGroup className="input-group-alternative mt-2">
                                                <Form.Control
                                                    placeholder="상세 주소"
                                                    type="text"
                                                    autoComplete="off"
                                                    value={addressDetail}
                                                    onChange={(e) => setAddressDetail(e.target.value)}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <div className="text-center">
                                            <Button
                                                className="mt-4"
                                                color="primary"
                                                type="button"
                                                onClick={handleSignUp}
                                            >
                                                수정
                                            </Button>
                                            <Button
                                                className="mt-4 bg-danger"
                                                type="button"
                                                onClick={() => navigate("/profile", {replace: true})}
                                            >
                                                취소
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default ChangeInfo;