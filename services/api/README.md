# Python backend boundary

Status: installable `scrumation-api` package; domain behavior starts in SP-002.

Planned structure:

```text
src/scrumation_api/domain/        Models, transitions, and public projections
src/scrumation_api/application/   Commands and storage/identity interfaces
src/scrumation_api/adapters/      DynamoDB, HTTP, sockets, and Streams
src/scrumation_api/handlers/      Thin Lambda entry points
tests/unit/                   Domain/application behavior
tests/integration/            AWS adapter behavior
```

Keep domain code independent of boto3 and Lambda envelopes. Define only the
interfaces real application behavior needs. Do not serialize storage models
directly. Share fixture/schema definitions through [contracts](../../contracts/README.md).
Runtime packaging excludes CDK and test dependencies.

The package currently has no routes/handlers. It declares boto3 and Pydantic
runtime dependencies; root development tooling and the infrastructure package
have their own dependencies. See [development commands](../../docs/development.md)
for isolated runtime installs and package builds.
