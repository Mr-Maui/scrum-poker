# Security refresh: 2026-11-02

This refresh addresses the October 2026 eMudhra/emSign incident and Node.js
security releases across development tooling, CI, and application dependencies.

## Runtime and utility pins

| Component                | Previous                                    | Current                                                     |
| ------------------------ | ------------------------------------------- | ----------------------------------------------------------- |
| Python                   | 3.12.14                                     | 3.12.16, python-build-standalone 20261026                   |
| Python's OpenSSL         | Earlier build                               | 3.5.9 in the managed build                                  |
| uv                       | 0.12.13                                     | 0.13.6                                                      |
| pip                      | Previously supplied by the interpreter/tool | 26.2.2, including the interpreter's ensurepip wheel         |
| Node.js                  | 24.21.0                                     | 24.22.2                                                     |
| npm                      | 11.19.0                                     | 12.2.1 (explicit install, separate from Node's bundled npm) |
| boto3 / botocore         | 1.43.113                                    | 1.43.123                                                    |
| certifi                  | Not a separate project dependency           | 2026.10.23 via the audit tooling                            |
| Hatchling build backend  | 1.27.0                                      | 1.33.0                                                      |
| Python audit utility     | Not installed                               | pip-audit 2.10.1                                            |
| CDK CLI / Python library | 2.1145.0 / 2.273.0                          | 2.1147.0 / 2.275.0                                          |
| Playwright               | 1.64.0                                      | 1.64.1, with matching browser binaries                      |
| setup-uv action          | v10.3.0                                     | v10.3.3, pinned by commit                                   |

Every npm direct dependency was checked on 2026-11-02 against the official registry's
stable releases; packages already at the newest compatible version retain their
version. Both dependency trees were refreshed, including Python transitive
packages. The exact versions and hashes are in `package-lock.json` and `uv.lock`.
Hatchling is pinned in both build manifests and included in the audited dev graph.
Python package metadata also requires at least 3.12.16, preventing installs into
older 3.12 environments outside the pinned uv workflow.

TypeScript moves to 6.0.3, the newest stable 6.0 release compatible with
typescript-eslint 8.72.1's declared `<6.1.0` peer range. TypeScript 7 is deferred
until the lint stack supports it. React Router moves to 8.5.1; the existing route
and browser behavior is covered by the verification suite.

The lint dependency graph still requested vulnerable minimatch releases after
ordinary updates. Root `overrides` pins minimatch 11.0.4 for all callers to fix
[GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). This is a
major transitive override, so linting and configuration discovery are checked
after installation. Remove the override when upstream ranges require patched
releases.

## What is verified

`npm run check` includes `uv run --frozen python scripts/check_trust.py`. It checks:

- The patched Python branch and bundled/installed pip versions, uv, and Node.
- certifi's bundle and pip's independent vendored certifi bundle.
- botocore's bundled roots, including AWS's additional removed roots.
- Node's compiled-in root store through its own TLS/X.509 APIs.

The test loads the real PEM bundles through OpenSSL and verifies that the
specified distrusted roots are absent. Python's interpreter-level denylist is
selected by the patched runtime requirement; no hostile TLS endpoint is queried.
Regression tests insert the actual removed public root into a patched bundle and
verify rejection, and verify acceptance of the clean bundle.
No TLS verification is disabled, and no custom trust roots are added.

`npm run audit` checks npm's complete tree and the installed Python environment
with pip-audit. The two local workspace packages have no public advisory identity
and are reported as skipped; their third-party dependencies are audited.
These audits use current advisory data and require network access. They do not
guarantee that every possible vulnerability has already been discovered.

CI updates the Ubuntu host CA/NSS packages, installs the pinned npm and uv tools,
then runs the shared checks, dependency audits, and Chromium smoke tests. The
checkout and setup-node action pins were verified and already match current
upstream releases. GitHub-hosted runner software is maintained by GitHub;
self-hosted runners require their own runtime and OS updates.

## Linux Mint host verification

Verified on **2026-11-04**: this Linux Mint 22.3/Noble workstation has
`ca-certificates 20260816ubuntu0.24.04.1` and `libnss3 2:3.98-1ubuntu0.3`, matching
the published fixed Noble packages. The current PEM bundle also excludes the
affected roots, checked directly with OpenSSL.

The initial 2026-11-02 attempt found older package versions and needed an
interactive sudo password. That manual update is no longer outstanding. The
fixed packages were observed on resumption, not installed by the resumed run.

The updated jsii runtime also detected group-write access on `~/.cache`; this
task removed that permission (0775 → 0755). CDK now passes its cache permission
check without disabling it.

For other Linux Mint/Noble installations still using older packages:

```sh
sudo apt-get update
sudo apt-get install --only-upgrade ca-certificates libnss3
dpkg-query -W ca-certificates libnss3
```

For Noble, the published fixed versions are at least
`20260816ubuntu0.24.04.1` for CA certificates and `2:3.98-1ubuntu0.3` for NSS.
Restart affected applications after updating and update any separately packaged
browsers. Other Python environments and global developer utilities are independent
of this repository and need their own upgrades. The system Python remains managed
by Linux Mint; the project uses uv's patched Python instead.

With the pinned prerequisites installed, `npm ci` and
`uv sync --frozen --all-packages` recreate the project dependencies. uv replaces a
virtual environment linked to an older interpreter when the Python pin changes.
Install the matching Chromium with `npm exec -- playwright install chromium`.
Production/container runtimes must also use patched images before deployment;
this repository currently has no deployed application runtime.

## Primary sources

- [Python security guidance and fixed interpreter releases](https://discuss.python.org/t/information-for-python-users-regarding-emudhra-emsign-ca-certificate-security-incident/109576/)
- [uv advisory](https://github.com/astral-sh/uv/security/advisories/GHSA-hq85-5cpj-mr62) and [uv 0.13.6 managed Python update](https://github.com/astral-sh/uv/releases/tag/0.13.6)
- [Node.js October security release](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)
- [AWS SDK trust-bundle bulletin](https://aws.amazon.com/security/security-bulletins/2026-150-aws/)
- [Ubuntu trust-store update](https://ubuntu.com/blog/emudhra-ca-compromise-fixes-available) and [NSS fixed versions](https://ubuntu.com/security/notices/USN-8947-1)
