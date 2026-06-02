import Link from "next/link";

import type { FilingExpiryItem } from "@/lib/demo-filings";
import { routes } from "@/lib/routes";

type ExpiryMonitoringProps = {
  nearestExpiries: FilingExpiryItem[];
};

const statusStyles = {
  Active: "bg-muted text-muted-foreground",
  Expired: "bg-destructive/10 text-destructive",
  "Expiring Soon": "bg-primary/10 text-primary",
};

function formatExpiryDistance(daysUntilExpiry: number) {
  if (daysUntilExpiry < 0) {
    return `${Math.abs(daysUntilExpiry)}d overdue`;
  }

  if (daysUntilExpiry === 0) {
    return "Due today";
  }

  return `${daysUntilExpiry}d left`;
}

export function ExpiryMonitoring({ nearestExpiries }: ExpiryMonitoringProps) {
  return (
    <article className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Expiry Monitoring
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Track filings that need renewal attention.
          </p>
        </div>
        <Link
          href={`${routes.filing}?filter=expiring-soon`}
          className="shrink-0 rounded-md border px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          View all
        </Link>
      </div>

      <div className="mt-6">
        <div className="mt-3 space-y-3">
          {nearestExpiries.map((filing) => (
            <div
              key={filing.id}
              className="flex items-center justify-between gap-3 rounded-lg border bg-background px-3 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {filing.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Expires {filing.expiresAt}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[filing.status]}`}
                >
                  {filing.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatExpiryDistance(filing.daysUntilExpiry)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
