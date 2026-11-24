import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Bootstrap : styles + JS (menu burger de la Navbar sur mobile)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter active la navigation sans rechargement dans toute l'app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
