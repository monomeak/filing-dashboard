import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FilingRecord, FilingStatus } from "@/lib/demo-filings";

import { FilingTable } from "./filing-table";

type FilingStatusTabsProps = {
  filings: FilingRecord[];
  searchTerm?: string;
};

const statuses: FilingStatus[] = ["Draft", "Paid"];

export function FilingStatusTabs({
  filings,
  searchTerm = "",
}: FilingStatusTabsProps) {
  return (
    <Tabs defaultValue="Draft" className="gap-0">
      <div className="border-t px-5 py-4">
        <TabsList>
        {statuses.map((status) => {
          const total = filings.filter(
            (filing) => filing.status === status,
          ).length;

          return (
            <TabsTrigger key={status} value={status}>
              {status}
              <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                {total}
              </span>
            </TabsTrigger>
          );
        })}
        </TabsList>
      </div>

      {statuses.map((status) => (
        <TabsContent key={status} value={status}>
          <FilingTable
            filings={filings.filter((filing) => filing.status === status)}
            emptyMessage={
              searchTerm
                ? `No ${status.toLowerCase()} filings match "${searchTerm}".`
                : `No ${status.toLowerCase()} filings yet.`
            }
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
