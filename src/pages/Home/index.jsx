import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import axiosInstance from "../../APIs/config";

import ProductCard from "../../components/ProductCard";

import "./Home.css";

const Home = () => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        axiosInstance
            .get("/products")
            .then((res) => setProductList(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <section className="row home-section" id="home-hero">
                <div
                    id="carouselExampleSlidesOnly"
                    className="carousel slide col-md-8 p-0"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="5000">
                            <img
                                src={process.env.PUBLIC_URL + "images/hydro-slider.jpg"}
                                className="d-block w-100"
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item" data-bs-interval="5000">
                            <img
                                src={process.env.PUBLIC_URL + "images/new-arrival-banner.jpg"}
                                className="d-block w-100"
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item" data-bs-interval="5000">
                            <img
                                src={process.env.PUBLIC_URL + "images/no-joke-banner.jpg"}
                                className="d-block w-100"
                                alt="..."
                            />
                        </div>
                    </div>
                </div>
                <div
                    id="side-banner"
                    className="d-none d-md-flex flex-column row justify-content-between col-md-4 p-0"
                >
                    <img
                        src={process.env.PUBLIC_URL + "images/storm-pump.jpg"}
                        alt="..."
                        className="p-0"
                    />
                    <img
                        src={process.env.PUBLIC_URL + "images/casien-organic-nation-banner.jpg"}
                        alt="..."
                        className="p-0"
                    />
                </div>
            </section>

            <h2>Sponsors</h2>
            <section className="row home-section align-items-center" id="home-sponsors">
                <div className="home-sponsor col-3 text-center">
                    <img
                        src={process.env.PUBLIC_URL + "images/nutrex.png"}
                        alt=""
                        className="img-fluid"
                    />
                </div>
                <div className="home-sponsor col-3 text-center">
                    <img
                        src={process.env.PUBLIC_URL + "images/2179872.png"}
                        alt=""
                        className="img-fluid"
                    />
                </div>
                <div className="home-sponsor col-3 text-center">
                    <img
                        src={process.env.PUBLIC_URL + "images/2649.png"}
                        alt=""
                        className="img-fluid"
                    />
                </div>
                <div className="home-sponsor col-3 text-center">
                    <img
                        src={
                            process.env.PUBLIC_URL +
                            "images/universal-nutrition-logo-2DC03B40CC-seeklogo.com.png"
                        }
                        alt=""
                        className="img-fluid"
                    />
                </div>
            </section>

            <h2>Shop By Categories</h2>
            <section className="row justify-content-center home-section" id="home-categories">
                <div className="col-md-4 row align-items-center">
                    <div className="carousel slide">
                        <div className="carousel-inner px-1">
                            <div className="carousel-item active">
                                <img
                                    src={process.env.PUBLIC_URL + "images/supplement-img.jpg"}
                                    className="d-block w-100 home-category-card"
                                    alt="..."
                                />
                                <div className="overlay"></div>
                                <div className="carousel-caption ">
                                    <h5>Sports Supplements</h5>
                                    <NavLink to="/shop">
                                        <button className="btn home-button">Check products</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 row text-center">
                    <div className="carousel col-md-6 slide">
                        <div className="carousel-inner home-category">
                            <div className="carousel-item active">
                                <img
                                    src={process.env.PUBLIC_URL + "images/bars-snaks-img.jpg"}
                                    className="d-block w-100 home-category-card"
                                    alt="..."
                                />
                                <div className="overlay"></div>
                                <div className="carousel-caption ">
                                    <h5>Bars & Snacks</h5>
                                    <NavLink to="/shop">
                                        <button className="btn home-button">Check products</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="carousel col-md-6 slide">
                        <div className="carousel-inner home-category">
                            <div className="carousel-item active">
                                <img
                                    src={process.env.PUBLIC_URL + "images/vitamins-img.jpg"}
                                    className="d-block w-100 home-category-card"
                                    alt="..."
                                />
                                <div className="overlay"></div>
                                <div className="carousel-caption ">
                                    <h5>Vitamins & Minerals</h5>
                                    <NavLink to="/shop">
                                        <button className="btn home-button">Check products</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="carousel col-md-6 align-self-end slide">
                        <div className="carousel-inner home-category">
                            <div className="carousel-item active">
                                <img
                                    src={process.env.PUBLIC_URL + "images/healthy-food-img.jpg"}
                                    className="d-block w-100 home-category-card"
                                    alt="..."
                                />
                                <div className="overlay"></div>
                                <div className="carousel-caption ">
                                    <h5>Healthy Food</h5>
                                    <NavLink to="/shop">
                                        <button className="btn home-button">Check products</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="carousel col-md-6 align-self-end slide">
                        <div className="carousel-inner home-category">
                            <div className="carousel-item active">
                                <img
                                    src={process.env.PUBLIC_URL + "images/fitness-img.jpg"}
                                    className="d-block w-100 home-category-card"
                                    alt="..."
                                />
                                <div className="overlay"></div>
                                <div className="carousel-caption ">
                                    <h5>Fitness Equipment</h5>
                                    <NavLink to="/shop">
                                        <button className="btn home-button">Check products</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <h2>Popular Products</h2>
            <section className="row justify-content-center home-section" id="home-products">
                {productList.map((product, i) => {
                    if(product.quantity !== 0 && i <= 8){
                        return <ProductCard key={product._id} product={product} />;
                    }
                })}
            </section>
        </>
    );
};

export default Home;
