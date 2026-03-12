import type { ModelConfig, LLMProvider } from '../types.js';
import { GeminiProvider } from './gemini.js';

export function createProvider(config: ModelConfig): LLMProvider {
  switch (config.provider) {
    case 'gemini':
      return new GeminiProvider(
        config.apiKey ?? process.env['GEMINI_API_KEY'] ?? '',
        config.model,
      );
    case 'anthropic':
      throw new Error('Anthropic provider not implemented yet');
  }
}
