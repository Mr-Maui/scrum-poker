# ADR-0001: React SPA with a Python serverless backend

Status: Proposed
Date: 2026-09-12
Decision owner: project maintainer

## Context

We need small collaborative estimation rooms, reliable hidden voting, and a
repository that agents can work in across sessions. The maintainer knows Python,
AWS, and CDK and will review changes. Usage is expected to be intermittent.

## Proposed decision

Use a monorepo with a React/TypeScript/Vite SPA, React Router, TanStack Query,
Tailwind v4, and selectively adopted shadcn/ui components. Use Python Lambda,
HTTP API commands, WebSocket invalidations, DynamoDB and Streams, and Python CDK.
Serve static assets from S3 through CloudFront.

Keep authoritative room state in the server and one frontend query cache. Model
the current room as a bounded aggregate, with private vote serialization and
conditional writes. Begin with guest rooms, not registered accounts.

## Consequences

Static frontend deployment and on-demand backend execution fit the workload.
Two languages require explicit contracts. The team owns socket lifecycle,
delivery retries, concurrency rules, and guest authorization. Avoiding a frontend
server means revisiting this choice if SSR becomes a product requirement.

## Alternatives and validation

Alternatives and operating details are in [the architecture](../architecture.md).
Validate with a two-browser create/join/vote/reveal/reconnect slice in an AWS dev
stack, including vote privacy assertions and concurrent commands. Reassess the
transport if operational complexity outweighs the benefits.
