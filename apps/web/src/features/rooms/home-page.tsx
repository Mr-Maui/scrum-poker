import { ArrowRight, Check, UsersRound } from 'lucide-react';
import { Link } from 'react-router';

import { ServiceNotice } from './service-notice';

export function HomePage() {
  return (
    <main
      id="main-content"
      className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-20"
    >
      <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <section className="pt-2">
          <p className="eyebrow">TEAM ESTIMATION, TOGETHER</p>
          <h1 className="mt-5 max-w-xl text-5xl leading-[1.08] font-semibold tracking-[-0.045em] sm:text-6xl">
            Make room for
            <br />
            <span className="text-primary">better estimates.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Bring your team together, consider the work, and turn individual
            estimates into a shared conversation.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              'A shared room for the whole team',
              'Independent votes before the reveal',
              'A fresh round for each item',
            ].map((text) => (
              <li key={text} className="flex items-center gap-3">
                <Check size={16} className="text-primary" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
          <Link
            className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            to="/rooms/preview"
          >
            Explore the room layout <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>
        <section
          aria-labelledby="session-heading"
          className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="mb-6 flex size-11 items-center justify-center rounded-xl bg-muted text-primary">
            <UsersRound size={22} aria-hidden="true" />
          </div>
          <h2
            id="session-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Your next refinement starts here.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            One room. One invitation. Everyone’s perspective.
          </p>
          <div className="mt-6">
            <ServiceNotice />
          </div>
          <button type="button" disabled className="primary-button mt-6 w-full">
            Create a room <ArrowRight size={16} aria-hidden="true" />
          </button>
          <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            OR JOIN YOUR TEAM
            <span className="h-px flex-1 bg-border" />
          </div>
          <label htmlFor="invitation" className="text-sm font-medium">
            Room invitation
          </label>
          <input
            id="invitation"
            disabled
            placeholder="Paste your invitation link"
            className="mt-2 w-full rounded-lg border border-border bg-muted/40 px-3 py-3 text-sm disabled:cursor-not-allowed"
          />
          <button
            type="button"
            disabled
            className="secondary-button mt-3 w-full"
          >
            Join a room
          </button>
        </section>
      </div>
      <section
        aria-label="How estimation works"
        className="mt-16 grid gap-8 border-t border-border py-9 sm:mt-24 sm:grid-cols-3"
      >
        {[
          [
            '01',
            'Gather your team',
            'Share a room invitation and get everyone around the same table.',
          ],
          [
            '02',
            'Think independently',
            'Choose an estimate without being influenced by anyone else’s vote.',
          ],
          [
            '03',
            'Reveal and discuss',
            'Compare perspectives and explore the differences together.',
          ],
        ].map(([number, title, description]) => (
          <div key={number}>
            <p className="eyebrow text-primary">{number}</p>
            <h2 className="mt-3 font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
