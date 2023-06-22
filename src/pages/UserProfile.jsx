import { useEffect } from "react";

import { Outlet, NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";

import { Tab, Nav } from "react-bootstrap";

import "../styles/userProfile/userProfile.css";

const UserProfile = () => {
    const nagivator = useNavigate();

    // useEffect(() => {
    //     nagivator("/user/accountDetails");
    // }, []);

    return (
        <Tab.Container id="tabs" defaultActiveKey="accountDetails">
            <div className="row justify-content-between my-5">
                <div className="control-tabs-group col-lg-3 col-sm-4 p-0 mb-4 mb-sm-0">
                    <Nav variant="pills" className="flex-column user-nav-pills">
                        <Nav.Item>
                            <NavLink
                                to="accountDetails"
                                eventKey="accountDetails"
                                className="nav-link"
                            >
                                <div className="control-tab">
                                    <FontAwesomeIcon icon={faUser} /> Account Details
                                </div>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="wishlist" eventKey="wishlist" className="nav-link">
                                <div className="control-tab">
                                    <FontAwesomeIcon icon={faHeart} /> Wishlist
                                </div>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="orders" eventKey="orders" className="nav-link">
                                <div className="control-tab">
                                    <FontAwesomeIcon icon={faTruck} /> Orders
                                </div>
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="col-lg-8 col-sm-7 p-sm-0">
                    <Outlet />
                </div>
            </div>
        </Tab.Container>
    );
};

export default UserProfile;
