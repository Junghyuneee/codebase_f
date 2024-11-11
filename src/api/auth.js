import axios from "axios";

export async function postSignUp(username, password, email, address, postcode, tel) {
  const response = await axios.post('http://localhost:8080/auth/signup', {
    name: username,
    password: password,
    email: email,
    address: address,
    postcode: postcode,
    tel: tel
  });
  return response;
}