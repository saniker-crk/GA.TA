import { 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
    CLEAR_CART_ITEMS,
    UPDATE_CART
} from './types';


export const updateLocalStorage = () => (dispatch, getState) => {
    const { cart } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
  };

export const addToCart = (item) => (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload: item
    });
    dispatch(updateLocalStorage());
};

export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    });
    dispatch(updateLocalStorage());
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: data
      });
      localStorage.setItem('shippingAddress', JSON.stringify(data));
   
};

export const savePaymentMethod = (method) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: method
    });
    //dispatch(updateLocalStorage());
    localStorage.setItem('paymentMethod', JSON.stringify(method));
};

export const clearCartItems = () => (dispatch) => {
    dispatch({
        type: CLEAR_CART_ITEMS
    });
    dispatch(updateLocalStorage());
};
