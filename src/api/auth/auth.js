import apiClient from "@/api/apiClient.js";
import {setAccessToken, setEmail, setMemberId, setName, setProjectCount} from "@/api/auth/getset.js";

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

    if (!response.data.accessToken || response.data.accessToken === "Invalid password") {
        localStorage.clear();
        return false;
    }

    // Save the access token after logging in
    setAccessToken('Bearer ' + response.data.accessToken);
    setEmail(response.data.email);
    setName(response.data.username);
    setProjectCount(response.data.project_count);
    setMemberId(response.data.member_id);

    return true;
}

export async function postSignOut() {
    await apiClient.post("/auth/signout")
        .then(() => {
            localStorage.clear();
            window.location.replace("/");
        })
        .catch(() => {
            localStorage.clear();
            window.location.replace("/");
        });
}

export const kakaoLoginHandler = () => {
    window.location.replace('http://localhost:8080/oauth2/authorization/kakao');
}

export const googleLoginHandler = () => {
    window.location.replace('http://localhost:8080/oauth2/authorization/google');
}