import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CartCard from "../../components/CartCard";

import styles from "../../styles/userProfile/userWishlist.module.css";

const Cart = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const currencyFormat = (price) => {
        return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
    };

    const cart = useSelector((store) => store.cart);
    let showItems = [];
    let emptyCart = true;
    if (cart.cartItems.length === 0) {
        showItems = <div className={styles["empty-placeholder"]}>No Products In Your Cart Yet</div>;
    } else {
        emptyCart = false;
        cart.cartItems.map((item) => {
            return showItems.push(<CartCard key={item.product._id} item={item.product} />);
        });
    }

    const navigate = useNavigate();
    const token = useSelector((store) => store.token);
    const proceedToCheckout = () => {
        if (token) {
            navigate(`/checkout`);
        } else {
            navigate(`/login`);
        }
    };

    return (
        <div className="text-center">
            <h2>My Cart</h2>
            <div className="cart-content row pt-5">
                <div className="cart-items text-start col-lg-9 mb-3">
                    {showItems}
                </div>
                <div className="cart-total text-start col-lg-3">
                    <div className="border border-white p-3 text-start rounded-2">
                        <h5>
                            <i className="fa-solid fa-bag-shopping"></i> Order Total
                        </h5>
                        <div className="row py-3">
                            <span className="col-6">Total Items:</span>
                            <span className="col-6 text-end">{cart.count}</span>
                        </div>
                        <div className="row py-3">
                            <span className="col-6">Total Price:</span>
                            <span className="col-6 text-end">
                                {currencyFormat(cart.totalPrice)} LE
                            </span>
                        </div>
                    </div>
                    <button
                        className="btn home-button"
                        onClick={() => {
                            proceedToCheckout();
                        }}
                        disabled={emptyCart}
                    >
                        Proceed To Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
