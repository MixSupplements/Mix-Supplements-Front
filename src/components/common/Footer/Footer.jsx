import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../../assets/images/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="row col-12 row-cols-1 row-cols-sm-2 row-cols-md-5 pt-5 pb-3 mt-5 border-top px-5">
        <div className="col mb-3">
          <Link
            to="/"
            className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
          >
            <img src={logo} alt="Mix Supplements Logo" width="170rem" />
          </Link>
          <p className="text-body-secondary">© 2023</p>
        </div>

        <div className="col mb-3"></div>

        <div className="col mb-3">
          <h5>Section</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                Features
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                Pricing
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                FAQs
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="col mb-3">
          <h5>Section</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                Features
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                Pricing
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                FAQs
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="col mb-3">
          <h5>Contact Us</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="" className="nav-link p-0 text-body-secondary">
                <FontAwesomeIcon icon={faPhone} />
                +201000000000
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link
                to=""
                className="nav-link p-0 text-body-secondary text-nowrap"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                MixSupplements@Gmail.Com
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="nav-link brandIcon p-0 text-body-secondary"
              >
                <FontAwesomeIcon
                  className="brand-icon"
                  icon={faFacebook}
                  size="lg"
                  style={{ color: "#ffffff" }}
                />
              </Link>
              <Link
                to=""
                className="nav-link brandIcon mx-3 p-0 text-body-secondary"
              >
                <FontAwesomeIcon
                  className="brand-icon"
                  icon={faTwitter}
                  size="lg"
                  style={{ color: "#ffffff" }}
                />
              </Link>
              <Link
                to=""
                className="nav-link brandIcon p-0 text-body-secondary"
              >
                <FontAwesomeIcon
                  className="brand-icon"
                  icon={faInstagram}
                  size="lg"
                  style={{ color: "#ffffff" }}
                />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
