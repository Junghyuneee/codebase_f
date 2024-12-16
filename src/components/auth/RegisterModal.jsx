import { Button, Card, CardHeader, CardBody, Form, Container } from "react-bootstrap";
import GoogleLogo from "@/assets/img/icons/common/google.svg";
import KakaoLogo from "@/assets/img/icons/common/kakao_icon.png";
import { useEffect, useState } from "react";
import { googleLoginHandler, kakaoLoginHandler, postOAuthSignUp, postSignUp } from "@/api/auth/auth.js";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import EmailSection from "./register/EmailSection.jsx";
import NameSection from "./register/NameSection.jsx";
import PasswordSection from "./register/PasswordSection.jsx";
import AddressSection from "./register/AddressSection.jsx";
import TelSection from "./register/TelSection.jsx";

const RegisterModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
    clearErrors
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
                <Button className="btn-neutral btn-icon ml-1" color="default"
                  onClick={googleLoginHandler}>
                  <span className="btn-inner--icon mr-1">
                    <img alt="Google" src={GoogleLogo} />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
                <Button className="btn-neutral btn-icon ml-1" color="default"
                  onClick={kakaoLoginHandler}>
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

                <NameSection
                  register={register}
                  errors={errors}
                  watch={watch}
                  trigger={trigger}
                />
                <EmailSection
                  register={register}
                  errors={errors}
                  watch={watch}
                  social={social}
                  trigger={trigger}
                />
                <PasswordSection
                  register={register}
                  errors={errors}
                  watch={watch}
                  social={social}
                />

                <TelSection
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  clearErrors={clearErrors}
                />

                <AddressSection
                  register={register}
                  setValue={setValue}
                />

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