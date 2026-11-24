import { Link } from 'react-router-dom'
import { getCoverUrl } from '../services/openLibraryApi.js'

// Carte réutilisable affichant une ressource.
// Elle ne gère aucun état : elle reçoit tout par props.
function ResourceCard({ ressource, estFavori, onToggleFavori }) {
  const cover = getCoverUrl(ressource.coverId)

  return (
    <div className="card h-100 resource-card">
      {cover ? (
        <img
          src={cover}
          className="card-img-top resource-cover"
          alt={`Couverture de ${ressource.titre}`}
          loading="lazy"
        />
      ) : (
        <div className="resource-cover d-flex align-items-center justify-content-center text-muted">
          Pas de couverture
        </div>
      )}

      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary align-self-start mb-2 text-wrap text-start">
          {ressource.categorie}
        </span>
        <h2 className="card-title h6">{ressource.titre}</h2>
        <p className="card-text text-muted small mb-3">{ressource.auteur}</p>

        <div className="mt-auto d-flex gap-2">
          <Link
            to={`/ressources/${ressource.id}`}
            className="btn btn-outline-primary btn-sm flex-grow-1"
          >
            Détails
          </Link>
          <button
            type="button"
            className={`btn btn-sm ${estFavori ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => onToggleFavori(ressource)}
            title={estFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            aria-pressed={estFavori}
          >
            {estFavori ? '★ Favori' : '☆ Favori'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResourceCard
