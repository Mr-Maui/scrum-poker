# Scrumation.com

An online estimation board: create a room, share an invitation, vote privately,
and reveal estimates together.

## Current status

SP-001 bootstraps the React frontend, installable Python API/infrastructure
packages, reproducible dependencies, and GitHub Actions validation. Home and room
routes run locally; room actions clearly remain unavailable until the API exists.
The stack was accepted on 2026-10-13. AWS resources have not been deployed.

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

Feature behavior starts with SP-002 (domain/contracts) and SP-003 (HTTP rooms).

## Security refresh

See [security update notes](docs/security-updates.md) for the eMudhra certificate
incident, patched versions, audits, and required Linux Mint host updates. Recreate
old virtual environments with the patched Python; updating Python dependencies
alone does not replace the interpreter or pip's bundled certificates.

## Linux / WSL quick start

Use Node **24.22.2**, npm **12.2.1**, and uv **0.13.6**. uv installs
Python **3.12.16**, pinned in `.python-version`. Install Node with your preferred
version manager (`nvm install && nvm use` reads `.nvmrc`) or an official binary;
do not use Linux Mint's potentially older system Node package. See the
[Node downloads](https://nodejs.org/en/download) and
[uv installation guide](https://docs.astral.sh/uv/getting-started/installation/).

```sh
npm install --global npm@12.2.1
npm ci
uv sync --frozen --all-packages
npm run dev
```

Open the local URL printed by Vite (normally `http://127.0.0.1:5173`).
`/rooms/preview` shows the room layout. No AWS credentials or environment secrets
are needed for local setup or checks. Scrumation.com is the product name;
production DNS/domain ownership is still a later deployment input.

```sh
npm run check
npm exec -- playwright install chromium
npm run test:browser
```

`check` runs formatting, linting, type checks, UI/infrastructure tests, frontend
build, documentation link checks, and offline CDK synthesis. Browser tests run
against that production build at desktop and mobile sizes. On a fresh Linux
installation, Playwright may need system libraries: use
`npm exec -- playwright install --with-deps chromium` (requires sudo for apt).

See [development](docs/development.md) for individual commands and the
[SP-001 handoff](planning/tasks/SP-001-bootstrap.md) for verified results.
