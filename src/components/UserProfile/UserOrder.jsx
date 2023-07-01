import React from "react";

import styles from "../../styles/userProfile/userOder.module.css";

const UserOrder = ({ order }) => {
    const currencyFormat = (price) => {
        return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
    };

    const { createdAt, orderNumber, products, shippingAddress, status, totalPrice } = order;
    return (
        <div className={`${styles["order-container"]}`}>
            <div className="d-flex mb-3 justify-content-between">
                <div>
                    <span>Order ID: </span>
                    <span style={{ color: "var(--clr-primary-400)" }}>{orderNumber}</span>
                </div>
                <div className="fw-bold fs-5">{status}</div>
                <div style={{ fontStyle: "italic", color: "#666" }}>{createdAt}</div>
            </div>
            <table className="w-100">
                <thead className={styles["order-details-head-container"]}>
                    <tr>
                        <th className={styles["order-details-head"]}>Product</th>
                        <th className={styles["order-details-head"]}>Amount</th>
                        <th
                            className={`${styles["order-details-head"]} ${styles["align-right"]}`}
                            style={{ width: "7rem" }}
                        >
                            Price
                        </th>
                    </tr>
                </thead>
                {products.map((product, index) => (
                    <tbody key={product._id}>
                        <tr>
                            <td className={styles["order-details-cell"]}>{product.name}</td>
                            <td className={styles["order-details-cell"]}>x {product.quantity}</td>
                            <td
                                className={`${styles["order-details-cell"]} ${styles["align-right"]}`}
                            >
                                {currencyFormat(product.price * product.quantity) + " LE"}
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
            <div className={`${styles["order-details-cell"]} ${styles["flex-cell"]}`}>
                <span
                    style={{
                        fontWeight: "var(--fw-bold)",
                        fontSize: "1.2rem",
                        marginRight: ".5rem",
                    }}
                >
                    Address
                </span>
                <span className={`${styles["align-right"]}`} style={{ fontSize: "1.1rem" }}>
                    {`${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.governorate}`}
                </span>
            </div>
            <div className={`${styles["order-details-cell"]} ${styles["flex-cell"]}`}>
                <span
                    style={{
                        fontWeight: "var(--fw-bold)",
                        fontSize: "1.5rem",
                        marginRight: ".5rem",
                    }}
                >
                    Total Price{" "}
                </span>
                <span
                    className={`${styles["align-right"]}`}
                    style={{
                        color: "var(--clr-primary-400)",
                        fontWeight: "var(--fw-bold)",
                        fontSize: "1.5rem",
                    }}
                >
                    {currencyFormat(
                        totalPrice
                        // products.reduce(
                        //     (total, product) => total + product.price * product.quantity,
                        //     0
                        // )
                    ) + " LE"}
                </span>
            </div>
        </div>
    );
};

export default UserOrder;
