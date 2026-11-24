import { useState } from "react";

// Valeurs initiales du formulaire (réutilisées pour le réinitialiser après l'ajout).
const EMPTY_FORM = {
  titre: "",
  description: "",
  dateLimite: "",
  statut: "en cours",
};

// Date du jour au format AAAA-MM-JJ (même format que <input type="date">).
function today() {
  return new Date().toISOString().split("T")[0];
}

// Formulaire contrôlé d'ajout de tâche.
// Props : onAdd(tache) -> callback fourni par la page parente (Revisions).
export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Un seul handler pour tous les champs grâce à l'attribut "name".
  // On crée un NOUVEL objet (immutabilité) au lieu de modifier "form".
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Efface l'erreur du champ dès que l'utilisateur le corrige.
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  // Vérifie les champs obligatoires et retourne un objet d'erreurs.
  function validate() {
    const newErrors = {};
    if (form.titre.trim() === "") {
      newErrors.titre = "Le titre est obligatoire.";
    } else if (form.titre.trim().length < 3) {
      newErrors.titre = "Le titre doit contenir au moins 3 caractères.";
    }
    if (form.dateLimite === "") {
      newErrors.dateLimite = "La date limite est obligatoire.";
    } else if (form.dateLimite < today()) {
      newErrors.dateLimite = "La date limite ne peut pas être dans le passé.";
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault(); // empêche le rechargement de la page
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // formulaire invalide

    onAdd({
      id: Date.now().toString(), // identifiant unique et stable (utilisé comme key)
      titre: form.titre.trim(),
      description: form.description.trim(),
      dateLimite: form.dateLimite,
      statut: form.statut,
    });
    setForm(EMPTY_FORM); // vide le formulaire après l'ajout
  }

  return (
    <form className="task-form panel" onSubmit={handleSubmit} noValidate>
      <h2>Nouvelle tâche</h2>

      <div className="field">
        <label htmlFor="titre">Titre *</label>
        <input
          id="titre"
          name="titre"
          type="text"
          value={form.titre}
          onChange={handleChange}
          placeholder="Ex. Réviser les Hooks React"
          className={errors.titre ? "invalid" : ""}
        />
        {errors.titre && <p className="error">{errors.titre}</p>}
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          placeholder="Facultatif"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="dateLimite">Date limite *</label>
          <input
            id="dateLimite"
            name="dateLimite"
            type="date"
            min={today()}
            value={form.dateLimite}
            onChange={handleChange}
            className={errors.dateLimite ? "invalid" : ""}
          />
          {errors.dateLimite && <p className="error">{errors.dateLimite}</p>}
        </div>

        <div className="field">
          <label htmlFor="statut">Statut</label>
          <select id="statut" name="statut" value={form.statut} onChange={handleChange}>
            <option value="en cours">En cours</option>
            <option value="terminée">Terminée</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">Ajouter la tâche</button>
    </form>
  );
}
