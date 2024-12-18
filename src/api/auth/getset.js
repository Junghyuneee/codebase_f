// export function getAccessToken() {
//     return localStorage.getItem('accessToken'); // Retrieve the token
// }
//
// export function getEmail(){
//     return localStorage.getItem('email');
// }
// export function getName() {
//     return localStorage.getItem('name');
// }
//
// export function getMemberId() {
//     return localStorage.getItem('member_id');
// }
//
// export function getRole() {
//     return localStorage.getItem('role');
// }

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