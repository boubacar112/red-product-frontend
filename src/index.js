// ...existing code...
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './api/contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
// ...existing code...