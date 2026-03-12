import type { LLMProvider, ProviderResponse } from '../types.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiProvider implements LLMProvider {
  private client: GoogleGenerativeAI;
  public modelName: string;

  constructor(apiKey: string, model: string = 'gemini-2.5-flash') {
    this.client = new GoogleGenerativeAI(apiKey);
    this.modelName = model;
  }

  async call(prompt: string): Promise<ProviderResponse> {
    const start = Date.now();
    const model = this.client.getGenerativeModel({ model: this.modelName });
    const result = await model.generateContent(prompt);
    const output = result.response.text();
    const tokensUsed = result.response.usageMetadata?.totalTokenCount ?? 0;

    return {
      output,
      latencyMs: Date.now() - start,
      tokensUsed,
    };
  }
}
