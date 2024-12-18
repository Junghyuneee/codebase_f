import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/css/argon-design-system-react.css";
import './App.css';

import {Route, Routes} from "react-router-dom"
import MainPage from "./pages/main/MainPage"
import LoginModal from './components/auth/LoginModal';
import RegisterModal from "./components/auth/RegisterModal";

import Store from "./components/store/StoreRoutes.jsx";

import Team from "./pages/team/team.jsx"
import Teamdetail from "./components/team/teamdetail.jsx"

import Admin from "./components/admin/Admin.jsx";
import OauthCallbackPage from "@/components/auth/OauthCallbackPage.jsx";

import Review from './components/review/Review.jsx';
import Post from './components/post/Post.jsx';
import ChatPage from "@/pages/chat/ChatPage.jsx";
import Profile from "@/pages/member/Profile.jsx";
import ChangeInfo from "@/pages/member/ChangeInfo.jsx";
import ChangePWD from "./pages/member/ChangePWD";
import useAuthStore from "@/zustand/authStore.js";
import {useEffect, useState} from "react";

function App() {
    const authStore = useAuthStore();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const checkRefreshToken = async () => {
            setIsLoading(true)
            await authStore.initializeAuth();
            setIsLoading(false)
        }
        checkRefreshToken();
    }, []);

    if(isLoading){
        return <div>Loading...</div>;
    }

    return (

        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginModal/>}/>
            <Route path="/register" element={<RegisterModal/>}/>

            <Route path="/store/*" exact element={<Store/>}/>

            <Route path="/admin/*" exact element={<Admin/>}/>

            <Route path="/team" exact element={<Team/>}/>
            <Route path="/teamdetail/:id" exact element={<Teamdetail/>}/>
            <Route path="/review/*" exact element={<Review/>}/>
            <Route path="/oauth" element={<OauthCallbackPage/>}/>
            <Route path="/post/*" element={<Post/>}/>

            <Route path="/profile/:id?" element={<Profile/>}/>
            <Route path={"/changeinfo"} element={<ChangeInfo/>}/>
            <Route path={"/changepwd"} element={<ChangePWD/>}/>

            <Route path="/chat" element={<ChatPage/>}/>
        </Routes>

    )
}

export default App
