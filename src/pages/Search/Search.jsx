import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../APIs/config";
import ProductCard from "../../components/ProductCard";

function Search() {
  const location = useLocation();
  let [products, setProducts] = useState();
  useEffect(() => {
    axiosInstance
      .get(`/product/search/${location.pathname.split("/")[2]}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <section className="row justify-content-center pt-4">
        {products?.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </section>
    </>
  );
}

export default Search;
