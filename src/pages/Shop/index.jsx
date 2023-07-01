import { useEffect, useState } from "react";

import axiosInstance from "../../APIs/config";

import ProductCard from "../../components/ProductCard";

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

  useEffect(() => {
    window.scrollTo(0, 0);
    axiosInstance
      .get("/products")
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let filtered = [];
    let condition = [];
    if (brandFilters.length > 0)
      condition.push(
        "brandFilters?.some((filter) => filter === product?.brand)"
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
  }, [[...document.querySelectorAll("input:checked")].length]);

  return (
    <div className="row justify-content-between">
      <aside className="col-md-3 px-0 shop-filters-section">
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
              data-bs-parent="#accordionExample"
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
              data-bs-parent="#accordionExample"
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
              data-bs-parent="#accordionExample"
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
      <main className="row col-md-9 justify-content-center">
        {checked ? (
          filteredProducts?.length > 0 ? (
            [...new Set(filteredProducts)]?.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })
          ) : (
            <div className={styles["empty-placeholder"]}>No Products Found</div>
          )
        ) : allProducts?.length > 0 ? (
          allProducts?.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        ) : (
          <div className={styles["empty-placeholder"]}>No Products Found</div>
        )}
        <div className="row justify-content-center mt-4">
          <button className="btn load-btn">LOAD MORE</button>
          {/* <Pagination
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
          /> */}
        </div>
      </main>
    </div>
  );
};

export default Shop;
