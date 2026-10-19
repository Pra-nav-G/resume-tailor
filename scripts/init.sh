#!/usr/bin/env bash
# scripts/init.sh: run once after "Use this template", from the repo root.
#
#   bash scripts/init.sh "My Project" [github-owner] [--keep-plugin]
#
# - Removes the plugin packaging (.claude-plugin/, agents/, .claude/plugin-hooks.json),
#   which only the template repo needs; pass --keep-plugin to keep it
# - Replaces [Project Name] in the docs
# - Points the README CI badge at your repo (from git remote)
# - Sets you as owner in .github/CODEOWNERS and the LICENSE
# - Makes the hooks and scripts executable
# - Creates CLAUDE.local.md for private notes (gitignored)
# Safe to re-run. Works on macOS, Linux and Git Bash on Windows (needs perl, which all three include).

set -euo pipefail

cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

keep_plugin=0
args=()
for a in "$@"; do
  if [ "$a" = "--keep-plugin" ]; then keep_plugin=1; else args+=("$a"); fi
done
name="${args[0]:-}"
owner="${args[1]:-}"

if [ -z "$name" ]; then
  read -r -p "Project name: " name
fi
[ -n "$name" ] || { echo "A project name is required."; exit 1; }

# Work out owner/repo from the git remote if possible
remote="$(git remote get-url origin 2>/dev/null || true)"
slug="$(printf '%s' "$remote" | sed -E 's#^.*github\.com[:/]##; s#\.git$##')"
case "$slug" in */*) ;; *) slug="" ;; esac

if [ -z "$owner" ]; then
  if [ -n "$slug" ]; then
    owner="${slug%%/*}"
  else
    read -r -p "GitHub username (for CODEOWNERS and LICENSE): " owner
  fi
fi
owner="${owner#@}"
[ -n "$owner" ] || { echo "A GitHub username is required."; exit 1; }

export INIT_NAME="$name" INIT_OWNER="$owner" INIT_SLUG="$slug" INIT_YEAR="$(date +%Y)"

# 1. Project name in docs
for f in README.md CLAUDE.md marketing-doc.md design-plan.md build-plan.md; do
  [ -f "$f" ] && perl -pi -e 's/\[Project Name\]/$ENV{INIT_NAME}/g' "$f"
done

# 2. README badge and clone URL
if [ -n "$slug" ] && [ -f README.md ]; then
  perl -pi -e 's#\[user\]/\[repo\]#$ENV{INIT_SLUG}#g; s#cd \[repo\]#"cd " . (split("/", $ENV{INIT_SLUG}))[1]#ge' README.md
fi

# 3. CODEOWNERS: every owner on non-comment lines becomes you (edit roles by hand for a team)
if [ -f .github/CODEOWNERS ]; then
  perl -pi -e 'next if /^\s*#/; s/\@[A-Za-z0-9][A-Za-z0-9-]*/\@$ENV{INIT_OWNER}/g' .github/CODEOWNERS
fi

# 4. LICENSE copyright line
if [ -f LICENSE ]; then
  perl -pi -e 's/^Copyright \(c\) .*/Copyright (c) $ENV{INIT_YEAR} $ENV{INIT_OWNER}/' LICENSE
fi

# 5. Plugin packaging: only the template repo publishes the plugin
if [ "$keep_plugin" -eq 0 ]; then
  rm -rf .claude-plugin agents .claude/plugin-hooks.json
fi

# 6. Executable bits
chmod +x .claude/hooks/*.sh scripts/*.sh 2>/dev/null || true

# 7. Private notes for Claude Code (gitignored)
if [ ! -f CLAUDE.local.md ]; then
  cat > CLAUDE.local.md <<'EOF'
# Personal notes for Claude Code (not committed)
<!-- Your own preferences for this project: local URLs, test accounts, how you like answers. -->
EOF
fi

echo
echo "Done. Set up \"$name\" for @$owner${slug:+ ($slug)}."
echo
echo "Next:"
echo "  1. Review the changes:  git diff"
echo "  2. Commit them:         git add -A && git commit -m \"Initialize project from template\""
echo "  3. Protect main (GitHub → Settings → Branches → Add rule for main):"
echo "       - Require a pull request before merging"
echo "       - Require status checks to pass → select \"test\""
echo "       - Teams only: Require review from Code Owners (then edit .github/CODEOWNERS roles)"
echo "  4. Follow START-HERE.md → \"How to use it on a new project\" from step 2 (GitHub security settings)."
[ -z "$slug" ] && echo "  (No GitHub remote found: update the CI badge in README.md once you push.)"
exit 0
