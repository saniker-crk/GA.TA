// // store.js (using Redux Toolkit’s configureStore)
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers/index';

// const store = configureStore({
//   reducer: rootReducer, // pass your combined root reducer here
// });

// export default store;

// store.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'; // Ensure this path is correct

const initialState = {};

const middleware = [thunk];

// Enable Redux DevTools Extension if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store with middleware and reducers
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;