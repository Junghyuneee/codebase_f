import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setAccessToken} from "@/api/auth.js";

const OauthCallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOauthREdirect = async () => {
            const urlParmas = new URLSearchParams(window.location.search);
            const token = urlParmas.get("token");

            if (token) {
                setAccessToken(token);
                navigate("/", {replace: true});
            }
        }
        handleOauthREdirect();
    }, [navigate]);
    return (
        <div>
            Loading...
        </div>
    )
}

export default OauthCallbackPage;