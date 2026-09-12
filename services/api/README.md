# Python backend boundary

Status: structural scaffold; package bootstrap is SP-001.

Planned structure:

```text
src/scrum_poker/domain/        Models, transitions, and public projections
src/scrum_poker/application/   Commands and storage/identity interfaces
src/scrum_poker/adapters/      DynamoDB, HTTP, sockets, and Streams
src/scrum_poker/handlers/      Thin Lambda entry points
tests/unit/                   Domain/application behavior
tests/integration/            AWS adapter behavior
```

Keep domain code independent of boto3 and Lambda envelopes. Define only the
interfaces real application behavior needs. Do not serialize storage models
directly. Share fixture/schema definitions through [contracts](../../contracts/README.md).
Runtime packaging excludes CDK and test dependencies.
