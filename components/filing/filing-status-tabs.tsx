import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getFilingExpiryItem,
  type FilingRecord,
  type FilingStatus,
} from "@/lib/demo-filings";

import {
  FileTextOutlined as FileText,
  PlusOutlined as Plus,
} from "@ant-design/icons";

import { Button } from "@/components/ui/button";

import { FilingTable } from "./filing-table";
import Link from "next/link";
import { routes } from "@/lib/routes";

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
  const numberLabel =
    activeFilter === "Draft" ? "Draft number" : "Notice number";

  return (
    <Tabs
      value={activeFilter}
      onValueChange={(value) => onFilterChange(value as FilingFilter)}
      className="gap-0"
    >
      <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
          <TabsList className="h-auto w-max min-w-full justify-start gap-1 bg-muted/60 p-1 sm:min-w-0">
            {filters.map((filter) => {
              const total = getFilteredFilings(filings, filter.value).length;

              return (
                <TabsTrigger
                  key={filter.value}
                  value={filter.value}
                  className="shrink-0 gap-2 whitespace-nowrap px-3 py-2 text-sm"
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

        <Button asChild className="w-full sm:w-auto">
          <Link href={routes.newFiling}>
            <Plus className="h-4 w-4" />
            New Filing
          </Link>
        </Button>
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
