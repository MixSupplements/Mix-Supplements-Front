import React from "react";

import UserOrder from "./UserOrder";

import styles from "../../styles/userProfile/userOrders.module.css";

const UserOrders = () => {
    const orders = [
        {
            id: 3267434,
            products: [
                { id: 123, name: "Muscletech Vapor X5", amount: 2, price: 510 },
                {
                    id: 234,
                    name: "Next Gen-30Serv.-232G-Fruit Punch Blast",
                    amount: 1,
                    price: 170,
                },
            ],
            address: "123 Main St, Anytown, USA",
            deliveryFee: 50,
        },
        {
            id: 22343489,
            products: [
                { id: 153, name: "Product 3", amount: 3, price: 732 },
                { id: 234, name: "Next Gen-30Serv.-232G-Fruit Punch Blast", amount: 2, price: 140 },
            ],
            address: "456 Oak St, Anytown, USA",
            deliveryFee: 100,
        },
    ];

    return (
        <div className={styles["user-orders-container"]}>
            {orders.length ? (
                orders.map((order) => <UserOrder key={order.id} order={order} />)
            ) : (
                <div className={styles["empty-placeholder"]}>No Orders Found</div>
            )}
        </div>
    );
};

export default UserOrders;
