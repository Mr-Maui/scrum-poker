# Web frontend boundary

Status: structural scaffold; runnable application is SP-001.

Use React, TypeScript, Vite, React Router, TanStack Query, and Tailwind. Add
shadcn/ui components when needed. See [architecture](../../docs/architecture.md)
for state ownership and [development](../../docs/development.md) for checks.

Create this structure with the first implementation:

```text
src/app/                Router and providers
src/features/rooms/     Create/join/room UI and associated hooks/tests
src/components/ui/      Shared UI primitives
src/lib/                HTTP client, socket lifecycle, generated contract types
src/styles/             Theme tokens and global stylesheet
```

Keep unit/component tests near the feature. Inject HTTP/socket boundaries for
tests, use deterministic fixtures, and distinguish mock mode visibly. Components
must not implement authoritative permissions or keep duplicate room caches.
