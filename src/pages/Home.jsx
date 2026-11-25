import { useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import { loadTasks } from "../services/taskStorage";
import "../styles/home.css";

// Date du jour en toutes lettres, ex. "mercredi 25 novembre".
const TODAY = new Date().toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

// Ajoute un "s" quand il y a plusieurs éléments.
function plural(n, word) {
  return `${n} ${word}${n > 1 ? "s" : ""}`;
}

// Sommaire des modules de l'application (rendu avec map + key).
const FEATURES = [
  { to: "/ressources", title: "Ressources", text: "Cherche des livres et des cours dans Open Library." },
  { to: "/favoris", title: "Favoris", text: "Retrouve les ressources que tu as gardées." },
  { to: "/revisions", title: "Révisions", text: "Planifie tes révisions et coche celles qui sont faites." },
  { to: "/assistant", title: "Assistant IA", text: "Pose une question de cours et reçois une explication." },
];

// Page / : accueil et aperçu de l'activité (Module 5).
// Props : nbFavoris -> nombre de favoris, transmis par App (qui gère l'état des favoris
// avec le hook useFavoris de Lina). Ainsi le compteur est toujours synchronisé.
export default function Home({ nbFavoris }) {
  // Les tâches sont lues dans le localStorage au montage de la page
  // (initialisation paresseuse : loadTasks n'est appelée qu'au premier rendu).
  // Chaque fois qu'on revient sur "/", la page est remontée -> données à jour.
  const [tasks] = useState(loadTasks);

  // Statistiques dérivées : calculées à partir des tâches, pas besoin de state.
  const done = tasks.filter((t) => t.statut === "terminée").length;
  const inProgress = tasks.length - done;
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  // Prochaine échéance : la tâche en cours dont la date limite est la plus proche.
  const next = tasks
    .filter((t) => t.statut !== "terminée")
    .sort((a, b) => a.dateLimite.localeCompare(b.dateLimite))[0];

  // Le titre de la page dit où en est l'étudiant, avec ses vraies données.
  let headline;
  let subtitle;
  let action;
  if (total === 0) {
    headline = "Ton planning de révision est vide.";
    subtitle = "Ajoute une première révision avec sa date limite : ta progression s'affichera ici.";
    action = "Planifier une révision";
  } else if (inProgress > 0) {
    headline = `Il te reste ${plural(inProgress, "révision")} à faire.`;
    const date = new Date(next.dateLimite + "T00:00").toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
    subtitle = `Prochaine échéance : « ${next.titre} », le ${date}.`;
    action = "Voir mes révisions";
  } else {
    headline = "Toutes tes révisions sont terminées.";
    subtitle = "Ajoute la prochaine quand tu veux, ta progression repartira de là.";
    action = "Ajouter une révision";
  }

  return (
    <div className="home">
      <section className="hero">
        <p className="hero-date">{TODAY}</p>
        <h1>{headline}</h1>
        <p className="hero-sub">{subtitle}</p>

        {total > 0 && (
          <div className="home-progress">
            <ProgressBar
              percent={percent}
              label={`${done} sur ${plural(total, "révision")} terminée${done > 1 ? "s" : ""}`}
            />
          </div>
        )}

        <div className="hero-actions">
          <Link to="/revisions" className="btn btn-primary">{action}</Link>
          <Link to="/ressources" className="btn btn-outline-primary">Chercher une ressource</Link>
        </div>
      </section>

      <section className="stats-grid" aria-label="Mon activité">
        <StatCard value={nbFavoris} label={nbFavoris > 1 ? "ressources en favoris" : "ressource en favoris"} />
        <StatCard value={inProgress} label={inProgress > 1 ? "révisions en cours" : "révision en cours"} />
        <StatCard value={done} label={done > 1 ? "révisions terminées" : "révision terminée"} color="stat-done" />
      </section>

      <section>
        <h2 className="section-title">Sommaire</h2>
        <ul className="toc">
          {FEATURES.map((f) => (
            <li key={f.to}>
              <Link to={f.to} className="toc-link">
                <span className="toc-title">{f.title}</span>
                <span className="toc-text">{f.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
