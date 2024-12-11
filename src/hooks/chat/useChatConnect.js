import {useEffect} from "react";
import {Stomp} from "@stomp/stompjs";
import {getAccessToken} from "@/api/auth/getset.js";

const useChatConnect = (stompClient, subNewMessages) => {

    useEffect(() => {
        if (!stompClient.current || !stompClient.current.connected) {
            stompClient.current = Stomp.client(`ws://${import.meta.env.VITE_APP_BACKEND_DEPLOY}/stomp/chats`);
            stompClient.current.connect(
                {
                    Authorization: getAccessToken(),
                },
                () => {
                    console.log('WebSocket connected');
                    subNewMessages(); // 연결 후에만 메시지 구독
                },
                (error) => console.error('WebSocket error: ', error)
            );
        }

        return () => {
            if (stompClient.current) {
                console.log('Disconnect Chat Room');
                stompClient.current.disconnect();
            }
        };
    }, [stompClient, subNewMessages]);
}

export default useChatConnect;