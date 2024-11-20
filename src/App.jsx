import './App.css'
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";

import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/main/MainPage"
import LoginModal from './components/auth/LoginModal';
import RegisterModal from "./components/auth/RegisterModal";
import Store from "./components/store/Store";
import StoreCart from "./components/store/Cart"
import StoreTest from "./components/store/Test"
import StoreAdd from "./components/store/CreateProject";
import StoreDetail from "./components/store/ProjectDetail.jsx";
import Team from "./components/team/team.jsx"
import Teamdetail from "./components/team/teamdetail.jsx"

import Admin from "./components/admin/Admin.jsx";


function App() {

  return (

    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginModal />} />
      <Route path="/register" element={<RegisterModal />} />

      <Route path="/store" exact element={<Store />} /> 
      <Route path="/store/cart" exact element={<StoreCart />} /> 
      <Route path="/store/test" exact element={<StoreTest />} />
      <Route path="/store/add" exact element={<StoreAdd />} /> 
      <Route path="/store/:id" element={<StoreDetail />} /> 

      <Route path="/admin/*" exact element={<Admin />} />

      <Route path="/team" exact element={<Team />} />
      <Route path="/teamdetail" exact element={<Teamdetail />} />
    </Routes>

  )
}

export default App
