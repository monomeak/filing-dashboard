'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { FilingDetails } from '@/components/timeline/filing-details';
import {
  TimelineActions,
  type TimelineActionName,
} from '@/components/timeline/timeline-actions';
import { TimelineAxis } from '@/components/timeline/timeline-axis';
import { buildTimelineEvents } from '@/components/timeline/timeline-utils';
import type { TimelineEvent } from '@/components/timeline/types';

interface InteractiveTimelineProps {
  events: TimelineEvent[];
  rootFilingNumber?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  showActions?: boolean;
  actions?: TimelineActionName[];
}

export default function InteractiveTimeline({
  events,
  rootFilingNumber,
  title = 'Filing Timeline',
  subtitle = 'Review each filing phase against its date axis',
  className,
  showActions = true,
  actions,
}: InteractiveTimelineProps) {
  const [selectedId, setSelectedId] = useState<string | null>(events[0]?.id || null);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  const timelineEvents = useMemo(() => buildTimelineEvents(events), [events]);
  const selectedEvent = events.find((event) => event.id === selectedId);
  const selectedTimelineEvent = timelineEvents.find((event) => event.id === selectedId);
  const rootEvent = events.find((event) => event.type === 'create');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setIsActionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: TimelineActionName) => {
    setIsActionsOpen(false);
  };

  const shouldShowActions = showActions && (!actions || actions.length > 0);

  return (
    <section className={cn('w-full rounded-lg border bg-card shadow-sm', className)}>
      <div className="px-5 py-6 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {shouldShowActions && (
            <TimelineActions
              actionsRef={actionsRef}
              isOpen={isActionsOpen}
              actions={actions}
              selectedEvent={selectedEvent}
              onAction={handleAction}
              onToggle={() => setIsActionsOpen((isOpen) => !isOpen)}
            />
          )}
        </div>

        {rootEvent && <RootFilingSummary event={rootEvent} rootFilingNumber={rootFilingNumber} />}

        <TimelineAxis
          events={timelineEvents}
          selectedEvent={selectedEvent}
          selectedTimelineEvent={selectedTimelineEvent}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        {selectedEvent && <FilingDetails event={selectedEvent} />}
      </div>
    </section>
  );
}

function RootFilingSummary({
  event,
  rootFilingNumber,
}: {
  event: TimelineEvent;
  rootFilingNumber?: string;
}) {
  return (
    <div className="grid gap-4 rounded-t-md border bg-muted/50 p-4 sm:grid-cols-3">
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">Root Filing Number</p>
        <p className="mt-1 font-mono text-sm text-foreground">{rootFilingNumber || event.noticeNumber}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">Issued At</p>
        <p className="mt-1 text-sm text-foreground">{event.issuedDate}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">Expires</p>
        <p className="mt-1 text-sm text-foreground">{event.expirationDate}</p>
      </div>
    </div>
  );
}
