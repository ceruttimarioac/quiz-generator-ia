import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import { generateQuiz } from '../service/config-gemini'

function App() {
  const [inputQuestion, setInputQuestion] = useState('')
  const [quiz, setQuiz] = useState(null)
  const [rawQuiz, setRawQuiz] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [openJustifications, setOpenJustifications] = useState({})
  const [showResultModal, setShowResultModal] = useState(false)
  const [showWorkflow, setShowWorkflow] = useState(false)

  async function handleGenerateQuiz() {
    const question = inputQuestion.trim()

    setError('')
    setQuiz(null)
    setRawQuiz('')
    resetQuizProgress()

    if (!question) {
      setError('Digite um tema antes de gerar o quiz.')
      return
    }

    try {
      setIsLoading(true)
      const response = await generateQuiz(question)
      const parsedQuiz = parseQuizResponse(response)

      if (parsedQuiz) {
        setQuiz(parsedQuiz)
      } else {
        setRawQuiz(response)
      }
    } catch (err) {
      console.error(err)
      setError(err.message || 'Não foi possível gerar o quiz. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  function parseQuizResponse(response) {
    try {
      return JSON.parse(response)
    } catch {
      const jsonMatch = response.match(/\[[\s\S]*\]/)

      if (!jsonMatch) {
        return null
      }

      try {
        return JSON.parse(jsonMatch[0])
      } catch {
        return null
      }
    }
  }

  function resetQuizProgress() {
    setSelectedAnswers({})
    setIsConfirmed(false)
    setOpenJustifications({})
    setShowResultModal(false)
  }

  function handleSelectAnswer(questionIndex, alternative) {
    if (isConfirmed) {
      return
    }

    setSelectedAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionIndex]: alternative,
    }))
  }

  function handleConfirmAnswers() {
    if (!quiz) {
      return
    }

    if (answeredCount < quiz.length) {
      const missingQuestions = quiz
        .map((question, index) => ({
          number: question.numero || index + 1,
          isAnswered: Boolean(selectedAnswers[index]),
        }))
        .filter((question) => !question.isAnswered)
        .map((question) => question.number)

      setError(`Antes de finalizar, responda a(s) questão(ões): ${missingQuestions.join(', ')}.`)
      return
    }

    setError('')
    setIsConfirmed(true)
    setShowResultModal(true)
  }

  function handleTryAgain() {
    resetQuizProgress()
    setError('')
  }

  function handleNewQuiz() {
    setInputQuestion('')
    setQuiz(null)
    setRawQuiz('')
    setError('')
    resetQuizProgress()
  }

  function toggleJustification(questionIndex) {
    setOpenJustifications((currentJustifications) => ({
      ...currentJustifications,
      [questionIndex]: !currentJustifications[questionIndex],
    }))
  }

  function closeResultModal() {
    setShowResultModal(false)
  }

  function normalizeAnswer(answer) {
    return String(answer || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  function isCorrectAnswer(question, selectedAnswer) {
    return normalizeAnswer(selectedAnswer) === normalizeAnswer(question.respostaCorreta)
  }

  function getAlternativeIndex(question, answer) {
    return question.alternativas?.findIndex((alternative) => {
      return normalizeAnswer(alternative) === normalizeAnswer(answer)
    })
  }

  const answeredCount = quiz ? Object.keys(selectedAnswers).length : 0
  const score = quiz
    ? quiz.reduce((total, question, index) => {
        return total + (isCorrectAnswer(question, selectedAnswers[index]) ? 1 : 0)
      }, 0)
    : 0
  const progressPercent = quiz ? Math.round((answeredCount / quiz.length) * 100) : 0
  const scorePercent = quiz ? Math.round((score / quiz.length) * 100) : 0
  const performance = getPerformanceSummary(scorePercent)

  function getPerformanceSummary(percent) {
    if (percent >= 80) {
      return {
        label: 'Excelente desempenho',
        text: 'Você dominou muito bem o conteúdo deste quiz.',
        modifier: 'excellent',
      }
    }

    if (percent >= 60) {
      return {
        label: 'Bom desempenho',
        text: 'Você foi bem, mas ainda pode revisar alguns pontos.',
        modifier: 'good',
      }
    }

    return {
      label: 'Revise o conteúdo',
      text: 'Use as justificativas para reforçar os temas em que teve dificuldade.',
      modifier: 'review',
    }
  }

  useEffect(() => {
    document.body.classList.toggle('modal-open', showResultModal)

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [showResultModal])

  return (
    <div className="page">
      <header className="app-header">
        <a className="brand" href="#gerar-quiz">
          <span>QG</span>
          Quiz Generator IA
        </a>

        <nav className="header-actions" aria-label="Navegação principal">
          <button onClick={() => setShowWorkflow((current) => !current)} type="button">
            Como funciona
          </button>
          <a href="#gerar-quiz">Gerar quiz</a>
          {quiz && <a href="#quiz-gerado">Responder</a>}
        </nav>
      </header>

      <header className="hero">
        <div className="hero__badge">Quiz com IA</div>

        <h1 className="hero__title">
          Gere um quiz de 10 perguntas com ajuda da IA
        </h1>

        <p className="hero__text">
          Digite um tema, escolha o nível de dificuldade e monte um quiz pronto
          para estudar, revisar conteúdo ou praticar.
        </p>
      </header>

      <main className="layout">
        <section className="card form-card" id="gerar-quiz">
          {showWorkflow && (
            <section className="workflow-panel" id="como-funciona">
              <div className="workflow-panel__item">
                <span>1</span>
                <p><strong>Informe o tema</strong> que deseja transformar em perguntas.</p>
              </div>
              <div className="workflow-panel__item">
                <span>2</span>
                <p><strong>Responda o quiz</strong> selecionando uma alternativa por questão.</p>
              </div>
              <div className="workflow-panel__item">
                <span>3</span>
                <p><strong>Confira o gabarito</strong> com acertos, erros e justificativas.</p>
              </div>
            </section>
          )}

          <div className="section-head">
            <span className="section-head__eyebrow">Entrada</span>
            <h2>Descreva o assunto do quiz</h2>
            <p>
              Escreva o tema que a IA deve usar para criar 10 perguntas.
            </p>
          </div>

          <form
            className="quiz-form"
            onSubmit={(e) => {
              e.preventDefault()
              handleGenerateQuiz()
            }}
          >
            <label className="field">
              <span>Tema ou pergunta principal</span>
              <textarea
                placeholder="Ex: Crie um quiz de 10 perguntas sobre Revolução Francesa para alunos do ensino médio."
                rows="6"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
              ></textarea>
            </label>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Gerando...' : 'Gerar quiz com IA'}
            </button>

            {error && <p className="feedback feedback--error">{error}</p>}

          </form>

          {quiz && (
            <section className="quiz-result" id="quiz-gerado" aria-live="polite">
              <div className="quiz-result__head">
                <div>
                  <span className="section-head__eyebrow">Quiz gerado</span>
                  <h2>Selecione as respostas</h2>
                </div>

                <div className="quiz-status">
                  {answeredCount} de {quiz.length} respondidas
                </div>
              </div>

              <div className="progress-panel" aria-label="Progresso do quiz">
                <div className="progress-panel__text">
                  <strong>Questão {answeredCount} de {quiz.length} respondida</strong>
                  <span>{progressPercent}% concluído</span>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${progressPercent}%` }}></span>
                </div>
              </div>

              <div className="questions">
                {quiz.map((question, index) => (
                  <article
                    className="question"
                    key={`${question.numero}-${index}`}
                  >
                    <h3>
                      {question.numero || index + 1}. {question.pergunta}
                    </h3>

                    <div className="alternatives" role="group" aria-label="Alternativas">
                      {question.alternativas?.map((alternative, alternativeIndex) => (
                        <button
                          className={`alternative ${
                            selectedAnswers[index] === alternative ? 'alternative--selected' : ''
                          }`}
                          disabled={isConfirmed}
                          key={alternative}
                          onClick={() => handleSelectAnswer(index, alternative)}
                          type="button"
                        >
                          <span>{String.fromCharCode(65 + alternativeIndex)}</span>
                          {alternative}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="quiz-actions">
                {!isConfirmed ? (
                  <button
                    className="btn-primary"
                    disabled={answeredCount < quiz.length}
                    onClick={handleConfirmAnswers}
                    type="button"
                  >
                    Confirmar respostas
                  </button>
                ) : (
                  <>
                    <button className="btn-secondary" onClick={closeResultModal} type="button">
                      Rever respostas
                    </button>
                    <button className="btn-primary" onClick={() => setShowResultModal(true)} type="button">
                      Ver resultado
                    </button>
                  </>
                )}
              </div>
            </section>
          )}

          {showResultModal && quiz && createPortal(
            <div className="modal-backdrop" role="presentation">
              <section
                aria-labelledby="result-title"
                aria-modal="true"
                className="result-modal"
                role="dialog"
              >
                <div className="result-modal__head">
                  <div>
                    <span className="section-head__eyebrow">Gabarito</span>
                    <h2 id="result-title">Resultado final</h2>
                    <p>
                      Você acertou {score} de {quiz.length} perguntas.
                    </p>
                  </div>

                  <button
                    aria-label="Fechar resultado"
                    className="modal-close"
                    onClick={closeResultModal}
                    type="button"
                  >
                    X
                  </button>
                </div>

                <div className="score-panel">
                  <strong>{scorePercent}% de aproveitamento</strong>
                  <span>
                    {score} de {quiz.length} acertos. Abra as justificativas para revisar os pontos principais.
                  </span>
                </div>

                <div className={`performance-card performance-card--${performance.modifier}`}>
                  <strong>{performance.label}</strong>
                  <span>{performance.text}</span>
                </div>

                <section className="answer-sheet" aria-label="Cartão resposta">
                  <div className="answer-sheet__head">
                    <div>
                      <span className="section-head__eyebrow">Cartão-resposta</span>
                      <h3>Resumo das marcações</h3>
                    </div>

                    <div className="answer-sheet__legend">
                      <span><i className="legend-dot legend-dot--correct"></i>Acerto</span>
                      <span><i className="legend-dot legend-dot--wrong"></i>Erro</span>
                      <span><i className="legend-dot legend-dot--answer"></i>Correta</span>
                    </div>
                  </div>

                  <div className="sheet-grid">
                    {quiz.map((question, index) => {
                      const selectedIndex = getAlternativeIndex(question, selectedAnswers[index])
                      const correctIndex = getAlternativeIndex(question, question.respostaCorreta)
                      const questionIsCorrect = isCorrectAnswer(question, selectedAnswers[index])

                      return (
                        <div className="sheet-row" key={`sheet-${question.numero}-${index}`}>
                          <strong>{question.numero || index + 1}</strong>

                          {['A', 'B', 'C', 'D', 'E'].map((letter, alternativeIndex) => {
                            const isSelected = selectedIndex === alternativeIndex
                            const isCorrectAlternative = correctIndex === alternativeIndex

                            return (
                              <span
                                aria-label={`Questão ${question.numero || index + 1}, alternativa ${letter}`}
                                className={`sheet-bubble ${
                                  isSelected && questionIsCorrect ? 'sheet-bubble--correct' : ''
                                } ${
                                  isSelected && !questionIsCorrect ? 'sheet-bubble--wrong' : ''
                                } ${
                                  !isSelected && !questionIsCorrect && isCorrectAlternative
                                    ? 'sheet-bubble--answer'
                                    : ''
                                }`}
                                key={letter}
                                title={`Alternativa ${letter}`}
                              >
                                {letter}
                              </span>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </section>

                <div className="result-list">
                  {quiz.map((question, index) => {
                    const selectedAnswer = selectedAnswers[index]
                    const isCorrect = isCorrectAnswer(question, selectedAnswer)

                    return (
                      <article
                        className={`result-item ${
                          isCorrect ? 'result-item--correct' : 'result-item--wrong'
                        }`}
                        key={`result-${question.numero}-${index}`}
                      >
                        <div className="result-item__head">
                          <h3>
                            {question.numero || index + 1}. {question.pergunta}
                          </h3>
                          <span>{isCorrect ? 'Acertou' : 'Errou'}</span>
                        </div>

                        <p>
                          Sua resposta: <strong>{selectedAnswer}</strong>
                        </p>
                        <p>
                          Gabarito: <strong>{question.respostaCorreta}</strong>
                        </p>

                        <button
                          className="btn-secondary"
                          onClick={() => toggleJustification(index)}
                          type="button"
                        >
                          {openJustifications[index]
                            ? 'Ocultar justificativa'
                            : 'Ver justificativa'}
                        </button>

                        {openJustifications[index] && (
                          <div className="justification">
                            <p>
                              {question.justificativa ||
                                'A IA não retornou uma justificativa para esta pergunta.'}
                            </p>

                            {question.fontes?.length > 0 && (
                              <p className="sources">
                                Fontes: {question.fontes.join(', ')}
                              </p>
                            )}
                          </div>
                        )}
                      </article>
                    )
                  })}
                </div>

                <div className="modal-actions">
                  <button className="btn-secondary" onClick={handleTryAgain} type="button">
                    Refazer quiz
                  </button>
                  <button className="btn-secondary" onClick={handleNewQuiz} type="button">
                    Novo tema
                  </button>
                  <button className="btn-primary" onClick={closeResultModal} type="button">
                    Voltar para o quiz
                  </button>
                </div>
              </section>
            </div>,
            document.body,
          )}

          {rawQuiz && (
            <section className="quiz-result" aria-live="polite">
              <h2>Quiz gerado</h2>
              <pre>{rawQuiz}</pre>
            </section>
          )}
        </section>

      </main>
    </div>
  )
}

export default App
