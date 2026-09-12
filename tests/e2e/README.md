# End-to-end boundary

Status: scenarios defined; Playwright setup and tests are implementation tasks.

Use separate browser contexts for host and guest. Cover create/join, private vote,
reveal, next round, refresh, network loss, and invalid/expired invitations. Inspect
network payloads to establish vote privacy, rather than checking only visible text.

Keep deterministic UI tests against mocks separate from a dev-stack suite that
validates real services. Each test uses its own room and bounded waits with useful
failure output. Document environment configuration and cleanup before enabling
the cloud suite in CI.
