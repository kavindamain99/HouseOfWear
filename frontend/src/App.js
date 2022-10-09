import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
          </Switch>
        </Header>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
