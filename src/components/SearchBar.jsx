import { useState } from 'react'

// Formulaire contrôlé : la valeur du champ est liée à un état React.
// La recherche n'est lancée qu'à la soumission (bouton ou touche Entrée),
// pour ne pas envoyer une requête à chaque lettre tapée.
function SearchBar({ onRechercher }) {
  const [texte, setTexte] = useState('')

  function handleSubmit(e) {
    e.preventDefault() // empêche le rechargement de la page
    onRechercher(texte.trim())
  }

  return (
    <form className="d-flex gap-2" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className="form-control"
        placeholder="Rechercher un livre, un auteur, un sujet..."
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        aria-label="Mot-clé"
      />
      <button type="submit" className="btn btn-primary">
        Rechercher
      </button>
    </form>
  )
}

export default SearchBar
