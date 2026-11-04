# SP-006: Refresh security-sensitive runtimes and dependencies

Status: Ready for review
Owner: Codex
Branch: codex/sp-001-bootstrap (requested by maintainer)
Date: 2026-11-02
Verified: 2026-11-04
MR: Existing branch; no new PR opened

## Outcome

Upgrade project runtimes, package managers, direct/transitive dependencies, build
backends, browser tooling, and CI pins following the October 2026 eMudhra and
Node.js security advisories.

## Acceptance criteria

- [x] Pin patched Python 3.12, Node 24, npm, and uv releases in development and CI.
- [x] Refresh all dependency manifests and both lockfiles, including build tools.
- [x] Verify AWS SDK bundled certificates and Python/Node trust protections.
- [x] Run dependency audits, the shared checks, package builds, and browser tests.
- [x] Document sources, validation, and any host-system remediation still needed.

## Problem and resulting behavior

The bootstrap pinned runtimes and tools predating the October CA incident and
Node.js security fixes. Development and CI now use Python 3.12.16, Node 24.22.2,
npm 12.2.1, and uv 0.13.6, with refreshed npm/Python dependency graphs and build
backends. Python package metadata rejects older 3.12 interpreters.

The shared check verifies actual Node, certifi, pip, and botocore certificate
bundles. Regression tests establish rejection of a real distrusted public root
inserted into an otherwise clean bundle. CI additionally runs full npm/Python
advisory audits and updates the runner's CA/NSS packages.

## Validation

Verified on 2026-11-04 with the pinned toolchain:

- `npm run check`: formatting, ESLint, strict TypeScript, four Vitest tests,
  build, Ruff, mypy, eight pytest tests, documentation links, trust-bundle
  assertions, and CDK synthesis passed.
- `npm run test:browser`: four desktop/mobile Chromium tests passed, with the
  runner managing its preview server. Total automated tests: 16.
- `npm run audit`: npm reported zero vulnerabilities; pip-audit reported no known
  vulnerabilities. Local workspace packages are explicitly reported as skipped;
  their third-party dependencies are audited.
- `uv build --package scrumation-api --out-dir dist/api` and the equivalent infra
  build: wheels and source distributions passed, including after raising the
  interpreter metadata floor to 3.12.16.
- Isolated frozen API runtime install: verified that pip-audit, pytest, Hatchling,
  CDK, and the infrastructure package are excluded.
- Clean `npm ci --offline` and `uv sync --frozen --all-packages --offline` passed
  on 2026-11-02 before pausing; final lock regeneration used cached packages and
  did not change resolved versions.
- Linux Mint/Noble host packages now match published fixes:
  `ca-certificates 20260816ubuntu0.24.04.1`, `libnss3 2:3.98-1ubuntu0.3`.
  These were observed on resumption; the earlier sudo update is no longer pending.
- The updated jsii cache check passes after removing group-write access from
  `~/.cache` (0775 → 0755), without disabling its security check.

## Risks and rollout

TypeScript 6, React Router 8, and mypy 2 are compatibility upgrades covered by the
checks above. TypeScript 7 remains outside typescript-eslint's supported peer
range. A minimatch 11.0.4 override is required to fix the advisory in upstream lint
dependencies; remove it when their dependency ranges require patched releases.
No vulnerability ignore list or audit severity filter is used.

No AWS resources were deployed. Hosted CI for these changes awaits a push.
Runtimes used for local verification live under `/tmp`; the repository documents
the permanent toolchain setup. Other projects' environments remain independent.

## References

[Security update notes and primary advisories](../../docs/security-updates.md),
[development commands](../../docs/development.md).

## Handoff

- Completed: dependency/runtime refresh, trust checks, regression fixture, CI
  audit integration, host verification, and validation above.
- Remaining: maintainer review and hosted CI after the branch is pushed.
- Next action: review SP-001/SP-006 on this branch before starting SP-002.
