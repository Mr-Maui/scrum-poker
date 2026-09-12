# Infrastructure boundary

Status: structural scaffold; CDK app bootstrap is SP-001.

Use CDK v2 in Python with an explicit app entry point, stack modules, and
assertion tests. Keep independently reusable constructs only when needed. One
application stack per environment is sufficient initially.

Expected resources are described in [architecture](../docs/architecture.md).
Account, region, environment, origins, and any domain must be explicit inputs.
Synth/test settings use documented placeholders and avoid live context lookups.

CDK needs Node even with Python. Pin the CLI in repository tooling during
bootstrap; do not rely on an arbitrary globally installed CLI. Deployment commands
will be documented once implemented and target configuration is established.
