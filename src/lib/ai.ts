// AI Service Layer: Abstract LLMService interface and provider selection

// --- INTERFACE ---
export interface LLMService {
  analyzeSubmission(description: string, files: any[], webLink: string): Promise<{
    skill: string;
    effort: string;
    confidence: number;
    summary: string;
    feedback: string;
  }>;
}

// --- IN-MEMORY CACHE & RATE LIMITING ---
const cache = new Map<string, any>();
const rateLimit = new Map<string, { count: number; last: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per window

function getCacheKey(method: string, ...args: any[]) {
  return method + ':' + JSON.stringify(args);
}

export function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(userId) || { count: 0, last: now };
  if (now - entry.last > RATE_LIMIT_WINDOW) {
    rateLimit.set(userId, { count: 1, last: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  rateLimit.set(userId, { count: entry.count + 1, last: entry.last });
  return true;
}

export function getCached(method: string, ...args: any[]) {
  return cache.get(getCacheKey(method, ...args));
}
export function setCached(method: string, value: any, ...args: any[]) {
  cache.set(getCacheKey(method, ...args), value);
}

// --- PROVIDER SELECTION ---
import { GeminiProvider } from '../providers/gemini';
// Add other providers here as needed

const PROVIDERS: Record<string, () => LLMService> = {
  gemini: () => new GeminiProvider(),
  // openai: () => new OpenAIProvider(),
  // claude: () => new ClaudeProvider(),
  // mistral: () => new MistralProvider(),
};

const SELECTED_PROVIDER = process.env.AI_PROVIDER || 'gemini';

export function getLLMService(): LLMService {
  const provider = PROVIDERS[SELECTED_PROVIDER];
  if (!provider) throw new Error(`Unknown AI provider: ${SELECTED_PROVIDER}`);
  return provider();
} 