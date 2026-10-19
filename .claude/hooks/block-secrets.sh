#!/usr/bin/env bash
# .claude/hooks/block-secrets.sh
# PreToolUse hook for Bash. Blocks a `git commit` (including `git add -A && git commit`
# and `git commit -a`) if the changes about to be committed include a .env file or
# look like they contain a secret.
# Exit code 2 = block the tool call and show stderr to the agent.

set -u

input="$(cat)"

# Only act on git commit commands
if ! printf '%s' "$input" | grep -q 'git commit'; then
  exit 0
fi

# Not inside a git repo: nothing to check
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

# What could end up in this commit: already-staged changes, plus unstaged changes to
# tracked files and new untracked files (a `git add -A` or `commit -a` in the same
# command would pick those up before the commit runs). Ignored files are skipped,
# because .gitignore keeps them out of the commit.
changed_files="$(
  {
    git diff --cached --name-only
    git diff --name-only
    git ls-files --others --exclude-standard
  } 2>/dev/null | sort -u
)"

# 1. Block .env files (allow .env.example)
if printf '%s\n' "$changed_files" | grep -E '(^|/)\.env($|\.)' | grep -qv '\.env\.example$'; then
  echo "BLOCKED: a .env file would be committed. Remove it from the commit (git restore --staged <file>) and make sure .env is in .gitignore." >&2
  exit 2
fi

# 2. Block common secret patterns in added lines
patterns='(AKIA[0-9A-Z]{16}|-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----|sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|(api[_-]?key|secret|token|password)[[:space:]]*[:=][[:space:]]*["'"'"'][^"'"'"']{8,}["'"'"'])'

added_lines="$(
  {
    git diff --cached -U0
    git diff -U0
  } 2>/dev/null | grep -E '^\+' | grep -Ev '^\+\+\+'
  # contents of new untracked files (text files only, skip anything over 1 MB)
  git ls-files --others --exclude-standard -z 2>/dev/null |
    while IFS= read -r -d '' f; do
      [ -f "$f" ] && [ "$(wc -c < "$f")" -le 1048576 ] && grep -Iq . "$f" 2>/dev/null && cat "$f"
    done
)"

if printf '%s\n' "$added_lines" | grep -Eiq "$patterns"; then
  echo "BLOCKED: the changes about to be committed look like they contain a secret. Remove it, rotate it if it was ever pushed, and use environment variables instead." >&2
  exit 2
fi

exit 0
