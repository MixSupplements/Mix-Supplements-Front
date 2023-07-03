import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cart";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlist";

import ProductRate from "./ProductRate";
import ProductCounter from "./ProductCounter";

import { Carousel, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartPlus,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/productPage/productDetails.module.css";

const ProductDetails = ({ product }) => {
  const currencyFormat = (price) => {
    return price.toLocaleString("en-US", { minimumFractionDigits: 2 });
  };

  const [zoomIn, setZoomIn] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const handleMagnifierClick = (imageSrc) => {
    setCurrentImage(imageSrc);
    setZoomIn(true);
  };

  const dispatcher = useDispatch();
  const cart = useSelector((store) => store.cart);
  const wishlist = useSelector((store) => store.wishlist);
  const isInWishlist = wishlist.wishlistItems.some(
    (item) => item._id === product._id
  );
  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatcher(removeFromWishlist(product));
    } else {
      dispatcher(addToWishlist(product));
    }
  };
  console.log(product);
  return (
    <div className={`row gap-3 ${styles["details-card"]}`}>
      <div className="col-md-6">
        <Carousel
          className="productPage-carousel"
          pause={false}
          interval={null}
        >
          {product.images.map((image, index) => (
            <Carousel.Item key={image.publicId}>
              <img src={image.imageUrl} alt={`${image.imageUrl}`} />
              <div
                className={styles["magnifier"]}
                onClick={() => handleMagnifierClick(image.imageUrl)}
              >
                <FontAwesomeIcon size="2xl" icon={faMagnifyingGlassPlus} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <Modal size="lg" show={zoomIn} onHide={() => setZoomIn(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Image Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={currentImage} alt={`${currentImage}`} />
          </Modal.Body>
        </Modal>
      </div>
      <div className="col">
        <h4>{product.name}</h4>
        <div style={{ marginBottom: "var(--size-400)" }}>
          <ProductRate rate={Number(product.rating)} readonly={true} />
        </div>
        <div className="list-group ">
          {Object.entries(product.details).map(([key, value]) => {
            if (
              typeof value != "object" &&
              value != null &&
              !Array.isArray(value) &&
              key !== "title" &&
              key !== "rate"
            ) {
              return (
                <div
                  key={key}
                  className="list-group-item text-white"
                  style={{ backgroundColor: "#1e1e1e" }}
                >
                  <div className="row">
                    <span className="col-4">{key}:</span>
                    <span
                      className="col-8"
                      style={{ fontWeight: "var(--fw-bold)" }}
                    >
                      {key === "price" ? currencyFormat(value) + " LE" : value}
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div
          className={`${styles["details-conrols"]} row justify-content-center`}
        >
          <div className="col-5">
            {cart.cartItems.filter((item) => item.product._id === product._id)
              .length === 0 ? (
              <button
                className={`${styles["details-btn"]} btn`}
                onClick={() =>
                  dispatcher(addToCart({ item: product, count: 1 }))
                }
                disabled={product.quantity > 0 ? false : true}
              >
                <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
              </button>
            ) : (
              <ProductCounter item={product} className="my-0" />
            )}
          </div>
          <div className="col-5 text-center">
            <button
              className={`${styles["details-btn"]} btn`}
              onClick={toggleWishlist}
            >
              <FontAwesomeIcon icon={faHeart} />{" "}
              {wishlist.wishlistItems.filter((item) => item._id === product._id)
                .length === 0
                ? "Add to Wishlist"
                : "Remove Wishlist"}
            </button>
          </div>
          <p className="col-12 text-center mt-2 fw-bold">
            This products is out of stock at the moment. Please check again
            later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
