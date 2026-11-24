import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDetailsLivre, getCoverUrl } from '../services/openLibraryApi.js'

function ResourceDetails({ estFavori, onToggleFavori }) {
  const { id } = useParams() // récupère ":id" depuis l'URL /ressources/:id
  const navigate = useNavigate()

  const [livre, setLivre] = useState(null)
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  // Recharge les détails à chaque changement d'id dans l'URL
  useEffect(() => {
    let annule = false

    async function charger() {
      setChargement(true)
      setErreur(null)
      try {
        const data = await getDetailsLivre(id)
        if (!annule) setLivre(data)
      } catch (e) {
        if (!annule) {
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
  }, [id])

  if (chargement) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    )
  }

  if (erreur) {
    return (
      <div>
        <div className="alert alert-danger">⚠️ {erreur}</div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Retour
        </button>
      </div>
    )
  }

  const cover = getCoverUrl(livre.coverId, 'L')
  const favori = estFavori(livre.id)

  return (
    <article>
      <button type="button" className="btn btn-link px-0 mb-3" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="row g-4">
        <div className="col-md-4">
          {cover ? (
            <img src={cover} alt={`Couverture de ${livre.titre}`} className="img-fluid rounded shadow-sm" />
          ) : (
            <div className="resource-cover rounded d-flex align-items-center justify-content-center text-muted">
              Pas de couverture
            </div>
          )}
        </div>

        <div className="col-md-8">
          <h1 className="h3">{livre.titre}</h1>
          <p className="text-muted mb-1">
            <strong>Auteur :</strong> {livre.auteur}
          </p>
          {livre.datePublication && (
            <p className="text-muted mb-1">
              <strong>Première publication :</strong> {livre.datePublication}
            </p>
          )}
          <p className="text-muted">
            <strong>Catégorie :</strong> {livre.categorie}
          </p>

          <button
            type="button"
            className={`btn mb-4 ${favori ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() =>
              onToggleFavori({
                id: livre.id,
                titre: livre.titre,
                auteur: livre.auteur,
                categorie: livre.categorie,
                coverId: livre.coverId,
              })
            }
          >
            {favori ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
          </button>

          <h2 className="h5">Description</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{livre.description}</p>

          {livre.sujets.length > 0 && (
            <>
              <h2 className="h5">Sujets</h2>
              <div className="d-flex flex-wrap gap-2">
                {livre.sujets.map((s) => (
                  <span key={s} className="badge bg-light text-dark border">
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default ResourceDetails
