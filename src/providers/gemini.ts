import { LLMService } from "../lib/ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const MAX_RETRIES = 2;

async function callGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error("Gemini API key not set");
  let tries = 0;
  let lastError = null;
  while (tries <= MAX_RETRIES) {
    try {
      const requestBody: any = {
        contents: [{ parts: [{ text: prompt }] }],
      };
      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No text in Gemini response");
      return text.trim();
    } catch (err) {
      lastError = err;
      tries++;
      if (tries > MAX_RETRIES) throw err;
    }
  }
  throw lastError;
}

export class GeminiProvider implements LLMService {
  async analyzeSubmission(
    description: string,
    files: any[],
    webLink?: string
  ): Promise<{
    skill: string;
    effort: string;
    confidence: number;
    summary: string;
    feedback: string;
  }> {
    const fileList =
      files && files.length > 0
        ? files.map((f) => `${f.name} (${f.type})`).join(", ")
        : "No files provided.";
    const prompt = `Given the following submission, return a JSON object with the following fields:\n- skill: (string, e.g., React, Rust, Design, etc)\n- effort: (Low, Medium, or High)\n- confidence: (number between 0 and 100, but also output the confidence as a percentage string in the feedback, e.g., 60%)\n- summary: (1-2 sentences)\n- feedback: (markdown, with clear sections for Skill, Effort, Confidence, and a final section called 'Checklist' or 'Suggestions' for actionable next steps. In the Confidence section, always reference the confidence value from the JSON above, but as a percentage, not a decimal. Use positive, actionable, and growth-mindset language in the Checklist/Suggestions, e.g., 'Introduce more interactivity (e.g., dynamic content, user input handling) to better demonstrate your React skills.', 'Add slightly advanced concepts like hooks, context, or simple state management to level up your submission.', 'Briefly comment key parts of your code to highlight design choices and best practices.' Keep the review style light, checklist-driven, and growth-oriented.)\n\nSubmission Description: ${description}\nFiles: ${fileList}${
      webLink ? `\nWeb Link: ${webLink}` : ""
    }`;
    const result = await callGemini(prompt);
    // Try to extract JSON from the result
    let jsonStart = result.indexOf("{");
    let jsonEnd = result.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1)
      throw new Error("No JSON found in Gemini response");
    let jsonString = result.substring(jsonStart, jsonEnd + 1);
    let parsed: any;
    try {
      parsed = JSON.parse(jsonString);
    } catch (e) {
      throw new Error("Failed to parse Gemini JSON response: " + e);
    }
    // Defensive: ensure all fields exist
    return {
      skill: parsed.skill || "",
      effort: parsed.effort || "",
      confidence:
        typeof parsed.confidence === "number" ? parsed.confidence : 0.5,
      summary: parsed.summary || "",
      feedback: parsed.feedback || "",
    };
  }
}
