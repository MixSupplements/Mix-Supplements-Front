import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { decreaseCountByOne, increaseCountByOne } from "../../redux/slices/cart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/productPage/productCounter.module.css";

const ProductCounter = ({ item }) => {
    // const [counter, setCounter] = useState(1);

    const dispatcher = useDispatch();
    const cart = useSelector((store) => store.cart);
    console.log(
        cart.cartItems,
        item,
        cart.cartItems.filter((product) => product.item._id === item._id)
    );
    let [itemCount, setItemCount] = useState(1);
    useEffect(() => {
        if (cart.cartItems.length !== 0) {
            setItemCount(
                cart.cartItems.filter((product) => product.item._id === item._id)[0]?.count
            );
        }
    }, [cart.cartItems, item._id]);
    return (
        <div className={styles["counter"]}>
            <button
                className={`btn ${styles["counter-btn"]}`}
                onClick={() => {
                    dispatcher(decreaseCountByOne({ item: item }));
                }}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <div className={styles["counter-value"]}>{itemCount}</div>
            <button
                className={`btn ${styles["counter-btn"]}`}
                onClick={() => {
                    dispatcher(increaseCountByOne({ item: item }));
                }}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
};

export default ProductCounter;
