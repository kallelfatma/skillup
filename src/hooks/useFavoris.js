import { useEffect, useState } from 'react'

const CLE_STORAGE = 'skillup_favoris'

// Lit les favoris sauvegardés (tableau vide si rien ou si le JSON est corrompu)
function lireFavoris() {
  try {
    const brut = localStorage.getItem(CLE_STORAGE)
    const data = brut ? JSON.parse(brut) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

// Hook personnalisé : regroupe l'état des favoris et les actions associées.
function useFavoris() {
  // Initialisation paresseuse : localStorage n'est lu qu'au premier rendu
  // → les favoris sont récupérés après actualisation de la page.
  const [favoris, setFavoris] = useState(lireFavoris)

  // Sauvegarde automatique à chaque modification des favoris
  useEffect(() => {
    localStorage.setItem(CLE_STORAGE, JSON.stringify(favoris))
  }, [favoris])

  function estFavori(id) {
    return favoris.some((f) => f.id === id)
  }

  function ajouterFavori(ressource) {
    setFavoris((prev) =>
      // Dédoublonnage : on n'ajoute pas une ressource déjà présente
      prev.some((f) => f.id === ressource.id) ? prev : [...prev, ressource],
    )
  }

  function retirerFavori(id) {
    // filter crée un nouveau tableau (immutabilité, pas de splice)
    setFavoris((prev) => prev.filter((f) => f.id !== id))
  }

  function toggleFavori(ressource) {
    if (estFavori(ressource.id)) retirerFavori(ressource.id)
    else ajouterFavori(ressource)
  }

  return { favoris, estFavori, ajouterFavori, retirerFavori, toggleFavori }
}

export default useFavoris
