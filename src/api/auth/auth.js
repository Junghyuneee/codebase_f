import apiClient from "@/api/apiClient.js";
import useAuthStore from "@/zustand/authStore.js";

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
        useAuthStore.getState().clearAuthData();
        return false;
    }

    useAuthStore.getState().setAuthData(
        response.data.accessToken,
        response.data.email,
        response.data.username,
        response.data.member_id,
        response.data.role
    );

    return true;
}

export async function postSignOut() {
    await apiClient.post("/auth/signout")
        .finally(() => {
            useAuthStore.getState().clearAuthData();
            window.location.replace("/");
        })
}

export const kakaoLoginHandler = () => {
    window.location.replace('http://localhost:8080/oauth2/authorization/kakao');
}

export const googleLoginHandler = () => {
    window.location.replace('http://localhost:8080/oauth2/authorization/google');
}

// 이름 중복 체크
export const nameCheck = async (param) => {
    const response = await apiClient.get(`/auth/namecheck?name=${param}`);
    return response.data;
}

export const emailCheck = async (param) => {
    const response = await apiClient.get(`/auth/emailcheck?email=${param}`);
    return response.data;
}

export const emailCodeCheck = async (param, code) => {
    const response = await apiClient.get(`/auth/emailverify?email=${param}&code=${code}`);
    return response.data;
}