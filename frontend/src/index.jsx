import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



// Create a root for React 18
// Create a root element and render the App component within the AppProvider
// This allows for context management across the application
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    {/* <AppProvider> */}
    {/* Uncomment the line below if you have an AppProvider for context management */}
    {/* <AppProvider> */}
    {/* <App /> */}
    {/* </AppProvider> */}
      <App />
  </AuthProvider>
);











