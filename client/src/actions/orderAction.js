import axios from 'axios';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  PAYPAL_CLIENT_ID_REQUEST,
  PAYPAL_CLIENT_ID_SUCCESS,
  PAYPAL_CLIENT_ID_FAIL,
} from './types';

import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(ORDERS_URL, order, config);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${token}` }, 
    };

     
    
    // GET /api/v1/orders/:id
    const { data } = await axios.get(`${ORDERS_URL}/${id}`, config); 
    //console.log('Order Details Response:', data); 
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    };

    // PUT /api/v1/orders/:id/pay
    const { data } = await axios.put(
      `${ORDERS_URL}/${orderId}/pay`, 
      paymentResult,
      config
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPaypalClientId = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PAYPAL_CLIENT_ID_REQUEST });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${token}` }, 
    };

    // GET /api/v1/config/paypal 
    const { data } = await axios.get(PAYPAL_URL, config);

    dispatch({ type: PAYPAL_CLIENT_ID_SUCCESS, payload: data.clientId });
  } catch (error) {
    dispatch({
      type: PAYPAL_CLIENT_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${token}` }, 
    };

    // GET /api/v1/orders/myorders
    const { data } = await axios.get(`${ORDERS_URL}/myorders`, config); 

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${token}` }, 
    };

    // GET /api/v1/orders
    const { data } = await axios.get(ORDERS_URL, config);
    

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${token}` }, 
    };

    // PUT /api/v1/orders/:id/deliver
    const { data } = await axios.put(`${ORDERS_URL}/${orderId}/deliver`, {}, config); // Corrected template literal

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
