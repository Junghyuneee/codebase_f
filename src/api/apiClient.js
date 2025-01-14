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

// 토큰이 있는 상태에서 401에러 발생하면 토큰 다시 받아야댐
apiClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        console.error('Error initializing auth:', error);
        authStore.getState().clearAuthData();
        window.location.replace("/login");
    }
}
)

export default apiClient;
