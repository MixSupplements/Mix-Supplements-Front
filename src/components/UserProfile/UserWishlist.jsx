import { useState } from "react";

import WishlistItem from "./WishlistItem";

import styles from "../../styles/userProfile/userWishlist.module.css";

const UserWishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: "DY Nutrition Creatine Monohydrate-60Serv.-300G.-Unflavored",
            image: [
                {
                    imageUrl:
                        "https://res.cloudinary.com/deiqhcskg/image/upload/v1687269809/zyur5tsjkgewgorq5v5g",
                    publicId: "zyur5tsjkgewgorq5v5g",
                },
            ],
            price: 120,
        },
        {
            id: 2,
            name: "Bad Ass Crea-52Serv.-300G.-Unflavored",
            image: [
                {
                    imageUrl:
                        "https://res.cloudinary.com/deiqhcskg/image/upload/v1687269809/vfeflpc89cffmp41m6a0",
                    publicId: "vfeflpc89cffmp41m6a0",
                },
            ],
            price: 170,
        },
    ]);

    const handleRemove = (itemId) => {
        setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
    };
    return (
        <div className={styles["user-wishlist-container"]}>
            {wishlistItems.length ? (
                wishlistItems.map((item) => (
                    <WishlistItem key={item.id} item={item} handleRemove={handleRemove} />
                ))
            ) : (
                <div className={styles["empty-placeholder"]}>No Product Found</div>
            )}
        </div>
    );
};

export default UserWishlist;
