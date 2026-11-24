// Service de persistance des tâches de révision dans le localStorage.
// La clé est partagée avec la page d'accueil (Module 5) pour afficher les statistiques.
export const TASKS_KEY = "skillup_taches";

// Lit les tâches sauvegardées. Retourne un tableau vide si rien n'est stocké
// ou si le contenu est corrompu (JSON invalide).
export function loadTasks() {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Sauvegarde le tableau complet des tâches (converti en texte JSON).
export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
