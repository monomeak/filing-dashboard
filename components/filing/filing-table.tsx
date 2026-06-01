import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FilingRecord } from "@/lib/demo-filings";

type FilingTableProps = {
  filings: FilingRecord[];
  emptyMessage: string;
};

export function FilingTable({ filings, emptyMessage }: FilingTableProps) {
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
            <TableHead className="px-5 py-3">Filing</TableHead>
            <TableHead className="px-5 py-3">Details</TableHead>
            <TableHead className="px-5 py-3">Created</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filings.map((filing) => (
            <TableRow key={filing.id}>
              <TableCell className="min-w-64 px-5 py-4">
                <p className="font-medium text-foreground">{filing.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {filing.id}
                </p>
              </TableCell>
              <TableCell className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-md border px-2 py-1 text-xs font-medium text-muted-foreground">
                    {filing.type}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {filing.collateral}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    ${filing.loanValue.toLocaleString()}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-5 py-4">
                <p className="text-sm font-medium text-foreground">
                  {filing.createdAt}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {filing.createdBy}
                </p>
              </TableCell>
              <TableCell className="px-5 py-4 text-right">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/filing/${encodeURIComponent(filing.id)}`}>
                    <Eye className="h-4 w-4" />
                    Details
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
