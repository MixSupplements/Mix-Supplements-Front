import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./WishlistCard.css";

export default function WishlistCard() {
  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-4 wishlist-card-image">
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">
                Card titleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
              </h5>
              <h6 className="card-price">Card price</h6>
              <div className="mt-3 row">
                <button className="wishlist-card-button col-6 text-start ps-3">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    size="xl"
                    style={{ color: "steelblue" }}
                  />
                </button>
                <button className="wishlist-card-button col-6 text-end pe-4">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    size="xl"
                    style={{ color: "var(--clr-accent-400)" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
