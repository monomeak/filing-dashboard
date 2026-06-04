import {
  FallOutlined as TrendingDown,
  MinusOutlined,
  RiseOutlined as TrendingUp,
} from '@ant-design/icons'

import type { FilingCreationTrendItem } from '@/lib/demo-filings'

type FilingCreationsChartProps = {
  trend: FilingCreationTrendItem[]
  previousWeekCount: number
}

export function FilingCreationsChart({
  trend,
  previousWeekCount,
}: FilingCreationsChartProps) {
  const maxTrendCount = Math.max(...trend.map((item) => item.count))
  const thisWeekCount = trend.reduce((sum, item) => sum + item.count, 0)
  const weeklyChange = getWeeklyChange(thisWeekCount, previousWeekCount)
  const TrendIcon =
    weeklyChange.direction === 'up'
      ? TrendingUp
      : weeklyChange.direction === 'down'
        ? TrendingDown
        : MinusOutlined

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
          <TrendIcon className="h-4 w-4" />
          {weeklyChange.label}
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

function getWeeklyChange(thisWeekCount: number, previousWeekCount: number) {
  if (previousWeekCount === 0) {
    return {
      direction: thisWeekCount > 0 ? 'up' : 'flat',
      label:
        thisWeekCount > 0
          ? `${thisWeekCount} filings this week`
          : 'No filings this week',
    } as const
  }

  const percentage = Math.round(
    ((thisWeekCount - previousWeekCount) / previousWeekCount) * 100,
  )
  const sign = percentage > 0 ? '+' : ''

  return {
    direction:
      percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'flat',
    label: `${sign}${percentage}% this week`,
  } as const
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
