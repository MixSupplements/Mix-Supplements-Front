import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Rating } from "@mui/material";
import axiosInstance from "../../APIs/config";
import ProductCard from "../../components/ProductCard";
import styles from "../../styles/userProfile/userWishlist.module.css";
import "./Search.css";

function Search() {
  const [end, setEnd] = useState(20);
  const [loading, setLoading] = useState(true);
  const tempCards = [1,2,3,4];
  const location = useLocation();
  let [products, setProducts] = useState();
  useEffect(() => {
    axiosInstance
      .get(`/product/search/${location.pathname.split("/")[2]}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
      document.querySelector("#searchBar").value = location.pathname.split("/")[2] ;
  }, [location.pathname.split("/")[2]]);
  return (
    <>
      <section className="row justify-content-center pt-4">
        {loading ? tempCards.map((tempCard)=><div key={tempCard} className="col-5 col-md-4 col-lg-3 p-2">
          <div className="card product-card" >
              <img                    
                  className="card-img-top search-skeleton search-skeleton-img"
                  alt=""
              />
              <div className="card-body">
                  <Rating
                      name="read-only search-skeleton"
                      sx={{
                          "& .MuiRating-iconFilled": {
                              color: "hsl(57, 100%, 50%)",
                          },
                          "& .MuiRating-iconEmpty": {
                              color: "hsl(57, 100%, 50%)",
                          },
                      }}
                      value={0}
                      precision={0.5}
                      readOnly
                  />
                  <h5 className="card-title product-card-title mt-3 search-skeleton search-skeleton-text">{}</h5>
                  <p className="card-text product-card-text search-skeleton search-skeleton-price">
                      {}
                  </p>
                  <div className="row justify-content-between fs-4 mt-4">
                      <i
                          
                          className={`${
                              "fa-cart-plus"
                          } fa-solid  col-4 p-0 text-end cart-btn`}
                      ></i>
                      <i
                          
                          className={`${
                              "fa-regular"
                          } fa-heart col-4 p-0 text-start wishlist-btn`}
                      ></i>
                  </div>
              </div>
          </div>
      </div>) :
        products?.length > 0 ? (
          products?.slice(0, end).map((product) => {
            return <>
            <ProductCard key={product._id} product={product} />
            {end < products.length ? (
                <div className="row justify-content-center mt-4 mx-auto">
                  <button
                    onClick={(e) => {
                      setEnd(end + 20);
                    }}
                    className="btn load-btn"
                  >
                    LOAD MORE
                  </button>
                </div>
              ) : null}
            </> 
          })
        ) : (
          <div className={styles["empty-placeholder"]}>No Products Found</div>
        )}
      </section>
    </>
  );
}

export default Search;
