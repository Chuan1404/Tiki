import { Popup } from "components";
import {
  Admin,
  AdminLogin,
  Checkout,
  Home,
  NotFound,
  ProductDetail,
} from "pages";
import Category from "pages/Admin/category";
import Dashboard from "pages/Admin/Dashboard";
import Order from "pages/Admin/Order";
import Product from "pages/Admin/product";
import User from "pages/Admin/user";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "store";
export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            <Route index element={<Home />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />}>
              <Route path="user" element={<User />} />
              <Route path="category" element={<Category />} />
              <Route path="product" element={<Product />} />
              <Route path="order" element={<Order />} />
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Popup />
        </BrowserRouter>
      </div>
    </Provider>
  );
}
