// rout.js
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';  // from react-router-dom (v6+)

import Home from "./home";
import Shop from "./shop";
import Cart from "./cart";
import Contact from './contact'
import ProductPage from './screens/pruductPage';

import Login from './auth/Login';
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import Alert from "./layout/Alert";
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import Shipping from "./screens/ShippingScreen";
import Payment from './screens/PaymentScreen';
import PlaceOrder from './screens/PlaceOrderScreen';
import OrderScreen from './screens/orderScreen';
import Profile from './Profile';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';

import store from '../store';
import { loadUser } from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';


if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}
const Rout = ({ shop, Filter, allcatefilter, addToCart, cart }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Alert />
      <Routes path="/">
        <Route path="/"   element={<Home addToCartHandler={addToCart} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/shop"
          element={
            <Shop
              shop={shop}
              Filter={Filter}
              allcatefilter={allcatefilter}
              addToCartHandler={addToCart} 
              addToCart={addToCart}
            />
          }
        />
        

         <Route path="/cart" element={<Cart cart={cart} />} />

        <Route
          path="/login"
          element={
            <Login
              Filter={Filter}
              allcatefilter={allcatefilter}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              Filter={Filter}
              allcatefilter={allcatefilter}
            />
          }
        />

        <Route
          path="/forgotPassword"
          element={
            <ForgotPassword
              Filter={Filter}
              allcatefilter={allcatefilter}
            />
          }
        />
        
        <Route
          path="/productPage"
          element={
            <ProductPage
              Filter={Filter}
              allcatefilter={allcatefilter}
              addToCartHandler={addToCart} 
            />
          }
        />
        <Route path="/Profile" element={<Profile 
         addToCartHandler={addToCart}  />} /> 
        
        <Route path='' element={<PrivateRoute />}>
          <Route path="/shipping" element={<Shipping />} />  
          <Route path="/payment" element={<Payment />} /> 
          <Route path="/placeorder" element={<PlaceOrder />} /> 
          <Route path='/order/:id' element={<OrderScreen />} /> 
                
        </Route>

        <Route path='' element={<AdminRoute />}>
          <Route path="/admin/orderlist" element={<OrderListScreen />} />  
          <Route path="/admin/productlist" element={<ProductListScreen />} /> 
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} /> 
          <Route path="/admin/userlist" element={<UserListScreen />} />  
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />   
        </Route>
      </Routes>
    </>
  );
};

export default Rout;
