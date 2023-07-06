import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/slices/wishlist";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/slices/cart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrashCan, faCartShopping } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/userProfile/wishlistItem.module.css";

const WishlistItem = ({ product }) => {
    const currencyFormat = (price) => {
        return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
    };
    const dispatcher = useDispatch();
    const cart = useSelector((store) => store.cart);
    const isInCart = cart.cartItems.some((item) => item.product._id === product._id);
    const toggleCart = (e) => {
        e.stopPropagation();
        if (isInCart) {
            dispatcher(removeFromCart({ item: product, count: 1 }));
        } else {
            dispatcher(addToCart({ item: product, count: 1 }));
        }
    };
    return (
        <div className={`${styles["wishlist-item-container"]} card text-white`}>
            <div className="row g-0 align-items-center">
                <div className="col-md-3">
                    <img src={product.images[0]?.imageUrl} alt="product" className="img-fluid" />
                </div>
                <div className="col-md-9 card-body p-0 pt-3 p-md-0">
                    <h5 className="card-title"><Link className="text-decoration-none text-white" to={`/shop/product/${product._id}`} >{product.name}</Link></h5>
                    <p>{currencyFormat(product.price) + " LE"}</p>
                    <div className={styles["controls-container"]}>
                        <div className={`btn ${styles["cart-btn"]}`}
                             onClick={toggleCart}
                        >
                            <FontAwesomeIcon icon={isInCart ? faCartShopping : faCartPlus} />
                            <span style={{ marginLeft: "8px" }}> {isInCart ? "Remove from cart" : "Add to cart"}</span>
                        </div>
                        <div
                            className={`btn ${styles["remove-btn"]} btn-outline-danger`}
                            onClick={() => {
                                dispatcher(removeFromWishlist(product));
                            }}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                            <span style={{ marginLeft: "6px" }}> Remove from list</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistItem;
