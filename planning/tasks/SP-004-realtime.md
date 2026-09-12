# SP-004: Add realtime updates and recovery

Status: Planned
Owner: Unassigned
Branch: Not started
Dependencies: SP-003
MR: Not opened

## Outcome

Room changes appear promptly and browsers recover from missed notifications or
network loss without corrupting votes or losing participant identity.

## Acceptance criteria

- [ ] Single-use ticket connection flow, scoped connection storage, Streams
  notifications, retry/failure handling, and alarms are implemented.
- [ ] Notifications carry only room ID/revision metadata and use server-controlled
  room membership; expired sessions stop receiving updates.
- [ ] Browser coalesces invalidations and reconciles monotonic snapshots on connect,
  reconnect, focus, command completion, and periodic recovery.
- [ ] Heartbeat leases, jittered reconnect, dead connection cleanup, and multiple
  tabs/connections are exercised. Disconnect never removes a vote.
- [ ] Tests cover duplicate/out-of-order notifications, missed disconnect, delayed
  snapshot responses, reconnect during reveal, expiry, and React effect remounts.
- [ ] Deployed dev integration verifies real API Gateway lifecycle and delivery;
  a forced disconnect tests recovery without waiting for the two-hour limit.

## Handoff

- Completed: transport/recovery proposal documented.
- Checks run and results: not started.
- Known issues: none beyond dependencies and AWS dev validation.
- Next action: implement after HTTP behavior passes acceptance checks.
