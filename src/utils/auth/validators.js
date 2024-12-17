export const validatePassword = (password, setError) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password.length < 8) {
    setError("비밀번호는 8자 이상이어야 합니다.");
    return false;
  }
  if (!passwordRegex.test(password)) {
    setError("비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.");
    return false;
  }
  setError("");
  return true;
};

export const validatePasswordConfirm = (password, passwordConfirm, setError) => {
  if (password !== passwordConfirm) {
    setError("비밀번호가 일치하지 않습니다.");
    return false;
  }
  setError("");
  return true;
};

export const validateName = (name, setError) => {
  if (!name.trim()) {
    setError("이름을 입력해주세요.");
    return false;
  }
  if (name.length < 2) {
    setError("이름은 2자 이상이어야 합니다.");
    return false;
  }
  setError("");
  return true;
};

export const validateEmail = (email, setError) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    setError("이메일을 입력해주세요.");
    return false;
  }
  if (!emailRegex.test(email)) {
    setError("올바른 이메일 형식이 아닙니다.");
    return false;
  }
  setError("");
  return true;
};

export const validateTel = (tel, setError) => {
  const telRegex = /^[0-9]{10,11}$/;
  if (!tel.trim()) {
    setError("전화번호를 입력해주세요.");
    return false;
  }
  if (!telRegex.test(tel)) {
    setError("전화번호는 10-11자리의 숫자만 입력 가능합니다.");
    return false;
  }
  setError("");
  return true;
};