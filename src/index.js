import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import App from './App';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

// Create root element for React 18+
const root = ReactDOM.createRoot(document.getElementById('root')); 

// Render the App component inside the BrowserRouter
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
