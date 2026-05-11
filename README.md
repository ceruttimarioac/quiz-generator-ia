# Quiz Generator IA

Aplicacao web criada com React + Vite para gerar quizzes automaticamente usando a API do Gemini.

O usuario informa um tema, a IA gera perguntas com alternativas, e a interface permite responder o quiz, acompanhar o progresso, conferir o gabarito e revisar as justificativas.

## Funcionalidades

- Geracao de quiz a partir de um tema
- Perguntas com 5 alternativas
- Selecao de respostas pelo usuario
- Barra de progresso durante o quiz
- Validacao de questoes nao respondidas
- Modal com resultado final
- Cartao-resposta visual
- Indicacao de acertos e erros
- Justificativa para cada questao
- Percentual de aproveitamento
- Opcoes para refazer o quiz ou iniciar um novo tema
- Tema visual em dark mode

## Tecnologias

- React
- Vite
- JavaScript
- CSS
- Gemini API

## Pre-requisitos

Antes de rodar o projeto, instale:

- Node.js
- npm

Tambem e necessario ter uma chave de API do Gemini. Cada usuario deve utilizar a propria chave.

## Configuracao

Instale as dependencias:

```bash
npm install
```

Crie o arquivo local de configuracao do Gemini:

```bash
cp src/service/config-gemini-exemplo.js src/service/config-gemini.js
```

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_GEMINI_API_KEY=sua_chave_do_gemini
```

O arquivo `.env.local` nao deve ser enviado para o GitHub.

## Rodar o projeto

```bash
npm run dev
```

Depois, acesse no navegador:

```text
http://localhost:5173/
```

Ou:

```text
http://127.0.0.1:5173/
```

Nao utilize Live Server para abrir este projeto, pois ele usa React com Vite.

## Build

```bash
npm run build
```

## Seguranca da chave API

Este projeto foi preparado para que cada usuario configure a propria chave do Gemini localmente.

Os seguintes arquivos nao devem ser enviados ao GitHub:

```text
.env.local
src/service/config-gemini.js
dist/
node_modules/
```

Use o arquivo abaixo apenas como modelo:

```text
src/service/config-gemini-exemplo.js
```

Nunca coloque uma chave real diretamente no README, no codigo versionado ou em commits do Git.

## Estrutura principal

```text
src/
  pages/
    App.jsx
    App.css
  service/
    config-gemini-exemplo.js
```
