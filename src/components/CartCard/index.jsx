import { useDispatch } from "react-redux";
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
        <div className="row border border-white rounded-1 mb-2 py-3 px-2">
            <div className="col-2">
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
            <div className="col-5 text-center d-flex flex-column justify-content-center">
                <span>{item.name}</span>
            </div>
            <div className="col-lg-2 col-3 text-center d-flex flex-column justify-content-center">
                <ProductCounter key={item._id} item={item} />
            </div>
            <div className="col-lg-2 col-1 text-center d-flex flex-column justify-content-center">
                <span>{currencyFormat(item.price)} LE</span>
            </div>
            <div className="col-1 text-start d-flex flex-column justify-content-center">
                <i
                    onClick={() => {
                        dispatcher(removeFromCart({ item: item, count: 1 }));
                    }}
                    className="fa-solid fa-trash-can"
                ></i>
            </div>
        </div>
    );
};

export default CartCard;
