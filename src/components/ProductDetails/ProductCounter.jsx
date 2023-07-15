import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { decreaseCountByOne, increaseCountByOne, resetCart } from "../../redux/slices/cart";
import { setToken } from "../../redux/slices/token";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/productPage/productCounter.module.css";

const ProductCounter = ({ item }) => {
    // const [counter, setCounter] = useState(1);
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const cart = useSelector((store) => store.cart);
    let [itemCount, setItemCount] = useState(1);
    useEffect(() => {
        if (cart.cartItems.length !== 0) {
            setItemCount(
                cart.cartItems.filter((product) => product.product._id === item._id)[0]?.quantity
            );
        }
    }, [cart.cartItems, item._id]);
    return (
        <div className={styles["counter"]}>
            <button
                className={`btn ${styles["counter-btn"]}`}
                onClick={() => {
                    dispatcher(decreaseCountByOne({ item: item }));
                    setTimeout(()=>{
                        if(localStorage.getItem("token") && localStorage.getItem("expiredToken") ) {
                            localStorage.removeItem("token");
                            localStorage.removeItem("cart");
                            localStorage.removeItem("wishlist");
                            localStorage.removeItem("expiredToken");
                            dispatcher(setToken(""));
                            dispatcher(resetCart());
                            navigate(`/login`);
                    }},500);
                }}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <div className={styles["counter-value"]}>{itemCount}</div>
            <button
                className={`btn ${styles["counter-btn"]}`}
                onClick={() => {
                    dispatcher(increaseCountByOne({ item: item }));
                    setTimeout(()=>{
                        if(localStorage.getItem("token") && localStorage.getItem("expiredToken") ) {
                            localStorage.removeItem("token");
                            localStorage.removeItem("cart");
                            localStorage.removeItem("wishlist");
                            localStorage.removeItem("expiredToken");
                            dispatcher(setToken(""));
                            dispatcher(resetCart());
                            navigate(`/login`);
                    }},500);
                }}
                disabled={itemCount < item.quantity ? false : true}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
};

export default ProductCounter;
