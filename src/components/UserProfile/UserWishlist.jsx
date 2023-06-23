import WishlistItem from "./WishlistItem";

import styles from "../../styles/userProfile/userWishlist.module.css";
import { useSelector } from "react-redux";

const UserWishlist = () => {
    const wishlist = useSelector(store => store.wishlist);

    return (
        <div className={styles["user-wishlist-container"]}>
            {wishlist.wishlistItems.length ? (
                wishlist.wishlistItems.map((item) => (
                    <WishlistItem key={item._id} item={item} />
                ))
            ) : (
                <div className={styles["empty-placeholder"]}>No Product Found</div>
            )}
        </div>
    );
};

export default UserWishlist;
