import { Route, Routes } from "react-router-dom";

import PrimaryLayout from "../layouts/PrimaryLayout";
import Home from "../pages/Home";
import Product from "../pages/Product";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PrimaryLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/store/product/:id" element={<Product />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;