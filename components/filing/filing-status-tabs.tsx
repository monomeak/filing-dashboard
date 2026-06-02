import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getFilingExpiryItem,
  type FilingRecord,
  type FilingStatus,
} from "@/lib/demo-filings";

import { FilingTable } from "./filing-table";

export type FilingFilter = FilingStatus | "expiring-soon" | "expired";

type FilingStatusTabsProps = {
  activeFilter: FilingFilter;
  filtersActive?: boolean;
  filings: FilingRecord[];
  onFilterChange: (filter: FilingFilter) => void;
};

const filters: Array<{ label: string; value: FilingFilter }> = [
  { label: "Draft", value: "Draft" },
  { label: "Paid", value: "Paid" },
  { label: "Near Expiry", value: "expiring-soon" },
  { label: "Expired", value: "expired" },
];

function getFilteredFilings(filings: FilingRecord[], filter: FilingFilter) {
  if (filter === "expiring-soon") {
    return filings.filter(
      (filing) => getFilingExpiryItem(filing).status === "Expiring Soon",
    );
  }

  if (filter === "expired") {
    return filings.filter(
      (filing) => getFilingExpiryItem(filing).status === "Expired",
    );
  }

  return filings.filter((filing) => filing.status === filter);
}

export function FilingStatusTabs({
  activeFilter,
  filtersActive = false,
  filings,
  onFilterChange,
}: FilingStatusTabsProps) {
  const activeFilings = getFilteredFilings(filings, activeFilter);
  const activeLabel =
    filters.find((filter) => filter.value === activeFilter)?.label ??
    "selected";
  const numberLabel = activeFilter === "Draft" ? "Draft number" : "Notice number";

  return (
    <Tabs
      value={activeFilter}
      onValueChange={(value) => onFilterChange(value as FilingFilter)}
      className="gap-0"
    >
      <div className="border-t px-5 py-4">
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-muted/60 p-1">
          {filters.map((filter) => {
            const total = getFilteredFilings(filings, filter.value).length;

            return (
              <TabsTrigger
                key={filter.value}
                value={filter.value}
                className="gap-2 px-3 py-2 text-sm"
              >
                {filter.label}
                <span className="rounded bg-background px-1.5 py-0.5 text-xs text-muted-foreground">
                  {total}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      <TabsContent value={activeFilter}>
        <FilingTable
          filings={activeFilings}
          numberLabel={numberLabel}
          emptyMessage={
            filtersActive
              ? `No ${activeLabel.toLowerCase()} filings match the selected filters.`
              : `No ${activeLabel.toLowerCase()} filings yet.`
          }
        />
      </TabsContent>
    </Tabs>
  );
}
