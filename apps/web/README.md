# Web frontend boundary

Status: runnable home and room shells, with service actions unavailable.

Use React, TypeScript, Vite, React Router, TanStack Query, and Tailwind. Add
shadcn/ui components when needed. See [architecture](../../docs/architecture.md)
for state ownership and [development](../../docs/development.md) for checks.

Current structure:

```text
src/app/                Router and providers
src/features/rooms/     Create/join/room UI and associated hooks/tests
src/styles/             Theme tokens and global stylesheet
src/test/               Shared test setup
```

Keep unit/component tests near the feature. Inject HTTP/socket boundaries for
tests, use deterministic fixtures, and distinguish mock mode visibly. Components
must not implement authoritative permissions or keep duplicate room caches.

From the repository root, run `npm run dev`, `npm test`, or `npm run build`.
TanStack Query is installed through one app provider. No fake room data or API
calls are introduced by the shells. Add `components/ui/` with selected shadcn/ui
components when real interactions need them, and `lib/` for the HTTP/socket client
and generated contracts during their implementation tasks.
