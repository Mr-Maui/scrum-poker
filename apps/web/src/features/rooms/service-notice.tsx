import { CircleDashed } from 'lucide-react';

export function ServiceNotice() {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-xl border border-border bg-muted/60 px-4 py-3 text-sm"
    >
      <CircleDashed
        className="mt-0.5 shrink-0 text-primary"
        size={17}
        aria-hidden="true"
      />
      <p>
        <span className="font-medium">Rooms are coming soon.</span>{' '}
        <span className="text-muted-foreground">
          The room service is not connected. Creating, joining, and voting are
          unavailable.
        </span>
      </p>
    </div>
  );
}
