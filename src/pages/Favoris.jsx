import { Link } from 'react-router-dom'
import ResourceCard from '../components/ResourceCard.jsx'

// Page /favoris : réutilise ResourceCard pour afficher les ressources sauvegardées.
function Favoris({ favoris, estFavori, onToggleFavori }) {
  return (
    <section>
      <h1 className="h3 mb-3">Mes favoris ({favoris.length})</h1>

      {favoris.length === 0 ? (
        <div className="alert alert-info">
          Vous n'avez encore aucun favori.{' '}
          <Link to="/ressources" className="alert-link">
            Parcourir le catalogue
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {favoris.map((r) => (
            <div className="col" key={r.id}>
              <ResourceCard ressource={r} estFavori={estFavori(r.id)} onToggleFavori={onToggleFavori} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Favoris
