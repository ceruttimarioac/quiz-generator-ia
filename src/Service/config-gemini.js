import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

export async function GeneratorQuiz(input_tema) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',

    contents: `Gere perguntas de quiz sobre: ${input_tema}`,

    config: {
      responseMimeType: 'application/json',

      // REMOVIDO TEMPORARIAMENTE:
      // tools: [{ googleSearch: {} }],
      //
      // Motivo:
      // usar googleSearch junto com responseSchema / JSON estruturado
      // pode gerar erro 400 em alguns casos/modelos.
      // e pode ser a causa de estourar a cota e menos de 6 chamadas do modo gratuito.

      responseSchema: {
        type: Type.ARRAY,
        description: 'Lista de questões do quiz',
        items: {
          type: Type.OBJECT,
          properties: {
            num_question: {
              type: Type.INTEGER, 
              description: 'Número da questão'
            },
            question: {
              type: Type.STRING,
              description: 'Enunciado da pergunta'
            },
            alternatives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'As 4 alternativas da questão'
            },
            correct_alternative: {
              type: Type.STRING,
              description: 'A resposta correta'
            },
            sources: {
              type: Type.STRING,
              description: 'Fontes utilizadas'
            },
            justification: {
              type: Type.STRING,
              description: 'Justificativa da resposta'
            }
          },

          // OPCIONAL, MAS RECOMENDADO:
          // força esses campos a existirem na resposta
          required: [
            'num_question',
            'question',
            'alternatives',
            'correct_alternative',
            'sources',
            'justification'
          ]
        }
      }
    }
  });

  console.log(response.text);
  return JSON.parse(response.text);
}