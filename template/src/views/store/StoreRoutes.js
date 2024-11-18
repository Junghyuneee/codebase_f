import { Route, Routes } from 'react-router-dom';

import Store from "./Store";
import Test from "./Test";
import Detail from "./ProjectDetail";
import Cart from "./Cart";
import Download from './Download';
function StoreRoutes() {
    return (<>
    
        <Routes>
            <Route path="/" element={<Store />} />
            <Route path="/test" element={<Test />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:id" element={<Detail />} />
            <Route path="/:id/download" element={<Download />} />
        </Routes>

    </>);

}
export default StoreRoutes;