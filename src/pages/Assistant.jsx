import { useState } from "react";
import QuestionForm from "../components/QuestionForm";
import AnswerBox from "../components/AnswerBox";
import { askAI } from "../services/aiService";
import "../styles/assistant.css";

// Exemples de questions proposées à l'étudiant (un clic remplit le champ).
const SUGGESTIONS = [
  "Quelle est la différence entre props et state en React ?",
  "Quel est le rôle des dépendances dans useEffect ?",
  "Pourquoi faut-il une key quand on utilise map() ?",
];

// Page /assistant : assistant pédagogique IA en Questions / Réponses (Module 4).
export default function Assistant() {
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState(""); // question de la dernière réponse
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Envoi de la question à l'API (fonction asynchrone).
  async function handleAsk() {
    const q = question.trim();
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const text = await askAI(q);
      setAnswer(text);
      setAskedQuestion(q);
      setQuestion(""); // vide le champ après une réponse réussie
    } catch (err) {
      // TypeError = fetch n'a pas pu joindre le serveur (pas d'internet, serveur injoignable).
      if (err instanceof TypeError) {
        setError("Impossible de contacter l'assistant. Vérifie ta connexion internet et réessaie.");
      } else {
        setError(err.message);
      }
    } finally {
      // Exécuté dans tous les cas (succès ou erreur) : fin du chargement.
      setLoading(false);
    }
  }

  return (
    <div className="assistant">
      <header className="page-header">
        <h1>Assistant IA</h1>
        <p>Pose une question sur une notion de programmation ou de cours.</p>
      </header>

      <div className="assistant-layout">
        <div>
          <QuestionForm
            question={question}
            onChange={setQuestion}
            onSubmit={handleAsk}
            loading={loading}
          />

          <div className="suggestions">
            <p>Idées de questions :</p>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="suggestion"
                onClick={() => setQuestion(s)}
                disabled={loading}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <AnswerBox loading={loading} error={error} answer={answer} question={askedQuestion} />
      </div>
    </div>
  );
}
