# Development workflow

## Durable context

| Location | Purpose |
| --- | --- |
| `AGENTS.md` | Short rules and navigation for every agent session |
| `docs/` | Product behavior, engineering practices, and current architecture |
| `docs/decisions/` | Why architectural choices were made and their status |
| `planning/tasks/` | Scope, acceptance criteria, status, and resumable handoff |
| Application directories | Implementation and nearby unit tests |
| `contracts/` | Versioned interface artifacts and examples |

Keep plans and code in the same repository, in separate directories. This lets a
single MR update behavior, tests, and its documentation atomically. Do not create
a separate planning branch/repository that drifts from the implementation.

Use `AGENTS.md` for always-relevant rules and docs for their detail. A skill is
useful later for a repeated procedure such as preparing a CDK deployment review;
it is not a replacement for the project's architecture or backlog. Keep any
agent-specific adapter thin and point it at these files. Codex documents both
[repository instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
and [skills](https://learn.chatgpt.com/docs/build-skills).

## Task lifecycle

1. Select a ready task from [the board](../planning/README.md). Read dependencies.
2. Use a focused branch, normally `codex/sp-NNN-description`, and record it in the
   task. Use a separate checkout for concurrent work; coordinate shared contracts.
3. Write acceptance criteria before substantial implementation. Tiny fixes need
   only a concise task entry, not a design essay.
4. Implement the smallest coherent slice. Update contracts/docs with behavior.
5. Run relevant checks and inspect the diff. Record the actual results.
6. Mark ready for review with an MR description and handoff. The maintainer reviews
   and merges. Mark done after merge, with the reference when available.

Avoid editing another active task's implementation without coordinating. If
blocked, record the exact missing input and independent work that can continue.
End a session with enough context to resume: files changed, decisions, checks,
known issues, and the next action. Keep that in the task file, not a chat transcript.

## Coding conventions

- TypeScript strict mode; Python type hints and explicit boundary models.
- Feature-oriented frontend modules. Extract reusable components after a real
  second usage or when behavior/accessibility warrants a dedicated component.
- Pure domain transitions; application services coordinate storage and identity;
  AWS adapters translate events and persistence. Avoid a generic repository or
  dependency-injection framework for this small application.
- Runtime validation for HTTP inputs and inbound events; generated TS types alone
  do not validate network data.
- Explicit error codes and user-facing messages. Separate retryable transport
  failures, stale-round conflicts, authentication errors, and invalid input.
- Structured logs with correlation IDs; exclude credentials, invitations, hidden
  votes, and unnecessary personal data.
- Prefer maintained libraries for cryptography and accessible interaction. Do not
  invent token signing or custom keyboard interactions unnecessarily.

## Toolchain and CI contract

Only `python3 scripts/check_repo.py` exists today. The following are bootstrap
requirements, not currently runnable commands:

| Boundary | Required checks after bootstrap |
| --- | --- |
| Web | Format/lint, TypeScript check, Vitest behavior tests, production build |
| API | Ruff lint/format, mypy, pytest domain/adapter tests |
| Infra | Ruff, mypy, CDK assertion tests, synth with explicit test context |
| Contracts | Schema/example validation, reproducible TS generation with no drift |
| End-to-end | Playwright using two independent browser contexts |

Use one npm lockfile at the root for frontend/tooling workspaces and one root uv
workspace/lockfile for API and infra, with separate package dependencies. Keep
test/infra dependencies out of the Lambda artifact. Pin runtime/tool versions and
document frozen install commands during SP-001.

Put repeatable commands in scripts/package manifests, then have CI call those
commands. The Git hosting provider is not established; select GitHub Actions or
GitLab CI during bootstrap instead of maintaining both. MRs run validation without
production credentials. Deployment jobs use explicit environments and scoped
short-lived credentials, with a production approval gate.

Test behavior at the cheapest layer that can establish it. Domain tests cover
authorization, hidden-vote projection, round transitions, and idempotency.
Integration tests establish DynamoDB conditional-write/transaction behavior and
AWS socket lifecycle. Browser tests establish the actual multi-user flow. Mock
tests do not replace deployed AWS integration checks.

## Definition of ready for review

- Acceptance criteria demonstrated; no unrelated changes.
- Relevant checks pass, or failures/unrun checks are disclosed with reasons.
- Changed contracts, docs, and task status agree with the implementation.
- UI changes include browser verification at desktop/mobile sizes and keyboard
  checks when interactive behavior changes.
- Infrastructure changes include synth, assertions, a reviewed diff against the
  intended environment when available, and rollback implications.
- Secrets and generated build outputs are absent from the diff.
