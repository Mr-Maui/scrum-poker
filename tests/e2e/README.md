# End-to-end boundary

Status: Playwright checks the production frontend at desktop and mobile sizes.
The current suite covers route navigation, clear disconnected controls, keyboard
focus, and horizontal overflow. Live multi-user acceptance starts in SP-003.

Run `npm run build`, `npm exec -- playwright install chromium`, then
`npm run test:browser` from the repository root. The runner starts and stops the
local Vite preview server itself. No AWS configuration is needed for this suite.

Use separate browser contexts for host and guest. Cover create/join, private vote,
reveal, next round, refresh, network loss, and invalid/expired invitations. Inspect
network payloads to establish vote privacy, rather than checking only visible text.

Keep deterministic UI tests against mocks separate from a dev-stack suite that
validates real services. Each test uses its own room and bounded waits with useful
failure output. Document environment configuration and cleanup before enabling
the cloud suite in CI.
