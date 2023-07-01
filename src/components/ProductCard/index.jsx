import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cart";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlist";

import { Rating } from "@mui/material";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const currencyFormat = (price) => {
        return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
    };

    const navigate = useNavigate();
    const goToDetails = () => {
        navigate(`/shop/product/${product._id}`);
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

    const wishlist = useSelector((store) => store.wishlist);
    const isInWishlist = wishlist.wishlistItems.some((item) => item._id === product._id);
    const toggleWishlist = (e) => {
        e.stopPropagation();
        if (isInWishlist) {
            dispatcher(removeFromWishlist(product));
        } else {
            dispatcher(addToWishlist(product));
        }
    };
    return (
        <div className="col-5 col-md-4 col-lg-3 p-2">
            <div className="card product-card" onClick={goToDetails}>
                <img
                    src={
                        product.images[0]
                            ? product.images[0].imageUrl
                            : process.env.PUBLIC_URL + "images/512x512.png"
                    }
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body">
                    <Rating
                        name="read-only"
                        sx={{
                            "& .MuiRating-iconFilled": {
                                color: "hsl(57, 100%, 50%)",
                            },
                            "& .MuiRating-iconEmpty": {
                                color: "hsl(57, 100%, 50%)",
                            },
                        }}
                        value={product.rating}
                        precision={0.5}
                        readOnly
                    />
                    <h5 className="card-title product-card-title mt-3">{product.name}</h5>
                    <p className="card-text product-card-text">
                        {currencyFormat(product.price)} LE
                    </p>
                    <div className="row justify-content-between fs-4 mt-4">
                        <i
                            onClick={toggleCart}
                            className={`${
                                isInCart ? "fa-cart-shopping filled" : "fa-cart-plus"
                            } fa-solid  col-4 p-0 text-end cart-btn`}
                        ></i>
                        <i
                            onClick={toggleWishlist}
                            className={`${
                                isInWishlist ? "fa-solid filled" : "fa-regular"
                            } fa-heart col-4 p-0 text-start wishlist-btn`}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
