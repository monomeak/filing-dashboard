'use client'

import { useEffect, useState } from 'react'

import {
  demoFilings,
  filingCreationTrend,
  filingDashboardMetrics,
} from '@/lib/demo-filings'

import { DashboardHeader } from './dashboard-header'
import { DashboardSkeleton } from './dashboard-skeleton'
import { DashboardSummaryCards } from './dashboard-summary-cards'
import { ExpiryMonitoring } from './expiry-monitoring'
import { FilingCreationsChart } from './filing-creations-chart'
import { RecentFilingActivity } from './recent-filing-activity'

export function DashboardContent() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 450)

    return () => window.clearTimeout(timeout)
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <>
      <DashboardHeader />

      <DashboardSummaryCards
        totalDraft={filingDashboardMetrics.totalDraft}
        totalPaid={filingDashboardMetrics.totalPaid}
        totalLoanValue={filingDashboardMetrics.totalLoanValue}
        totalCertifiedSearches={filingDashboardMetrics.totalCertifiedSearches}
      />

      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <FilingCreationsChart trend={filingCreationTrend} />

        <ExpiryMonitoring
          nearestExpiries={
            filingDashboardMetrics.expiryMonitoring.nearestExpiries
          }
        />
      </section>

      <RecentFilingActivity filings={demoFilings} />
    </>
  )
}
