import { Link, Route, Routes } from 'react-router';
import { ArrowUpRight, Layers3 } from 'lucide-react';

import { HomePage } from '../features/rooms/home-page';
import { RoomPage } from '../features/rooms/room-page';

export function App() {
  return (
    <div className="min-h-screen">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <Link
            to="/"
            aria-label="Scrumation.com home"
            className="flex items-center gap-3 font-semibold tracking-tight"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Layers3 size={19} aria-hidden="true" />
            </span>
            <span>
              Scrumation<span className="text-muted-foreground">.com</span>
            </span>
          </Link>
          <Link
            to="/rooms/preview"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            Room preview <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms/:roomId" element={<RoomPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <footer className="mx-auto max-w-6xl px-5 py-8 text-xs text-muted-foreground sm:px-8">
        Scrumation.com · A little structure. A better conversation.
      </footer>
    </div>
  );
}

function NotFoundPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        This address doesn’t point to a page.
      </p>
      <Link className="mt-6 inline-block underline underline-offset-4" to="/">
        Back to home
      </Link>
    </main>
  );
}
