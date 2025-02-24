// src/actions/authActions.js

import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    const token = localStorage.getItem('token');


    if (!token) {
        return dispatch({ type: AUTH_ERROR });
    }

    setAuthToken(token);


    
    try {
        const res = await axios.get('/api/v1/users/me');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}


export const register = ({ name, email, password, passwordConfirm }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password, passwordConfirm });
    try {       
        const res = await axios.post('/api/v1/users/signup', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data 
        });

        dispatch(loadUser());
    } catch(err) {
        const errors = err.response && err.response.data.errors;

        if(errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    };
};


export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });
    try {       
        const res = await axios.post('/api/v1/users/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data 
        });

        dispatch(loadUser());
    } catch(err) {
        const errors = err.response && err.response.data.errors;

        if(errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    };
};


export const logout = () => dispatch => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userInfo');
    setAuthToken(null); 
    dispatch({ type: LOGOUT });
}


export const updateProfile = (profileData) => async (dispatch, getState) => {
    try {
        const { token } = getState().auth; 

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.patch('/api/v1/users/updateMe', profileData, config);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data 
        });
        dispatch(loadUser());
        dispatch(setAlert('Profile updated successfully', 'success'));
    } catch (err) {
        const errors = err.response && err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};


export const updateProfilePassword = (profileData) => async (dispatch, getState) => {
    try {
        const { token } = getState().auth; 

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.patch('/api/v1/users/updateMyPassword', profileData, config);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data 
        });
        dispatch(loadUser());
        dispatch(setAlert('Profile updated successfully', 'success'));
    } catch (err) {
        const errors = err.response && err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};