// Liste des filtres disponibles : valeur interne + libellé affiché.
const FILTERS = [
  { value: "toutes", label: "Toutes" },
  { value: "en cours", label: "En cours" },
  { value: "terminée", label: "Terminées" },
];

// Boutons de filtrage (contrôle segmenté). Le filtre actif est géré par la page parente.
// Props : filter (valeur active), onChange(nouvelleValeur), counts (nombre par filtre)
export default function TaskFilters({ filter, onChange, counts }) {
  return (
    <div className="filters" role="group" aria-label="Filtrer les tâches">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          type="button"
          className={`seg-btn ${filter === f.value ? "active" : ""}`}
          aria-pressed={filter === f.value}
          onClick={() => onChange(f.value)}
        >
          {f.label}
          <span className="seg-count">{counts[f.value]}</span>
        </button>
      ))}
    </div>
  );
}
