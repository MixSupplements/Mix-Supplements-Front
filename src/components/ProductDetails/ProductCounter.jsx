import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/productPage/productCounter.module.css";

const ProductCounter = () => {
    const [counter, setCounter] = useState(1);
    return (
        <div className={styles["counter"]}>
            <button
                className={`btn ${styles["counter-btn"]}`}
                onClick={() => (counter > 1 ? setCounter(counter - 1) : "")}
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <div className={styles["counter-value"]}>{counter}</div>
            <button
                className={`btn ${styles["counter-btn"]}`}
                onClick={() => setCounter(counter + 1)}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
};

export default ProductCounter;
