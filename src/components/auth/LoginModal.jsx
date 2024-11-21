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
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAccessToken, googleLoginHandler, kakaoLoginHandler, postSignIn} from "../../api/auth.js";

const LoginModal = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (getAccessToken()) {
      navigate("/", {replace: true});
    }
  }, []);

  const handleSignin = async () => {
    const response = await postSignIn(email, password);
    if(response){
      window.location.replace("/");  
    }else{
      alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
    }
    
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
                    <small>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center">
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
                    <Button
                        className="btn-neutral btn-icon ml-1"
                        color="default"
                        onClick={googleLoginHandler}
                    >
                      <span className="btn-inner--icon mr-1">
                        <img
                          alt="..."
                          src={GoogleLogo}
                        />
                      </span>
                      <span className="btn-inner--text">Google</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>

                  {/* 입력칸 */}

                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" value={email}
                          onChange={(e) => setEmail(e.target.value)} />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
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
                    </FormGroup>
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={handleSignin}
                      >
                        Sign in
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    style={{cursor: "pointer"}}
                    onClick={() => navigate("/register")}
                  >
                    <small>Create new account</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  )
}

export default LoginModal