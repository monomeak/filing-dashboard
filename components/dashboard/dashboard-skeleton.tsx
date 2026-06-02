import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <>
      <DashboardHeaderSkeleton />
      <DashboardSummarySkeleton />

      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <ChartSkeleton />
        <ExpiryMonitoringSkeleton />
      </section>

      <ActivityTableSkeleton />
    </>
  )
}

function DashboardHeaderSkeleton() {
  return (
    <section className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-72 max-w-[70vw]" />
        </div>
      </div>
      <Skeleton className="h-10 w-32" />
    </section>
  )
}

function DashboardSummarySkeleton() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <article
          key={index}
          className="rounded-lg border bg-card p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-14" />
            </div>
            <Skeleton className="h-10 w-10" />
          </div>
          <Skeleton className="mt-4 h-4 w-40" />
        </article>
      ))}
    </section>
  )
}

function ChartSkeleton() {
  return (
    <article className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-64 max-w-[70vw]" />
        </div>
        <Skeleton className="h-7 w-32" />
      </div>

      <div className="mt-8 flex h-64 items-end gap-3 border-b border-l pl-4 sm:gap-5">
        {[42, 58, 36, 72, 52, 88, 100].map((height, index) => (
          <div
            key={index}
            className="flex h-full min-w-0 flex-1 flex-col justify-end gap-3"
          >
            <Skeleton className="w-full rounded-t-md" style={{ height: `${height}%` }} />
            <div className="space-y-1">
              <Skeleton className="mx-auto h-4 w-5" />
              <Skeleton className="mx-auto h-3 w-10" />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

function ExpiryMonitoringSkeleton() {
  return (
    <article className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-10" />
      </div>

      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-32" />
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-14 rounded-lg" />
        ))}
      </div>
    </article>
  )
}

function ActivityTableSkeleton() {
  return (
    <section className="rounded-lg border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-72 max-w-[70vw]" />
        </div>
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="space-y-3 p-4">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-4" />
          ))}
        </div>
        {Array.from({ length: 4 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-t pt-3"
          >
            {Array.from({ length: 4 }).map((_, cellIndex) => (
              <Skeleton key={cellIndex} className="h-5" />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
