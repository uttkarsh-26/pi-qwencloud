<div align="center">

# ☁️ pi-qwencloud

**Qwen Cloud Token Plan provider for [pi](https://github.com/earendil-works/pi-coding-agent)**

_Qwen, GLM, DeepSeek — with proper thinking level support via the Token Plan endpoint._

[![pi extension](https://img.shields.io/badge/pi-extension-blueviolet)](https://github.com/earendil-works/pi-coding-agent)
[![license](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

</div>

---

## Features

- **6 text models** — Qwen3.8 Max Preview, Qwen3.7 Max/Plus, Qwen3.6 Flash, GLM 5.2, DeepSeek V4 Pro
- **Thinking support** — proper `enable_thinking` for Qwen/DeepSeek, named `reasoning_effort` levels for GLM
- **Vision models** — Qwen3.8 Max Preview, Qwen3.7 Plus, Qwen3.6 Flash accept image input
- **1M context** — all models support up to 1M token context windows
- **Zero config** — just set your API key and go

## Supported Models

| Model | Context | Reasoning | Vision | Thinking Control |
|-------|---------|-----------|--------|-----------------|
| qwen3.8-max-preview | 1M | ✅ | ✅ | on/off (`enable_thinking`) |
| qwen3.7-max | 1M | ✅ | — | on/off (`enable_thinking`) |
| qwen3.7-plus | 1M | ✅ | ✅ | on/off (`enable_thinking`) |
| qwen3.6-flash | 1M | ✅ | ✅ | on/off (`enable_thinking`) |
| glm-5.2 | 1M | ✅ | — | 7 levels (`reasoning_effort`) |
| deepseek-v4-pro | 1M | ✅ | — | on/off (`enable_thinking`) |

### GLM 5.2 Thinking Levels

GLM 5.2 supports named reasoning effort levels mapped to pi's thinking selector:

| pi Level | GLM `reasoning_effort` |
|----------|----------------------|
| off | *(thinking disabled)* |
| minimal | `minimal` |
| low | `low` |
| medium | `medium` |
| high | `high` |
| xhigh | `xhigh` |
| max | `max` |

## Installation

### Option 1: `pi install` (Recommended)

```bash
pi install https://github.com/<your-username>/pi-qwencloud
```

### Option 2: Manual

```bash
git clone https://github.com/<your-username>/pi-qwencloud.git
pi -e /path/to/pi-qwencloud
```

## Authentication

Token Plan API keys start with `sk-sp-` (different from regular Qwen Cloud `sk-` keys).

### Option 1: auth.json (recommended)

Add to `~/.pi/agent/auth.json`:

```json
{
  "qwen-cloud": {
    "type": "api_key",
    "key": "sk-sp-your-token-plan-key"
  }
}
```

### Option 2: Environment variable

```bash
export QWEN_CLOUD_API_KEY=sk-sp-your-token-plan-key
```

Get your API key from the [Token Plan console](https://home.qwencloud.com/).

## Plans

| Plan | Price | 5h Limit | 7d Limit | Concurrency |
|------|-------|----------|----------|-------------|
| Lite | $8/mo | 700 Credits | 2,500 Credits | 1-2 agents |
| Standard | $25/mo | 3,000 Credits | 10,000 Credits | 3-4 agents |
| Pro | $80/mo | 12,000 Credits | 40,000 Credits | 6-8 agents |

## Usage

After installation, select a model with `/model` or:

```bash
pi --provider qwen-cloud --model qwen3.8-max-preview
```

## Notes

- Costs show as $0 — Token Plan uses Credits-based billing, not per-token pricing
- The `developer` role is not supported; the extension sends `system` instead
- Token Plan is for **interactive use only** — no automated scripts or batch processing
- Region: Singapore (global inference)

## Links

- [Token Plan docs](https://docs.qwencloud.com/token-plan/personal/token-plan-personal-overview)
- [Thinking mode docs](https://docs.qwencloud.com/developer-guides/text-generation/thinking)
- [pi-coding-agent](https://github.com/earendil-works/pi-coding-agent)

## License

MIT
