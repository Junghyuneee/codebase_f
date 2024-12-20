import axios from "axios";
import authStore from "@/zustand/authStore.js";

const apiClient = axios.create({
    baseURL: `http://${import.meta.env.VITE_APP_BACKEND_DEPLOY}`,
    withCredentials: true,
    credentials: true,
})

apiClient.interceptors.request.use(config => {
    const token = authStore.getState().accessToken;
    if (token && token.startsWith("Bearer ")) {
        config.headers.Authorization = `${token}`;
    }
    return config;
},
    error => {
        return Promise.reject(error);
    }
)

export default apiClient;
