# Work board

Updated: 2026-10-14

Current state: repository foundation reviewed; architecture accepted. SP-001 is
ready for review on `codex/sp-001-bootstrap`. Target developer platforms: Linux/WSL.
Product branding: Scrumation.com.

## Sequence

| ID                                         | Task                                            | Status           | Depends on |
| ------------------------------------------ | ----------------------------------------------- | ---------------- | ---------- |
| SP-000                                     | Repository foundation and architecture proposal | Done             | —          |
| [SP-001](tasks/SP-001-bootstrap.md)        | Runnable frontend, Python, and CDK toolchain    | Ready for review | SP-000     |
| [SP-002](tasks/SP-002-domain-contracts.md) | Room rules and versioned contracts              | Planned          | SP-001     |
| [SP-003](tasks/SP-003-room-slice.md)       | Create, join, vote, and reveal over HTTP        | Planned          | SP-002     |
| [SP-004](tasks/SP-004-realtime.md)         | Notifications, presence, and reconnect          | Planned          | SP-003     |
| [SP-005](tasks/SP-005-release.md)          | Public MVP readiness                            | Planned          | SP-004     |

Statuses: Planned → Ready → In progress → Ready for review → Done. Use Blocked
with an exact dependency when necessary. Keep this table and task files aligned.
Subdivide a task into focused MRs if needed; record the acceptance criteria covered
by each. Planned tasks are sequencing guidance, not commitments to deploy.

## SP-000 handoff

- Added agent guidance, component boundaries, conventions, task/ADR/MR templates,
  product assumptions, architecture proposal, and an implementation backlog.
- Added a dependency-free repository check and editor/ignore configuration.
- Validation: `python3 scripts/check_repo.py` passed (15 required files and 25
  local links); `git diff --check` passed for tracked edits. Application tests
  are not available in this structural scaffold.
- Starting repository contained only `.gitignore`; no implementation was changed.
- Python 3.12.3 is available in the current environment; Node/npm are absent.
- No dependencies installed, CI provider selected, AWS resources created, or
  architecture acceptance recorded.
- Next: review the proposal, then bootstrap SP-001. Confirm Git provider when
  wiring CI and AWS account/region/domain before any deployment.

## Resume prompt

SP-001 validation and review notes are in its task file. All local checks passed,
including 14 automated tests; hosted CI awaits a branch push. Review SP-001 before
starting the SP-002 domain/contract implementation.

```text
Read AGENTS.md and planning/README.md. Continue task SP-NNN from its task file.
Inspect current code and git status before editing. Implement its acceptance
criteria, run the relevant available checks, and update its handoff for review.
```

Use [task](templates/task.md), [ADR](templates/adr.md), and
[MR](templates/merge-request.md) templates as needed. Keep plans concise and do
not copy implementation code into planning documents.
