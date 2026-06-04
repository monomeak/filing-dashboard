"use client";

import Link from "next/link";
import { ArrowRightOutlined as ArrowRight } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FilingRecord } from "@/lib/demo-filings";
import { routes } from "@/lib/routes";

type RecentFilingActivityProps = {
  filings: FilingRecord[];
};

export function RecentFilingActivity({ filings }: RecentFilingActivityProps) {
  return (
    <section className="rounded-lg border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Recent Filing Activity
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Static demo records generated from the citizen goods filing flow.
          </p>
        </div>
        <Link
          href={routes.filing}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground"
        >
          All filings
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="p-2 sm:p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Draft / Notice number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Collateral</TableHead>
              <TableHead>Loan value</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Created by</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filings.map((filing) => (
              <RecentFilingRow key={filing.id} filing={filing} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

function RecentFilingRow({ filing }: { filing: FilingRecord }) {
  const router = useRouter();
  const filingHref = `/filing/${encodeURIComponent(filing.id)}`;
  const numberLabel =
    filing.status === "Draft" ? "Draft number" : "Notice number";

  return (
    <TableRow
      className="cursor-pointer transition-colors hover:bg-muted/50"
      tabIndex={0}
      onClick={() => router.push(filingHref)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(filingHref);
        }
      }}
      aria-label={`View filing ${filing.id}`}
    >
      <TableCell className="min-w-64">
        <div>
          <Link
            href={filingHref}
            className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={(event) => event.stopPropagation()}
          >
            {filing.id}
          </Link>
        </div>
      </TableCell>
      <TableCell>{filing.type}</TableCell>
      <TableCell>
        <span className="inline-flex rounded-md border px-2 py-1 text-xs font-medium text-muted-foreground">
          {filing.status}
        </span>
      </TableCell>
      <TableCell>{filing.collateral}</TableCell>
      <TableCell>${filing.loanValue.toLocaleString()}</TableCell>
      <TableCell>{filing.createdAt}</TableCell>
      <TableCell>{filing.createdBy}</TableCell>
    </TableRow>
  );
}
