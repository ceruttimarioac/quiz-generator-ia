# Quiz Generator IA

Projeto React + Vite para gerar quizzes com ajuda da API do Gemini.

## Configuracao

Instale as dependencias:

```bash
npm install
```

Crie o arquivo de configuracao local do Gemini:

```bash
cp src/service/config-gemini-exemplo.js src/service/config-gemini.js
```

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_GEMINI_API_KEY=sua_chave_do_gemini
```

O arquivo `.env.local` e o `src/service/config-gemini.js` real ficam fora do Git para proteger a chave da API.

## Rodar

```bash
npm run dev
```

## Build

```bash
npm run build
```
