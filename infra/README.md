# Infrastructure boundary

Status: runnable CDK app with a private, encrypted, TLS-only, retained S3 asset
bucket. CloudFront and API resources arrive in SP-003.

Use CDK v2 in Python with an explicit app entry point, stack modules, and
assertion tests. Keep independently reusable constructs only when needed. One
application stack per environment is sufficient initially.

Expected resources are described in [architecture](../docs/architecture.md).
Account, region, environment, origins, and any domain must be explicit inputs.
Synth/test settings use documented placeholders and avoid live context lookups.

Run `npm run infra:synth` from the repository root. The pinned CDK CLI synthesizes
to `infra/cdk.out` with an explicit placeholder account (`000000000000`), region
(`eu-west-1`), and development environment; no credentials or live lookups are used.
Tests run through `uv run --frozen pytest`.

The CDK app has no default deployment target. Direct invocation requires
`deploymentEnvironment` (`dev`/`prod`), `awsAccount`, and `awsRegion` context inputs.
The all-zero account is for local synthesis only. Real account/region/domain inputs
and deployment jobs belong to later tasks; never deploy the local synthesis target.
