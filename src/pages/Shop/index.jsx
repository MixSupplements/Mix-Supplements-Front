import { useEffect, useState } from "react";

import axiosInstance from "../../APIs/config";

import ProductCard from "../../components/ProductCard";

import { Rating } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import "./shop.css";
import styles from "../../styles/userProfile/userWishlist.module.css";

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [brandFilters, setBrandFilters] = useState([]);
  const [originFilters, setOriginFilters] = useState([]);
  const [weightFilters, setWeightFilters] = useState([]);
  const [end, setEnd] = useState(20);
  const [loading, setLoading] = useState(true);
  const tempCards = [1,2,3,4];

  useEffect(() => {
    window.scrollTo(0, 0);
    axiosInstance
      .get("/products")
      .then((res) => {
        setAllProducts(res.data);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = [];
    const condition = [];
    if (brandFilters.length > 0)
      condition.push(
        "brandFilters?.some((filter) => filter === product?.details?.brand)"
      );
    if (originFilters.length > 0)
      condition.push(
        "originFilters?.some((filter) => filter === product?.details?.origin)"
      );
    if (weightFilters.length > 0)
      condition.push(
        "weightFilters?.some((filter) => filter === product?.details?.weight)"
      );
    allProducts?.forEach((product) => {
      if (eval(condition.join("&&"))) {
        filtered.push(product);
      }
    });
    setFilteredProducts(filtered);

    [...document.querySelectorAll("input:checked")].length === 0
      ? setChecked(false)
      : setChecked(true);
    setEnd(20);
  }, [brandFilters, originFilters, weightFilters, allProducts]);

  return (
    <div className="row justify-content-md-between justify-content-center">
      <aside className="col-10 col-md-3 px-0 shop-filters-section mb-3">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item" id="brand-filter">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button shop-filter-accordion"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Brand
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              //   data-bs-parent="#accordionExample"
            >
              <div className="accordion-body shop-accordion-body">
                <FormControlLabel
                  control={
                    <Checkbox
                      id="universal"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBrandFilters([...brandFilters, e.target.id]);
                        } else
                          setBrandFilters(
                            brandFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="Universal"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id="max"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBrandFilters([...brandFilters, e.target.id]);
                        } else
                          setBrandFilters(
                            brandFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="Max"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id="nutex"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBrandFilters([...brandFilters, e.target.id]);
                        } else
                          setBrandFilters(
                            brandFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="Nutex"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id="mix supplements"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBrandFilters([...brandFilters, e.target.id]);
                        } else
                          setBrandFilters(
                            brandFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="Mix Supplements"
                />
              </div>
            </div>
          </div>

          <div className="accordion-item" id="origin-filter">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed shop-filter-accordion"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Origin
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              //   data-bs-parent="#accordionExample"
            >
              <div className="accordion-body shop-accordion-body">
                <FormControlLabel
                  control={
                    <Checkbox
                      id="USA"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setOriginFilters([...originFilters, e.target.id]);
                        } else
                          setOriginFilters(
                            originFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="USA"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id="Egypt"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setOriginFilters([...originFilters, e.target.id]);
                        } else
                          setOriginFilters(
                            originFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="Egypt"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id="Europe"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setOriginFilters([...originFilters, e.target.id]);
                        } else
                          setOriginFilters(
                            originFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="Europe"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id="Asia"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setOriginFilters([...originFilters, e.target.id]);
                        } else
                          setOriginFilters(
                            originFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="Asia"
                />
              </div>
            </div>
          </div>

          <div className="accordion-item" id="weight-filter">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed shop-filter-accordion"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Weight
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              //   data-bs-parent="#accordionExample"
            >
              <div className="accordion-body shop-accordion-body">
                <FormControlLabel
                  control={
                    <Checkbox
                      id="1 lb"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setWeightFilters([...weightFilters, e.target.id]);
                        } else
                          setWeightFilters(
                            weightFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="1 lb"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id="2 lb"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setWeightFilters([...weightFilters, e.target.id]);
                        } else
                          setWeightFilters(
                            weightFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="2 lb"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id="3 lb"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setWeightFilters([...weightFilters, e.target.id]);
                        } else
                          setWeightFilters(
                            weightFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="3 lb"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      id="4 lb"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setWeightFilters([...weightFilters, e.target.id]);
                        } else
                          setWeightFilters(
                            weightFilters.filter(
                              (filter) => filter !== e.target.id
                            )
                          );
                      }}
                      sx={{
                        color: "hsl(57, 100%, 50%)",
                        "&.Mui-checked": {
                          color: "hsl(57, 100%, 50%)",
                        },
                      }}
                    />
                  }
                  label="4 lb"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="row col-md-9 justify-content-center justify-content-md-start">
        {loading ? tempCards.map((tempCard)=><div key={tempCard} className="col-5 col-md-4 col-lg-3 p-2">
          <div className="card product-card" >
              <img                    
                  className="card-img-top skeleton skeleton-img"
                  alt=""
              />
              <div className="card-body">
                  <Rating
                      name="read-only skeleton"
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
                  <h5 className="card-title product-card-title mt-3 skeleton skeleton-text">{}</h5>
                  <p className="card-text product-card-text skeleton skeleton-price">
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
      </div>) : checked ? (
          filteredProducts?.length > 0 ? (
            <>
              {filteredProducts?.slice(0, end).map((product) => {
                if(product.quantity !== 0){
                  return <ProductCard key={product._id} product={product} />;
                }
              })}
              {end < filteredProducts.length ? (
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
          ) : (
            <div className={styles["empty-placeholder"]}>No Products Found</div>
          )
        ) : allProducts?.length > 0 ? (
          <>
            {allProducts?.slice(0, end).map((product) => {
              if(product.quantity !== 0){
                return <ProductCard key={product._id} product={product} />;
              }
            })}
            {end < allProducts.length ? (
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
        ) : (
          <div className={styles["empty-placeholder"]}>No Products Found</div>
        )}
      
        
        {/* <div className="row justify-content-center mt-4">
        <button className="btn load-btn">LOAD MORE</button>
        <Pagination
            count={10}
            shape="rounded"
            size="large"
            variant="outlined"
            sx={{
                "& .MuiPagination-root": {
                  display: 'flex',
                  justifyContent: 'center'
                },
              }}
          />
        </div> */}
      </main>
    </div>
  );
};

export default Shop;
