import { useEffect } from "react";

import { useSelector } from "react-redux";

import WishlistItem from "./WishlistItem";

import styles from "../../styles/userProfile/userWishlist.module.css";

const UserWishlist = () => {
    const wishlist = useSelector((store) => store.wishlist);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles["user-wishlist-container"]}>
            {wishlist.wishlistItems.length ? (
                wishlist.wishlistItems.map((item) => <WishlistItem key={item._id} product={item} />)
            ) : (
                <div className={styles["empty-placeholder"]}>No Products In Your Wishlist Yet</div>
            )}
        </div>
    );
};

export default UserWishlist;
