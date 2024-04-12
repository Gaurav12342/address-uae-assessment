import { Route, BrowserRouter, Routes } from "react-router-dom";
import Root from "../pages";
import User from "../pages/User";
import { ROUTE_CONSTATS } from "./constant";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTE_CONSTATS?.ROOT} element={<Root />} />
                <Route path={`/${ROUTE_CONSTATS?.USER}`} element={<User />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router