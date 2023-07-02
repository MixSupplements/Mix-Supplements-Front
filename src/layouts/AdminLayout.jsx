import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';

import './admin.css'
import logo from './../assets/images/logo.png';

export default function AdminLayout() {
    const [menuIcon, setMenuIcon] = useState(faBars);
    const [linksVisible, setLinksVisible] = useState(true);

    const toggleMobileMenu = () => {
        setMenuIcon((prevIcon) =>
            prevIcon === faBars ? faRectangleXmark : faBars
        );
        setLinksVisible((prevVisible) => !prevVisible);
    };
    return (
        <Container fluid className='admin-dashboard'>
            <Row className=''>
                <Col className='side-menu px-3' xs={12} md={3} xl={2}>
                    <div className="text-center d-flex flex-md-column justify-content-between align-items-md-center ">
                        <span className='d-none d-sm-inline d-md-none p-2 ' style={{ width: '30px' }}></span>
                        <img src={logo} alt='Main Logo' className='logo ' />
                        <FontAwesomeIcon icon={menuIcon} size="2xl" className="d-md-none" onClick={toggleMobileMenu} />
                    </div>
                    <div className={`nav-links d-flex flex-column justify-content-evenly align-content-center ${linksVisible ? '' : 'hidden'}`}>
                        <NavLink to="/Admin/Dashboard">Dashboard</NavLink>
                        <NavLink to="/Admin/Dashboard/Orders">Orders</NavLink>
                    </div>
                </Col>
                <Col className='main'>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    )
}
