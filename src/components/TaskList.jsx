import TaskItem from "./TaskItem";

// Affiche la liste (déjà filtrée) des tâches.
// Les callbacks onToggle et onDelete sont simplement transmis à chaque TaskItem.
export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">Aucune tâche à afficher.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // key unique et stable : l'id de la tâche (jamais l'index du tableau)
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
