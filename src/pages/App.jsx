import { useState } from 'react'
import './App.css'

function App() {
  const [inputQuestion, setInputQuestion] = useState('')

  function handleGenerateQuiz() {
    console.log('Pergunta digitada:', inputQuestion)
  }

  return (
    <div className="page">
      <header className="hero">
        <div className="hero__badge">Quiz Generator IA</div>

        <h1 className="hero__title">
          Gere um quiz de 10 perguntas com ajuda da IA
        </h1>

        <p className="hero__text">
          Digite um tema, escolha o nível de dificuldade e monte um quiz pronto
          para estudar, revisar conteúdo ou praticar.
        </p>
      </header>

      <main className="layout">
        <section className="card form-card">
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

            <button type="submit" className="btn-primary">
              Gerar quiz com IA
            </button>

            <p className="input-preview">
              Texto digitado: {inputQuestion || 'nada ainda'}
            </p>
          </form>
        </section>

        <aside className="card info-card">
          <div className="section-head">
            <span className="section-head__eyebrow">Como funciona</span>
            <h2>Fluxo da geração</h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step__number">1</div>
              <div>
                <h3>Informe o tema</h3>
                <p>
                  Digite o assunto ou cole a pergunta principal que deseja
                  transformar em quiz.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step__number">2</div>
              <div>
                <h3>Defina o perfil</h3>
                <p>
                  Escolha dificuldade, público e formato das perguntas.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step__number">3</div>
              <div>
                <h3>Receba 10 perguntas</h3>
                <p>
                  A próxima etapa pode mostrar as perguntas, alternativas e
                  gabarito.
                </p>
              </div>
            </div>
          </div>

          <div className="preview">
            <h3>Saída esperada</h3>
            <ul>
              <li>10 perguntas organizadas</li>
              <li>Alternativas prontas</li>
              <li>Estrutura para gabarito</li>
              <li>Conteúdo adaptado ao nível escolhido</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App