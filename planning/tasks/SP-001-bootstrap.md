# SP-001: Bootstrap the runnable toolchain

Status: Ready for review
Owner: Codex
Branch: codex/sp-001-bootstrap
Dependencies: SP-000 reviewed; stack accepted 2026-10-13
MR: Not opened

## Outcome

A new contributor can install dependencies, start the frontend, and run local
quality checks from a clean checkout using documented commands.

## Acceptance criteria

- [x] Reconcile the proposed stack with maintainer review; record ADR status
      accurately. Do not infer acceptance from this task's existence.
- [x] Pin supported Node and Python versions and commit npm and uv lockfiles.
- [x] Create React/TypeScript/Vite frontend with Tailwind, home/room route shells,
      and a clear unconnected state. No mock controls presented as a live service.
- [x] Configure ESLint, formatting, strict TypeScript, Vitest, and build commands.
- [x] Create installable API and CDK Python workspace packages with Ruff, mypy,
      pytest, and clearly separated runtime/dev/infra dependencies.
- [x] Add minimal CDK app plus an assertion for a meaningful baseline resource;
      synth using explicit test settings without deploying or requiring AWS lookups.
- [x] Document frozen installation, development, and verification commands.
- [x] Wire the actual Git provider's CI to the same local checks, after identifying
      the provider. Keep CI selection explicitly pending if that input is unavailable.
- [x] All implemented checks pass. Disclose any environment limitations.

## Implementation notes

- Maintainer accepted the stack on 2026-10-13, with Linux/WSL as developer targets
  and Scrumation.com as the product name. ADR-0001 records acceptance.
- Node 24.21.0 / bundled npm 11.19.0, Python 3.12.14, and uv 0.12.13 are pinned.
  npm dependencies use exact versions; npm and uv lockfiles are included.
- Home, preview, arbitrary-room, and not-found routes use one application shell
  and query provider. Room actions remain disabled and explicitly disconnected.
- API package dependencies are separate from CDK and development dependencies.
  Domain rules and AWS handlers remain SP-002/003 work.
- CDK requires explicit environment/account/region. Local synthesis uses a
  placeholder account with lookups disabled; the only application resource is
  secure asset storage, plus its TLS policy.
- GitHub Actions invokes the shared local check command and browser smoke suite.

## Review description

### Problem and resulting behavior

The repository previously had documentation only. Contributors can now install
locked dependencies, run the Scrumation.com frontend, build both Python packages,
and validate source, browser behavior, and a secure CDK baseline. Home and room
layouts communicate that the room service is unavailable until implemented.

### Validation

- `npm ci --offline --cache /tmp/scrumation-npm-cache`: clean frozen install passed,
  including package lifecycle scripts. The offline flag uses the downloaded cache.
- `uv sync --frozen --all-packages --offline`: passed with the pinned Python.
- `npm run check`: passed formatting, ESLint, strict TypeScript (frontend and
  browser tooling), four Vitest tests, production build, Ruff, mypy, six pytest
  assertions/scenarios, repository links, and CDK synthesis.
- `npm run test:browser`: four tests passed across desktop and mobile Chromium,
  with Playwright starting/stopping its preview server.
- `uv build --package scrumation-api --out-dir dist/api` and the equivalent infra
  build: wheels and source distributions passed. Wheel contents were inspected.
- Isolated `uv sync --frozen --package scrumation-api --no-dev --offline` in a
  separate environment: installed the API without CDK, infra, or pytest.
- Visual review of home and room layouts at 1440×1000 and 393×851: no clipping,
  horizontal overflow, or browser errors. Keyboard focus checked in smoke tests.
- `git diff --check`: passed. GitHub-hosted CI has not run; awaiting branch push.

### Risks and rollout

No AWS resources deployed. The S3 baseline intentionally retains assets on stack
deletion; future deployment/cleanup documentation must account for retention.
The UI is a disconnected shell; live multi-user behavior is not implemented.
Linux Mint used Playwright's Ubuntu fallback browser build successfully.

### References

[ADR-0001](../../docs/decisions/0001-stack.md),
[development guide](../../docs/development.md), and
[architecture](../../docs/architecture.md).

## Handoff

- Completed: all acceptance criteria above; prepared for maintainer review.
- Checks run and results: all local checks and 14 automated tests passed; see
  validation above for commands and package/visual verification.
- Environment notes: Node and managed Python were downloaded under `/tmp` for
  verification; install the documented pinned tools for ongoing shell use. CDK
  cache writes and localhost/browser access needed sandbox escalation here.
- Known issues: no failing checks. Hosted GitHub Actions execution remains pending
  until push; no PR opened and no deployment performed.
- Next action: review/merge SP-001, then start SP-002 domain rules and contracts.
