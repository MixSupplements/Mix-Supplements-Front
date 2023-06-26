import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar/Navbar";
import Footer from "../components/common/Footer/Footer";

import { Container } from "react-bootstrap";

const PrimaryLayout = () => {
    return (
        <>
            <Navbar />
            <Container className="primaryLayout-outlet-container">
                <Outlet />
            </Container>
            <Footer />
        </>
    );
};

export default PrimaryLayout;
