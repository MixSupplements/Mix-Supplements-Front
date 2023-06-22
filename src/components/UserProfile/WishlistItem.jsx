import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/userProfile/wishlistItem.module.css";

const WishlistItem = ({ item, handleRemove }) => {
    const currencyFormat = (price) => {
        return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
    };
    return (
        <div className={`${styles["wishlist-item-container"]} card text-white`}>
            <div className="row g-0 align-items-center">
                <div className="col-md-3">
                    <img src={item.image[0].imageUrl} alt="product" className="img-fluid" />
                </div>
                <div className="col-md-9 card-body p-0 pt-3 p-md-0">
                    <h5 className="card-title">{item.name}</h5>
                    <p>{currencyFormat(item.price) + " LE"}</p>
                    <div className={styles["controls-container"]}>
                        <div className={`btn ${styles["cart-btn"]}`}>
                            <FontAwesomeIcon icon={faCartPlus} />
                            <span style={{ marginLeft: "8px" }}> Add to cart</span>
                        </div>
                        <div
                            className={`btn ${styles["remove-btn"]} btn-outline-danger`}
                            onClick={() => handleRemove(item.id)}
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