
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  analyzePaper: async (title: string, abstractHint: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this research paper title and brief context. Provide a more detailed professional abstract and 5 relevant keywords.
        Title: ${title}
        Context: ${abstractHint}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              professionalAbstract: { type: Type.STRING },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["professionalAbstract", "keywords"]
          }
        }
      });
      
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return {
        professionalAbstract: abstractHint,
        keywords: ["Research", "Paper", "Analysis"]
      };
    }
  }
};
