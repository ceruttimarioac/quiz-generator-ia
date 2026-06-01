import { useEffect, useRef, useState } from 'react';
import '../../css/style.css';
import { GeneratorQuiz } from '../../Service/config-gemini';

function App() {
  const [tema, setTema] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const resultadoRef = useRef(null);

  useEffect(() => {
    if (mostrarResultado && resultadoRef.current) {
      resultadoRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [mostrarResultado]);

  async function handleSubmit(e) {
    e.preventDefault();

    setErro('');
    setLoading(true);
    setQuiz([]);
    setRespostas({});
    setMostrarResultado(false);

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

  function selecionarResposta(numeroPergunta, alternativa) {
    if (mostrarResultado) return;

    setRespostas({
      ...respostas,
      [numeroPergunta]: alternativa
    });
  }

  function finalizarQuiz() {
    setMostrarResultado(true);
  }

  function gerarNovoQuiz() {
    setQuiz([]);
    setRespostas({});
    setMostrarResultado(false);
    setTema('');
  }

  const totalPerguntas = quiz.length;
  const totalRespondidas = Object.keys(respostas).length;
  const progresso = totalPerguntas > 0 ? (totalRespondidas / totalPerguntas) * 100 : 0;
  const totalAcertos = quiz.filter(
    (item) => respostas[item.num_question] === item.correct_alternative
  ).length;
  const podeFinalizar = totalPerguntas > 0 && totalRespondidas === totalPerguntas;

  return (
    <main className="pagina">
      <section className="conteudo">
        <section className="cabecalho">
          <p className="etiqueta">Quiz com inteligencia artificial</p>
          <h1>Gerador de Quiz</h1>
          <p className="descricao">
            Digite um tema e gere perguntas com alternativas, resposta correta,
            justificativa e fonte.
          </p>
        </section>

        <form className="formulario" onSubmit={handleSubmit}>
          <label htmlFor="tema">Tema do quiz</label>
          <div className="campo-busca">
            <input
              id="tema"
              type="text"
              placeholder="Ex: sistema solar, historia do Brasil, biologia"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Gerando...' : 'Gerar quiz'}
            </button>
          </div>
        </form>

        {erro && <p className="mensagem-erro">{erro}</p>}

        {loading && <p className="mensagem-carregando">Montando perguntas...</p>}

        {quiz.length > 0 && (
          <section>
            <section className="barra-status">
              <p>
                Progresso: {totalRespondidas} de {totalPerguntas} perguntas
              </p>
              <div className="barra-progresso">
                <div style={{ width: `${progresso}%` }}></div>
              </div>
            </section>

            {mostrarResultado && (
              <section className="resultado-final" ref={resultadoRef}>
                <h2>Resultado final</h2>
                <p>
                  Voce acertou <strong>{totalAcertos}</strong> de{' '}
                  <strong>{totalPerguntas}</strong> perguntas.
                </p>
                <button type="button" onClick={gerarNovoQuiz}>
                  Gerar novo quiz
                </button>
              </section>
            )}

            <section className="lista-quiz">
              {quiz.map((item) => {
                const respostaSelecionada = respostas[item.num_question];
                const acertou = respostaSelecionada === item.correct_alternative;

                return (
                  <article key={item.num_question} className="cartao-pergunta">
                    <h2>
                      {item.num_question}. {item.question}
                    </h2>

                    <ul className="alternativas">
                      {item.alternatives.map((alt, index) => {
                        let classeAlternativa = '';

                        if (respostaSelecionada === alt) {
                          classeAlternativa = 'selecionada';
                        }

                        if (mostrarResultado && alt === item.correct_alternative) {
                          classeAlternativa = 'correta';
                        }

                        if (
                          mostrarResultado &&
                          respostaSelecionada === alt &&
                          alt !== item.correct_alternative
                        ) {
                          classeAlternativa = 'errada';
                        }

                        return (
                          <li key={index}>
                            <button
                              type="button"
                              className={classeAlternativa}
                              onClick={() => selecionarResposta(item.num_question, alt)}
                            >
                              {alt}
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    {mostrarResultado && (
                      <section className="resumo-resposta">
                        <p>
                          <strong>Sua resposta:</strong>{' '}
                          {respostaSelecionada || 'Nao respondida'}
                        </p>
                        <p>
                          <strong>Status:</strong> {acertou ? 'Correta' : 'Incorreta'}
                        </p>
                        <p><strong>Resposta correta:</strong> {item.correct_alternative}</p>
                        <p><strong>Justificativa:</strong> {item.justification}</p>
                        <p><strong>Fonte:</strong> {item.sources}</p>
                      </section>
                    )}
                  </article>
                );
              })}
            </section>

            {!mostrarResultado && (
              <section className="acoes-quiz">
                <button type="button" onClick={finalizarQuiz} disabled={!podeFinalizar}>
                  Finalizar quiz
                </button>
                {!podeFinalizar && (
                  <p>Responda todas as perguntas para finalizar.</p>
                )}
              </section>
            )}
          </section>
        )}
      </section>
    </main>
  );
}

export default App;
