# Scrum Poker

An online estimation board: create a room, share an invitation, vote privately,
and reveal estimates together.

## Current status

Repository foundation and proposed architecture. Application code, dependency
lockfiles, CI integration, and deployed AWS resources are not implemented yet.
Architecture choices are recommendations for review, not recorded user approvals.

## Start here

- [Agent instructions](AGENTS.md): entry point for coding agents.
- [Product scope](docs/product.md): MVP behavior and working assumptions.
- [Architecture](docs/architecture.md): stack, state, security, and tradeoffs.
- [Development guide](docs/development.md): workflow, conventions, and checks.
- [Work board](planning/README.md): implementation sequence and current status.

## Repository layout

```text
apps/web/             React/TypeScript frontend boundary
services/api/         Python application and AWS adapter boundary
infra/               Python CDK boundary
contracts/           HTTP and event contract boundary
tests/e2e/           Multi-browser acceptance test boundary
docs/                Durable product and engineering knowledge
docs/decisions/      Architecture decision records (ADRs)
planning/            Tasks, acceptance criteria, and session handoffs
scripts/             Shared development and CI commands
```

Each application boundary currently contains a README describing its intended
structure. Create source directories when adding real code; do not add dummy
services or passing placeholder tests.

## Available check

Requires Python 3.11 or newer, with no third-party packages:

```sh
python3 scripts/check_repo.py
```

This checks repository documentation links and essential scaffold files. It is
not an application test. See [SP-001](planning/tasks/SP-001-bootstrap.md) for the
runnable toolchain bootstrap and its acceptance criteria.
