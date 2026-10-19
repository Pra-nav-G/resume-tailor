# 0004: Source-traced resume content

**Status:** Accepted · **Date:** 2026-10-18 · **Decided by:** @Pra-nav-G
**Related:** S-01, S-08

## Context
The biggest risk is the AI inventing claims that end up on a real application (marketing-doc §7). Asking the model to "not make things up" isn't enforceable.

## Options considered
1. **Prompt instructions only:** cheap, not verifiable.
2. **Reviewer model only:** catches some problems; still model-judged.
3. **Every generated line cites master-resume IDs, checked in code, plus a reviewer model for subtler changes (numbers, tools, titles):** verifiable; uncited lines can be removed automatically.

## Decision
Option 3. The master resume is structured with stable IDs (S-04). The write step's schema requires `sourceIds`; code rejects IDs that don't exist in the run's master-resume version. The review step flags rewrites whose specifics aren't in the cited sources. Uncited or rejected lines are removed and listed as flags; requirements the owner can't support go only to the Gaps list.

## Consequences
- Easier: trust; a test can prove no invented line reaches the user (S-08 AC5).
- Harder: the master resume must be structured, not free text; import (S-05) needs to produce IDs.
- Revisit if: the citation requirement makes writing too stiff to be useful (S-01 spike).
