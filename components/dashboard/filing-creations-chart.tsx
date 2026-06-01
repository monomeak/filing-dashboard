import { TrendingUp } from 'lucide-react'

import type { FilingCreationTrendItem } from '@/lib/demo-filings'

type FilingCreationsChartProps = {
  trend: FilingCreationTrendItem[]
}

export function FilingCreationsChart({ trend }: FilingCreationsChartProps) {
  const maxTrendCount = Math.max(...trend.map((item) => item.count))

  return (
    <article className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Last Filing Creations
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Filing records created during the last seven active days.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
          <TrendingUp className="h-4 w-4" />
          +42% this week
        </div>
      </div>

      <div className="mt-8 flex h-64 items-end gap-3 border-b border-l pl-4 sm:gap-5">
        {trend.map((item) => (
          <TrendBar key={item.label} item={item} maxCount={maxTrendCount} />
        ))}
      </div>
    </article>
  )
}

function TrendBar({
  item,
  maxCount,
}: {
  item: FilingCreationTrendItem
  maxCount: number
}) {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col justify-end gap-3">
      <div
        className="rounded-t-md bg-sky-500 transition-colors hover:bg-sky-600"
        style={{ height: `${Math.max((item.count / maxCount) * 100, 12)}%` }}
        title={`${item.count} filings`}
      />
      <div className="min-h-10 text-center">
        <p className="text-sm font-medium text-foreground">{item.count}</p>
        <p className="text-xs text-muted-foreground">{item.label}</p>
      </div>
    </div>
  )
}
