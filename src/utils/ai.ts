import { DessertItem } from '../types';

export interface CatalogItem {
  id: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  price: string;
  ingredients: string[];
  history: string;
  pairing: string;
}

export interface Recommendation {
  id: string;
  reason: string;
}

/**
 * Highly swappable and robust function to call the AI recommendation engine.
 * Supports:
 * - Scenario B: Secure server-side proxy route `/api/sommelier` using Gemini SDK (Best practice, secures key).
 * - Scenario A: Direct client-side Anthropic API fallback with no key (for sandbox environments/Claude artifacts).
 * - Scenario C: Direct client-side Gemini REST API fallback if a key is supplied in the client environment.
 */
export async function getRecommendation(
  userInput: string,
  language: 'en' | 'es',
  catalog: CatalogItem[]
): Promise<Recommendation[]> {
  const isEs = language === 'es';
  
  // 1. Attempt Primary Path: Secure Server-side API Proxy (Scenario B)
  try {
    const response = await fetch('/api/sommelier', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: userInput,
        language,
        catalog,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.recommendations)) {
        return data.recommendations;
      }
    }
  } catch (error) {
    console.warn('Server-side AI proxy was unreachable or failed. Checking client-side fallbacks...', error);
  }

  // 2. Client-side Fallback - Scenario A (For Claude Sandbox or offline artifacts): Call Anthropic directly with zero key
  try {
    const serializedCatalog = catalog.map(item => ({
      id: item.id,
      name: isEs ? item.name.es : item.name.en,
      description: isEs ? item.description.es : item.description.en,
      price: item.price,
      ingredients: item.ingredients,
      history: item.history,
      pairing: item.pairing
    }));

    const promptMessage = `You are the expert Dessert Sommelier of 'Ayda - Pedacito de Cielo'. Recommend up to 3 gourmet desserts matching: "${userInput}".
Selected Language is: ${isEs ? 'Spanish' : 'English'}.
Choose ONLY from this exact catalog list:
${JSON.stringify(serializedCatalog, null, 2)}

Reply ONLY with strict, valid JSON format in a single array of objects containing keys "id" (must match a catalog ID exactly) and "reason" (short poetic reason in ${isEs ? 'Spanish' : 'English'}). No other text or markdown tags outside the json array.`;

    // Attempt direct Anthropic direct call
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: promptMessage }],
      }),
    });

    if (anthropicResponse.ok) {
      const anthropicData = await anthropicResponse.json();
      const contentText = anthropicData?.content?.[0]?.text || '';
      const parsed = parseJSONString(contentText);
      if (parsed && Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (anthropicError) {
    console.warn('Anthropic API direct fallback failed:', anthropicError);
  }

  // 3. Client-side Fallback - Scenario C (Direct Gemini REST Fallback if client key exists):
  try {
    const rawClientKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
    if (rawClientKey) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${rawClientKey}`;
      
      const serializedCatalog = catalog.map(item => ({
        id: item.id,
        name: isEs ? item.name.es : item.name.en,
        description: isEs ? item.description.es : item.description.en,
        price: item.price,
        ingredients: item.ingredients,
        pairing: item.pairing
      }));

      const geminiPrompt = `You are 'Ayda' dessert sommelier. Recommend up to 3 desserts based on: "${userInput}". Explain in ${isEs ? 'Spanish' : 'English'}. Include only valid matches from the catalog: ${JSON.stringify(serializedCatalog)}.
Respond only with a JSON array, no markdown fences: [{"id": "id-here", "reason": "reason-here"}]`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: geminiPrompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const parsed = parseJSONString(responseText);
        if (parsed && Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch (geminiClientError) {
    console.warn('Google Gemini client-side REST call fallback failed:', geminiClientError);
  }

  // 4. Pure Local Fallback Parser if AI Services are completely offline or blocked:
  return getLocalHeuristicRecommendation(userInput, isEs, catalog);
}

/**
 * Safely parses any text containing JSON (including stripping markdown codeblocks).
 */
function parseJSONString(text: string): any {
  let cleaned = text.trim();
  // Strip Markdown JSON codeblocks if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, '').replace(/```$/, '').trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse model response:', cleaned, e);
    return null;
  }
}

/**
 * Intelligent client-side search heuristic when model fails, key is missing, or rate-limited.
 */
