# SP-002: Define room rules and contracts

Status: Planned
Owner: Unassigned
Branch: Not started
Dependencies: SP-001
MR: Not opened

## Outcome

Room transitions and privacy rules are testable without AWS, and both languages
share a versioned description of requests, responses, and notifications.

## Acceptance criteria

- [ ] Pure create/join/vote/reveal/next-round transitions implement product rules.
- [ ] Tests establish hidden-vote projection for participant and host, forbidden
  actions, capacity/expiry, duplicate requests, and late old-round commands.
- [ ] Define opaque guest session and invitation lifecycle, single-use socket
  tickets, command receipt scope/fingerprint/retention, and explicit error codes.
- [ ] Commit OpenAPI, event schemas, and valid/invalid examples; generate frontend
  types reproducibly and validate inbound payloads at runtime.
- [ ] Define DynamoDB keys, indexes, conditional transactions, and access patterns;
  explain join/create idempotency and how retries recover original results.
- [ ] Document revision handling for late HTTP snapshots and invalidations.

## Handoff

- Completed: proposed behavior in product and architecture documents.
- Checks run and results: not started.
- Known issues: exact schemas and key design remain to be implemented.
- Next action: read `contracts/README.md` after SP-001.
