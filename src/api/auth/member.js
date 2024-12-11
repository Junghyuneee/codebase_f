import apiClient from "@/api/apiClient.js";

export const searchMember = async (param) => {
    const response = await apiClient.get(`/member/search/${param}`);
    return response.data;
}

export const getMember = async (param) => {
    const response = await apiClient.get("/member/profile" + (param?"/"+param:""));
    return response.data;
}