import { Rating } from "@mui/material";
import "./ProductCard.css";

const ProductCard = ({ img, rating, name, price, wish, cart }) => {
  const fillCart = () => {
    return cart;
  };

  const fillHeart = () => {
    return wish;
  };
  return (
    <div className="col-5 col-md-4 col-lg-3 p-2">
      <div className="card product-card">
        <img
          src={process.env.PUBLIC_URL + "images/" + img}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <Rating
            name="read-only"
            sx={{
                '& .MuiRating-iconFilled': {
                    color: 'hsl(57, 100%, 50%)',
                  },
                '& .MuiRating-iconEmpty': {
                    color: 'hsl(57, 100%, 50%)',
                  },
            }}
            value={rating}
            precision={0.5}
            readOnly
          />
          <h5 className="card-title product-card-title mt-3">
            {name}
          </h5>
          <p className="card-text product-card-text">{price} EGP</p>
          <div className="row justify-content-between fs-4 mt-4">
            <i
              onClick={() => {}}
              className={`${
                fillCart() ? "fa-cart-shopping filled" : "fa-cart-plus"
              } fa-solid  col-4 p-0 text-end`}
            ></i>
            <i
              onClick={() => {}}
              className={`${
                fillHeart() ? "fa-solid filled" : "fa-regular"
              } fa-heart col-4 p-0 text-start`}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
