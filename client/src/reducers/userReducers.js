import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
  
  } from '../actions/types';

  export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return { loading: true };
      case USER_LIST_SUCCESS:
        return { loading: false, users: action.payload.data };
      case USER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const userDeleteReducer = (state = {}, action) => {
      switch (action.type) {
          case USER_DELETE_REQUEST:
              return { loading: true };
          case USER_DELETE_SUCCESS:
              return { loading: false, success: true };
          case USER_DELETE_FAIL:
              return { loading: false, error: action.payload };
          default:
              return state;
      }
  };
  
  export const userDetailsReducer = (state = { loading: false, user: {}, error: null }, action) => {
      switch (action.type) {
          case USER_DETAILS_REQUEST:
              return { ...state, loading: true };
              case USER_DETAILS_SUCCESS:
                  return { loading: false, user:  action.payload , error: null };
              
          case USER_DETAILS_FAIL:
              return { loading: false, user: {}, error: action.payload };
          default:
              return state;
      }
  };
  

  export const userUpdateReducer = (state = { user: {} }, action) => {
      switch (action.type) {
          case USER_UPDATE_REQUEST:
              return { loading: true };
          case USER_UPDATE_SUCCESS:
              return { loading: false, success: true, user: action.payload };
          case USER_UPDATE_FAIL:
              return { loading: false, error: action.payload };
          case USER_UPDATE_RESET:
              return { user: {} };
          default:
              return state;
      }
  };