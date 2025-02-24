import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  CLEAR_CART_ITEMS, 
  SAVE_PAYMENT_METHOD, 
  SAVE_SHIPPING_ADDRESS 
} from '../actions/types';

const addDecimals = (num) => {
    return Math.round(num * 100) / 100;
}
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};
  const paymentFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : [];
const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentFromStorage,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

function cartReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_TO_CART: {
      const item = action.payload;
      const existItem = state.cartItems.find(x => x._id === item._id);
      let updatedItems;
      if (existItem) {
        updatedItems = state.cartItems.map((x) => (x._id === existItem._id ? item : x));
      } else {
        updatedItems = [...state.cartItems, item];
      }
      return { ...state, cartItems: updatedItems };
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x._id !== action.payload),
      };

    case CLEAR_CART_ITEMS:
      return {
        ...state,
        cartItems: [],
        shippingAddress: {},
        paymentMethod: '',
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
      };

    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      const itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
      const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 5);
      const taxPrice = addDecimals(0.23 * itemsPrice); 
      const totalPrice = addDecimals(itemsPrice + shippingPrice + taxPrice);
      return {
        ...state,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };
  }
}

export default cartReducer;
