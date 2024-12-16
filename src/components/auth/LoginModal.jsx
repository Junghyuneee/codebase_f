import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    InputGroup,
} from "react-bootstrap";

import GoogleLogo from "../../assets/img/icons/common/google.svg";
import KakaoLogo from "../../assets/img/icons/common/kakao_icon.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLoginHandler, kakaoLoginHandler, postSignIn } from "@/api/auth/auth.js";
import isAuthenticated from "@/utils/auth/isAuthenticated.js";
import { useForm } from "react-hook-form";

const LoginModal = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        const response = await postSignIn(data.email, data.password);
        if (response) {
            navigate("/", { replace: true });
        } else {
            alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
        }
    }

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(onSubmit)();
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
                </div>
                <div className="d-flex flex-column align-items-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Card className="bg-secondary shadow border-0 w-100">
                        <CardHeader className="bg-white">
                            <div className="text-center">
                                <Button className="btn-neutral btn-icon ml-1" onClick={kakaoLoginHandler}>
                                    <span className="btn-inner--icon mr-1">
                                        <img alt="Kakao" src={KakaoLogo} />
                                    </span>
                                    <span className="btn-inner--text">Kakao</span>
                                </Button>
                                <Button className="btn-neutral btn-icon ml-1" onClick={googleLoginHandler}>
                                    <span className="btn-inner--icon mr-1">
                                        <img alt="Google" src={GoogleLogo} />
                                    </span>
                                    <span className="btn-inner--text">Google</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className="px-lg-5">
                            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroup.Text>
                                            <i className="ni ni-email-83" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            placeholder="이메일"
                                            type="email"
                                            {...register("email", {
                                                required: "이메일은 필수 입력입니다.",
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: "이메일 형식이 올바르지 않습니다.",
                                                },
                                            })}
                                        />
                                    </InputGroup>
                                    {errors.email && (
                                        <small className="text-danger">{errors.email.message}</small>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroup.Text>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            placeholder="비밀번호"
                                            type="password"
                                            onKeyDown={onKeyDown}
                                            {...register("password", {
                                                required: "비밀번호는 필수 입력입니다.",
                                            })}
                                        />
                                    </InputGroup>
                                    {errors.password && (
                                        <small className="text-danger">{errors.password.message}</small>
                                    )}
                                </FormGroup>
                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="submit">
                                        로그인
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    <div className="mt-3 d-flex justify-content-between w-100">
                        <a className="text-light"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/register")}>
                            비밀번호 찾기
                        </a>
                        <a
                            className="text-light"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/register")}
                        >
                            <small>회원가입 하러가기</small>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default LoginModal;