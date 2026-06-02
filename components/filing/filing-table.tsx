import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFilingExpiryItem, type FilingRecord } from "@/lib/demo-filings";

type FilingTableProps = {
  filings: FilingRecord[];
  emptyMessage: string;
  numberLabel: string;
};

export function FilingTable({
  filings,
  emptyMessage,
  numberLabel,
}: FilingTableProps) {
  if (filings.length === 0) {
    return (
      <div className="border-t p-8 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="border-t">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-5 py-3">{numberLabel}</TableHead>
            <TableHead className="px-5 py-3">Collateral type</TableHead>
            <TableHead className="px-5 py-3">Issued at</TableHead>
            <TableHead className="px-5 py-3">Expired at</TableHead>
            <TableHead className="px-5 py-3">Created by</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filings.map((filing) => {
            const expiry = getFilingExpiryItem(filing);

            return (
              <TableRow key={filing.id}>
                <TableCell className="min-w-56 px-5 py-4">
                  <Link
                    href={`/filing/${encodeURIComponent(filing.id)}`}
                    className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {filing.id}
                  </Link>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <span className="inline-flex rounded-md border px-2 py-1 text-xs font-medium text-muted-foreground">
                    {filing.collateral}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4 text-sm text-foreground">
                  {filing.createdAt}
                </TableCell>
                <TableCell className="px-5 py-4 text-sm text-foreground">
                  {expiry.expiresAt}
                </TableCell>
                <TableCell className="px-5 py-4 text-sm text-foreground">
                  {filing.createdBy}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
