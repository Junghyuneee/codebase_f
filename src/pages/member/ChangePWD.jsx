import { Button, Card, CardBody, CardHeader, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updatePassword } from "@/api/auth/auth";
import PasswordSection from "@/components/auth/register/PasswordSection";

const ChangePWD = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (window.confirm('비밀번호를 수정하시겠습니까?')) {
      try {
        const response = await updatePassword(data);
        if (response) {
          alert("비밀번호가 변경되었습니다.");
          navigate("/profile", { replace: true });
        } else {
          alert("비밀번호가 일치하지 않습니다.");
        }
      } catch (error) {
        alert(error.response?.data?.error || '비밀번호 수정 중 오류가 발생했습니다.');
      }
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
            <CardHeader>
              <h3 className="mb-0">비밀번호 변경</h3>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column" style={{ gap: '1rem' }}>
                <Form.Group>
                  <InputGroup className="input-group-alternative">
                    <InputGroup.Text>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroup.Text>
                    <Form.Control placeholder="현재 비밀번호 (초기 비밀번호 없으면 공백)" type="password" {...register('currentPassword')} />
                  </InputGroup>

                </Form.Group>
                <PasswordSection
                  register={register}
                  errors={errors}
                  watch={watch}
                  trigger={trigger}
                />

                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="submit"
                  >
                    수정
                  </Button>
                  <Button
                    className="mt-4 bg-danger"
                    type="button"
                    onClick={() => navigate("/profile", { replace: true })}
                  >
                    취소
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default ChangePWD;