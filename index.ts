/**
 * Qwen Cloud Token Plan provider for pi.
 *
 * @see https://docs.qwencloud.com/token-plan/personal/token-plan-personal-overview
 */

import {
  clampThinkingLevel,
  streamOpenAICompletions,
  type AssistantMessageEventStream,
  type SimpleStreamOptions,
} from "@earendil-works/pi-ai/compat";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import modelsData from "./models.json" with { type: "json" };

const PROVIDER_ID = "qwen-cloud";
const BASE_URL = "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1";

interface JsonModel {
  id: string;
  name: string;
  reasoning: boolean;
  input: Array<"text" | "image">;
  cost: { input: number; output: number; cacheRead: number; cacheWrite: number };
  contextWindow: number;
  maxTokens: number;
  thinkingLevelMap?: Partial<Record<"off" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max", string | null>>;
  compat?: Record<string, unknown>;
}

function streamQwenCloud(
  model: any,
  context: any,
  options?: SimpleStreamOptions,
): AssistantMessageEventStream {
  const selectedLevel = options?.reasoning
    ? clampThinkingLevel(model, options.reasoning)
    : "off";
  const thinkingEnabled = selectedLevel !== "off";
  const mappedEffort = model.thinkingLevelMap?.[selectedLevel] ?? selectedLevel;
  const supportsEffort = model.id === "glm-5.2" || model.id === "deepseek-v4-pro";
  const userOnPayload = options?.onPayload;
  const { reasoning: _reasoning, ...streamOptions } = options ?? {};

  return streamOpenAICompletions(
    { ...model, api: "openai-completions", baseUrl: model.baseUrl || BASE_URL },
    context,
    {
      ...streamOptions,
      reasoningEffort: thinkingEnabled ? selectedLevel : undefined,
      onPayload: async (params: any, payloadModel: any) => {
        let payload = params;
        if (userOnPayload) {
          const updated = await userOnPayload(payload, payloadModel);
          if (updated !== undefined) payload = updated;
        }

        payload = { ...payload, enable_thinking: thinkingEnabled };
        if (supportsEffort) {
          payload.reasoning_effort = thinkingEnabled ? mappedEffort : "none";
        }

        return payload;
      },
    },
  );
}

export default function (pi: ExtensionAPI) {
  pi.registerProvider(PROVIDER_ID, {
    name: "Qwen Cloud (Token Plan)",
    baseUrl: BASE_URL,
    apiKey: "$QWEN_CLOUD_API_KEY",
    api: "openai-completions",
    models: modelsData as JsonModel[],
    streamSimple: streamQwenCloud,
  });
}
