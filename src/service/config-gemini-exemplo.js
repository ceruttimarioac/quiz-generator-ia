import { GoogleGenAI } from '@google/genai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

const ai = new GoogleGenAI({
  apiKey,
})

export async function generateQuiz(inputQuestion) {
  if (!apiKey || apiKey.includes('sua_chave_aqui')) {
    throw new Error('Configure sua chave do Gemini no arquivo .env.local para gerar o quiz.')
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `
    Use fontes oficiais e artigos cientificos como base para gerar as perguntas.
    Crie um quiz de 10 perguntas com 5 alternativas, e apenas uma correta, sobre: ${inputQuestion}.
    Retorne em português.
    Retorne somente JSON válido, sem markdown e sem texto fora do JSON.
    Em "respostaCorreta", informe exatamente o mesmo texto de uma alternativa.
    Formato:
    [
      {
        "numero": 1,
        "pergunta": "",
        "alternativas": ["", "", "", "", ""],
        "fontes": ["", "", ""],
        "respostaCorreta": "",
        "justificativa": ""
      }
    ]`,
  })

  return response.text
}
