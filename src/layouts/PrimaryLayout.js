import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const PrimaryLayout = () => {
    return ( 
        <>
            <Navbar />
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </>
     );
}
 
export default PrimaryLayout;