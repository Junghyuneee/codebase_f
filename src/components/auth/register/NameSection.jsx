// components/auth/register/NameSection.jsx
import { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from 'prop-types';
import { nameCheck } from "@/api/auth/auth.js";

const NameSection = ({ register, errors, watch, trigger, initialValue }) => {
  const [nameCheckResult, setNameCheckResult] = useState(false);

  const handleNameCheck = async () => {
    if (watch("username") === "") {
      alert("이름을 입력해주세요");
      return;
    }

    try {
      const response = await nameCheck(watch("username"));

      if (response) {
        alert("사용 가능한 이름입니다.");
        setNameCheckResult(true);
      } else {
        alert("사용 중인 이름입니다.");
        setNameCheckResult(false);
      }
    } catch (error) {
      console.error("이름 중복 확인 중 오류 발생:", error);
      setNameCheckResult(false);
    }
  };

  useEffect(() => {
    if (nameCheckResult) {
      trigger("username");
    }
  }, [nameCheckResult, trigger]);

  return (
    <>
      <div className="d-flex" style={{ gap: '1rem' }}>
        <InputGroup className="input-group-alternative">
          <InputGroup.Text style={{ backgroundColor: '#fff', border: 'none' }}>
            <i className="ni ni-hat-3" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Name"
            style={{ backgroundColor: '#fff', border: 'none' }}
            {...register("username", {
              required: "이름을 입력해주세요",
              minLength: {
                value: 2,
                message: "이름은 2자 이상이어야 합니다"
              },
              validate: {
                checkDuplicate: () => {
                  if (nameCheckResult === true || initialValue === watch("username")) return true;
                  return "이름 중복확인을 해주세요.";
                }
              }
            })}
          />
        </InputGroup>
        <Button
          className={"bg-mainTheme text-nowrap"}
          type={"button"}
          onClick={handleNameCheck}
          disabled={initialValue === watch("username")}
        >
          중복확인
        </Button>
      </div>
      {errors.username && (
        <div className="text-danger" style={{ fontSize: "0.8rem" }}>
          {errors.username.message}
        </div>
      )}
    </>
  );
};

NameSection.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  trigger: PropTypes.func.isRequired,
  initialValue: PropTypes.string
};

export default NameSection;