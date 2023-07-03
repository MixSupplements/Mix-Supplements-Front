import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import moment from "moment/moment";

import axiosInstance from "../../APIs/config";
import ProductRate from "./ProductRate";

import styles from "../../styles/productPage/productReview.module.css";

const ProductReview = ({ product }) => {
  const params = useParams();

  const token = useSelector((store) => store.token);

  const [newReview, setNewReview] = useState({
    rating: 1,
    comment: "",
  });

  const [reviews, setReviews] = useState([]);

  const getReviews = function () {
    axiosInstance
      .get(`/review/product/${params.id}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getReviews();
  }, [reviews.length]);

  const handleChange = (event) => {
    setNewReview((prevReview) => ({
      ...prevReview,
      comment: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .post(`/review`, {
        productId: `${params.id}`,
        score: newReview.rating,
        comment: newReview.comment,
      })
      .then((res) => {
        getReviews();
        setNewReview({
          rating: 1,
          comment: "",
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={`row gap-3`} style={{ marginTop: "var(--size-600)" }}>
      <div className="col">
        <h3 style={{ marginBottom: "var(--size-500)" }}>
          Overall Product Review
        </h3>
        {reviews.length > 0 ? (
          <ul className={styles["reviews-list"]}>
            {reviews?.map((review) => (
              <li key={review._id} className={styles["review"]}>
                <div className="d-flex justify-content-between">
                  <h5>{review.customer?.name}</h5>
                  <ProductRate rate={review.score} readonly={true} />
                </div>
                <p className={styles["review-comment"]}>{review.comment}</p>
                <p className="my-0 text-end">
                  {moment(review.updatedAt).format("MMM Do YYYY")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles["empty-placeholder"]}>
            Be the first one to review this product!
          </div>
        )}
      </div>
      <div className="col-md-5" style={{ height: "fit-content" }}>
        <h3 style={{ marginBottom: "var(--size-500)" }}>
          Review this product{" "}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${styles["form-field"]}`}>
            <span>Your Rate: </span>
            <ProductRate
              rate={newReview.rating}
              setNewRate={(rating) => setNewReview({ ...newReview, rating })}
            />
          </div>
          <div
            className={`form-group`}
            style={{ marginBottom: "var(--size-500)" }}
          >
            <label htmlFor="comment" className="form-label">
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
          {token ? (
            <button type="submit" className={`btn ${styles["review-btn"]}`}>
              Submit Review
            </button>
          ) : (
            <p className="fw-bolder">Log in to add your review.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductReview;
