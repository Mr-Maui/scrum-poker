import { Link, useParams } from 'react-router';
import { ArrowLeft, LockKeyhole } from 'lucide-react';

import { ServiceNotice } from './service-notice';

// Layout preview only. Authoritative deck values will come from the room contract.
const previewDeck = ['0', '1', '2', '3', '5', '8', '13', '21+', '?'];

export function RoomPage() {
  const { roomId } = useParams();
  const isPreview = roomId === 'preview';

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to home
      </Link>
      <div className="mt-8 mb-6">
        <p className="eyebrow">
          {isPreview ? 'LAYOUT PREVIEW' : 'ESTIMATION ROOM'}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          {isPreview ? 'A space for your team.' : 'Room service unavailable'}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {isPreview
            ? 'Explore the layout. This preview is not a live room.'
            : 'We can’t load this room until the room service is connected.'}
        </p>
      </div>
      <ServiceNotice />
      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_280px]">
        <section
          aria-labelledby="round-heading"
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="round-heading" className="font-semibold">
              Current item
            </h2>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              Not connected
            </span>
          </div>
          <div className="mt-6 rounded-xl border border-dashed border-border px-5 py-12 text-center">
            <LockKeyhole
              className="mx-auto text-muted-foreground"
              size={24}
              aria-hidden="true"
            />
            <p className="mt-4 font-medium">Waiting for a connection</p>
            <p className="mt-2 text-sm text-muted-foreground">
              The item and round will appear here when a room is available.
            </p>
          </div>
          <h3 className="mt-8 text-sm font-medium">Choose your estimate</h3>
          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            {previewDeck.map((value) => (
              <button
                type="button"
                key={value}
                disabled
                aria-label={`Estimate ${value}`}
                className="flex h-20 w-14 items-center justify-center rounded-xl border border-border bg-background text-lg font-semibold text-muted-foreground disabled:cursor-not-allowed sm:h-24 sm:w-16"
              >
                {value}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Voting is unavailable while disconnected.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
            <button type="button" className="primary-button" disabled>
              Reveal estimates
            </button>
            <button type="button" className="secondary-button" disabled>
              Next round
            </button>
          </div>
        </section>
        <aside
          aria-labelledby="team-heading"
          className="self-start rounded-2xl border border-border bg-card p-6"
        >
          <h2 id="team-heading" className="font-semibold">
            Your team
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Participants and voting status will appear once connected.
          </p>
        </aside>
      </div>
    </main>
  );
}
