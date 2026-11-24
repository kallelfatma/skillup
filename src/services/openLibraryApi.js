// Service d'accès à l'API publique Open Library.
// Toute la logique réseau est ici : les composants n'appellent que ces fonctions.

const BASE_URL = 'https://openlibrary.org'
const COVER_URL = 'https://covers.openlibrary.org/b/id'

// Catégories proposées dans le filtre (value = sujet Open Library)
export const CATEGORIES = [
  { value: '', label: 'Toutes les catégories' },
  { value: 'programming', label: 'Programmation' },
  { value: 'computer science', label: 'Informatique' },
  { value: 'web development', label: 'Développement web' },
  { value: 'databases', label: 'Bases de données' },
  { value: 'artificial intelligence', label: 'Intelligence artificielle' },
  { value: 'mathematics', label: 'Mathématiques' },
  { value: 'physics', label: 'Physique' },
]

// URL de la couverture (taille S, M ou L) à partir de l'identifiant de couverture
export function getCoverUrl(coverId, taille = 'M') {
  return coverId ? `${COVER_URL}/${coverId}-${taille}.jpg` : null
}

// Transforme un document brut de l'API en objet "ressource" simple
function versRessource(doc, labelCategorie) {
  return {
    id: doc.key.replace('/works/', ''), // ex. "OL20915214W"
    titre: doc.title,
    auteur: doc.author_name?.join(', ') ?? 'Auteur inconnu',
    categorie: labelCategorie || doc.subject?.[0] || 'Non classé',
    coverId: doc.cover_i ?? null,
    annee: doc.first_publish_year ?? null,
  }
}

// Recherche de livres par mot-clé et/ou catégorie
export async function rechercherLivres(motCle, categorie) {
  const params = new URLSearchParams({
    fields: 'key,title,author_name,subject,cover_i,first_publish_year',
    limit: '24',
  })
  const q = motCle.trim()
  if (q) params.set('q', q)
  if (categorie) params.set('subject', categorie)
  // Sans mot-clé ni catégorie, on affiche un catalogue par défaut
  if (!q && !categorie) params.set('q', 'programming')

  const reponse = await fetch(`${BASE_URL}/search.json?${params}`)
  if (!reponse.ok) {
    throw new Error(`Erreur serveur (${reponse.status})`)
  }
  const data = await reponse.json()
  const label = CATEGORIES.find((c) => c.value === categorie && c.value)?.label
  return data.docs.map((doc) => versRessource(doc, label))
}

// Détails complets d'un livre (une "œuvre" Open Library)
export async function getDetailsLivre(id) {
  const reponse = await fetch(`${BASE_URL}/works/${id}.json`)
  if (reponse.status === 404) {
    throw new Error('Ressource introuvable')
  }
  if (!reponse.ok) {
    throw new Error(`Erreur serveur (${reponse.status})`)
  }
  const work = await reponse.json()

  // Les auteurs ne sont donnés que par leur clé : on récupère leurs noms
  const clesAuteurs = (work.authors ?? []).map((a) => a.author?.key).filter(Boolean)
  const auteurs = await Promise.all(
    clesAuteurs.map(async (cle) => {
      try {
        const r = await fetch(`${BASE_URL}${cle}.json`)
        const a = await r.json()
        return a.name
      } catch {
        return null
      }
    }),
  )

  // La description peut être une chaîne ou un objet { value: "..." }
  const description =
    typeof work.description === 'string' ? work.description : work.description?.value

  return {
    id,
    titre: work.title,
    auteur: auteurs.filter(Boolean).join(', ') || 'Auteur inconnu',
    description: description ?? 'Aucune description disponible.',
    sujets: work.subjects?.slice(0, 12) ?? [],
    categorie: work.subjects?.[0] ?? 'Non classé',
    coverId: work.covers?.find((c) => c > 0) ?? null,
    datePublication: work.first_publish_date ?? null,
  }
}
