import { cn } from '@/lib/utils';

import { typeConfig } from './timeline-style';
import { formatAxisDate, formatPhaseDate } from './timeline-utils';
import type { TimelineDisplayEvent, TimelineEvent } from './types';

interface TimelineAxisProps {
  events: TimelineDisplayEvent[];
  selectedEvent?: TimelineEvent;
  selectedTimelineEvent?: TimelineDisplayEvent;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TimelineAxis({
  events,
  selectedEvent,
  selectedTimelineEvent,
  selectedId,
  onSelect,
}: TimelineAxisProps) {
  return (
    <div className="mb-8 rounded-b-md border-x border-b bg-card">
      <div className="hover-scrollbar overflow-x-auto">
        <div className="min-w-[760px] px-5 pb-6 pt-5">
          <div className="relative">
            <div className="absolute left-0 right-0 top-[3.85rem] h-px bg-border" aria-hidden="true" />
            <div
              className="relative grid gap-4"
              style={{ gridTemplateColumns: `repeat(${events.length}, minmax(160px, 1fr))` }}
            >
              {events.map((event) => (
                <PhaseButton
                  key={event.id}
                  event={event}
                  isSelected={event.id === selectedId}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && selectedTimelineEvent && (
        <div className="flex flex-col gap-3 border-t bg-muted/40 px-5 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold text-foreground">{typeConfig[selectedEvent.type].label}</span>
            <span className="mx-2 text-muted-foreground/60">/</span>
            <span>{formatAxisDate(selectedTimelineEvent.timestamp)}</span>
          </div>
          <div>
            {selectedEvent.status || selectedEvent.description || 'Select a phase to inspect filing details'}
          </div>
        </div>
      )}
    </div>
  );
}

interface PhaseButtonProps {
  event: TimelineDisplayEvent;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function PhaseButton({ event, isSelected, onSelect }: PhaseButtonProps) {
  const config = typeConfig[event.type];

  return (
    <div className="min-w-0">
      <div className="flex flex-col items-center text-center">
        <span className="text-[11px] font-medium text-muted-foreground">{formatPhaseDate(event.timestamp)}</span>
        <span className="mt-2 h-8 w-px bg-border" aria-hidden="true" />
        <span
          className={cn('h-3 w-3 rounded-full ring-4 ring-card', config.color)}
          aria-hidden="true"
        />
      </div>
      <button
        type="button"
        onClick={() => onSelect(event.id)}
        aria-pressed={isSelected}
        className={cn(
          'mt-4 min-h-28 w-full rounded-md border bg-card p-3 text-left shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-4',
          isSelected
            ? cn(config.borderColor, config.softColor, config.ringColor, 'border-2 shadow-md')
            : 'hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-md focus-visible:ring-ring/30',
        )}
      >
        <span className={cn('text-xs font-semibold uppercase tracking-wide', config.textColor)}>{config.label}</span>
        <span className="mt-1 block truncate font-mono text-sm text-foreground">{event.noticeNumber}</span>
      </button>
    </div>
  );
}
