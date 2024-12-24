import useAuthStore from '@/zustand/authStore';

export function getAccessToken() {
    return useAuthStore.getState().accessToken;
}

export function getEmail() {
    return useAuthStore.getState().email;
}

export function getName() {
    return useAuthStore.getState().name;
}

export function getMemberId() {
    return useAuthStore.getState().memberId;
}

export function getRole() {
    return useAuthStore.getState().role?'admin':'user';
}