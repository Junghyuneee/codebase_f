import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setAccessToken, setEmail, setMemberId, setName, setProjectCount} from "@/api/auth/getset.js";

const OauthCallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOauthRedirect = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            if (token) {
                setAccessToken('Bearer '+ decodeURIComponent(token));
                setEmail(decodeURIComponent(urlParams.get("email")));
                setName(decodeURIComponent(urlParams.get("name")));
                setMemberId(urlParams.get("memberId"));
                setProjectCount(urlParams.get("project_count"));
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