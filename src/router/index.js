import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

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
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);
  return (
    <Routes>
      <Route element={<PrimaryLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={token ? <Home /> : <Login />}></Route>
        <Route path="/signup" element={token ? <Home /> : <Signup />}></Route>
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/*" element={<UserProfile />}>
          <Route path="accountDetails/" element={<AccountDetails />} />
          <Route path="wishlist/" element={<UserWishlist />} />
          <Route path="orders/" element={<UserOrders />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
