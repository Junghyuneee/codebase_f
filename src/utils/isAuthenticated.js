import {getAccessToken} from "@/api/auth/getset.js";

const isAuthenticated = () => {
    return getAccessToken()?.startsWith("Bearer") ?? false;
}

export default isAuthenticated;