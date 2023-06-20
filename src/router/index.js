import { Route, Routes, Navigate } from "react-router-dom";

import PrimaryLayout from "../layouts/PrimaryLayout";
import Home from "../pages/Home";
import Product from "../pages/Product";
import UserProfile from "../pages/UserProfile";
import AccountDetails from "../components/UserProfile/AccountDetails";
import UserWishlist from "../components/UserProfile/UserWishlist";
import UserOrders from "../components/UserProfile/UserOrders";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PrimaryLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/store/product/:id" element={<Product />} />
                <Route path="/user/*" element={<UserProfile />} >
                    <Route path="accountDetails/" element={<AccountDetails />} />
                    <Route path="wishlist/" element={<UserWishlist />} />
                    <Route path="orders/" element={<UserOrders />} />
                </Route>

            </Route>
        </Routes>
    );
}

export default AppRouter;