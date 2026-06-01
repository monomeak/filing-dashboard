import Link from "next/link";
import { LayoutDashboard, Plus } from "lucide-react";

import { routes } from "@/lib/routes";

export function DashboardHeader() {
  return (
    <section className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-card">
            <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Track filing volume, submission status, certified searches, and
              recent citizen goods filings.
            </p>
          </div>
        </div>
      </div>

      <Link
        href={routes.newFiling}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Plus className="h-4 w-4" />
        New Filing
      </Link>
    </section>
  );
}
