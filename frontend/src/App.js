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
      </BrowserRouter>
    </Suspense>
  )
}

export default App

