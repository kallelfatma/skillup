// Barre de progression réutilisable (aussi utilisable sur la page d'accueil).
// Props : percent (0 à 100), label (texte optionnel)
export default function ProgressBar({ percent, label }) {
  return (
    <div className="su-progress">
      <div className="progress-header">
        <span>{label}</span>
        <strong>{percent}%</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
