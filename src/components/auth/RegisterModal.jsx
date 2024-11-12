import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import GoogleLogo from "../../assets/img/icons/common/google.svg";
import KakaoLogo from "../../assets/img/icons/common/kakao_icon.png";
import { useEffect, useState } from "react";
import Postcode from "./DaumAddress";
import { postOAuthSignUp, postSignUp } from "../../api/auth";
import { useLocation, useParams } from "react-router-dom";

const RegisterModal = () => {

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const encodedUsername = queryParams.get("username");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [tel, setTel] = useState("");
  const [social, setSocial] = useState(false);

  useEffect(() => {
    setEmail(encodedUsername ? decodeURIComponent(encodedUsername) : "");
    setSocial(encodedUsername ? true : false);
  }, [])

  const handleSignUp = async () => {
    if (window.confirm('회원가입 하시겠습니까?')) {
      const response = social
        ? await postOAuthSignUp(email, username, address + " " + addressDetail, postcode, tel)
        : await postSignUp(username, password, email, address + " " + addressDetail, postcode, tel);
      console.log(response);
    }
  }

  const kakaoLoginHandler = () => {
    window.location.replace('http://localhost:8080/oauth2/authorization/kakao');
  }

  return (
    <main>
      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white pb-5">
                  <div className="text-muted text-center mb-3">
                    <small>Sign up with</small>
                  </div>
                  <div className="text-center">
                    <Button
                      className="btn-neutral btn-icon mr-4"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="btn-inner--icon mr-1">
                        <img
                          alt="..."
                          src={GoogleLogo}
                        />
                      </span>
                      <span className="btn-inner--text">Github</span>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon ml-1"
                      color="default"
                      onClick={kakaoLoginHandler}
                    >
                      <span className="btn-inner--icon mr-1">
                        <img
                          alt="..."
                          src={KakaoLogo}
                        />
                      </span>
                      <span className="btn-inner--text">Kakao</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign up with credentials</small>
                  </div>
                  <Form role="form">
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)} />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email"
                          disabled={social}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup style={{ display: social && "none" }}>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                      {/* 
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password Confirm"
                          type="password"
                          autoComplete="off"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup> */}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input placeholder="Phone Number" type="text"
                          value={tel}
                          onChange={(e) => setTel(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <div className="d-flex mb-2" style={{ gap: '1rem' }}>
                        <Input type="text" disabled value={postcode}
                          placeholder="Postcode"
                        />
                        <Postcode setAddress={setAddress} setPostCode={setPostcode} />
                      </div>

                      <InputGroup className="input-group-alternative">
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input
                          placeholder="주소"
                          type="text"
                          autoComplete="off"
                          disabled
                          value={address}
                        />
                      </InputGroup>
                      <InputGroup className="input-group-alternative mt-2">
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input
                          placeholder="상세 주소"
                          type="text"
                          autoComplete="off"
                          value={addressDetail}
                          onChange={(e) => setAddressDetail(e.target.value)}
                        />
                      </InputGroup>

                    </FormGroup>
                    {/* <div className="text-muted font-italic">
                      <small>
                        password strength:{" "}
                        <span className="text-success font-weight-700">
                          strong
                        </span>
                      </small>
                    </div> */}

                    {/* <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="customCheckRegister"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheckRegister"
                          >
                            <span>
                              I agree with the{" "}
                              <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                        </div>
                      </Col>
                    </Row> */}
                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="primary"
                        type="button"
                        onClick={handleSignUp}
                      >
                        Create account
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

export default RegisterModal