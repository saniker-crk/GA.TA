import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_STATS_REQUEST,
    PRODUCT_STATS_SUCCESS,
    PRODUCT_STATS_FAIL,
    PRODUCT_IMAGE_UPLOAD_REQUEST,
    PRODUCT_IMAGE_UPLOAD_SUCCESS,
    PRODUCT_IMAGE_UPLOAD_FAIL,
} from './types';

import { PRODUCTS_URL, UPLOAD_URL } from '../constants';


// GET api/v1/products
export const getProducts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const {
            auth: { token },
        } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.get(PRODUCTS_URL, config);

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// GET api/v1/products/:id
export const getProductDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const {
            auth: { token },
        } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get(`${PRODUCTS_URL}/${id}`, config);
        const product = data.data.data;

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};



// POST api/v1/products
export const createProduct = (productData) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const {
            auth: { token },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(PRODUCTS_URL, {
            name: 'Sample Name',
            price: 0,
            description: 'Sample Description',
            countInStock: 0,
            brand: 'Sample Brand',
            category: 'Sample Category',
            image: '/images/sample.jpg',
          }, config);
          

        const createdProduct = data.data;

        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: createdProduct });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// PATCH api/v1/products/:id
export const updateProduct = (id, updatedData) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST });

        const {
            auth: { token },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.patch(`${PRODUCTS_URL}/${id}`, updatedData, config);

        const updatedProduct = data.data;

        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: updatedProduct });
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


// DELETE api/v1/products/:id
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST });

        const {
            auth: { token },
        } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        await axios.delete(`${PRODUCTS_URL}/${id}`, config);

        
        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// GET api/v1/products/product-stats
export const getProductStats = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_STATS_REQUEST });

        const {
            auth: { token },
        } = getState();

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.get(`${PRODUCTS_URL}/product-stats`, config);

        const stats = data.data.stats;

        dispatch({ type: PRODUCT_STATS_SUCCESS, payload: stats });
    } catch (error) {
        dispatch({
            type: PRODUCT_STATS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const uploadProductImage = (file) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_IMAGE_UPLOAD_REQUEST });

        const {
            auth: { token },
        } = getState();

        const formData = new FormData();
        formData.append('image', file); 

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`/api/v1/upload`, formData, config);
        dispatch({ type: PRODUCT_IMAGE_UPLOAD_SUCCESS, payload: data.image });

    } catch (error) {
        dispatch({
            type: PRODUCT_IMAGE_UPLOAD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};



// GET api/v1/products?sort=-ratingsAverage
