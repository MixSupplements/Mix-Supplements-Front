import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/token";
import { resetCart } from "../../redux/slices/cart";

import UserOrder from "./UserOrder";

import styles from "../../styles/userProfile/userOrders.module.css";
import axiosInstance from "../../APIs/config";

const UserOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [allOrders, setAllOrders] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        axiosInstance.get('/user/orders')
        .then(res => {
            const orders = res.data.reverse()
            setAllOrders(orders);
        })
        .catch((error) => {
            console.log(error);
            if(error.response?.data?.error?.status === 402) {
                localStorage.removeItem("token");
                localStorage.removeItem("cart");
                localStorage.removeItem("wishlist");
                dispatch(setToken(""));
                dispatch(resetCart());
                navigate(`/login`);
            }});
    }, []);

    return (
        <div className={styles["user-orders-container"]}>
            {allOrders?.length ? (
                allOrders.map((order) => <UserOrder key={order._id} order={order} />)
            ) : (
                <div className={styles["empty-placeholder"]}>No Orders Found</div>
            )}
        </div>
    );
};

export default UserOrders;
