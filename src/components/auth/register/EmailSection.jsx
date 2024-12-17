import {Button, Form, InputGroup} from "react-bootstrap";
import {useState, useEffect, useRef} from "react";
import {emailCheck, emailCodeCheck} from "@/api/auth/auth";
import PropTypes from "prop-types";

const EmailTimer = ({initialTime, isActive, onTimeEnd}) => {
    const [remainingTime, setRemainingTime] = useState("");
    const timerRef = useRef(null);

    useEffect(() => {
        if (!isActive) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                setRemainingTime("인증 완료");
            }
            return;
        }

        let timeLeft = initialTime;

        timerRef.current = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;

            setRemainingTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

            if (timeLeft <= 0) {
                clearInterval(timerRef.current);
                setRemainingTime("시간 만료");
                onTimeEnd?.();
            }
            timeLeft -= 1;
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [initialTime, isActive, onTimeEnd]);

    return (
        <div>남은시간: {remainingTime}</div>
    );
};

const EmailSection = ({register, errors, watch, social, trigger}) => {
    const [emailCheckResult, setEmailCheckResult] = useState(false);
    const [emailCodeCheckResult, setEmailCodeCheckResult] = useState(false);
    const [emailCode, setEmailCode] = useState("");
    const [timer, setTimer] = useState(null);

    const handleEmailCheck = async () => {
        if (watch("email") === "") {
            alert("이메일을 입력해주세요");
            return;
        }

        try {
            const response = await emailCheck(watch("email"));
            if (response !== -1) {
                setEmailCheckResult(true);
                setEmailCodeCheckResult(false);
                setEmailCode("");
                setTimer(response);
            } else {
                alert("이미 가입된 이메일입니다.");
                setEmailCheckResult(false);
                setTimer(null);
            }
        } catch (error) {
            console.error("이메일 인증 중 오류 발생:", error);
            setEmailCheckResult(false);
            setTimer(null);
        }
    };

    const handleEmailCodeCheck = async () => {
        if (emailCode === "") {
            alert("인증 코드를 입력해주세요");
            return;
        }
        const response = await emailCodeCheck(watch("email"), emailCode);
        if (response) {
            alert("인증 코드가 일치합니다.");
            setEmailCodeCheckResult(true);
            trigger("email");
        } else {
            alert("인증 코드가 일치하지 않습니다.");
            setEmailCodeCheckResult(false);
        }
    };

    useEffect(() => {
        if (emailCheckResult && emailCodeCheckResult) {
            trigger("email");
        }
    }, [emailCheckResult, emailCodeCheckResult, trigger]);

    return (
        <>
            <div className="d-flex" style={{gap: '1rem'}}>
                <InputGroup className="input-group-alternative">
                    <InputGroup.Text>
                        <i className="ni ni-email-83"/>
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Email"
                        disabled={social}
                        {...register("email", {
                            required: "이메일을 입력해주세요",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "올바른 이메일 형식이 아닙니다"
                            },
                            validate: {
                                checkDuplicate: () => {
                                    if (social || (emailCheckResult && emailCodeCheckResult)) return true;
                                    return "이메일 인증을 해주세요.";
                                }
                            }
                        })}
                    />
                </InputGroup>
                {!social && <Button
                    className={"bg-mainTheme text-nowrap"}
                    type={"button"}
                    onClick={handleEmailCheck}
                >
                    인증
                </Button>}
            </div>
            {errors.email && (
                <div className="text-danger" style={{fontSize: "0.8rem"}}>
                    {errors.email.message}
                </div>
            )}

            {emailCheckResult && !emailCodeCheckResult && (
                <div className="d-flex" style={{gap: '1rem'}}>
                    <InputGroup className="input-group-alternative">
                        <Form.Control
                            placeholder="Email Code"
                            disabled={social}
                            value={emailCode}
                            onChange={(e) => setEmailCode(e.target.value)}
                        />
                        <InputGroup.Text className="text-danger flex" style={{gap: '0.5rem'}}>
                            <EmailTimer
                                initialTime={timer}
                                isActive={emailCheckResult && !emailCodeCheckResult}
                                onTimeEnd={() => setEmailCheckResult(false)}
                            />
                        </InputGroup.Text>
                    </InputGroup>
                    <Button
                        className={"bg-mainTheme text-nowrap"}
                        type={"button"}
                        onClick={handleEmailCodeCheck}
                    >
                        인증하기
                    </Button>
                </div>
            )}
        </>
    );
};

EmailSection.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func.isRequired,
    social: PropTypes.bool.isRequired,
    trigger: PropTypes.func.isRequired
};

EmailTimer.propTypes = {
    initialTime: PropTypes.number,
    isActive: PropTypes.bool.isRequired,
    onTimeEnd: PropTypes.func
};

export default EmailSection;