import { Route, Routes } from "react-router-dom";

import PrimaryLayout from "../layouts/PrimaryLayout";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Sign-up";
import Shop from "../pages/Shop";
import Wishlist from "../pages/Wishlist/Wishlist";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import AdminLayout from "../layouts/AdminLayout";
import Orders from "./../pages/Admin/Orders";
import OrderList from "../pages/Admin/Orders/OrderList/OrderList";
import OrderDetails from "../pages/Admin/OrderDetails/OrderDetails";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/Admin/Dashboard" element={<AdminLayout />} >
                <Route path="Orders" element={<Orders />} >
                    <Route path=":status?" element={<OrderList />} />
                </Route>
                <Route path="Order/:orderNumber" element={<OrderDetails />} />
            </Route>
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