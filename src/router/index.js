import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import PrimaryLayout from "../layouts/PrimaryLayout";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Sign-up";
import Shop from "../pages/Shop";
import Product from "../pages/Product";
import UserProfile from "../pages/UserProfile";
import AccountDetails from "../components/UserProfile/AccountDetails";
import UserWishlist from "../components/UserProfile/UserWishlist";
import UserOrders from "../components/UserProfile/UserOrders";
import Cart from "../pages/Cart";
import Search from "../pages/Search/Search";
import NotFound from "../pages/NotFound";
import Checkout from "../pages/Checkout";

const AppRouter = () => {
    const token = useSelector((store) => store.token);
    const cart = useSelector((store) => store.cart);
    return (
        <Routes>
            <Route element={<PrimaryLayout />}>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />}></Route>
                <Route path="/signup" element={token ? <Navigate to="/home" /> : <Signup />}></Route>
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={token && cart.cartItems.length !==0? <Checkout />: <Navigate to="/shop"/>} />
                <Route path="/search/:searchText" element={<Search />} />
                <Route path="/user/*" element={<UserProfile />}>
                    <Route path="accountDetails/" element={token ? <AccountDetails /> : <Navigate to="/login" />} />
                    <Route path="wishlist/" element={<UserWishlist />} />
                    <Route path="orders/" element={token ? <UserOrders /> : <Navigate to="/login" />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
