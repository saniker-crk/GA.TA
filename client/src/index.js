import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 
import { BrowserRouter } from 'react-router-dom'; 
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import store from './store'; 
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <Provider store={store}>
    <PayPalScriptProvider deferLoading={true}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PayPalScriptProvider>
  </Provider>
);

reportWebVitals();

