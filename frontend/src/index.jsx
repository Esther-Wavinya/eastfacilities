import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'normalize.css';
import './index.css';
import App from './App';
// import { AppProvider } from './context/appContext'; // Assuming you have an AppProvider for context management

// Create a root for React 18
// Create a root element and render the App component within the AppProvider
// This allows for context management across the application
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <AppProvider> */}
    {/* Uncomment the line below if you have an AppProvider for context management */}
    {/* <AppProvider> */}
    {/* <App /> */}
    {/* </AppProvider> */}
      <App />
  </React.StrictMode>
);











