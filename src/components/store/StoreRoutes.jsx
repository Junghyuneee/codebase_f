import { Route, Routes } from 'react-router-dom';

import Store from "./Store";
import Test from "./Test";
import Detail from "./ProjectDetail";
import Cart from "./Cart";
import Download from './Download';
function StoreRoutes() {
    return (<>
    
        <Routes>
            <Route path="/store" element={<Store />} />
            <Route path="/store/test" element={<Test />} />
            <Route path="/store/cart" element={<Cart />} />
            <Route path="/store/:id" element={<Detail />} />
            <Route path="/store/:id/download" element={<Download />} />
        </Routes>

    </>);

}
export default StoreRoutes;