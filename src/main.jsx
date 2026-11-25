import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Bootstrap : styles + JS (menu burger de la Navbar sur mobile)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Polices installées avec npm (@fontsource) : elles marchent aussi sans internet
import '@fontsource/bricolage-grotesque/600.css'
import '@fontsource/bricolage-grotesque/800.css'
import '@fontsource/instrument-sans/400.css'
import '@fontsource/instrument-sans/600.css'
// Thème SkillUp : adapte les couleurs, polices et formes de Bootstrap
import './styles/theme.css'
import './index.css'
// Styles communs des modules 3, 4, 5 (Révisions, Assistant, Accueil)
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter active la navigation sans rechargement dans toute l'app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
