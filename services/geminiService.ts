import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from '../types';

/**
 * Gemini API client helper.
 * Vite handles environment variables via the define block in vite.config.ts
 */
const getClient = () => {
  // Accessing the key defined in your vite.config.ts
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined") {
    console.warn("CRITICAL: GEMINI_API_KEY is missing. AI Analysis will return mock data.");
    return null;
  }
  
  return new GoogleGenAI(apiKey);
};

export const analyzeImage = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const genAI = getClient();
    
    // If no API key, return a specific error message instead of crashing
    if (!genAI) {
      return {
        description: "CONNECTION OFFLINE. Please set GEMINI_API_KEY in your Vercel Environment Variables to enable Neural Analysis.",
        threatLevel: "UNKNOWN",
        tags: ["OFFLINE", "NO_API_KEY"]
      };
    }

    // Remove the data URL prefix (e.g., "data:image/png;base64,")
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    // Using gemini-1.5-flash for faster response and stability
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a futuristic cyberpunk security AI named CyberAscii. 
      Analyze this visual feed of a person or object. 
      Provide a brief, robotic assessment (max 2 sentences).
      Determine a 'Threat Level' (LOW, MODERATE, HIGH, or CRITICAL).
      Extract 3-5 short identifier tags.
      
      Respond STRICTLY in JSON format following this schema:
      {
        "description": "string",
        "threatLevel": "string",
        "tags": ["string", "string"]
      }
    `;

    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { mimeType: "image/png", data: cleanBase64 } }
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Attempt to parse JSON from the response
    try {
      // Find JSON if model wraps it in markdown blocks
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : text;
      return JSON.parse(jsonStr) as AnalysisResult;
    } catch (parseError) {
      console.error("JSON Parse Error:", text);
      throw new Error("Invalid AI response format");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      description: "NEURAL LINK INTERRUPTED. System encountered an unexpected data packet. Retry initiated.",
      threatLevel: "ERROR",
      tags: ["DATA_CORRUPTION", "LINK_ERROR"]
    };
  }
};
