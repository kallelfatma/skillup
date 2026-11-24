// Liste des filtres disponibles : valeur interne + libellé affiché.
const FILTERS = [
  { value: "toutes", label: "Toutes" },
  { value: "en cours", label: "En cours" },
  { value: "terminée", label: "Terminées" },
];

// Boutons de filtrage. Le filtre actif est géré par la page parente.
// Props : filter (valeur active), onChange(nouvelleValeur), counts (nombre par filtre)
export default function TaskFilters({ filter, onChange, counts }) {
  return (
    <div className="filters">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`btn btn-sm ${filter === f.value ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => onChange(f.value)}
        >
          {f.label} ({counts[f.value]})
        </button>
      ))}
    </div>
  );
}
