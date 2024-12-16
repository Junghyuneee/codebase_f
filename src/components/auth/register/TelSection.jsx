import PropTypes from "prop-types";
import { Form, InputGroup } from "react-bootstrap";

const TelSection = ({ register, setValue, errors, clearErrors }) => {
  return (
    <>
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
            const value = e.target.value.replace(/[^0-9]/g, '');
            setValue('tel', value);

            // 에러 조건 확인 후 에러 제거
            if (errors.tel && /^[0-9]{10,11}$/.test(value)) {
              clearErrors('tel');
            }
          }}
          maxLength={11}
        />
      </InputGroup>
      {errors.tel && <div className="text-danger" style={{ fontSize: "0.8rem" }}>{errors.tel.message}
      </div>}
    </>
  );
}
TelSection.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

export default TelSection;