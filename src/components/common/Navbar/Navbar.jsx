import { useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../redux/slices/token";

import axiosInstance from "../../../APIs/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";
import logo from "../../../assets/images/logo.png";
import { resetCart } from "../../../redux/slices/cart";

const Navbar = () => {
  const cartCounter = useSelector((store) => store.cart.count);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((store) => store.token);
  const [searchText, setSearchText] = useState();
  const signoutSubmit = function () {
    axiosInstance
      .post(
        "/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        localStorage.removeItem("wishlist");
        dispatch(setToken(""));
        dispatch(resetCart());
        navigate(`/login`);
      })
      .catch((error) => console.log(error));
  };
  const searchSubmit = function (e) {
    e.preventDefault();
    navigate(`/search/${searchText}`);
    e.target.querySelector("input").value = "";
    e.target.querySelector("input").blur();
  };
  return (
    <>
      <header className="fixed-top row justify-content-center col-12 pt-2">
        <div className="d-none d-lg-inline-block col-lg-2">
          <Link to="/">
            <img
              className="col-12 nav-logo-lg"
              src={logo}
              alt="Mix Supplements Logo"
            />
          </Link>
        </div>
        <div className="col-12 col-lg-9 row justify-content-center pt-2">
          <div className="col-11 px-0 col-lg-12 row justify-content-start">
            <div className="col-3 col-sm-2 d-lg-none mt-1 mt-md-0">
              <Link to="/">
                <img className="col-12" src={logo} alt="Mix Supplements Logo" />
              </Link>
            </div>
            <div className="col-5 col-sm-7 col-md-8 col-lg-10 mt-2">
              <form
                className="d-flex col-12"
                role="search"
                onSubmit={(e) => {
                  searchSubmit(e);
                }}
              >
                <input
                  id="searchBar"
                  className="form-control col-12"
                  type="search"
                  placeholder="&#xF002; Search"
                  style={{ fontFamily: "Arial , FontAwesome" }}
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
              </form>
            </div>
            <div className="col-3 col-sm-3 col-md-2 col-lg-2 px-0 mx-0 mt-3 flex-nowrap row pe-3 pe-sm-4 pe-md-0 ps-lg-3 ps-md-1">
              <div className="col-6 col-md-5 text-start ps-sm-2 ps-md-0 mx-0 px-0">
                <Link to="/cart">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    size="lg"
                    style={{ color: "#ffffff" }}
                  />
                  <div className="cart-badge">{cartCounter}</div>
                </Link>
              </div>
              <div className="col-6 col-md-7 text-lg-start text-md-center pe-md-4 mx-0 px-0 text-start ps-lg-1 dropdown">
                <button
                  className=" dropdown-toggle navUserBtn"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon
                    className="me-2"
                    icon={faUser}
                    size="lg"
                    style={{ color: "#ffffff" }}
                  />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={token ? "/user/accountDetails" : "/login"}
                    >
                      {token ? "My Account" : "Sign In"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={token ? "/user/orders" : "/signup"}
                    >
                      {token ? "My Orders" : "Sign Up"}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/user/wishlist">
                      My Wishlist
                    </NavLink>
                  </li>
                  {token ? (
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => {
                          signoutSubmit();
                        }}
                      >
                        Sign out
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
          <nav className="col-1 col-lg-12 navbar navbar-expand-lg pb-1">
            <div className="container-fluid justify-content-center col-lg-10 ms-lg-0">
              <button
                className="navbar-toggler me-5 me-sm-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="flex-grow-0 d-none d-lg-block"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/shop"
                    >
                      Shop
                    </NavLink>
                  </li>
                  {/* <li className="nav-item dropdown">
                                        <NavLink
                                            className="nav-link dropdown-toggle"
                                            to=""
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Categories
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink className="dropdown-item" to="/shop">
                                                    Supplements
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink className="dropdown-item" to="/shop">
                                                    Sportswear
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li> */}
                  {/* <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="">
                      Our Stores
                    </NavLink>
                  </li> */}
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="#contact-us"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div
          className="collapse navbar-collapse flex-grow-0 d-lg-none"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/shop">
                Shop
              </NavLink>
            </li>
            {/* <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </NavLink>
              <ul className="dropdown-menu opacity-100 col-12 text-center">
                <li>
                  <NavLink className="dropdown-item" to="">
                    Supplements
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="">
                    Sportswear
                  </NavLink>
                </li>
              </ul>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="">
                Our Stores
              </NavLink>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#contact-us">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
