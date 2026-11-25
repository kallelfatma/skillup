import { useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import { loadTasks } from "../services/taskStorage";
import { getCoverUrl } from "../services/openLibraryApi";
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

// Livres affichés sur l'étagère tant que l'étudiant n'a pas de favoris.
// Ce sont de vrais livres d'Open Library (id de l'œuvre + id de la couverture).
const CLASSIQUES = [
  { id: "OL15444205W", titre: "Eloquent JavaScript", coverId: 7082166 },
  { id: "OL17618370W", titre: "Clean Code", coverId: 8065615 },
  { id: "OL4781294W", titre: "Introduction to Algorithms", coverId: 2341462 },
  { id: "OL20915214W", titre: "Learning React", coverId: 10282783 },
  { id: "OL5748544W", titre: "The Pragmatic Programmer", coverId: 10143650 },
];

// Hauteurs différentes pour que l'étagère ait l'air vraie.
const HAUTEURS = [0.92, 1, 0.86, 0.95];

// Sommaire des modules de l'application (rendu avec map + key).
const FEATURES = [
  { to: "/ressources", title: "Ressources", text: "Cherche des livres et des cours dans Open Library." },
  { to: "/favoris", title: "Favoris", text: "Retrouve les ressources que tu as gardées." },
  { to: "/revisions", title: "Révisions", text: "Planifie tes révisions et coche celles qui sont faites." },
  { to: "/assistant", title: "Assistant IA", text: "Pose une question de cours et reçois une explication." },
];

// Page / : accueil et aperçu de l'activité (Module 5).
// Props (transmises par App, qui gère l'état des favoris avec le hook useFavoris de Lina) :
//  - favoris : la liste des favoris (pour afficher leurs couvertures sur l'étagère)
//  - nbFavoris : le nombre de favoris
export default function Home({ favoris = [], nbFavoris }) {
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
    headline = "Organise tes révisions, trouve les bons livres.";
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

  // L'étagère montre les favoris (avec couverture) ; sinon des classiques à découvrir.
  const favorisAvecCouverture = favoris.filter((f) => f.coverId).slice(0, 4);
  const aDesFavoris = favorisAvecCouverture.length > 0;
  const livres = aDesFavoris ? favorisAvecCouverture : CLASSIQUES.slice(0, 4);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <p className="hero-date">{TODAY}</p>
          <h1>{headline}</h1>
          <p className="hero-sub">{subtitle}</p>

          <div className="hero-actions">
            <Link to="/revisions" className="btn btn-primary btn-lg">{action}</Link>
            <Link to="/ressources" className="btn btn-outline-primary btn-lg">Chercher un livre</Link>
          </div>
        </div>

        <figure className="shelf">
          <div className="shelf-books">
            {livres.map((livre, i) => (
              <Link
                key={livre.id}
                to={`/ressources/${livre.id}`}
                className="book"
                style={{ "--h": HAUTEURS[i % HAUTEURS.length], animationDelay: `${i * 90}ms` }}
                title={livre.titre}
              >
                <img src={getCoverUrl(livre.coverId, "M")} alt={`Couverture de ${livre.titre}`} />
                {/* Le marque-page jaune dépasse du premier livre */}
                {i === 1 && <span className="book-ribbon" aria-hidden="true" />}
              </Link>
            ))}
          </div>
          <div className="shelf-plank" aria-hidden="true" />
          <figcaption>
            {aDesFavoris ? (
              <>Tes favoris. <Link to="/favoris">Voir les {nbFavoris}</Link></>
            ) : (
              <>Quelques classiques pour commencer. <Link to="/ressources">Explorer le catalogue</Link></>
            )}
          </figcaption>
        </figure>
      </section>

      <section className="activity panel" aria-label="Mon activité">
        <div className="activity-progress">
          <p className="activity-percent">{percent}<span>%</span></p>
          <div className="activity-bar">
            <ProgressBar
              percent={percent}
              label={
                total === 0
                  ? "Aucune révision planifiée"
                  : `${plural(done, "révision")} terminée${done > 1 ? "s" : ""} sur ${total}`
              }
            />
          </div>
        </div>
        <div className="activity-stats">
          <StatCard value={nbFavoris} label={nbFavoris > 1 ? "favoris" : "favori"} color="stat-ribbon" />
          <StatCard value={inProgress} label="en cours" />
          <StatCard value={done} label={done > 1 ? "terminées" : "terminée"} color="stat-done" />
        </div>
      </section>

      <section className="toc-section">
        <h2 className="section-title">Ce que tu peux faire</h2>
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
