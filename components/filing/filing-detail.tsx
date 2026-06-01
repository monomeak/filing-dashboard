'use client'

import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useFilings } from '@/hooks/use-filings'
import { routes } from '@/lib/routes'

type FilingDetailProps = {
  filingId: string
}

export function FilingDetail({ filingId }: FilingDetailProps) {
  const { findFiling } = useFilings()
  const filing = findFiling(filingId)

  if (!filing) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Button asChild variant="ghost" className="w-fit">
          <Link href={routes.filing}>
            <ArrowLeft className="h-4 w-4" />
            My Filing
          </Link>
        </Button>
        <section className="rounded-lg border bg-card p-8 text-center">
          <h1 className="text-lg font-semibold text-foreground">
            Filing not found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This mock filing does not exist in the current browser storage.
          </p>
        </section>
      </main>
    )
  }

  const details = [
    { label: 'Contract number', value: filing.id },
    { label: 'Filing type', value: filing.type },
    { label: 'Status', value: filing.status },
    { label: 'Collateral', value: filing.collateral },
    { label: 'Loan value', value: `$${filing.loanValue.toLocaleString()}` },
    { label: 'Created at', value: filing.createdAt },
    { label: 'Created by', value: filing.createdBy },
    {
      label: 'Securing party document ID',
      value: filing.securingPartyDocumentId,
    },
    {
      label: 'Secured party document ID',
      value: filing.securedPartyDocumentId,
    },
  ]

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button asChild variant="ghost" size="sm" className="-ml-3 mb-2">
            <Link href={routes.filing}>
              <ArrowLeft className="h-4 w-4" />
              My Filing
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-card">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {filing.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{filing.id}</p>
            </div>
          </div>
        </div>
        <span className="inline-flex w-fit rounded-md border px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {filing.status}
        </span>
      </section>

      <section className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold text-foreground">
          Filing Details
        </h2>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label} className="rounded-md bg-muted p-4">
              <dt className="text-xs font-medium text-muted-foreground">
                {detail.label}
              </dt>
              <dd className="mt-2 text-sm font-semibold text-foreground">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold text-foreground">Notes</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {filing.notes}
        </p>
      </section>
    </main>
  )
}
