import { create } from "zustand";
import { devtools } from "zustand/middleware";
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
    clearAuthData: () => set({ accessToken: null, email: null, name: null, memberId: null, role: null }),
    initializeAuth: async () => {
        try {
            const response = await axios.post(`http://${import.meta.env.VITE_APP_BACKEND_DEPLOY}/auth/refresh`, {}, {
                withCredentials: true,
            });

            if (response.status === 200) {
                const newToken = response.data.accessToken;
                set({
                    name: response.data.username,
                    memberId: response.data.member_id,
                    accessToken: `Bearer ${newToken}`,
                    email: response.data.email,
                    role: response.data.role
                });

            } else {
                console.warn('No refresh token found', response.status);
            }
        } catch (error) {
            console.error('Error initializing auth:', error);

            if (error.response?.status === 401) {
                window.location.replace('/login');
            }
            set({ accessToken: null, email: null, name: null, memberId: null, role: null });
        }
    }
})));

export default useAuthStore;