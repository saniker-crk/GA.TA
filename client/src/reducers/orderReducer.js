import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_RESET,
  
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
  } from '../actions/types';
  

  export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return { loading: true };
      case CREATE_ORDER_SUCCESS:
        return { loading: false, success: true, order: action.payload.data };
      case CREATE_ORDER_FAIL:
        return { loading: false, error: action.payload };
    case CREATE_ORDER_RESET:
        return {};
      default:
        return state;
    }
  };
  

  export const orderDetailsReducer = (state = { loading: true , order: {}}, action) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return { loading: true };
      case ORDER_DETAILS_SUCCESS:
        return { loading: false, order: action.payload.data };
      case ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_PAY_REQUEST:
        return { loading: true };
      case ORDER_PAY_SUCCESS:
        return { loading: false, success: true, order: action.payload.data };
      case ORDER_PAY_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
 
  export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_MY_REQUEST:
        return { loading: true, orders: [] };
      case ORDER_LIST_MY_SUCCESS:
        return { loading: false, orders: action.payload.data.data };
      case ORDER_LIST_MY_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  

  export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, order: action.payload.data };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  

  export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_DELIVER_REQUEST:
        return { loading: true };
      case ORDER_DELIVER_SUCCESS:
        return { loading: false, success: true, order: action.payload.data };
      case ORDER_DELIVER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  

  export const paypalClientIdReducer = (state = {}, action) => {
    switch (action.type) {
      case PAYPAL_CLIENT_ID_REQUEST:
        return { loading: true };
      case PAYPAL_CLIENT_ID_SUCCESS:
        return { loading: false, clientId: action.payload };
      case PAYPAL_CLIENT_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  