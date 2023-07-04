import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import logo from "../../../assets/images/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="row col-12 row-cols-1 row-cols-sm-2 row-cols-md-5 pt-5 pb-3 mt-5 border-top px-5 justify-content-between">
        <div className="col col-m-4 mb-3">
          <Link
            to="/home"
            className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
          >
            <img src={logo} alt="Mix Supplements Logo" width="170rem" />
          </Link>
          <p className="text-body-secondary">© 2023 Mix Supplements</p>
        </div>

        <div className="col col-m-4 mb-3">
          <h5>Important Links</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a href="/home" className="nav-link p-0 text-body-secondary">
                Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/shop" className="nav-link p-0 text-body-secondary">
                Shop
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/user/accountDetails"
                className="nav-link p-0 text-body-secondary"
              >
                My Account
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/cart" className="nav-link p-0 text-body-secondary">
                My Cart
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/user/wishlist"
                className="nav-link p-0 text-body-secondary"
              >
                My Wishlist
              </a>
            </li>
          </ul>
        </div>

        <div id="contact-us" className="col col-md-4 mb-3">
          <h5>Contact Us</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a
                href="Tel: 1286055300"
                className="nav-link p-0 text-body-secondary"
              >
                <FontAwesomeIcon className="brand-icon" icon={faPhone} />{" "}
                1286055300
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="mailto: MixSupplements@Gmail.Com"
                className="nav-link p-0 text-body-secondary text-break"
              >
                <FontAwesomeIcon className="brand-icon" icon={faEnvelope} />{" "}
                MixSupplements@Gmail.Com
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/mixsupplements"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link brandIcon p-0 text-body-secondary"
              >
                <FontAwesomeIcon
                  className="brand-icon"
                  icon={faFacebook}
                  size="lg"
                  style={{ color: "#ffffff" }}
                />{" "}
                Mix supplements egypt
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
