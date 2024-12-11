import apiClient from "@/api/apiClient.js";

export const getMessages = async (chatroomId) => {
    const response = await apiClient.get(`/chats/${chatroomId}/messages`);
    return response.data;
}