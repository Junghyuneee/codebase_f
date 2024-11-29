import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setAccessToken, setEmail, setMemberId, setName, setProjectCount} from "@/api/auth/getset.js";

const OauthCallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOauthRedirect = async () => {
            const urlParmas = new URLSearchParams(window.location.search);
            const token = 'Bearer '+ decodeURIComponent(urlParmas.get("token"));

            if (token) {
                setAccessToken(token);
                setEmail(decodeURIComponent(urlParmas.get("email")));
                setName(decodeURIComponent(urlParmas.get("name")));
                setMemberId(urlParmas.get("memberId"));
                setProjectCount(urlParmas.get("projectId"));
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