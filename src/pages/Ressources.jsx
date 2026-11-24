import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import { rechercherLivres } from '../services/openLibraryApi.js'

function Ressources({ estFavori, onToggleFavori }) {
  const [motCle, setMotCle] = useState('')
  const [categorie, setCategorie] = useState('')
  const [ressources, setRessources] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [essai, setEssai] = useState(0) // incrémenté par le bouton "Réessayer"

  // Relance la recherche dès que le mot-clé, la catégorie (ou "Réessayer") change
  useEffect(() => {
    let annule = false // évite d'afficher une ancienne réponse arrivée en retard

    async function charger() {
      setChargement(true)
      setErreur(null)
      try {
        const resultats = await rechercherLivres(motCle, categorie)
        if (!annule) setRessources(resultats)
      } catch (e) {
        if (!annule) {
          setRessources([])
          // fetch lance un TypeError quand le réseau est coupé
          setErreur(
            e instanceof TypeError
              ? 'Impossible de contacter le serveur. Vérifiez votre connexion internet.'
              : e.message,
          )
        }
      } finally {
        if (!annule) setChargement(false)
      }
    }

    charger()
    return () => {
      annule = true
    }
  }, [motCle, categorie, essai])

  return (
    <section>
      <h1 className="h3 mb-3">Catalogue de ressources</h1>

      <div className="row g-2 mb-4">
        <div className="col-md-8">
          <SearchBar onRechercher={setMotCle} />
        </div>
        <div className="col-md-4">
          <CategoryFilter categorie={categorie} onChange={setCategorie} />
        </div>
      </div>

      {chargement && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="text-muted mt-2">Chargement des ressources...</p>
        </div>
      )}

      {!chargement && erreur && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>⚠️ {erreur}</span>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => setEssai((n) => n + 1)}
          >
            Réessayer
          </button>
        </div>
      )}

      {!chargement && !erreur && ressources.length === 0 && (
        <div className="alert alert-info">
          Aucune ressource ne correspond à votre recherche
          {motCle && (
            <>
              {' '}« <strong>{motCle}</strong> »
            </>
          )}
          . Essayez un autre mot-clé ou une autre catégorie.
        </div>
      )}

      {!chargement && !erreur && ressources.length > 0 && (
        <>
          <p className="text-muted small">{ressources.length} résultat(s)</p>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {ressources.map((r) => (
              <div className="col" key={r.id}>
                <ResourceCard
                  ressource={r}
                  estFavori={estFavori(r.id)}
                  onToggleFavori={onToggleFavori}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Ressources
