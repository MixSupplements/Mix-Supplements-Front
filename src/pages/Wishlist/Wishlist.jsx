// import { useEffect, useState } from "react";
import { useEffect } from "react";
import WishlistCard from "../../components/WishlistCard/WishlistCard";
// import axiosInstance from "../../APIs/config";
// import "./Wishlist.css";

const Wishlist = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  },[])
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <>
      <div className="row justify-content-evenly my-4">
        {arr.map((x) => {
          return (
            <div className="col-md-5 my-3" key={x}>
              <WishlistCard />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Wishlist;
