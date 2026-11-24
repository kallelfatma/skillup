import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import ProgressBar from "../components/ProgressBar";
import { loadTasks, saveTasks } from "../services/taskStorage";
import "../styles/revisions.css";

// Page /revisions : planification et suivi des révisions (Module 3).
// C'est elle qui possède l'état des tâches ; les composants enfants
// reçoivent les données et les callbacks via les props.
export default function Revisions() {
  // Initialisation paresseuse : loadTasks() n'est appelée qu'au premier rendu.
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState("toutes");

  // À chaque modification de "tasks", on synchronise le localStorage.
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Ajout : nouveau tableau avec l'ancienne liste + la nouvelle tâche (pas de push).
  function addTask(task) {
    setTasks((prev) => [...prev, task]);
  }

  // Suppression : filter() retourne un nouveau tableau sans la tâche (pas de splice).
  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // Bascule du statut : map() retourne un nouveau tableau,
  // et la tâche modifiée est une copie ({ ...t }) avec le nouveau statut.
  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, statut: t.statut === "terminée" ? "en cours" : "terminée" }
          : t
      )
    );
  }

  // Valeurs dérivées : calculées à chaque rendu à partir de "tasks",
  // donc pas besoin de les stocker dans un state.
  const doneCount = tasks.filter((t) => t.statut === "terminée").length;
  const inProgressCount = tasks.length - doneCount;
  const percent = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);

  const visibleTasks =
    filter === "toutes" ? tasks : tasks.filter((t) => t.statut === filter);

  return (
    <div className="revisions">
      <header className="page-header">
        <h1>Mes révisions</h1>
        <p>Planifie tes sessions d'apprentissage et suis ta progression.</p>
      </header>

      <div className="revisions-layout">
        <TaskForm onAdd={addTask} />

        <section className="panel tasks-panel">
          <ProgressBar
            percent={percent}
            label={`${doneCount} / ${tasks.length} tâche(s) terminée(s)`}
          />
          <TaskFilters
            filter={filter}
            onChange={setFilter}
            counts={{ toutes: tasks.length, "en cours": inProgressCount, terminée: doneCount }}
          />
          <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
        </section>
      </div>
    </div>
  );
}
