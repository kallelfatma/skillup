// Petite carte statistique réutilisable (page d'accueil).
// Props : icon (emoji), value (nombre ou texte), label (description), color (classe CSS)
export default function StatCard({ icon, value, label, color = "" }) {
  return (
    <div className={`stat-card panel ${color}`}>
      <span className="stat-icon" aria-hidden="true">{icon}</span>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}
