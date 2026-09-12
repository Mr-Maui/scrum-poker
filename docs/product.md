# Product scope

Status: proposed MVP assumptions, 2026-09-12. Adjust these before implementing
behavior that depends on a different product decision.

## Core session

1. A person creates a room and becomes its host.
2. They share an unguessable invitation link. Guests join with a display name;
   accounts are not required.
3. The host enters an item title. Participants select an estimate independently.
4. Everyone can see who has voted, but only their own estimate, until the host
   reveals the round.
5. Reveal freezes voting and displays individual estimates and a distribution.
6. The host starts a fresh round for the next item. Previous values cannot leak
   into it.

## Working defaults

| Concern | MVP default |
| --- | --- |
| Room capacity | 20 participants, including host |
| Deck | `0, 1, 2, 3, 5, 8, 13, 21, ?` |
| Host voting | Host may vote like any participant |
| Vote changes | Allowed while voting is open |
| Reveal | Host-only, including when some people have not voted |
| Next round | Host-only; new round ID and empty votes |
| Disconnect | Keep identity and vote; show disconnected presence |
| Refresh/reconnect | Resume with the same valid guest session |
| New browser/session loss | Join as a new participant; no name-based recovery |
| Host disconnect | Preserve host ownership; reconnect to resume controls |
| Host credential loss | Create a new room; host transfer is deferred |
| Expiration | Fixed 24 hours after creation; application enforces expiry |
| History | Current round only; next round discards previous estimates |
| Access | Anyone possessing the invitation can join within capacity |
| Browsers | Current mainstream desktop and mobile browsers |

Display names are labels, not unique identifiers. `?` is a nonnumeric estimate;
exclude it from any numeric summary. Do not prescribe an automatic final estimate
from a mean; the team makes that decision.

## Out of scope initially

Accounts/SSO, organizations, Jira integration, billing, chat/video, persistent
backlogs, exports, custom decks, spectators, host transfer, and multi-region
operation. Record additions as tasks rather than silently expanding the MVP.

## Acceptance scenarios

- Two independent browsers join one room and see the same round and participants.
- Network responses and events contain no other participant's hidden estimate.
- A participant cannot reveal, reset, impersonate the host, or access another
  room by altering a request.
- Simultaneous votes do not overwrite each other. A delayed old-round vote is
  rejected, and duplicate commands do not apply twice.
- Refresh, temporary network loss, and reconnect restore authoritative state.
- Expired invitations/sessions return a clear error even if database TTL cleanup
  has not run. The UI distinguishes disconnected, pending, and failed commands.
- Voting and host controls work with a keyboard, visible focus, and accessible
  names; status is communicated with text as well as color.
