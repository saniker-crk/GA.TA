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
} from '../actions/types';

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        userInfo: userInfoFromStorage, 
    };
    

 function authReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                userInfo: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('userInfo', JSON.stringify(payload));
            localStorage.setItem('token', payload.token);   
            return {
                ...state,
                token: payload.token,        
                isAuthenticated: true,
                loading: false,
                userInfo: payload
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                userInfo: action.payload 
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('userInfo');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                userInfo: null
            };
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                error: action.payload 
            };
        default:
            return state;
    }
}
export default authReducer

