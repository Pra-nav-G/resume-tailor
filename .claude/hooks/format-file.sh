#!/usr/bin/env bash
# .claude/hooks/format-file.sh
# PostToolUse hook for Edit|Write: formats the file Claude just changed with the
# project's own Prettier. Does nothing until Prettier is installed in the project
# (npm install --save-dev prettier), so it never downloads anything or slows edits.
# Never blocks: formatting problems are not a reason to stop the agent.

input="$(cat)"

# Extract tool_input.file_path (jq if available, otherwise node, otherwise python)
file=""
if command -v jq >/dev/null 2>&1; then
  file="$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty' 2>/dev/null)"
elif command -v node >/dev/null 2>&1; then
  file="$(printf '%s' "$input" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{process.stdout.write((JSON.parse(s).tool_input||{}).file_path||"")}catch(e){}})' 2>/dev/null)"
elif command -v python3 >/dev/null 2>&1; then
  file="$(printf '%s' "$input" | python3 -c 'import sys,json
try: print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))
except Exception: pass' 2>/dev/null)"
fi

[ -n "$file" ] && [ -f "$file" ] || exit 0

prettier="${CLAUDE_PROJECT_DIR:-.}/node_modules/.bin/prettier"
[ -x "$prettier" ] || exit 0

"$prettier" --write --ignore-unknown "$file" >/dev/null 2>&1 || true
exit 0
