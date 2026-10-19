#!/usr/bin/env bash
# scripts/check-design-tokens.sh
# Fails if app code hard-codes colours or pixel sizes instead of using design-system tokens.
# "A story is not done unless it uses the system — no bespoke styles."
#
# Usage: bash scripts/check-design-tokens.sh [dir ...]     (default: src app components pages)
# Escape hatch for a genuine exception: put "design-system-ignore" in a comment on that line.
# Allowed: 0px and 1px (hairlines), and anything inside design-system/.

set -u

dirs=("$@")
[ ${#dirs[@]} -eq 0 ] && dirs=(src app components pages)

existing=()
for d in "${dirs[@]}"; do [ -d "$d" ] && existing+=("$d"); done
if [ ${#existing[@]} -eq 0 ]; then
  echo "design-token check: no app code yet (looked in: ${dirs[*]}), nothing to check."
  exit 0
fi

hexval='#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})([^A-Za-z0-9_-]|$)'
# In stylesheets and markup: a hex colour after a property colon, space, bracket or comma
hex_css="(^|[[:space:]:(,])${hexval}"
# In JS/TS: only inside a string or after a colon (CSS-in-JS), so private fields like #add() aren't flagged
hex_js="([\"'\`]|:[[:space:]]*)${hexval}"
# Colour functions
func='(^|[^A-Za-z0-9_-])(rgba?|hsla?)[[:space:]]*\('
# Pixel values other than 0px and 1px
px='(^|[^A-Za-z0-9_.-])([2-9]|[1-9][0-9]+)(\.[0-9]+)?px([^A-Za-z0-9_-]|$)'

css_like=(--include='*.css' --include='*.scss' --include='*.html' --include='*.vue' --include='*.svelte')
js_like=(--include='*.ts' --include='*.tsx' --include='*.js' --include='*.jsx')

found=$(
  {
    grep -rnE "${css_like[@]}" -e "$hex_css" -e "$func" -e "$px" "${existing[@]}" 2>/dev/null
    grep -rnE "${js_like[@]}" -e "$hex_js" -e "$func" -e "$px" "${existing[@]}" 2>/dev/null
  } |
    grep -v 'design-system-ignore' |
    grep -v '/design-system/' |
    grep -v 'href=' |
    sort -u
)

if [ -n "$found" ]; then
  echo "Hard-coded styles found. Use tokens from design-system/tokens.css (CSS variables) or the Tailwind theme instead:"
  echo
  echo "$found"
  echo
  echo "If a value is a genuine exception, add a comment containing 'design-system-ignore' on that line."
  exit 1
fi

echo "design-token check: OK (no hard-coded colours or pixel sizes in ${existing[*]})."
exit 0
