import { useState } from "react";

import ProductRate from "./ProductRate";

import styles from "../../styles/productPage/productReview.module.css";

const ProductReview = () => {
    const [newReview, setNewReview] = useState({
        user: "dummy user",
        rating: 0,
        comment: "",
    });
    const [reviews, setReviews] = useState([
        {
            id: 1,
            user: "John Doe",
            rating: 5,
            comment: "Great product! Highly recommended.",
        },
        {
            id: 2,
            user: "Jane Smith",
            rating: 3,
            comment:
                "Good quality, but a bit expensive. test two lines  i hope this word fine ok let's try three linse with some hahah in it",
        },
        {
            id: 3,
            user: "Alice Johnson",
            rating: 2,
            comment: "Average product, nothing special.",
        },
    ]);
    const handleChange = (event) => {
        setNewReview((prevReview) => ({
            ...prevReview,
            comment: event.target.value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setReviews([...reviews, newReview]);
        setNewReview({
            user: "dummy user",
            rating: 0,
            comment: "",
        });
    };
    return (
        <div className={`row gap-3`} style={{ marginTop: "var(--size-600)" }}>
            <div className="col">
                <h3 style={{ marginBottom: "var(--size-500)" }}>Overall Product Review</h3>
                <ul className={styles["reviews-list"]}>
                    {reviews.map((review) => (
                        <li key={review.id} className={styles["review"]}>
                            <div className="d-flex justify-content-between">
                                <h5>{review.user}</h5>
                                <ProductRate rate={review.rating} readonly={true} />
                            </div>
                            <p className={styles["review-comment"]}>{review.comment}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-5" style={{ height: "fit-content" }}>
                <h3 style={{ marginBottom: "var(--size-500)" }}>Review this product </h3>
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${styles["form-field"]}`}>
                        <span>Your Rate: </span>
                        <ProductRate
                            rate={newReview.rating}
                            setNewRate={(rating) => setNewReview({ ...newReview, rating })}
                        />
                    </div>
                    <div className={`form-group`} style={{ marginBottom: "var(--size-500)" }}>
                        <label for="comment" className="form-label">
                            Your Review
                        </label>
                        <textarea
                            className={`form-control ${styles["review-input"]}`}
                            name="comment"
                            rows="3"
                            style={{ resize: "none" }}
                            value={newReview.comment}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={`btn ${styles["review-btn"]}`}>
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductReview;
