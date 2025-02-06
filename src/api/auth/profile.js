import apiClient from "@/api/apiClient.js";
import useAuthStore from "@/zustand/authStore.js";

export const getProfile = async () => {
    const response = await apiClient.get("/profile");
    return response.data;
}

export const removeProfile = async () => {
    const response = await apiClient.delete("/profile");
    useAuthStore.getState().clearAuthData();
    return response.data;
}

export const updateProfile = async (data) => {
    const response = await apiClient.post("/profile/update", data);
    return response.data;
}

export const updatePassword = async (data) => {
    const response = await apiClient.post("/profile/update/password", data);
    return response.data;
}

export const getMyPostList = async (name = "") => {
    const response = await apiClient.get("/profile/post/" + name);
    return response.data;
}

export const getMyProjectList = async (name = "") => {
    const response = await apiClient.get("/profile/project/" + name);
    return response.data;
}

export const getMyReviewList = async (name = "") => {
    const response = await apiClient.get("/profile/review/" + name);
    return response.data;
}