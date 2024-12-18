import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useAuthStore from "@/zustand/authStore.js";

const OauthCallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOauthRedirect = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
            const email = urlParams.get("email");
            const name = urlParams.get("name");
            const memberId = urlParams.get("memberId");
            const role = urlParams.get("role");

            if (token && email && name && memberId && role) {
                useAuthStore.getState().setAuthData(
                    decodeURIComponent(token),
                    decodeURIComponent(email),
                    decodeURIComponent(name),
                    memberId,
                    decodeURIComponent(role),
                );
                navigate("/", {replace: true});
            }
        }
        handleOauthRedirect();
    }, [navigate]);
    return (
        <div>
            Loading...
        </div>
    )
}

export default OauthCallbackPage;