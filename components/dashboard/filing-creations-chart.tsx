'use client'

import {
  FallOutlined as TrendingDown,
  MinusOutlined,
  RiseOutlined as TrendingUp,
} from '@ant-design/icons'
import { Column, type ColumnConfig } from '@ant-design/charts'

import type { FilingCreationTrendItem } from '@/lib/demo-filings'

type FilingCreationsChartProps = {
  trend: FilingCreationTrendItem[]
  previousWeekCount: number
}

export function FilingCreationsChart({
  trend,
  previousWeekCount,
}: FilingCreationsChartProps) {
  const thisWeekCount = trend.reduce((sum, item) => sum + item.count, 0)
  const weeklyChange = getWeeklyChange(thisWeekCount, previousWeekCount)
  const TrendIcon =
    weeklyChange.direction === 'up'
      ? TrendingUp
      : weeklyChange.direction === 'down'
        ? TrendingDown
        : MinusOutlined
  const chartData = trend.map((item) => ({
    day: item.label,
    filings: item.count,
  }))
  const chartConfig: ColumnConfig = {
    data: chartData,
    xField: 'day',
    yField: 'filings',
    height: 256,
    autoFit: true,
    padding: [16, 12, 40, 36],
    axis: {
      x: {
        title: false,
        tick: false,
        labelFill: '#64748b',
        labelFontSize: 12,
      },
      y: {
        title: false,
        labelFill: '#64748b',
        labelFontSize: 12,
        grid: true,
        gridStroke: '#e2e8f0',
        gridLineDash: [4, 4],
      },
    },
    scale: {
      y: {
        domainMin: 0,
        nice: true,
      },
    },
    style: {
      fill: '#0ea5e9',
      radiusTopLeft: 6,
      radiusTopRight: 6,
    },
    interaction: {
      tooltip: {
        shared: true,
      },
      elementHighlight: {
        background: false,
      },
    },
    tooltip: {
      title: (datum: { day: string }) => datum.day,
      items: [{ field: 'filings', name: 'Filings' }],
    },
  }

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

      <div className="mt-6 h-64">
        <Column {...chartConfig} />
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
