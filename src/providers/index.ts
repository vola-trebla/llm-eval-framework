import type { ModelConfig, LLMProvider } from '../types.js';
import { GeminiProvider } from './gemini.js';
import { AnthropicProvider } from './anthropic.js';
import { OpenAIProvider } from './openai.js';

export function createProvider(config: ModelConfig): LLMProvider {
  switch (config.provider) {
    case 'gemini':
      return new GeminiProvider(
        config.apiKey ?? process.env['GEMINI_API_KEY'] ?? '',
        config.model,
      );
    case 'anthropic':
      return new AnthropicProvider(
        config.apiKey ?? process.env['ANTHROPIC_API_KEY'] ?? '',
        config.model,
      );
    case 'openai':
      return new OpenAIProvider(
        config.apiKey ?? process.env['OPENAI_API_KEY'] ?? '',
        config.model,
      );
  }
}
