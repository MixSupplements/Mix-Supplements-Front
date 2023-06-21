import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";

import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductDescription from "../components/ProductDetails/ProductDescription";
import ProductReview from "../components/ProductDetails/ProductReview";

import "../styles/productPage/componentStyles.css";
import axiosInstance from "../APIs/config";
import { useParams } from "react-router-dom";

const Product = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  },[]);
  
  const [productItem, setProductItem] = useState({
    images: [],
    details:{},
    description: ''
  });
  const params = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/product/${params.id}`)
      .then((res) => setProductItem(res.data))
      .catch((err) => console.log(err));
  },[params.id]);

  return (
    <Container style={{ marginBlock: `var(--size-700)` }}>
      <ProductDetails product={productItem} />
      <ProductDescription product={productItem} />
      <ProductReview product={productItem} />
    </Container>
  );
};

export default Product;

// title: "Muscle Add Hydro Beef Add 100%",
// rate: 3.7,
// flavor: "Chocolate",
// weight: "1 lb",
// origin: "USA",
// price: "$29.99",
// images: [
//   "https://github.com/MixSupplements/Mix-Supplements-Front/blob/master/public/images/image_512.png?raw=true",
//   "https://github.com/MixSupplements/Mix-Supplements-Front/blob/master/public/images/image_512.png?raw=true",
// ],
// description: {
//   "Product Description":
//     "Muscle Add Hydro Beef Add delivers the needed power for your body to build and create more pure muscles. ",
//   Benefits: [
//     "100% hydrolyzed beef protein",
//     "26 Grams of proteins in each scoop that’s considered a very high percentage.",
//     "It’s Gluten-free, so it’s an excellent choice if you have any problem eating gluten products.",
//     "Lactose-Free, free of any milk.",
//     "An incredible speed of absorption to prevent any muscle loss",
//     "Loaded with all the needed amino acids",
//   ],
//   "About This Product":
//     "Muscle Add Hydro Beef Add 100% Hydrolysed is made of pure HALAL beef with no added sugars to help you in your clean gain goal.It’s free of any banned substance, free of cholesterol, dairy, and gluten; so it’s safe to use",
//   "Suggested Use": "Sample suggested use text...",
//   "About This Brand": "Sample about this brand text...",
// },
