import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-black">
      <div className="form_container p-5 rounded bg-white">
        <form>
          <h3 className=" text-center mb-4">Sign In</h3>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label
              htmlFor="check"
              className="custom-input-label ms-2 mb-2 text-white"
            >
              Remember me
            </label>
          </div>

          <div className="d-grid ">
            <button className="in-btn btn">
              <Link to={"/"} className="signup-btn ms-2">
                Sign In
              </Link>
            </button>
          </div>

          <p className="text-start mt-2 mb-2">
            Forget <a href="">Password?</a>
          </p>

          <p className="info text-start mt-2">
            If You don't have account
            <Link to={"/signup"} className="ms-2">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
