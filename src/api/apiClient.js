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

apiClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        console.error('Error initializing auth:', error);
        if (error.response?.status === 401) {
            window.location.reload();
        }
    }
}
)

export default apiClient;
