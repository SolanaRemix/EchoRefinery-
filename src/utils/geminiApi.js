/**
 * geminiApi.js
 * Calls Google Gemini API to perform AI sentiment analysis on review text.
 * Falls back to a local keyword-based classifier if the API key is not configured.
 *
 * ⚠️  SECURITY NOTE: VITE_GEMINI_API_KEY is bundled into the client-side JS and
 * is therefore visible to anyone who inspects the built output.  For production,
 * route Gemini requests through a backend / serverless function (e.g. a Firebase
 * Cloud Function or Vercel Edge Function) that keeps the real key server-side and
 * enforces per-user quotas.  At minimum, restrict the key to specific HTTP referrers
 * and set a strict quota in the Google Cloud Console.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Classify sentiment of text using Gemini API.
 * @param {string} text
 * @returns {Promise<'Positive'|'Neutral'|'Negative'>}
 */
export async function analyzeSentiment(text) {
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your-gemini-api-key') {
    return callGemini(text);
  }
  // Fallback: keyword-based classifier for demo mode
  return localSentimentFallback(text);
}

async function callGemini(text) {
  const prompt = `Classify the sentiment of the following customer review as exactly one of: Positive, Neutral, or Negative. Reply with only the single word.

Review: "${text}"`;

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 10, temperature: 0 },
      }),
    });

    if (!response.ok) {
      console.warn('Gemini API error, falling back to local classifier');
      return localSentimentFallback(text);
    }

    const data = await response.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
    if (['Positive', 'Neutral', 'Negative'].includes(raw)) return raw;
    return localSentimentFallback(text);
  } catch {
    return localSentimentFallback(text);
  }
}

/**
 * Lightweight keyword-based sentiment classifier for demo / offline mode.
 */
function localSentimentFallback(text) {
  const lower = text.toLowerCase();
  const positiveWords = [
    'great', 'excellent', 'amazing', 'love', 'fantastic', 'wonderful',
    'best', 'perfect', 'outstanding', 'helpful', 'friendly', 'awesome',
    'recommend', 'happy', 'pleased', 'good', 'nice', 'beautiful', 'delicious',
  ];
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'disappointed',
    'poor', 'rude', 'slow', 'wrong', 'disgusting', 'unacceptable', 'never',
    'waste', 'avoid', 'problem', 'broken', 'missing', 'cold', 'dirty',
  ];

  let score = 0;
  positiveWords.forEach((w) => { if (lower.includes(w)) score += 1; });
  negativeWords.forEach((w) => { if (lower.includes(w)) score -= 1; });

  if (score > 0) return 'Positive';
  if (score < 0) return 'Negative';
  return 'Neutral';
}
