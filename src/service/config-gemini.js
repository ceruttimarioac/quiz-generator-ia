import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
})

/* Parâmetros da pergunta, e envio do tema solicitado */

export async function generateQuiz(inputQuestion) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `
    Use fontes oficiais e artigos cientificos como base para gerar as perguntas.
    Crie um quiz de 10 perguntas com 5 alternativas, e apenas uma correta, sobre: ${inputQuestion}.
    Retorne em português.
    Formato:
    [
      {
        "numero": "",
        "pergunta": "",
        "alternativas": ["", "", "", ""],
        "fontes": ["", "", ""],
        "respostaCorreta": ""
      }
    ]`,
  })

  return response.text
}