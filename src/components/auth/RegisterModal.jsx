import { Button, Card, CardHeader, CardBody, Form, InputGroup, Container } from "react-bootstrap";
import GoogleLogo from "@/assets/img/icons/common/google.svg";
import KakaoLogo from "@/assets/img/icons/common/kakao_icon.png";
import { useEffect, useState } from "react";
import Postcode from "./DaumAddress.jsx";
import { googleLoginHandler, kakaoLoginHandler, postOAuthSignUp, postSignUp } from "@/api/auth/auth.js";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

const RegisterModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedUsername = queryParams.get("username");

  const [social, setSocial] = useState(false);

  useEffect(() => {
    if (encodedUsername) {
      setValue('email', decodeURIComponent(encodedUsername));
      setSocial(true);
    }
  }, [encodedUsername, setValue]);

  const onSubmit = async (data) => {
    if (window.confirm('회원가입 하시겠습니까?')) {
      try {
        const response = social
          ? await postOAuthSignUp(
            data.email,
            data.username,
            `${data.address} ${data.addressDetail}`,
            data.postcode,
            data.tel
          )
          : await postSignUp(
            data.username,
            data.password,
            data.email,
            `${data.address} ${data.addressDetail}`,
            data.postcode,
            data.tel
          );

        if (response.error) {
          alert(response.error);
          return;
        }

        window.location.replace("/");
      } catch (error) {
        alert(error.response?.data?.error || '회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  // 공통 스타일
  const inputStyle = { backgroundColor: '#fff', border: 'none' };
  const errorStyle = { fontSize: "0.8rem" };

  // 에러 메시지 컴포넌트
  const ErrorMessage = ({ children }) => (
    <div className="text-danger mb-3" style={errorStyle}>
      {children}
    </div>
  );

  ErrorMessage.propTypes = {
    children: PropTypes.node.isRequired
  };

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
        <Container>
          <Card className="bg-secondary shadow border-0" style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {/* 소셜 로그인 섹션 */}
            <CardHeader className="bg-white">
              <div className="text-muted text-center mb-3">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button className="btn-neutral btn-icon ml-1" color="default" onClick={googleLoginHandler}>
                  <span className="btn-inner--icon mr-1">
                    <img alt="Google" src={GoogleLogo} />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
                <Button className="btn-neutral btn-icon ml-1" color="default" onClick={kakaoLoginHandler}>
                  <span className="btn-inner--icon mr-1">
                    <img alt="Kakao" src={KakaoLogo} />
                  </span>
                  <span className="btn-inner--text">Kakao</span>
                </Button>
              </div>
            </CardHeader>

            {/* 회원가입 폼 섹션 */}
            <CardBody className="px-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <Form role="form" onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column" style={{ gap: '1rem' }}>
                {/* 이름 입력 */}
                <InputGroup className="input-group-alternative">
                  <InputGroup.Text>
                    <i className="ni ni-hat-3" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Name"
                    {...register("username", {
                      required: "이름을 입력해주세요",
                      minLength: {
                        value: 2,
                        message: "이름은 2자 이상이어야 합니다"
                      }
                    })}
                  />
                </InputGroup>
                {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}

                {/* 이메일 입력 */}
                <InputGroup className="input-group-alternative">
                  <InputGroup.Text>
                    <i className="ni ni-email-83" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Email"
                    disabled={social}
                    {...register("email", {
                      required: "이메일을 입력해주세요",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "올바른 이메일 형식이 아닙니다"
                      }
                    })}
                  />
                </InputGroup>
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                {/* 비밀번호 입력 (소셜 로그인이 아닐 때만) */}
                {!social && (
                  <>
                    <InputGroup className="input-group-alternative">
                      <InputGroup.Text>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Password (영문 대/소문자, 숫자, 특수문자 포함 8자 이상)"
                        {...register("password", {
                          required: "비밀번호를 입력해주세요",
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                            message: "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다"
                          }
                        })}
                      />
                    </InputGroup>
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                    <InputGroup className="input-group-alternative ">
                      <InputGroup.Text>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Password Confirm"
                        {...register("passwordConfirm", {
                          validate: value => value === watch('password') || "비밀번호가 일치하지 않습니다"
                        })}
                      />
                    </InputGroup>
                    {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>}
                  </>
                )}

                {/* 전화번호 입력 */}
                <InputGroup className="input-group-alternative">
                  <InputGroup.Text>
                    <i className="ni ni-mobile-button" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Phone Number (숫자만 입력: 01012345678)"
                    {...register("tel", {
                      required: "전화번호를 입력해주세요",
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: "전화번호는 10-11자리의 숫자만 입력 가능합니다"
                      }
                    })}
                    onChange={(e) => {
                      setValue('tel', e.target.value.replace(/[^0-9]/g, ''));
                    }}
                    maxLength={11}
                  />
                </InputGroup>
                {errors.tel && <ErrorMessage>{errors.tel.message}</ErrorMessage>}

                {/* 주소 입력 */}
                <div className="d-flex" style={{ gap: '1rem' }}>
                  <InputGroup className="input-group-alternative">
                    <InputGroup.Text style={inputStyle}>
                      <i className="ni ni-pin-3" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      disabled
                      {...register("postcode")}
                      placeholder="Postcode"
                      style={inputStyle}
                    />
                    <Postcode
                      setAddress={(address) => setValue('address', address)}
                      setPostCode={(postcode) => setValue('postcode', postcode)}
                    />
                  </InputGroup>
                </div>

                <InputGroup className="input-group-alternative">
                  <InputGroup.Text style={inputStyle}>
                    <i className="ni ni-building" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="주소"
                    type="text"
                    disabled
                    {...register("address")}
                    style={inputStyle}
                  />
                </InputGroup>

                <InputGroup className="input-group-alternative">
                  <InputGroup.Text>
                    <i className="ni ni-building" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="상세 주소"
                    type="text"
                    autoComplete="off"
                    {...register("addressDetail")}
                  />
                </InputGroup>

                {/* 회원가입 버튼 */}
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </section>
    </main>
  );
};

export default RegisterModal;