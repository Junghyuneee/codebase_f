import {getAccessToken, getRole} from "@/api/auth/getset.js";

export const isAdmin = () => {

    const role = getRole(); // 나중에 getRole로 바꾸기

    return !!(getAccessToken() && role === 'admin');
};