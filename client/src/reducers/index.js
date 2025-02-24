import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import cart from './cartReducers';
import { productListReducer, productDetailsReducer, productCreateReducer, productUpdateReducer, productDeleteReducer, productStatsReducer, productImageUploadReducer } from './productReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer, paypalClientIdReducer } from './orderReducer';
import { userDeleteReducer, userListReducer, userDetailsReducer, userUpdateReducer, } from './userReducers';
const rootReducer = combineReducers({
    alert,
    auth,
    cart,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer, 
    productUpdate: productUpdateReducer, 
    productDelete: productDeleteReducer,
    productStats: productStatsReducer,
    productImageUpload: productImageUploadReducer,
    //orderCreate: orderReducer, // Include if applicable
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    paypalClientId: paypalClientIdReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
});

export default rootReducer;
