import type { ComponentType } from "react";
import {
  DollarCircleOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
  FormOutlined,
} from "@ant-design/icons";

type SummaryCard = {
  label: string;
  value: string;
  detail: string;
  icon: ComponentType<{ className?: string }>;
};

type DashboardSummaryCardsProps = {
  totalDraft: number;
  totalPaid: number;
  totalLoanValue: number;
  totalCertifiedSearches: number;
};

const numberFormatter = new Intl.NumberFormat("en-US");

export function DashboardSummaryCards({
  totalDraft,
  totalPaid,
  totalLoanValue,
  totalCertifiedSearches,
}: DashboardSummaryCardsProps) {
  const cards: SummaryCard[] = [
    {
      label: "Draft Filings",
      value: numberFormatter.format(totalDraft),
      detail: "Awaiting finalization",
      icon: FormOutlined,
    },
    {
      label: "Paid Filings",
      value: numberFormatter.format(totalPaid),
      detail: "Completed filings in the registry",
      icon: FolderOpenOutlined,
    },
    {
      label: "Total Loan Value",
      value: numberFormatter.format(totalLoanValue),
      detail: "Aggregate declared loan value",
      icon: DollarCircleOutlined,
    },
    {
      label: "Certified Searches",
      value: numberFormatter.format(totalCertifiedSearches),
      detail: "Certified search results issued",
      icon: FileDoneOutlined,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <SummaryCardItem key={card.label} card={card} />
      ))}
    </section>
  );
}

function SummaryCardItem({ card }: { card: SummaryCard }) {
  const Icon = card.icon;

  return (
    <article className="group rounded-lg border border-border/80 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-muted-foreground">
            {card.label}
          </h3>
          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            {card.value}
          </p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-slate-600 dark:group-hover:text-slate-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 h-1 w-10 rounded-full bg-primary/80" />
      <p className="mt-3 text-sm leading-5 text-muted-foreground">
        {card.detail}
      </p>
    </article>
  );
}
