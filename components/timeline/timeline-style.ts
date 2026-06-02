import type { TimelineEventType } from './types';

export const typeConfig: Record<
  TimelineEventType,
  {
    label: string;
    color: string;
    softColor: string;
    borderColor: string;
    textColor: string;
    ringColor: string;
  }
> = {
  create: {
    label: 'Created',
    color: 'bg-blue-600',
    softColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    ringColor: 'ring-blue-200',
  },
  amendment: {
    label: 'Amendment',
    color: 'bg-purple-600',
    softColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    ringColor: 'ring-purple-200',
  },
  correction: {
    label: 'Correction',
    color: 'bg-orange-500',
    softColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    ringColor: 'ring-orange-200',
  },
  renew: {
    label: 'Renewed',
    color: 'bg-green-600',
    softColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    ringColor: 'ring-green-200',
  },
  termination: {
    label: 'Terminated',
    color: 'bg-red-600',
    softColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    ringColor: 'ring-red-200',
  },
};
