type FilingSnapshotProps = {
  totalFilings: number
  totalPaidCreation: number
  totalPaidOther: number
  totalPaidTermination: number
  totalLoanValue: number
  totalSecuringParties: number
  totalSecuredParties: number
}

export function FilingSnapshot({
  totalFilings,
  totalPaidCreation,
  totalPaidOther,
  totalPaidTermination,
  totalLoanValue,
  totalSecuringParties,
  totalSecuredParties,
}: FilingSnapshotProps) {
  const rows = [
    { label: 'Total filings', value: totalFilings },
    { label: 'Loan value', value: `$${totalLoanValue.toLocaleString()}` },
    { label: 'Securing parties', value: totalSecuringParties },
    { label: 'Secured parties', value: totalSecuredParties },
  ]
  const lifecycleTotal = totalPaidCreation + totalPaidOther + totalPaidTermination
  const paidCreationShare = lifecycleTotal
    ? (totalPaidCreation / lifecycleTotal) * 100
    : 0
  const paidOtherShare = lifecycleTotal
    ? (totalPaidOther / lifecycleTotal) * 100
    : 0
  const paidOtherEnd = paidCreationShare + paidOtherShare
  const terminationShare = lifecycleTotal ? 100 - paidOtherEnd : 0

  return (
    <article className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-semibold text-foreground">
        Filing Snapshot
      </h2>
      <dl className="mt-5 space-y-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4"
          >
            <dt className="text-sm text-muted-foreground">{row.label}</dt>
            <dd className="text-sm font-semibold text-foreground">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 rounded-md bg-muted p-4">
        <p className="text-sm font-medium text-foreground">Lifecycle mix</p>
        <div className="mt-4 flex items-center gap-5">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(var(--color-chart-2) 0 ${paidCreationShare}%, var(--color-chart-3) ${paidCreationShare}% ${paidOtherEnd}%, var(--color-chart-5) ${paidOtherEnd}% 100%)`,
            }}
            aria-label={`${Math.round(paidCreationShare)}% paid creation, ${Math.round(paidOtherShare)}% other paid, and ${Math.round(terminationShare)}% paid termination filings`}
          >
            <div className="h-12 w-12 rounded-full bg-card" />
          </div>

          <div className="grid flex-1 gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-chart-2" />
                Paid creation
              </span>
              <span className="text-sm font-semibold text-foreground">
                {totalPaidCreation}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-chart-3" />
                Other paid
              </span>
              <span className="text-sm font-semibold text-foreground">
                {totalPaidOther}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full bg-chart-5" />
                Paid termination
              </span>
              <span className="text-sm font-semibold text-foreground">
                {totalPaidTermination}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
