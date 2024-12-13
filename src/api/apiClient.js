import axios from "axios";
import {getAccessToken, setAccessToken} from "@/api/auth/getset.js";

const apiClient = axios.create({
    baseURL: `http://${import.meta.env.VITE_APP_BACKEND_DEPLOY}`,
    withCredentials: true,
    credentials: true,
})

apiClient.interceptors.request.use(config => {
        const token = getAccessToken();
        if (token && token.startsWith("Bearer ")) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            try {
                console.log("Refreshing token...");
                const refreshResponse = await axios.post(`http://${import.meta.env.VITE_APP_BACKEND_DEPLOY}`+"/auth/refresh", {}, {
                    withCredentials: true, // Ensure the refresh token (cookie) is sent
                });
                const newToken = refreshResponse.data.accessToken;
                setAccessToken(`Bearer ${newToken}`); // Update token
                // Retry the original request with the new token
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(error.config);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                localStorage.clear();
                window.location.replace("/login")
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
