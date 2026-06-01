'use client'

import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Input } from '@/components/ui/input'
import { useFilings } from '@/hooks/use-filings'

import { FilingStatusTabs } from './filing-status-tabs'

export function FilingWorkspace() {
  const { filings } = useFilings()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFilings = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return filings
    }

    return filings.filter((filing) =>
      [
        filing.id,
        filing.title,
        filing.type,
        filing.collateral,
        filing.createdAt,
        filing.createdBy,
        filing.loanValue.toString(),
      ].some((value) => value.toLowerCase().includes(query)),
    )
  }, [filings, searchTerm])

  return (
    <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Filing Records
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredFilings.length} of {filings.length} filings shown
          </p>
        </div>

        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search ID, type, status, creator..."
            className="pl-9"
          />
        </div>
      </div>

      <FilingStatusTabs filings={filteredFilings} searchTerm={searchTerm} />
    </section>
  )
}
