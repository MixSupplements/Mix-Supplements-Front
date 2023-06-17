import { useState } from "react";

import ProductRate from "./ProductRate";
import ProductCounter from "./ProductCounter";

import { Carousel, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartPlus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/productPage/productDetails.module.css";

const ProductDetails = ({ product }) => {
    const [zoomIn, setZoomIn] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    const handleMagnifierClick = (imageSrc) => {
        setCurrentImage(imageSrc);
        setZoomIn(true);
    };
    return (
        <div className={`row gap-3 ${styles["details-card"]}`}>
            <div className="col-md-6">
                <Carousel className="productPage-carousel" pause={false} interval={null}>
                    {product.images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img src={image} alt={`${image}`} />
                            <div
                                className={styles["magnifier"]}
                                onClick={() => handleMagnifierClick(image)}
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
                <h4>{product.title}</h4>
                <div style={{ marginBottom: "var(--size-400)" }}>
                    <ProductRate rate={product.rate} readonly={true} />
                </div>
                <div className="list-group ">
                    {Object.entries(product).map(([key, value]) => {
                        if (
                            typeof value != "object" &&
                            value != null &&
                            !Array.isArray(value) &&
                            key != "title" &&
                            key != "rate"
                        ) {
                            return (
                                <div
                                    className="list-group-item text-white"
                                    style={{ backgroundColor: "#1e1e1e" }}
                                >
                                    <div className="row">
                                        <span className="col-4">{key}:</span>
                                        <span
                                            className="col-8"
                                            style={{ fontWeight: "var(--fw-bold)" }}
                                        >
                                            {value}
                                        </span>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <ProductCounter />
                <div className={`${styles["details-conrols"]}`}>
                    <button className={`${styles["details-btn"]} btn`}>
                        <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                    </button>
                    <button className={`${styles["details-btn"]} btn`}>
                        <FontAwesomeIcon icon={faHeart} /> Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
