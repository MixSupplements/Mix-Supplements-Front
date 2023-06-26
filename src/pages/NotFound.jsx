import React from "react";

const NotFound = () => {
    return (
        <div
            className="d-flex align-items-center justify-content-center flex-column flex-md-row"
            style={{ minHeight: "70vh" }}
        >
            <div className="d-flex justify-content-center align-items-center">
                <img
                    src={process.env.PUBLIC_URL + "images/404_face.png"}
                    alt="NOT FOUND"
                    className="img-fluid"
                    style={{ width: "350px" }}
                />
            </div>
            <div className="ms-md-4 mt-4 mt-md-0" style={{ maxWidth: "350px" }}>
                <h1 style={{ color: "var(--clr-primary-400)" }}>Page Not Found</h1>
                <h5 style={{ color: "#ffffff57" }}>
                    Sorry, but we can't find the page you are looking for...
                </h5>
            </div>
        </div>
    );
};

export default NotFound;
