import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app using the new root API
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
