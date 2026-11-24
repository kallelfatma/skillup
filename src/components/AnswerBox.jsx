// Encadré qui affiche l'état de la réponse : chargement, erreur ou texte de l'IA.
// Props : loading (bool), error (texte ou ""), answer (texte ou ""), question (texte posé)
export default function AnswerBox({ loading, error, answer, question }) {
  if (loading) {
    return (
      <div className="answer-box panel loading">
        <span className="spinner" aria-hidden="true" />
        <p>L'assistant réfléchit...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="answer-box panel error-box" role="alert">
        <strong>Oups !</strong>
        <p>{error}</p>
      </div>
    );
  }

  if (!answer) {
    return (
      <div className="answer-box panel placeholder">
        <p>La réponse de l'assistant s'affichera ici.</p>
      </div>
    );
  }

  return (
    <div className="answer-box panel">
      <p className="asked">Question : {question}</p>
      {/* Texte brut renvoyé par le modèle ; white-space: pre-wrap garde les retours à la ligne */}
      <div className="answer-text">{answer}</div>
    </div>
  );
}
