import apiClient from "@/api/apiClient.js";

export const getNotificationList = async () => {
    const response = await apiClient.get("/noti");
    return response.data;
}

export const readNotifications = async (notifications) => {
    await apiClient.post("/noti/read", {
        notiIds: notifications.filter(noti => !noti.isRead).map(noti => noti.id)
    });
}

export const countUnreadNotifications = async () => {
    const response = await apiClient.get("/noti/unread");
    return response.data;
}