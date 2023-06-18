import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';



// Create a React DOM connection , and renders to the index.html element "root"
// the react applicaiton created called "App"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
