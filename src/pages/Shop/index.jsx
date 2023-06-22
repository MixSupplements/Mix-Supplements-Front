import { Checkbox, FormControlLabel } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../APIs/config";
import "./shop.css";

const Shop = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axiosInstance.get('/products')
    .then(res => setProductList(res.data))
    .catch(err => console.log(err))
  },[]);

  useEffect(() => {
    window.scrollTo(0,0);
  },[])
  return (
    <div className="row justify-content-between">
      <aside className="col-md-3 px-0 shop-filters-section">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button shop-filter-accordion"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Company
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

          <div className="accordion-item">
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

          <div className="accordion-item">
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
        </div>
      </aside>
      <main className="row col-md-9 justify-content-center">
      {productList.map(product => {
          return (
            <ProductCard
            key={product._id}
            product={product}
          />
          )
        })}
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
