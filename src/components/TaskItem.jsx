// Affiche une seule tâche avec ses actions.
// Props :
//  - task      : la tâche à afficher
//  - onToggle  : callback pour basculer le statut (En cours <-> Terminée)
//  - onDelete  : callback pour supprimer la tâche
export default function TaskItem({ task, onToggle, onDelete }) {
  const isDone = task.statut === "terminée";
  const dateFr = new Date(task.dateLimite + "T00:00").toLocaleDateString("fr-FR");

  return (
    <li className={`task-item ${isDone ? "done" : ""}`}>
      <div className="task-info">
        <h3>{task.titre}</h3>
        {task.description && <p className="task-desc">{task.description}</p>}
        <p className="task-meta">
          Échéance : {dateFr}
          <span className={`badge ${isDone ? "badge-done" : "badge-progress"}`}>
            {isDone ? "Terminée" : "En cours"}
          </span>
        </p>
      </div>

      <div className="task-actions">
        <button className="btn btn-sm btn-outline-primary" onClick={() => onToggle(task.id)}>
          {isDone ? "Remettre en cours" : "Marquer terminée"}
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(task.id)}>
          Supprimer
        </button>
      </div>
    </li>
  );
}
