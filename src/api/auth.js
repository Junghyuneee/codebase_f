import axios from "axios";

export async function  postSignUp(username, password, email, address, postcode, tel) {
  return await axios.post('http://localhost:8080/auth/signup', {
    name: username,
    password: password,
    email: email,
    addr: address,
    postcode: postcode,
    tel: tel
  });
}

export async function postOAuthSignUp(email, username, address, postcode, tel){
  return await axios.post('http://localhost:8080/auth/oauth/signup', {
    name: username,
    email: email,
    addr: address,
    postcode: postcode,
    tel: tel
  });
}

export async function postSignIn(email, password){
  return await axios.post('http://localhost:8080/auth/login', {
    email: email,
    password: password,
  });
}

export const kakaoLoginHandler = () => {
  window.location.replace('http://localhost:8080/oauth2/authorization/kakao');
}

export const googleLoginHandler = () => {
  window.location.replace('http://localhost:8080/oauth2/authorization/google');
}