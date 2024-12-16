// components/auth/register/PasswordSection.jsx
import { Form, InputGroup } from "react-bootstrap";
import PropTypes from 'prop-types';

const PasswordSection = ({ register, errors, watch, social }) => {
  if (social) return null;  // 소셜 로그인일 경우 비밀번호 섹션 숨김

  return (
    <>
      {/* 비밀번호 입력 */}
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
      {errors.password && (
        <div className="text-danger" style={{ fontSize: "0.8rem" }}>
          {errors.password.message}
        </div>
      )}

      {/* 비밀번호 확인 입력 */}
      <InputGroup className="input-group-alternative">
        <InputGroup.Text>
          <i className="ni ni-lock-circle-open" />
        </InputGroup.Text>
        <Form.Control
          type="password"
          placeholder="Password Confirm"
          {...register("passwordConfirm", {
            validate: value =>
              value === watch('password') || "비밀번호가 일치하지 않습니다"
          })}
        />
      </InputGroup>
      {errors.passwordConfirm && (
        <div className="text-danger" style={{ fontSize: "0.8rem" }}>
          {errors.passwordConfirm.message}
        </div>
      )}
    </>
  );
};

PasswordSection.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  social: PropTypes.bool.isRequired
};

export default PasswordSection;