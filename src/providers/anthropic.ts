import type { LLMProvider, ProviderResponse } from '../types.js';
import Anthropic from '@anthropic-ai/sdk';

export class AnthropicProvider implements LLMProvider {
  private client: Anthropic;
  public modelName: string;

  constructor(apiKey: string, model: string = 'claude-sonnet-4-20250514') {
    this.client = new Anthropic({ apiKey });
    this.modelName = model;
  }

  async call(prompt: string): Promise<ProviderResponse> {
    const start = Date.now();
    const result = await this.client.messages.create({
      model: this.modelName,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const output = result.content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('');

    const tokensUsed = (result.usage.input_tokens ?? 0) + (result.usage.output_tokens ?? 0);

    return {
      output,
      latencyMs: Date.now() - start,
      tokensUsed,
    };
  }
}
