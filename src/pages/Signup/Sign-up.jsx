import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../../APIs/config";

import "./Sign-up.css";

function Signup() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [ValidForm, setValidForm] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "firstName") {
            if (value === "") {
                setErrors({ ...errors, [name]: "First Name is required" });
                setValidForm({ ...ValidForm, [name]: false });
            } else if (value.trim() === "") {
                setErrors({ ...errors, [name]: "First Name shouldn't have any leading spaces" });
            } else if (value.length < 3) {
                setErrors({ ...errors, [name]: "First Name must be at least 3 characters" });
                setValidForm({ ...ValidForm, [name]: false });
            } else if (!/^[a-zA-Z+]+$/.test(value)) {
                setErrors({ ...errors, [name]: "First Name can only contain letters" });
                setValidForm({ ...ValidForm, [name]: false });
            } else {
                setErrors({ ...errors, [name]: "" });
                setValidForm({ ...ValidForm, [name]: true });
            }
        }

        if (name === "lastName") {
            if (value === "") {
                setErrors({ ...errors, [name]: "Last Name is required" });
                setValidForm({ ...ValidForm, [name]: false });
            } else if (value.trim() === "") {
                setErrors({ ...errors, [name]: "Last Name shouldn't have any leading spaces" });
            } else if (value.length < 3) {
                setErrors({ ...errors, [name]: "Last Name must be at least 3 characters" });
                setValidForm({ ...ValidForm, [name]: false });
            } else if (!/^[a-zA-Z+]+$/.test(value)) {
                setErrors({ ...errors, [name]: "Last Name can only contain letters" });
                setValidForm({ ...ValidForm, [name]: false });
            } else {
                setErrors({ ...errors, [name]: "" });
                setValidForm({ ...ValidForm, [name]: true });
            }
        }

        if (name === "phoneNumber") {
            if (value === "") {
                setErrors({ ...errors, [name]: "Phone Number is required" });
                setValidForm({ ...ValidForm, [name]: false });
            } else if (!/^\+20\d{10}$/.test(value)) {
                setErrors({
                    ...errors,
                    [name]: "Phone Number should starts with (+20) and 10 digits",
                });
                setValidForm({ ...ValidForm, [name]: false });
            } else {
                setErrors({ ...errors, [name]: "" });
                setValidForm({ ...ValidForm, [name]: true });
            }
        }

        if (name === "email") {
            if (value === "") {
                setErrors({ ...errors, [name]: "Email Address is required" });
                setValidForm({ ...ValidForm, [name]: false });
            } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                setErrors({ ...errors, [name]: "Enter a valid email address" });
                setValidForm({ ...ValidForm, [name]: false });
            } else {
                setErrors({ ...errors, [name]: "" });
                setValidForm({ ...ValidForm, [name]: true });
            }
        }

        if (name === "password") {
            if (value.length < 8) {
                setErrors({ ...errors, [name]: "Password must be at least 8 characters long" });
                setValidForm({ ...ValidForm, [name]: false });
            } else if (value.length >= 8) {
                setErrors({ ...errors, [name]: "" });
                setValidForm({ ...ValidForm, [name]: true });
            }
            if (value === formData.confirmPassword) {
                setErrors({ ...errors, confirmPassword: "" });
                setValidForm({ ...ValidForm, confirmPassword: true });
            }
        }

        if (name === "confirmPassword") {
            if (formData.password.length < 8) {
                setErrors({ ...errors, [name]: "Password must be at least 8 characters long" });
                setValidForm({ ...ValidForm, [name]: false });
            } else if (formData.password !== value) {
                setErrors({ ...errors, [name]: "Passwords do not match" });
                setValidForm({ ...ValidForm, [name]: false });
            } else {
                setErrors({ ...errors, [name]: "" });
                setValidForm({ ...ValidForm, [name]: true });
            }
        }
    };

    const signupSubmit = function (e) {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, confirmPassword: "Passwords do not match" });
            setValidForm({ ...ValidForm, confirmPassword: false });
            return;
        }
        axiosInstance.post('/verify', {to: formData.email})
        .then(res => {
            localStorage.setItem('newUser', JSON.stringify(formData));
            navigate('/verification');
        })
        .catch(err => console.log(err))
        // axiosInstance
        //     .post("/register", formData)
        //     .then((res) => {
        //         navigate(`/login`);
        //     })
        //     .catch((error) => console.log(error));
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
                            className={`form-control ${
                                errors.firstName
                                    ? "error-field is-invalid"
                                    : formData.firstName && "is-valid"
                            }`}
                            placeholder="First name"
                            aria-label="First name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <label htmlFor="floatingInput ">First name</label>
                        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${
                                errors.lastName
                                    ? "error-field is-invalid"
                                    : formData.lastName && "is-valid"
                            }`}
                            placeholder="Last name"
                            aria-label="Last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <label htmlFor="floatingInput">Last name</label>
                        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${
                                errors.phoneNumber
                                    ? "error-field is-invalid"
                                    : formData.phoneNumber && "is-valid"
                            }`}
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <label htmlFor="floatingInput">Phone Number</label>
                        {errors.phoneNumber && (
                            <div className="text-danger">{errors.phoneNumber}</div>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${
                                errors.email
                                    ? "error-field is-invalid"
                                    : formData.email && "is-valid"
                            }`}
                            placeholder="Email Address"
                            aria-label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <label htmlFor="floatingInput">Email Address</label>
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className={`form-control ${
                                errors.password
                                    ? "error-field is-invalid"
                                    : formData.password && "is-valid"
                            }`}
                            placeholder="Password"
                            aria-label="Password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <label htmlFor="floatingInput">Password</label>
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className={`form-control ${
                                errors.confirmPassword
                                    ? "error-field is-invalid"
                                    : formData.confirmPassword && "is-valid"
                            }`}
                            placeholder="Confirm Password"
                            aria-label="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <label htmlFor="floatingInput">Confirm Password</label>
                        {errors.confirmPassword && (
                            <div className="text-danger">{errors.confirmPassword}</div>
                        )}
                    </div>
                    <div className="d-grid">
                        <button
                            className="in-btn btn btn-primary"
                            type="submit"
                            disabled={
                                !ValidForm.firstName ||
                                !ValidForm.lastName ||
                                !ValidForm.phoneNumber ||
                                !ValidForm.email ||
                                !ValidForm.password ||
                                !ValidForm.confirmPassword
                            }
                        >
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
