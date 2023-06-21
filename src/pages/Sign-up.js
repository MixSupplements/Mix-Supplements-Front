import React from "react";
import "../pages/Login/style.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup template d-flex justify-content-center align-items-center">
      <div className="form_container rounded bg-white">
        <form className="border border-white rounded-2 p-5">
          <h3 className=" text-center mb-4">Sign Up</h3>
          {/* <img src="./../public/logo192.png" /> */}

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control login-form-control"
              placeholder="First name"
              aria-label="First name"
            />
            <label htmlFor="floatingInput ">Frist name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control login-form-control"
              placeholder="Last name"
              aria-label="Last name"
            />
            <label htmlFor="floatingInput">Last name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="string"
              className="form-control login-form-control"
              placeholder="Phone Number"
              aria-label="Phone Number"
            />
            <label htmlFor="floatingInput">Phone Number</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control login-form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control login-form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control login-form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <div className="d-grid">
            <button className="in-btn btn btn-primary">
              <Link to={"/home"} className="signup-btn ms-2">
                Sign Up
              </Link>
            </button>
          </div>
          <p className="info text-start mt-2">
            If You Already have account
            <Link to={"/login"} className="ms-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
