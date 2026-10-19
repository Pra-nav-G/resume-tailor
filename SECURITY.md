# Security Policy

## Reporting a vulnerability

Please **don't open a public issue** for security problems.

Report it privately through GitHub: go to this repository's **Security** tab → **Report a vulnerability**. (The owner needs to enable private vulnerability reporting under Settings → Code security.)

Include:
- what the problem is and where (file, URL or feature)
- steps to reproduce it
- what an attacker could do with it

You'll get a reply within [7] days. Once it's fixed, we're happy to credit you unless you'd rather stay anonymous.

## Supported versions

Only the latest version on `main` receives security fixes.

## How this project handles security

- Secrets live in environment variables, never in the repo. A Claude Code hook stops the coding agent from committing `.env` files or common secret patterns, and CI fails if a `.env` file is ever committed. GitHub secret scanning with push protection covers everyone else's pushes.
- Dependencies are checked by `npm audit` in CI, GitHub dependency review on pull requests, and Dependabot.
- Code is scanned by CodeQL.
- Changes touching auth, payments, personal data, file uploads or user-generated content get an independent security review before merging.
