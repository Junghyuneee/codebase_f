import { Route, Routes } from 'react-router-dom';

import Store from "views/store/Store.js";
import Test from "views/store/test";
import Banner from "./Banner";

function StroeRoutes() {
    return (<>


        <Routes>
            <Route path="/store" element={<Store />}>
                <Route index element={<Banner />} />
                <Route path="cart" element={<Test />} />
            </Route>


        </Routes>

    </>);

}
export default StroeRoutes;