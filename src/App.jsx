import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Ressources from './pages/Ressources.jsx'
import ResourceDetails from './pages/ResourceDetails.jsx'
import Favoris from './pages/Favoris.jsx'
import Revisions from './pages/Revisions.jsx'
import Assistant from './pages/Assistant.jsx'
import useFavoris from './hooks/useFavoris.js'

// Page affichée pour une URL qui ne correspond à aucune route.
function PageIntrouvable() {
  return (
    <div className="text-center py-5">
      <h1 className="h3">Page introuvable (404)</h1>
      <p className="text-muted">Cette page n'existe pas.</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  )
}

function App() {
  // Les favoris sont gérés UNE seule fois ici, puis transmis par props :
  // ainsi la Navbar, l'accueil, le catalogue, les détails et la page Favoris
  // partagent le même état et se mettent à jour sans rechargement.
  const { favoris, estFavori, toggleFavori } = useFavoris()

  return (
    <>
      <Navbar nbFavoris={favoris.length} />

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home nbFavoris={favoris.length} />} />
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
          <Route path="/revisions" element={<Revisions />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="*" element={<PageIntrouvable />} />
        </Routes>
      </main>
    </>
  )
}

export default App
