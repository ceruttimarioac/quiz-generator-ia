import { useState } from 'react';
import './App.css';
import { GeneratorQuiz } from '../../Service/config-gemini';

function App() {
  const [tema, setTema] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    setErro('');
    setLoading(true);
    setQuiz([]);

    try {
      const resultado = await GeneratorQuiz(tema);
      setQuiz(resultado);
    } catch (error) {
      setErro('Erro ao gerar quiz.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>Gerador QUIZ</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o tema e preferências"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Gerando...' : 'Gerar'}
        </button>
      </form>

      {erro && <p>{erro}</p>}

      {quiz.length > 0 && (
        <div className="quiz-list">
          {quiz.map((item) => (
            <div key={item.num_question} className="card-question">
              <h2>
                {item.num_question}. {item.question}
              </h2>

              <ul>
                {item.alternatives.map((alt, index) => (
                  <li key={index}>{alt}</li>
                ))}
              </ul>

              <p><strong>Resposta correta:</strong> {item.correct_alternative}</p>
              <p><strong>Justificativa:</strong> {item.justification}</p>
              <p><strong>Fonte:</strong> {item.sources}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;