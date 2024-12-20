import {getAccessToken, getRole} from "@/api/auth/getset.js";

export const isAdmin = () => {

    const role = getRole();

    return !!(getAccessToken() && role === 'admin');
};