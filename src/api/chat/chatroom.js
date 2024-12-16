import apiClient from "@/api/apiClient.js";


// 채팅방
export const createChatroom = async (title) => {
    const response = await apiClient.post('/chats?title=' + title);
    return response.data;
}

export const showChatrooms = async () => {
    const response = await apiClient.get('/chats');
    return response.data;
}

export const joinChatroom = async (id, email) => {
    const response = await apiClient.post(`/chats/${id}?memberMail=${email}`);
    return response.data;
}

export const leaveChatroom = async (id) => {
    const response = await apiClient.delete(`/chats/${id}`);
    return response.data;
}

export const exitChatroom = (id) => {
    apiClient.get(`/chats/exit/${id}`);
}

export const makeDm = async (id) => {
    const response = await apiClient.get(`/chats/find/${id}`);
    return response.data;
}