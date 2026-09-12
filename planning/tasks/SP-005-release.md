# SP-005: Prepare the public MVP

Status: Planned
Owner: Unassigned
Branch: Not started
Dependencies: SP-004
MR: Not opened

## Outcome

A reviewed release can be deployed, monitored, and rolled back with explicit
operating assumptions.

## Acceptance criteria

- [ ] Keyboard/mobile flows and all product acceptance scenarios pass.
- [ ] Review authorization, vote privacy, CSP/CORS, secret handling, payload/capacity
  limits, creation/join abuse controls, and session expiry.
- [ ] Run representative load checks; document active rooms/participants, commands,
  fanout, observed latency, throttling, and a regional cost estimate.
- [ ] Configure alerts for errors/delivery backlog and spending, with bounded logs.
- [ ] Document environment setup, deployment, smoke check, cleanup, and rollback.
- [ ] Configure deployment CI with short-lived AWS credentials and a production
  approval gate, then prepare a concrete deployment diff for maintainer review.

## Handoff

- Completed: not started.
- Checks run and results: not started.
- Known issues: public domain, region, budget, and production account need input
  before deployment configuration can be finalized.
- Next action: start once the complete dev room flow is verified.
