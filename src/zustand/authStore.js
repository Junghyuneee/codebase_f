import {create} from "zustand";
import {devtools} from "zustand/middleware";
import axios from "axios";

const useAuthStore = create(devtools((set) => ({
    accessToken: null,
    email: null,
    name: null,
    memberId: null,
    role: null,
    setAuthData: (accessToken, email, name, memberId, role) => set({
        accessToken: `Bearer ${accessToken}`,
        email,
        name,
        memberId,
        role
    }),
    clearAuthData: () => set({accessToken: null, email: null, name: null, memberId: null, role: null}),

    // 리프레시 토큰으로 요청하기
    initializeAuth: async () => {
        try {
            const response = await axios.post(`http://${import.meta.env.VITE_APP_BACKEND_DEPLOY}/auth/refresh`, {}, {
                withCredentials: true, // Ensure the refresh token (cookie) is sent
            });

            if (response.status === 200) {
                const newToken = response.data.accessToken;
                set({...response.data, accessToken: `Bearer ${newToken}`});

            } else {
                console.warn('Failed to refresh token', response.status);
                set({accessToken: null, email: null, name: null, memberId: null, role: null});
            }
        } catch (error) {
            console.error('Error initializing auth:', error);
            set({accessToken: null, email: null, name: null, memberId: null, role: null});
        }
    }
})));

export default useAuthStore;