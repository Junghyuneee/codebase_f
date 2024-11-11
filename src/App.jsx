import './App.css'
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";

import { Route, Routes } from "react-router-dom"
import MainPage from "./pages/main/MainPage"
import LoginModal from './components/auth/LoginModal';
import RegisterModal from "./components/auth/RegisterModal";
import ProjectList from "./pages/store/Store";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginModal />} />
      <Route path="/register" element={<RegisterModal />} />
      <Route path="/Store" exact element={<ProjectList />} />

    </Routes>
  )
}

export default App
