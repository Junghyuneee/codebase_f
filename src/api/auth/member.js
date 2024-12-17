import apiClient from "@/api/apiClient.js";

export const searchMember = async (param) => {
    const response = await apiClient.get(`/member/search/${param}`);
    return response.data;
}

export const getMemberByName = async (param) => {
    const response = await apiClient.get("/member/name" + (param ? "/" + param : ""));
    return response.data;
}

export const getMemberByMail = async (param) => {
    const response = await apiClient.get("/member/mail/" + param);
    return response.data;
}
