# Working in this repository

## Start each task

1. Read `README.md`, `planning/README.md`, and the selected task file.
2. Read the relevant sections of `docs/product.md`, `docs/architecture.md`, and
   `docs/development.md`; follow accepted ADRs in `docs/decisions/`.
3. Inspect git status and existing implementation. Preserve unrelated edits.
4. Record the task as in progress, with branch and owner, when implementing it.

The repository is the durable source of project context. Chat history is not
required. Proposed ADRs describe a working recommendation, not user approval.
Explicit user instructions take precedence over repository guidance.

## Implementation rules

- Keep changes focused on the selected task and its acceptance criteria.
- Use TypeScript for the browser and Python for backend and CDK, following the
  proposed architecture unless the task explicitly changes that decision.
- Keep domain rules independent of React, AWS event envelopes, and storage SDKs.
- Treat server state as authoritative. Never send another participant's hidden
  vote to a browser, including the host's browser, before reveal.
- Authenticate membership and authorize host actions on the server. A room ID,
  display name, client-supplied participant ID, or disabled button is not authority.
- Validate untrusted data at boundaries. Do not log tokens or vote payloads.
- Add meaningful tests for changed behavior, especially privacy, concurrent
  commands, expired sessions, and reconnects. Do not add placeholder tests.
- Keep dependency manifests and lockfiles together. Do not edit generated code
  manually; document its generation command.
- Avoid new services, frameworks, generic abstractions, or libraries unless the
  task needs them. Document significant architectural changes in an ADR.

## Verification and handoff

- Follow `docs/development.md` for checks appropriate to the changed boundary.
- Run `python3 scripts/check_repo.py` for scaffold/documentation changes.
- Report exact checks and outcomes; never describe unrun tests as passing.
- Update the task file with completed work, remaining work, limitations, and the
  next concrete action. Update the work board when status changes.
- Use `planning/templates/merge-request.md` for a review description. State the
  resulting behavior, validation, and material risks.
- Prepare reviewable changes; merging and production deployment require user
  authorization. Do not treat ordinary local implementation as requiring approval.

## Guidance versus skills

Keep universal project rules here, detailed practices in `docs/`, and task plans
in `planning/`. Use optional skills only for repeatable procedures that benefit
from dedicated instructions or scripts. Skills must reference canonical project
docs instead of duplicating them. Other agents should be explicitly instructed
to read this file if their tool does not discover it automatically.
