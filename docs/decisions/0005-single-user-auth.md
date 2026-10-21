# 0005: Single-user authentication

**Status:** Deferred to Phone access (change 2026-10-20) · **Date:** 2026-10-18 · **Decided by:** @Pra-nav-G
**Related:** S-02

## Context
The app holds personal data and API keys and is on the public internet, but has exactly one user.

## Options considered
1. **Auth.js with GitHub OAuth, allowlisted to one login:** no email service, no passwords; the owner already uses GitHub. Cons: requires a GitHub OAuth app.
2. **Auth.js email magic link:** works without GitHub. Cons: needs an email provider (e.g. Resend) and its key.
3. **Passkeys:** strong and phishing-resistant. Cons: more setup; recovery story needed.
4. **Hosting-level password protection:** zero code. Cons: often a paid feature; no app-level user.

## Decision
Option 1. `ALLOWED_GITHUB_LOGIN` env var holds the one allowed login; every other account is refused before any data is read.

## Consequences
- Easier: no passwords or email delivery to manage.
- Harder: losing GitHub access locks the owner out (acceptable for a personal tool).
- Revisit if: the app is ever shared with others (non-goal today).
