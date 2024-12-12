
import React from "react";
import { Routes, Route } from "react-router-dom";


import Store from "./Store";
import StoreCart from "./Cart"
import StoreTest from "./Test"
import StoreAdd from "./CreateProject";
import StoreDetail from "./ProjectDetail.jsx";
import Navbar from "@/components/team/Navbar";
function Admin() {
    return (
        <div>
             {/* <Navbar/> */}

            <main>
                <Routes>
                    <Route path="/" exact element={<Store />} />
                    <Route path="/cart" exact element={<StoreCart />} />
                    <Route path="/test" exact element={<StoreTest />} />
                    <Route path="/add" exact element={<StoreAdd />} />
                    <Route path="/:id" element={<StoreDetail />} />
                </Routes>
            </main>
        </div>
    );
}

export default Admin;
