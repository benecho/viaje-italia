import { GoogleGenAI, Type } from "@google/genai";
import { TripPlan } from "../types";

const SYSTEM_INSTRUCTION = `
Eres un experto planificador de viajes de lujo y aventura. Tu objetivo es crear itinerarios detallados, lógicos y emocionantes.
Responde SIEMPRE en formato JSON válido siguiendo el esquema proporcionado.
El idioma de respuesta debe ser ESPAÑOL.
Utiliza la herramienta de búsqueda de Google para encontrar información real y actualizada sobre horarios, lugares y restaurantes.
`;

export const generateTripPlan = async (): Promise<TripPlan> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Planifica un viaje detallado de Oporto a Roma y Toscana.
    
    Detalles del viaje:
    - Llegada a Roma: Sábado 9 de mayo a las 13:00 (Vuelo desde Oporto).
    - Regreso desde Florencia: Domingo 17 de mayo a las 10:00 (Vuelo hacia Oporto).
    - Duración: 3.5 días en Roma, luego 3.5 días repartidos entre Florencia, Pisa y zonas naturales de la Toscana (alquiler de coche recomendado para esta parte).
    - Fechas: 9 al 17 de mayo.

    Requisitos:
    - Incluye restaurantes específicos con buenas reseñas.
    - Incluye visitas a sitios naturales increíbles en la Toscana (Val d'Orcia, termas, etc.).
    - Organiza el transporte lógico (ej. tren Roma-Florencia o alquiler de coche al salir de Roma).
    - Para cada actividad, proporciona una palabra clave visual en inglés (imageKeyword) para generar una imagen (ej. "Colosseum Rome", "Tuscany Vineyard").
    - Añade "tips" útiles para el viaje.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tripName: { type: Type.STRING },
          description: { type: Type.STRING },
          estimatedCost: { type: Type.STRING },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                date: { type: Type.STRING },
                dayOfWeek: { type: Type.STRING },
                location: { type: Type.STRING },
                summary: { type: Type.STRING },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      type: { type: Type.STRING, enum: ['sightseeing', 'food', 'transport', 'nature'] },
                      location: { type: Type.STRING },
                      imageKeyword: { type: Type.STRING, description: "A descriptive keyword in English for image generation, e.g. 'Pantheon Rome sunny'" }
                    },
                    required: ['time', 'title', 'description', 'type', 'imageKeyword']
                  }
                }
              },
              required: ['date', 'dayOfWeek', 'location', 'summary', 'activities']
            }
          }
        },
        required: ['tripName', 'description', 'days', 'tips']
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as TripPlan;
  }
  
  throw new Error("No se pudo generar el plan de viaje.");
};