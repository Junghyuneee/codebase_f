import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {setAccessToken, setEmail, setMemberId, setName, setProjectCount} from "@/api/auth/getset.js";

const OauthCallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
            const handleOauthRedirect = async () => {
                const urlParams = new URLSearchParams(window.location.search);
                const token = 'Bearer ' + decodeURIComponent(urlParams.get("token"));

                if (token) {
                    setAccessToken(token);
                    setEmail(decodeURIComponent(urlParams.get("email")));
                    setName(decodeURIComponent(urlParams.get("name")));
                    setMemberId(urlParams.get("memberId"));
                    setProjectCount(urlParams.get("project_count"));
                    navigate("/", {replace: true});
                }
            }
            handleOauthRedirect();
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []);
    return (
        <div>
            Loading...
        </div>
    )
}

export default OauthCallbackPage;