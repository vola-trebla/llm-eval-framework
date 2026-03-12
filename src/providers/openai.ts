import type { LLMProvider, ProviderResponse } from '../types.js';
import OpenAI from 'openai';

export class OpenAIProvider implements LLMProvider {
  private client: OpenAI;
  public modelName: string;

  constructor(apiKey: string, model: string = 'gpt-4o') {
    this.client = new OpenAI({ apiKey });
    this.modelName = model;
  }

  async call(prompt: string): Promise<ProviderResponse> {
    const start = Date.now();
    const result = await this.client.chat.completions.create({
      model: this.modelName,
      messages: [{ role: 'user', content: prompt }],
    });

    const output = result.choices[0]?.message.content ?? '';
    const tokensUsed = result.usage?.total_tokens ?? 0;

    return {
      output,
      latencyMs: Date.now() - start,
      tokensUsed,
    };
  }
}
