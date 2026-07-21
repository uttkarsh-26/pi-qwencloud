/**
 * Qwen Cloud Token Plan Provider Extension
 *
 * Registers Qwen Cloud Token Plan as a custom provider for pi.
 * Base URL: https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1
 *
 * Supports all text models available on Token Plan Individual:
 *   - Qwen: qwen3.8-max-preview, qwen3.7-max, qwen3.7-plus, qwen3.6-flash
 *   - Zhipu AI: glm-5.2
 *   - DeepSeek: deepseek-v4-pro
 *
 * Thinking modes:
 *   - Qwen models: hybrid (enable_thinking toggle via thinkingFormat: "qwen")
 *   - GLM 5.2: named reasoning_effort levels (none → max)
 *   - DeepSeek V4 Pro: hybrid (enable_thinking toggle)
 *
 * Authentication:
 *   Token Plan API keys start with sk-sp-
 *
 *   Option 1 (recommended): Add to ~/.pi/agent/auth.json
 *     { "qwen-cloud": { "type": "api_key", "key": "sk-sp-..." } }
 *
 *   Option 2: Set environment variable
 *     export QWEN_CLOUD_API_KEY=sk-sp-...
 *
 * Usage:
 *   pi install https://github.com/<your-username>/pi-qwencloud
 *   # or
 *   pi -e /path/to/pi-qwencloud-provider
 *
 * Then use /model to select from available models.
 *
 * @see https://docs.qwencloud.com/token-plan/personal/token-plan-personal-overview
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import modelsData from "./models.json" with { type: "json" };

const PROVIDER_ID = "qwen-cloud";
const BASE_URL = "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1";

interface JsonModel {
  id: string;
  name: string;
  reasoning: boolean;
  input: string[];
  cost: { input: number; output: number; cacheRead: number; cacheWrite: number };
  contextWindow: number;
  maxTokens: number;
  thinkingLevelMap?: Record<string, string | null>;
  compat?: Record<string, unknown>;
}

export default function (pi: ExtensionAPI) {
  const models = modelsData as JsonModel[];

  pi.registerProvider(PROVIDER_ID, {
    name: "Qwen Cloud (Token Plan)",
    baseUrl: BASE_URL,
    apiKey: "$QWEN_CLOUD_API_KEY",
    api: "openai-completions",
    models,
  });
}
