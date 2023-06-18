import { Route, Routes } from "react-router-dom";

import PrimaryLayout from "../layouts/PrimaryLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Wishlist from "../pages/Wishlist/Wishlist";

const AppRouter = () => {
    return ( 
        <Routes>
            <Route element={<PrimaryLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/wishlist" element={<Wishlist />} />
            </Route>
        </Routes>
     );
}
 
export default AppRouter;