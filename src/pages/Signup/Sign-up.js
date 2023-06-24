import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../../APIs/config";
import { Link, useNavigate } from "react-router-dom";
import "./Sign-up.css";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const signupSubmit = function (e) {
    e.preventDefault();
    axiosInstance
      .post("/register", {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((res) => {
        console.log(res);

        navigate(`/login`);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="signup template d-flex justify-content-center align-items-center">
      <div className="form_container rounded bg-white">
        <form
          className="border border-white rounded-2 p-5"
          onSubmit={(e) => {
            signupSubmit(e);
          }}
        >
          <h3 className=" text-center mb-4">Sign Up</h3>
          {/* <img src="./../public/logo192.png" /> */}

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
              onChange={(e) => {
                setFirstName(e.target.value.toLowerCase());
              }}
            />
            <label htmlFor="floatingInput ">Frist name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
              onChange={(e) => {
                setLastName(e.target.value.toLowerCase());
              }}
            />
            <label htmlFor="floatingInput">Last name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="string"
              className="form-control"
              placeholder="Phone Number"
              aria-label="Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <label htmlFor="floatingInput">Phone Number</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value.toLowerCase());
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <div className="d-grid">
            <button className="in-btn btn btn-primary" type="submit">
              Sign Up
            </button>
          </div>
          <p className="info text-start mt-2">
            If you already have an account
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
