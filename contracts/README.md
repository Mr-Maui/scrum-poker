# Contract boundary

Status: contract ownership and scope defined; schemas are SP-002.

Commit an OpenAPI document for HTTP and JSON Schema documents for event envelopes,
with fixtures for voting-open and revealed snapshots. Use these as the canonical
wire contracts, generate TypeScript types, and validate Python models/responses
against them. Document generation commands and have CI fail on drift.

Planned HTTP operations: create room, join room, get personalized snapshot, cast
vote, reveal, next round, and issue WebSocket ticket. Socket operations cover
connection, heartbeat, and `room.updated` invalidation. Exact routes and schemas
must be defined before backend/frontend integration.

Include protocol version, room revision, round identity, command ID, typed errors,
and visibility rules. Schema changes must support a temporarily older browser
after deployment or produce an explicit upgrade-required response.

Never copy a raw room database record into a fixture. Include negative examples
for hidden-vote leakage, cross-room requests, stale rounds, and invalid deck values.
