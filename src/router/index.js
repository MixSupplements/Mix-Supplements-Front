import { Route, Routes } from "react-router-dom";

import PrimaryLayout from "../layouts/PrimaryLayout";
import Home from "../pages/Home";

const AppRouter = () => {
    return ( 
        <Routes>
            <Route element={<PrimaryLayout />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
     );
}
 
export default AppRouter;