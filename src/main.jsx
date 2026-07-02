import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom'
import "leaflet/dist/leaflet.css";
import { ParallaxProvider } from 'react-scroll-parallax'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ParallaxProvider>
    <App />
    </ParallaxProvider>
    </BrowserRouter>
  </StrictMode>,
)
