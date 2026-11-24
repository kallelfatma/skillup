import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Ressources from './pages/Ressources.jsx'
import ResourceDetails from './pages/ResourceDetails.jsx'
import Favoris from './pages/Favoris.jsx'
import useFavoris from './hooks/useFavoris.js'

// Page temporaire pour les routes du binôme (Accueil, Révisions, Assistant).
// À remplacer par leurs vraies pages quand elles seront prêtes.
function PageAVenir({ titre }) {
  return (
    <div className="text-center py-5">
      <h1 className="h3">{titre}</h1>
      <p className="text-muted">Page en cours de développement.</p>
    </div>
  )
}

function App() {
  // Les favoris sont gérés UNE seule fois ici, puis transmis par props :
  // ainsi la Navbar, le catalogue, les détails et la page Favoris
  // partagent le même état et se mettent à jour sans rechargement.
  const { favoris, estFavori, toggleFavori } = useFavoris()

  return (
    <>
      <Navbar nbFavoris={favoris.length} />

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<PageAVenir titre="Accueil" />} />
          <Route
            path="/ressources"
            element={<Ressources estFavori={estFavori} onToggleFavori={toggleFavori} />}
          />
          <Route
            path="/ressources/:id"
            element={<ResourceDetails estFavori={estFavori} onToggleFavori={toggleFavori} />}
          />
          <Route
            path="/favoris"
            element={<Favoris favoris={favoris} estFavori={estFavori} onToggleFavori={toggleFavori} />}
          />
          <Route path="/revisions" element={<PageAVenir titre="Révisions" />} />
          <Route path="/assistant" element={<PageAVenir titre="Assistant IA" />} />
          <Route path="*" element={<PageAVenir titre="Page introuvable (404)" />} />
        </Routes>
      </main>
    </>
  )
}

export default App
