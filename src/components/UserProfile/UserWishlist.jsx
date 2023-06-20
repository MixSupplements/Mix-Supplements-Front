import { useState } from "react";

import { Card, Button } from "react-bootstrap";

import styles from "../../styles/userProfile/userWishlist.module.css";

const UserWishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([
        // { id: 1, name: "Product 1", image: "image1.jpg" },
        // { id: 2, name: "Product 2", image: "image2.jpg" },
    ]);

    const handleRemove = (itemId) => {
        setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
    };
    return (
        <div>
            {wishlistItems.length ? (
                wishlistItems.map((item) => (
                    <Card style={{ width: "18rem" }} key={item.id}>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Button variant="danger" onClick={() => handleRemove(item.id)}>
                                Remove from Wishlist
                            </Button>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <div className={styles["empty-placeholder"]}>No Product Found</div>
            )}
        </div>
    );
};

export default UserWishlist;
