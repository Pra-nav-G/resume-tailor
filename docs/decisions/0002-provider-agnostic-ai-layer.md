# 0002: Provider-agnostic AI layer with bring-your-own keys

**Status:** Proposed · **Date:** 2026-10-18 · **Decided by:** @Pra-nav-G
**Related:** S-01, S-03

## Context
The owner wants to use whichever AI provider they have a key for. Consumer subscriptions can't back a third-party app, so API keys are required (marketing-doc §4).

## Options considered
1. **Vercel AI SDK (`ai` + provider packages):** one interface for Anthropic, OpenAI, Google and others; structured output validated against Zod schemas. Cons: adds a few dependencies.
2. **OpenRouter only:** one key for many models. Cons: an extra intermediary and markup; still want direct keys.
3. **Hand-written adapters per provider:** no dependencies. Cons: more code to maintain for each provider's API changes.

## Decision
Option 1, with OpenRouter as one of the supported providers. All AI calls go through `src/ai/` (`generateStructured(step, schema, prompt)`); nothing else imports a provider SDK. Keys are stored encrypted (AES-256-GCM, key from `KEY_ENCRYPTION_SECRET`), decrypted only server-side at call time.

## Consequences
- Easier: switching models per step is configuration, not code.
- Harder: model quality varies; prompts must be tested on more than one provider.
- Revisit if: the SDK drops a needed provider or structured output differs too much between providers.
