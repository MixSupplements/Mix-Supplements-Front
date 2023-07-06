import { useEffect, useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../APIs/config";

import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/token";

import "./Login.css";
import { getCart } from "../../redux/slices/cart";
import { getWishlist } from "../../redux/slices/wishlist";

function Login() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const newUser = localStorage.getItem('newUser')? JSON.parse(localStorage.getItem('newUser')): null;
        if(newUser !== null){
        axiosInstance
            .post("/register", newUser)
            .then((res) => {
                console.log(res);
                localStorage.removeItem('newUser')
            })
            .catch((error) => console.log(error));
        }
    },[])

    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                dispatcher(setToken(res.data.token));
                localStorage.setItem("token", res.data.token);
                navigate(`/home`);
                dispatcher(getCart());
                dispatcher(getWishlist());
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
                            className={`form-control ${invalid && "error-field is-invalid"}`}
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value.toLowerCase());
                                setInvalid(false);
                            }}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className={`form-control ${invalid && "error-field is-invalid"}`}
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setInvalid(false);
                            }}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                        {invalid && <div className="text-danger">Invalid email or password!</div>}
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
                    {/* {invalid ? (
                        <div
                            className="alert alert-danger alert-dismissible fade show"
                            role="alert"
                        >
                            Invalid email or password!
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={() => {
                                    setInvalid(false);
                                }}
                            ></button>
                        </div>
                    ) : (
                        ""
                    )} */}
                </form>
            </div>
        </div>
    );
}

export default Login;
