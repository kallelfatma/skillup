// Formulaire contrôlé pour poser une question à l'assistant.
// Props :
//  - question   : texte actuel (state géré par la page parente)
//  - onChange   : met à jour la question
//  - onSubmit   : envoie la question
//  - loading    : true pendant l'appel à l'API
export default function QuestionForm({ question, onChange, onSubmit, loading }) {
  // Bouton désactivé si le champ est vide (ou seulement des espaces) OU pendant le chargement.
  const isDisabled = question.trim() === "" || loading;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isDisabled) onSubmit();
  }

  return (
    <form className="question-form panel" onSubmit={handleSubmit}>
      <label htmlFor="question">Ta question</label>
      <textarea
        id="question"
        rows="4"
        value={question}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ex. Quelle est la différence entre props et state en React ?"
        disabled={loading}
      />
      <button type="submit" className="btn btn-primary" disabled={isDisabled}>
        {loading ? "Envoi..." : "Poser la question"}
      </button>
    </form>
  );
}
