import { CATEGORIES } from '../services/openLibraryApi.js'

// Liste déroulante contrôlée : la catégorie choisie vient du parent
// et chaque changement est remonté au parent via onChange.
function CategoryFilter({ categorie, onChange }) {
  return (
    <select
      className="form-select"
      value={categorie}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filtrer par catégorie"
    >
      {CATEGORIES.map((c) => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  )
}

export default CategoryFilter
