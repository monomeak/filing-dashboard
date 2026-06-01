import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { FilingRecord } from '@/lib/demo-filings'
import { routes } from '@/lib/routes'

type RecentFilingActivityProps = {
  filings: FilingRecord[]
}

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
              <TableHead>Filing</TableHead>
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
  )
}

function RecentFilingRow({ filing }: { filing: FilingRecord }) {
  return (
    <TableRow>
      <TableCell className="min-w-64">
        <div>
          <p className="font-medium text-foreground">{filing.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{filing.id}</p>
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
  )
}
