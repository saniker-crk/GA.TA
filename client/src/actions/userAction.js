import axios from 'axios';
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
} from './types';

import { USERS_URL } from '../constants';

export const getUsers = () => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });
  
      const {
        auth: { token },
      } = getState();
  
      const config = {
        headers: { Authorization: `Bearer ${token}` }, 
      };
  
      // GET /api/v1/orders
      const { data } = await axios.get(`${USERS_URL}`, config);
      console.log('Server Data:', data);
      const user = data.data;
      
      dispatch({ type: USER_LIST_SUCCESS, payload: user });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // DELETE api/v1/users/:id
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
      dispatch({ type: USER_DELETE_REQUEST });

      const {
          auth: { token },
      } = getState();

      const config = {
          headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(`${USERS_URL}/${id}`, config);

      
      dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
      dispatch({
          type: USER_DELETE_FAIL,
          payload:
              error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
      });
  }
};

// GET api/v1/user/:id
// GETapi/v1/users/me
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const {
          auth: { token },
      } = getState();

      const config = {
          headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(`${USERS_URL}/${id}`, config);
      const user = data.data.data;

      dispatch({ type: USER_DETAILS_SUCCESS, payload: user });
  } catch (error) {
      dispatch({
          type: USER_DETAILS_FAIL,
          payload:
              error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
      });
  }
};


// PATCH api/v1/products/:id
// PATCH api/v1/users/updateMe
export const updateUser = (id, updatedData) => async (dispatch, getState) => {
  try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const {
          auth: { token },
      } = getState();

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
      };

      const { data } = await axios.patch(`${USERS_URL}/${id}`, updatedData, config);

      const updatedUser = data.data;

      dispatch({ type: USER_UPDATE_SUCCESS, payload: updatedUser });
  } catch (error) {
      dispatch({
          type: USER_UPDATE_FAIL,
          payload:
              error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
      });
  }
};
