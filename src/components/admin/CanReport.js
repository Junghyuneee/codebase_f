import {getAccessToken} from "@/api/auth/getset.js";

export const CanReport = (navigate) => {
    const isLogin = getAccessToken();

    if (isLogin === null) {
        alert("로그인 후 신고하세요.");
        navigate('/login');
        return false;
    }
    return true;

};
