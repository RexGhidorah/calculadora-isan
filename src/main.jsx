import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const authDataRaw = sessionStorage.getItem('authData');
let isAuthenticated = false;

if (authDataRaw) {
  try {
    const authData = JSON.parse(authDataRaw);
    if (authData && authData.marca) {
      isAuthenticated = true;
    }
  } catch (e) {
    console.error("Error parsing authData from sessionStorage", e);
  }
}

if (!isAuthenticated) {
  window.location.replace('/login.html');
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
