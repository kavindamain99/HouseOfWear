import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loader from './components/Loader'
import Header from './components/Header'
import Footer from './components/Footer'

import AddNewAddress from './screens/payment/addNewAddress';
import ManageAddresses from './screens/payment/manageAddresses';
import UpdateAddress from './screens/payment/updateAddress';

const Login = lazy(() => import('./screens/Login'))
const Register = lazy(() => import('./screens/Register'))
const Home = lazy(() => import('./screens/Home'))
const Cart = lazy(() => import('./screens/Cart'))
const PlaceOrder = lazy(() => import('./screens/PlaceOrder'))

const Login = lazy(() => import('./screens/Login'))
const Register = lazy(() => import('./screens/Register'))
const Profile = lazy(() => import('./screens/Profile'))
const CreateProduct = lazy(() => import('./screens/CreateProduct'))
const Home = lazy(() => import('./screens/Home'))
const Product = lazy(() => import('./screens/Product'))
const Cart = lazy(() => import('./screens/Cart'))
const Shipping = lazy(() => import('./screens/Shipping'))
const PlaceOrder = lazy(() => import('./screens/PlaceOrder'))
const Order = lazy(() => import('./screens/Order'))
const MyOrders = lazy(() => import('./screens/MyOrders'))
const OrderList = lazy(() => import('./screens/OrderList'))
const UserList = lazy(() => import('./screens/UserList'))
const UserEdit = lazy(() => import('./screens/UserEdit'))
const ProductList = lazy(() => import('./screens/ProductList'))
const ProductEdit = lazy(() => import('./screens/ProductEdit'))
const CategoryList = lazy(() => import('./screens/CategoryList'))
const CreateCategory = lazy(() => import('./screens/CreateCategory'))
const CategoryEdit = lazy(() => import('./screens/CategoryEdit'))

const Reviews = lazy(() => import('./screens/Reviews'))
const Enquiry = lazy(() => import('./screens/Enquiry'))
const editEnquiry = lazy(() => import('./screens/editEnquiry'))

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
    <Suspense fallback={<Loader />} >
      <BrowserRouter>
        <Header />
        <main style={{ minHeight: '81.6vh' }}>
          <Switch >
            <Route path='/placeorder' component={PlaceOrder} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />

            <Route path='/cart/:id?' component={Cart} />
            <Route path='/' component={Home} exact />

            <Route path='/addresses' component={ ManageAddresses } />
            <Route path='/address/:id' component={ UpdateAddress } />
            <Route path='/address' component={ AddNewAddress } exact/>
          </Switch>
        </main>
        <Footer />

            <Route path='/order/:id' component={Order} />
            <Route path='/myorders' component={MyOrders} />
            <Route path='/reviews' component={Reviews} />
            <Route path='/Enquiry' component={Enquiry} />
            <Route path='/editEnquiry' component={editEnquiry} />
            <Route path='/shipping' component={Shipping} />
            <Route path='/placeorder' component={PlaceOrder} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/profile' component={Profile} />
            <Route path='/admin/orderlist' component={OrderList} />
            <Route path='/admin/categorylist' component={CategoryList} />
            <Route path='/admin/userlist' component={UserList} />
            <Route path='/admin/user/:id/edit' component={UserEdit} />
            <Route path='/admin/product/create' component={CreateProduct} />
            <Route path='/admin/category/create' component={CreateCategory} />
            <Route path='/product/:id' component={Product} />
            <Route path='/admin/productlist' component={ProductList} exact />
            <Route
              path='/admin/productlist/:pageNumber'
              component={ProductList}
              exact
            />
            <Route path='/admin/product/:id/edit' component={ProductEdit} />
            <Route path='/admin/category/:id/edit' component={CategoryEdit} />

            <Route path='/cart/:id?' component={Cart} />
            <Route path='/search/:keyword' component={Home} exact />
            <Route path='/page/:pageNumber' component={Home} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={Home}
              exact
            />
            <Route path='/category/:category' component={Home} exact />
            <Route path='/' component={Home} exact />
          </Switch>
        </main>
        <Footer />

      </BrowserRouter>
    </Suspense>
  )
}

export default App


