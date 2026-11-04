# Work board

Updated: 2026-11-04

Current state: repository foundation reviewed; architecture accepted. SP-001 is
ready for review on `codex/sp-001-bootstrap`. Target developer platforms: Linux/WSL.
Product branding: Scrumation.com.

SP-006 security refresh is ready for review on the same branch, as requested by the
maintainer. See [the task](tasks/SP-006-security-refresh.md).

## Sequence

| ID                                         | Task                                            | Status           | Depends on |
| ------------------------------------------ | ----------------------------------------------- | ---------------- | ---------- |
| SP-000                                     | Repository foundation and architecture proposal | Done             | —          |
| [SP-001](tasks/SP-001-bootstrap.md)        | Runnable frontend, Python, and CDK toolchain    | Ready for review | SP-000     |
| [SP-006](tasks/SP-006-security-refresh.md) | Security dependency and toolchain refresh       | Ready for review | SP-001     |
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

SP-001 and SP-006 validation and review notes are in their task files. The final
security refresh passed all local checks, 16 automated tests, and both dependency
audits. Host CA/NSS packages were verified fixed on 2026-11-04. Hosted CI for the
refresh awaits a push. Review these changes before starting SP-002.

```text
Read AGENTS.md and planning/README.md. Continue task SP-NNN from its task file.
Inspect current code and git status before editing. Implement its acceptance
criteria, run the relevant available checks, and update its handoff for review.
```

Use [task](templates/task.md), [ADR](templates/adr.md), and
[MR](templates/merge-request.md) templates as needed. Keep plans concise and do
not copy implementation code into planning documents.
