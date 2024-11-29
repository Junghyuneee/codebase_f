import apiClient from "@/api/apiClient.js";
import {getAccessToken, setAccessToken, setEmail, setMemberId, setName, setProjectCount} from "@/api/auth/getset.js";

export async function postSignUp(username, password, email, address, postcode, tel) {
    return await apiClient.post('/auth/signup', {
        name: username,
        password: password,
        email: email,
        addr: address,
        postcode: postcode,
        tel: tel
    });
}

export async function postOAuthSignUp(email, username, address, postcode, tel) {
    return await apiClient.post('/auth/oauth/signup', {
        name: username,
        email: email,
        addr: address,
        postcode: postcode,
        tel: tel
    });
}

export async function postSignIn(email, password) {
    const response = await apiClient.post("/auth/signin", {email, password});
    // Save the access token after logging in
    // console.log(response);
    setAccessToken('Bearer ' + response.data.accessToken);
    setEmail(response.data.email);
    setName(response.data.username);
    setProjectCount(response.data.project_count);
    setMemberId(response.data.member_id);
    if(getAccessToken() === "Invalid password") {
        localStorage.clear();
        return false;
    }
    return true;
}

export async function postSignOut(){
    localStorage.clear();

    const response = await apiClient.post("/auth/signout");
    console.log(response);
}

export const kakaoLoginHandler = () => {
    window.location.replace('http://localhost:8080/oauth2/authorization/kakao');
}

export const googleLoginHandler = () => {
    window.location.replace('http://localhost:8080/oauth2/authorization/google');
}