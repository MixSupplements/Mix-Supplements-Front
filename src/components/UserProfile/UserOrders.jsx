import { useEffect, useState } from "react";

import UserOrder from "./UserOrder";

import styles from "../../styles/userProfile/userOrders.module.css";
import axiosInstance from "../../APIs/config";

const UserOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        axiosInstance.get('/user/orders')
        .then(res => {
            const orders = res.data.reverse()
            setAllOrders(orders);
        })
        .catch(err => console.log(err))
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
