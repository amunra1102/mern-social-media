import React from 'react';
import ReactDOM from 'react-dom';

import 'assets/styles/global.css';

import App from './App';
import StoreProvider from 'redux/store';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
