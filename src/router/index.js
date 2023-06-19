import { Route, Routes } from "react-router-dom";

import PrimaryLayout from "../layouts/PrimaryLayout";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Sign-up";
import Shop from "../pages/Shop";
import Wishlist from "../pages/Wishlist/Wishlist";
import Product from "../pages/Product";
import Cart from "../pages/Cart";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PrimaryLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/shop" element={<Shop />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/shop/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;