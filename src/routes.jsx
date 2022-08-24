import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardScreen from "./screens/dashboardScreen";
import HomeScreen from "./screens/homeScreen";
import PaymentScreen from "./screens/paymentScreen";
import PaymentCartScreen from "./screens/paymentCartScreen";
import ProductOverviewScreen from "./screens/productOverviewScreen";
import PaymentBuyoutScreen from "./screens/paymentBuyoutScreen";
import BuyoutResultScreen from "./screens/buyoutResultScreen";

const ScreenRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={'/'} element={<HomeScreen />} />
                <Route exact path={'/dashboard/:useremail/:name'} element={<DashboardScreen />} />
                <Route exact path={'/product_overview/:id'} element={<ProductOverviewScreen />} />
                <Route exact path={'/payment/:name/:quant'} element={<PaymentScreen />} />
                <Route exact path={'/payment/cart/:name/:quant'} element={<PaymentCartScreen />} />
                <Route exact path={'/payment/cart/buyout'} element={<PaymentBuyoutScreen />} />
                <Route exact path={'/payment/cart/buyout/result/:name/:type'} element={<BuyoutResultScreen/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default ScreenRoutes;