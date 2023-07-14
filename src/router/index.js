import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
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
import AdminLayout from "../layouts/AdminLayout";
import Orders from "./../pages/Admin/Orders";
import OrderList from "../pages/Admin/Orders/OrderList/OrderList";
import OrderDetails from "../pages/Admin/OrderDetails/OrderDetails";
import Search from "../pages/Search/Search";
import NotFound from "../pages/NotFound";
import Checkout from "../pages/Checkout";
import Products from "../pages/Admin/Products/Products";
import Verification from "../pages/Verification";
import ProductDetails from "../pages/Admin/ProductDetails/ProductDetails";
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import { AdminAuthContext } from "../context/AdminAuth";

const AppRouter = () => {
    const token = useSelector((store) => store.token);
    const cart = useSelector((store) => store.cart);
    const { adminToken } = useContext(AdminAuthContext);

    return (
        <Routes>
            <Route path="/admin/login" element={adminToken ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
            <Route path="/admin/dashboard" element={adminToken ? <AdminLayout /> : <Navigate to="/admin/login" />} >
                <Route path="orders" element={<Orders />} >
                    <Route path=":status?" element={<OrderList />} />
                </Route>
                <Route path="order/:orderNumber" element={<OrderDetails />} />

                <Route path="products" element={<Products />} />
                <Route path="product/:id?" element={<ProductDetails />} />
            </Route>


            <Route element={<PrimaryLayout />}>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />}></Route>
                <Route path="/signup" element={token ? <Navigate to="/home" /> : <Signup />}></Route>
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={token && cart.cartItems.length !== 0 ? <Checkout /> : <Shop />} />
                <Route path="/search/:searchText" element={<Search />} />
                <Route path="/user/*" element={<UserProfile />}>
                    <Route path="accountDetails/" element={token ? <AccountDetails /> : <Navigate to="/login" />} />
                    <Route path="wishlist/" element={<UserWishlist />} />
                    <Route path="orders/" element={token ? <UserOrders /> : <Navigate to="/login" />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/verification" element={<Verification />} />
        </Routes>
    );
};

export default AppRouter;
