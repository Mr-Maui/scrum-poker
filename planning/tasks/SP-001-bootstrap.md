# SP-001: Bootstrap the runnable toolchain

Status: Ready
Owner: Unassigned
Branch: Not started
Dependencies: SP-000 review
MR: Not opened

## Outcome

A new contributor can install dependencies, start the frontend, and run local
quality checks from a clean checkout using documented commands.

## Acceptance criteria

- [ ] Reconcile the proposed stack with maintainer review; record ADR status
  accurately. Do not infer acceptance from this task's existence.
- [ ] Pin supported Node and Python versions and commit npm and uv lockfiles.
- [ ] Create React/TypeScript/Vite frontend with Tailwind, home/room route shells,
  and a clear unconnected state. No mock controls presented as a live service.
- [ ] Configure ESLint, formatting, strict TypeScript, Vitest, and build commands.
- [ ] Create installable API and CDK Python workspace packages with Ruff, mypy,
  pytest, and clearly separated runtime/dev/infra dependencies.
- [ ] Add minimal CDK app plus an assertion for a meaningful baseline resource;
  synth using explicit test settings without deploying or requiring AWS lookups.
- [ ] Document frozen installation, development, and verification commands.
- [ ] Wire the actual Git provider's CI to the same local checks, after identifying
  the provider. Keep CI selection explicitly pending if that input is unavailable.
- [ ] All implemented checks pass. Disclose any environment limitations.

## Handoff

- Completed: structural boundaries and documentation are present from SP-000.
- Checks run and results: no application checks exist yet.
- Known issues: Node/npm absent in the original environment; Git provider unknown.
- Next action: inspect current toolchain and maintainer architecture feedback.
