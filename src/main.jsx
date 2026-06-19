import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from 'react-router-dom'
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
