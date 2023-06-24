import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../APIs/config";
import "./Login.css";

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState();
  const [invalid, setInvalid] = useState();
  const signinSubmit = function (e) {
    e.preventDefault();
    axiosInstance
      .post("/login", {
        email: email,
        password: password,
        stayLoggedIn: rememberMe,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate(`/home`);
      })
      .catch((error) => setInvalid(true));
  };
  return (
    <div className="login template d-flex justify-content-center align-items-center">
      <div className="form_container rounded bg-white">
        <form
          className="border border-white rounded-2 p-5"
          onSubmit={(e) => {
            signinSubmit(e);
          }}
        >
          <h3 className=" text-center mb-4">Sign In</h3>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control login-form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setEmail(e.target.value.toLowerCase());
              }}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control login-form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="mb-2">
            <input
              name="stayLoggedIn"
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
              onChange={(e) => {
                e.target.checked ? setRememberMe(true) : setRememberMe(false);
              }}
            />
            <label htmlFor="check" className="custom-input-label ms-2 mb-2">
              Remember me
            </label>
          </div>

          <div className="d-grid ">
            <button type="submit" className="in-btn btn">
              Sign In
            </button>
          </div>

          <p className="text-start mt-2 mb-2">
            <NavLink>Forgot your password?</NavLink>
          </p>

          <p className="info text-start mt-2">
            Or if you don't have an account
            <Link to={"/signup"} className="ms-2">
              Sign Up
            </Link>
          </p>
          {invalid ? (
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              Invalid email or password!
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => {
                  setInvalid(false);
                }}
              ></button>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
