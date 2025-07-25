// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; 
import { CartProvider } from './components/CartContext';


import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from './redux/store.js'
import { Provider } from 'react-redux'

let persistor = persistStore(store)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CartProvider>
          <App />
          <ToastContainer />
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
  </PersistGate>
   </Provider>
);



