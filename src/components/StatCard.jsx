// Petit chiffre statistique réutilisable (page d'accueil).
// Props : value (nombre ou texte), label (description), color (classe CSS optionnelle)
export default function StatCard({ value, label, color = "" }) {
  return (
    <div className={`stat ${color}`}>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
}
