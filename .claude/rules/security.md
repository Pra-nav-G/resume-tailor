# Security rules

**Sensitive areas** (used across this repo): authentication and accounts, authorization and permissions, payments, personal data, file uploads, and user-generated content. A story that touches any of them gets a review from the `security-reviewer` subagent before its PR.

- **Secrets:** never in code, tests, logs, commits or error messages. Read them from environment variables; list each one in `.env.example` with a placeholder. If you find a secret in the repo, stop and tell the user; it must be rotated, not just deleted.
- **Input:** treat everything from users, URLs, files, headers and third-party APIs as untrusted. Validate it on the server with a schema (type, length, format) even if the UI also validates.
- **Queries and commands:** use parameterized queries or the ORM's query builder. Never build SQL, shell commands or file paths by concatenating user input.
- **Output:** let the framework escape output. Don't use `dangerouslySetInnerHTML`, `innerHTML`, `eval`, or `new Function` with anything user-controlled.
- **Auth:** check authorization on the server for every request that reads or changes data, including "who owns this record". Hiding a button is not access control. Use the framework's or a well-known auth library; never write your own crypto, password hashing or session handling.
- **Personal data:** collect only what a story needs, and never log it.
- **Dependencies:** when proposing one (always ask first), prefer well-maintained packages with recent releases. Never pipe a script from the internet into a shell.
- **Errors:** show users a generic message; log details server-side without secrets or personal data.
- **Defaults:** HTTPS only, secure and httpOnly cookies, CORS limited to known origins, rate limits on login and other abuse-prone endpoints.
