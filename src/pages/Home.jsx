import { useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import { loadTasks } from "../services/taskStorage";
import "../styles/home.css";

// Présentation des modules de l'application (rendus avec map + key).
const FEATURES = [
  {
    to: "/ressources",
    icon: "📚",
    title: "Ressources",
    text: "Recherche des livres et ressources d'étude grâce à l'API Open Library.",
  },
  {
    to: "/favoris",
    icon: "⭐",
    title: "Favoris",
    text: "Garde tes ressources prioritaires pour les retrouver rapidement.",
  },
  {
    to: "/revisions",
    icon: "📝",
    title: "Révisions",
    text: "Planifie tes tâches de révision et suis ta progression.",
  },
  {
    to: "/assistant",
    icon: "🤖",
    title: "Assistant IA",
    text: "Pose tes questions et obtiens des explications claires.",
  },
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
  const percent = tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100);
  const stats = { favorites: nbFavoris, inProgress, done };

  return (
    <div className="home">
      <section className="hero">
        <h1>
          Bienvenue sur <span className="brand">SkillUp</span>
        </h1>
        <p>
          L'application qui t'aide à trouver des ressources d'étude, organiser tes révisions
          et comprendre les notions difficiles grâce à un assistant IA.
        </p>
        <div className="hero-actions">
          <Link to="/ressources" className="btn btn-light btn-lg">Explorer les ressources</Link>
          <Link to="/revisions" className="btn btn-outline-light btn-lg">Planifier mes révisions</Link>
        </div>
      </section>

      <section>
        <h2 className="section-title">Mon activité</h2>
        <div className="stats-grid">
          <StatCard icon="⭐" value={stats.favorites} label="Favoris" color="stat-yellow" />
          <StatCard icon="⏳" value={stats.inProgress} label="Tâches en cours" color="stat-blue" />
          <StatCard icon="✅" value={stats.done} label="Tâches terminées" color="stat-green" />
          <StatCard icon="📈" value={`${percent}%`} label="Progression" color="stat-purple" />
        </div>
        <div className="panel home-progress">
          <ProgressBar percent={percent} label="Progression globale des révisions" />
        </div>
      </section>

      <section>
        <h2 className="section-title">Que peux-tu faire ?</h2>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <Link key={f.to} to={f.to} className="feature panel">
              <span className="feature-icon" aria-hidden="true">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
