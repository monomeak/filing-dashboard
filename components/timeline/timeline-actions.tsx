import {
  Check,
  CreditCard,
  MoreHorizontal,
  Pencil,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";
import type { ComponentType, RefObject } from "react";

import { cn } from "@/lib/utils";

import type { TimelineEvent } from "./types";

export type TimelineActionName =
  | "checkout"
  | "delete"
  | "update"
  | "amend"
  | "correct"
  | "renew"
  | "terminate";

interface TimelineAction {
  name: TimelineActionName;
  label: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  color: string;
}

interface TimelineActionsProps {
  actionsRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  actions?: TimelineActionName[];
  selectedEvent?: TimelineEvent;
  onAction: (action: TimelineActionName) => void;
  onToggle: () => void;
}

export function TimelineActions({
  actionsRef,
  isOpen,
  actions: actionNames,
  selectedEvent,
  onAction,
  onToggle,
}: TimelineActionsProps) {
  const actions = getAvailableActions(actionNames, selectedEvent);

  return (
    <div ref={actionsRef} className="relative">
      <button
        onClick={onToggle}
        disabled={!selectedEvent || actions.length === 0}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        More Actions
      </button>

      {isOpen && actions.length > 0 && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border bg-popover text-popover-foreground shadow-lg">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.name}
                onClick={() => onAction(action.name)}
                className="flex w-full items-center gap-3 border-b px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-muted first:rounded-t-md last:rounded-b-md"
              >
                <Icon className="h-4 w-4" aria-hidden={true} />
                <span className="font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const getAvailableActions = (
  actionNames?: TimelineActionName[],
  selectedEvent?: TimelineEvent,
): TimelineAction[] => {
  if (actionNames) {
    return actionNames.map((name) => actionConfig[name]);
  }

  const actions: TimelineAction[] = [];
  if (selectedEvent?.type === "create" || selectedEvent?.type === "amendment") {
    actions.push(actionConfig.amend);
  }

  if (selectedEvent?.type !== "termination") {
    actions.push(actionConfig.correct);
  }

  if (selectedEvent?.type !== "termination" && selectedEvent?.expirationDate) {
    actions.push(actionConfig.renew);
  }

  if (selectedEvent?.type !== "termination") {
    actions.push(actionConfig.terminate);
  }

  return actions;
};

const actionConfig: Record<TimelineActionName, TimelineAction> = {
  checkout: {
    name: "checkout",
    label: "Checkout",
    icon: CreditCard,
    color: "text-primary",
  },
  delete: {
    name: "delete",
    label: "Delete",
    icon: Trash2,
    color: "text-red-600",
  },
  update: {
    name: "update",
    label: "Update",
    icon: Pencil,
    color: "text-blue-600",
  },
  amend: {
    name: "amend",
    label: "Amend",
    icon: Pencil,
    color: "text-purple-600",
  },
  correct: {
    name: "correct",
    label: "Correct",
    icon: Check,
    color: "text-orange-500",
  },
  renew: {
    name: "renew",
    label: "Renew",
    icon: RotateCcw,
    color: "text-green-600",
  },
  terminate: {
    name: "terminate",
    label: "Terminate",
    icon: X,
    color: "text-red-600",
  },
};
