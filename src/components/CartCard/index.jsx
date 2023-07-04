import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../redux/slices/cart";

import ProductCounter from "../ProductDetails/ProductCounter";

import "./CartCard.css";

const CartCard = ({ item }) => {
    const currencyFormat = (price) => {
        return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
    };

    const dispatcher = useDispatch();
    // const cart = useSelector(store => store.cart);
    return (
        <div className="row border border-white rounded-1 mb-2 py-3 px-2 justify-content-between">
            <div className="row col-md-7 p-0">
                <div className="col-4 p-0">
                    <img
                        className="img-fluid"
                        src={
                            item.images[0]
                                ? item.images[0].imageUrl
                                : process.env.PUBLIC_URL + "images/512x512.png"
                        }
                        alt="Item in Cart"
                    />
                </div>
                <div className="col-8 text-center d-flex flex-column justify-content-center p-0">
                    <Link className="text-decoration-none text-white" to={`/shop/product/${item._id}`} >{item.name}</Link>
                </div>
            </div>
            <div className="row col-md-5 px-0 py-3 justify-content-center">
                <div className="col-4 col-md-5 text-center d-flex flex-column justify-content-center align-items-center p-0">
                    <ProductCounter key={item._id} item={item} />
                </div>
                <div className="col-6 col-md-5 text-center d-flex flex-column justify-content-center p-0">
                    <span>{currencyFormat(item.price)} LE</span>
                </div>
                <div className="col-2 text-start d-flex flex-column justify-content-center p-0">
                    <i
                        onClick={() => {
                            dispatcher(removeFromCart({ item: item, count: 1 }));
                        }}
                        className="fa-solid fa-trash-can"
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
