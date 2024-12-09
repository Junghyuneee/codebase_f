import apiClient from "@/api/apiClient.js";

export const searchMember = async (param) => {
    const response = await apiClient.get(`/auth/search/${param}`);
    console.log(response.data);
    return response.data;
}