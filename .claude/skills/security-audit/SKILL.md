---
name: security-audit
description: Full security audit of the repository — secrets (including git history), dependencies, access control, injection, data exposure and GitHub security settings — producing a prioritized fix list. Run with /security-audit before a launch, a demo with real users, or periodically.
argument-hint: [optional focus, e.g. "auth" or "uploads"]
disable-model-invocation: true
---

# Security audit

Focus: $ARGUMENTS (default: everything)

## 1. Automated checks (run them, show the output)
```bash
# Dependencies with known vulnerabilities (needs a lockfile)
npm audit --omit=dev

# Tracked env files (should print nothing, or only .env.example)
git ls-files | grep -E '(^|/)\.env'

# Likely secrets anywhere in history: same patterns as .claude/hooks/block-secrets.sh.
# Review every hit by hand.
git log -p --all | grep -nEi '(AKIA[0-9A-Z]{16}|-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|(api[_-]?key|secret|token|password)[[:space:]]*[:=][[:space:]]*["'"'"'][^"'"'"']{8,}["'"'"'])' | head -50
```
A secret found in history must be **rotated** with the provider. Deleting it from the latest commit doesn't remove it from history or from anyone who cloned the repo.

## 2. Code review
Use the `security-reviewer` subagent with scope "full audit" (or the focus above). Ask it to cover every route, API handler and server action. For a quick second opinion on the current branch, Claude Code's built-in `/security-review` also works.

## 3. GitHub settings (tell the user what to check; you can't change these)
- Settings → Code security: **Dependency graph**, **Dependabot alerts**, **Secret scanning** and **Push protection** on (free for public repos)
- `.github/dependabot.yml` covers the ecosystems in use (uncomment npm once there's a `package.json`)
- **CodeQL** (`.github/workflows/codeql.yml`) has run on the latest code with no open alerts
- Branch protection on `main` requires the `test` check

## 4. Report — keep it private
Write the results to `docs/security-audit-<YYYY-MM-DD>.md`. **This path is gitignored on purpose:** in a public repo, a committed list of unfixed vulnerabilities is a map for attackers. Don't commit it, paste it into an issue or PR, or force-add it.
- **Summary:** overall risk in one line, and counts by severity
- **Findings table:** severity, area, file:line, attack scenario, fix, effort (S/M/L)
- **Fix order:** critical and high first, then quick wins
- **Checked and fine:** what was covered

Then offer to fix the findings one at a time, each on its own `fix-<name>` branch with a regression test where possible (use the tdd skill). Don't fix anything without the user's go-ahead. PR descriptions for these fixes should describe the change, not the exploit, until it's merged.
