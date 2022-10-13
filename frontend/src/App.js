import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Loader from "./components/Loader";
import Header from "./components/Header";
import Footer from "./components/Footer";
const Login = lazy(() => import("./screens/Login"));
const Register = lazy(() => import("./screens/Register"));
const Profile = lazy(() => import("./screens/Profile"));
const CreateProduct = lazy(() => import("./screens/CreateProduct"));
const Home = lazy(() => import("./screens/Home"));
const Product = lazy(() => import("./screens/Product"));
const OrderList = lazy(() => import("./screens/OrderList"));
const ProductList = lazy(() => import("./screens/ProductList"));
const ProductEdit = lazy(() => import("./screens/ProductEdit"));
const CategoryList = lazy(() => import("./screens/CategoryList"));
const CreateCategory = lazy(() => import("./screens/CreateCategory"));
const CategoryEdit = lazy(() => import("./screens/CategoryEdit"));
export const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Header>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/admin/product/create" component={CreateProduct} />
            <Route path="/admin/categorylist" component={CategoryList} />
            <Route path="/admin/category/create" component={CreateCategory} />
            <Route path="/product/:id" component={Product} />
            <Route path="/admin/productlist" component={ProductList} exact />
            <Route path="/admin/product/:id/edit" component={ProductEdit} />
            <Route path="/admin/category/:id/edit" component={CategoryEdit} />
            <Route path="/category/:category" component={Home} exact />
            <Route path="/admin/orderlist" component={OrderList} />
            <Route path="/search/:keyword" component={Home} exact />
            <Route path="/page/:pageNumber" component={Home} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={Home}
              exact
            />
            <Route path="/category/:category" component={Home} exact />
            <Route path="/" component={Home} exact />
          </Switch>
        </Header>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
