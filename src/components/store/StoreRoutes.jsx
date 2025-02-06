
import React from "react";
import { Routes, Route } from "react-router-dom";


import Store from "./Store";
import StoreCart from "./Cart"
import StoreTest from "./Test"
import StoreAdd from "./CreateProject";
import StoreDetail from "./ProjectDetail.jsx";
import Navbar from "@/components/team/Navbar";
import NavigationBar from "@/components/Navbars/NavigationBar";
import Purchased from "./purchased/PurchasedList";
import PurchasedProject from "./purchased/PurchasedProject";
function Admin() {
    return (
        <div>
             <NavigationBar />

            <main>
                <Routes>
                    <Route path="/" exact element={<Store />} />
                    <Route path="/cart" exact element={<StoreCart />} />
                    <Route path="/test" exact element={<StoreTest />} />
                    <Route path="/add" exact element={<StoreAdd />} />
                    <Route path="/:id" element={<StoreDetail />} />
                    <Route path="/purchase" element={<Purchased />} />

                    <Route path="purchase/:id" element={<PurchasedProject/>} />
                </Routes>
            </main>
        </div>
    );
}

export default Admin;
