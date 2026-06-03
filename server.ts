import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to avoid crashes if API key is not present initially
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required but missing");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API endpoint for Dessert Sommelier recommendation engine
app.post("/api/sommelier", async (req, res) => {
  try {
    const { prompt, language, catalog } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const currentLanguage = language === "es" ? "es" : "en";

    // System instruction to guide the dessert sommelier's persona and logic
    const systemInstruction = 
      `You are the noble and expert custom Dessert Sommelier ("Repostero Sommelier") for 'Ayda - Pedacito de Cielo', an elite boutique Peruvian confectionery. ` +
      `Your goal is to suggest up to 3 perfect desserts from our menu catalog based on the user's occasion, mood, tastes, budget, or pairings. ` +
      `Explain your recommendations in a warm, sophisticated, highly elegant, yet short and poetic tone (one or two sentences per item). ` +
      `CRITICAL REQUIREMENT: You MUST ONLY recommend existing dessert IDs that appear in the catalog list below. NEVER invent or hallucinate new products, recipes, or names. ` +
      `If the prompt is empty or general, recommend our signature items (chocotejas, alfajores, suspiro). ` +
      `You must reply in the selected language: "${currentLanguage === 'en' ? 'English' : 'Spanish'}" (both the explanation and text).`;

    const userPrompt = 
      `CATALOG:\n${JSON.stringify(catalog, null, 2)}\n\n` +
      `USER STATUS / PREFERENCE / OCCASION:\n"${prompt}"\n\n` +
      `Please recommend up to 3 desserts as a JSON array of objects with "id" and "reason" keys. Your output must strictly match the following JSON schema. No additional text outside JSON.`;

    try {
      const ai = getGemini();

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { 
                  type: Type.STRING,
                  description: "The matching dessert ID from the catalog, which MUST be one of: 'chocotejas', 'alfajores', 'suspiro', 'crema_volteada', 'mazamorra_arroz', 'guargueros'." 
                },
                reason: { 
                  type: Type.STRING, 
                  description: `A warm, elegant, poetic, and on-brand explanation in ${currentLanguage === 'en' ? 'English' : 'Spanish'} detailing why this matches their preferences perfectly.` 
                }
              },
              required: ["id", "reason"]
            }
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Empty response from Gemini model");
      }

      const parsed = JSON.parse(text);
      return res.json({ recommendations: parsed });

    } catch (apiError: any) {
      console.error("Gemini API Error:", apiError);
      return res.status(500).json({ 
        error: "Internal Gemini recommendation failed", 
        details: apiError?.message || String(apiError) 
      });
    }

  } catch (err: any) {
    console.error("Server error handling request:", err);
    return res.status(500).json({ error: "Server handler exception", details: err?.message || String(err) });
  }
});

// Setup dev/prod servers
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer().catch((e) => {
  console.error("Failed to boot server:", e);
});
