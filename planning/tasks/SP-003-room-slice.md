# SP-003: Build the HTTP room slice

Status: Planned
Owner: Unassigned
Branch: Not started
Dependencies: SP-002
MR: Not opened

## Outcome

Two people can create/join a room, cast private estimates, reveal, and start a
new round. Temporary polling provides synchronization until SP-004.

## Acceptance criteria

- [ ] Implement authenticated HTTP handlers and DynamoDB adapters with bounded
  optimistic-concurrency retries and durable command receipts.
- [ ] Define HTTP API, tables, IAM, expiry, log retention, and frontend hosting
  in CDK; all deployment inputs are explicit.
- [ ] Implement accessible room UI with pending/error/disconnected states and
  one query cache; no other user's hidden estimates reach a browser.
- [ ] Two-browser Playwright scenario demonstrates create/join/vote/reveal/reset.
- [ ] AWS integration checks cover parallel votes, duplicate commands, forged
  identity, cross-room access, expiry, and stale-round rejection.
- [ ] Record dev deployment/check results if authorized and configured; explicitly
  leave cloud validation pending otherwise.

## Handoff

- Completed: not started.
- Checks run and results: not started.
- Known issues: AWS dev account/region needed for integration validation.
- Next action: implement after domain and contracts are established.
