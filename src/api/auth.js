import apiClient from "@/api/apiClient.js";

// let accessToken = "";

export function setAccessToken(token) {
    localStorage.setItem('accessToken', token); // Update the token
}

export function getAccessToken() {
    return localStorage.getItem('accessToken'); // Retrieve the token
}

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
    setAccessToken(response.data.accessToken);
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