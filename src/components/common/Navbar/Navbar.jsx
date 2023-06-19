import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/logo.png";
import "./Navbar.css";
const Navbar = () => {
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
              <form className="d-flex col-12" role="search">
                <input
                  id="searchBar"
                  className="form-control col-12"
                  type="search"
                  placeholder="&#xF002; Search"
                  style={{ fontFamily: "Arial , FontAwesome" }}
                  aria-label="Search"
                />
              </form>
            </div>
            <div className="col-3 col-sm-3 col-md-2 col-lg-2 px-0 mx-0 mt-3 flex-nowrap row pe-3 pe-sm-4 pe-md-0 ps-lg-3 ps-md-1">
              <div className="col-6 col-md-5 text-start ps-sm-2 ps-md-0 mx-0 px-0">
                <Link to="/">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    size="lg"
                    style={{ color: "#ffffff" }}
                  />
                  <div className="cart-badge">999</div>
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
                    <NavLink className="dropdown-item" to="">
                      My Account
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/wishlist">
                      My Wishlist
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="">
                      My Orders
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <nav class="col-1 col-lg-12 navbar navbar-expand-lg pb-1">
            <div class="container-fluid justify-content-center col-lg-10">
              <button
                class="navbar-toggler me-5 me-sm-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div
                class="flex-grow-0 d-none d-lg-block"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
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
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="">
                      Our Stores
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="">
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </nav>
        </div>
        <div
          class="collapse navbar-collapse flex-grow-0 d-lg-none"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
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
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="">
                Our Stores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
