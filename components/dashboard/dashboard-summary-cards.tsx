import type { LucideIcon } from 'lucide-react'
import { FileClock, FileText, ReceiptText, SearchCheck } from 'lucide-react'

import { cn } from '@/lib/utils'

type SummaryCard = {
  label: string
  value: number
  detail: string
  icon: LucideIcon
  iconClassName: string
  iconWrapClassName: string
}

type DashboardSummaryCardsProps = {
  totalDraft: number
  totalPaid: number
  totalTransactions: number
  totalCertifiedSearches: number
}

export function DashboardSummaryCards({
  totalDraft,
  totalPaid,
  totalTransactions,
  totalCertifiedSearches,
}: DashboardSummaryCardsProps) {
  const cards: SummaryCard[] = [
    {
      label: 'Draft filings',
      value: totalDraft,
      detail: 'Need review before submission',
      icon: FileClock,
      iconClassName: 'text-amber-600',
      iconWrapClassName: 'bg-amber-50',
    },
    {
      label: 'Paid filings',
      value: totalPaid,
      detail: 'Paid records in the lifecycle',
      icon: FileText,
      iconClassName: 'text-emerald-600',
      iconWrapClassName: 'bg-emerald-50',
    },
    {
      label: 'Transactions',
      value: totalTransactions,
      detail: 'Created from filing activity',
      icon: ReceiptText,
      iconClassName: 'text-sky-600',
      iconWrapClassName: 'bg-sky-50',
    },
    {
      label: 'Certified searches',
      value: totalCertifiedSearches,
      detail: 'Search filings issued',
      icon: SearchCheck,
      iconClassName: 'text-violet-600',
      iconWrapClassName: 'bg-violet-50',
    },
  ]

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <SummaryCardItem key={card.label} card={card} />
      ))}
    </section>
  )
}

function SummaryCardItem({ card }: { card: SummaryCard }) {
  const Icon = card.icon

  return (
    <article className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {card.label}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {card.value}
          </p>
        </div>
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-md',
            card.iconWrapClassName,
          )}
        >
          <Icon className={cn('h-5 w-5', card.iconClassName)} />
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{card.detail}</p>
    </article>
  )
}
