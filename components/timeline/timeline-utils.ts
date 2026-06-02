import type { TimelineDisplayEvent, TimelineEvent } from './types';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const normalizeDateString = (value?: string) => value?.replace(/\s-\s/, ' ') ?? '';

export const parseEventDate = (event: TimelineEvent) => {
  const parsed = Date.parse(normalizeDateString(event.issuedDate || event.date));
  if (Number.isNaN(parsed)) {
    return 0;
  }

  const date = new Date(parsed);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

export const formatAxisDate = (timestamp: number) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestamp));

export const formatPhaseDate = formatAxisDate;

export const buildTimelineEvents = (events: TimelineEvent[]): TimelineDisplayEvent[] => {
  const orderedEvents = [...events]
    .map((event) => ({ ...event, timestamp: parseEventDate(event) }))
    .sort((a, b) => {
      if (a.type === 'create' && b.type !== 'create') {
        return -1;
      }

      if (b.type === 'create' && a.type !== 'create') {
        return 1;
      }

      return a.timestamp - b.timestamp;
    });

  return orderedEvents.map((event, index) => {
    const previousEvent = orderedEvents[index - 1];

    return {
      ...event,
      elapsedLabel: previousEvent ? getElapsedLabel(previousEvent.timestamp, event.timestamp) : 'Start',
    };
  });
};

const getElapsedLabel = (from: number, to: number) => {
  const days = Math.abs(Math.round((to - from) / MS_PER_DAY));

  if (days <= 0) {
    return 'Same day';
  }

  if (days === 1) {
    return '1 day';
  }

  return `${days} days`;
};
