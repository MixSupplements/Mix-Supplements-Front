import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navbar from "../components/common/Navbar/Navbar";
import Footer from "../components/common/Footer/Footer";

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