function getLocalHeuristicRecommendation(
  userInput: string,
  isEs: boolean,
  catalog: CatalogItem[]
): Recommendation[] {
  const query = userInput.toLowerCase();
  
  // Scenarios/keywords mapping to catalog ids
  const matches: { id: string; reasonEn: string; reasonEs: string }[] = [];

  if (query.includes('chocolate') || query.includes('choc') || query.includes('cacao') || query.includes('regalo') || query.includes('gift') || query.includes('box')) {
    matches.push({
      id: 'chocotejas',
      reasonEn: 'Our signature Chocotejas offer luxurious 70% dark chocolate and full roasted pecans, packing sweet heritage in a beautiful giftable carton.',
      reasonEs: 'Nuestras Chocotejas artesanales destacan por su chocolate oscuro al 70% y pecanas enteras, perfectas en cajas elegantes para obsequio.'
    });
  }

  if (query.includes('sweet') || query.includes('dulce') || query.includes('meringue') || query.includes('merengue') || query.includes('port') || query.includes('oporto') || query.includes('wine')) {
    matches.push({
      id: 'suspiro',
      reasonEn: "This classic 'Sigh of a Lima Lady' combines slow-cooked caramel with a light port wine meringue for a delightfully sweet traditional experience.",
      reasonEs: 'El clásico Suspiro de Limeña acaricia el paladar con su sedosa base de manjar de yemas y merengue perfumado al Oporto.'
    });
  }

  if (query.includes('coffee') || query.includes('café') || query.includes('tea') || query.includes('té') || query.includes('soft') || query.includes('melt') || query.includes('suave')) {
    matches.push({
      id: 'alfajores',
      reasonEn: 'Our delicate cornstarch Alfajores offer a crumbly, melt-in-your-mouth texture that pairs spectacularly with light coffees or warm herbal teas.',
      reasonEs: 'Los finos e impalpables Alfajores tradicionales se deshacen tiernamente en la boca, siendo los mejores acompañantes de un buen café.'
    });
  }

  if (query.includes('custard') || query.includes('flan') || query.includes('crema') || query.includes('caramel') || query.includes('smooth')) {
    matches.push({
      id: 'crema_volteada',
      reasonEn: 'The Crema Volteada features an intensely smooth condensed-milk base flooded in golden amber-caramel, fulfilling custard cravings nicely.',
      reasonEs: 'La Crema Volteada ofrece una caricia tersa con su cremosa receta a base de leche y almíbar de caramelo reluciente.'
    });
  }

  if (query.includes('rice")') || query.includes('purple') || query.includes('combinado') || query.includes('arroz') || query.includes('mazamorra')) {
    matches.push({
      id: 'mazamorra_arroz',
      reasonEn: 'El Combinado delivers the dynamic stadium-popular split bowl of warm purple corn pudding juxtaposed against creamy rich rice pudding.',
      reasonEs: 'El Combinado Clásico une la Mazamorra Morada con el Arroz con leche, aunando dulzores profundos de Lima antigua en un solo platillo.'
    });
  }

  if (query.includes('crunch') || query.includes('crisp') || query.includes('pastry') || query.includes('frito') || query.includes('sur')) {
    matches.push({
      id: 'guargueros',
      reasonEn: 'These crispy fried egg-yolk funnels bubble with Pisco aromatics, filled with luscious manjarblanco for a crunchy artisanal delight.',
      reasonEs: 'Nuestros Guargueros crujientes se fríen con un sutil soplo de pisco Quebranta y se rellenan con manjar blanco de olla casera.'
    });
  }

  // Fallback default list if no keywords match
  if (matches.length === 0) {
    return [
      {
        id: 'chocotejas',
        reason: isEs 
          ? 'Nuestro bombón estrella de cacao al 70%, pecana selecta y manjarblanco de olla peruano.' 
          : 'Our star hand-painted shell of 70% dark chocolate protecting toasted pecan and smooth caramel.'
      },
      {
        id: 'alfajores',
        reason: isEs 
          ? 'Finos alfajores de maicena artesanales que se evaporan mágicamente en el paladar.' 
          : 'Delicate traditional cornstarch biscuits filled with rich, golden slow-cooked milk caramel.'
      }
    ];
  }

  return matches.map(m => ({
    id: m.id,
    reason: isEs ? m.reasonEs : m.reasonEn
  }));
}
