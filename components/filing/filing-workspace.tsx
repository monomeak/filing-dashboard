'use client'

import {
  ReloadOutlined as RotateCcw,
  SearchOutlined as Search,
} from '@ant-design/icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFilings } from '@/hooks/use-filings'
import { getFilingExpiryItem } from '@/lib/demo-filings'

import {
  FilingStatusTabs,
  type FilingFilter,
} from './filing-status-tabs'

const filingFilters: FilingFilter[] = [
  'Draft',
  'Paid',
  'expiring-soon',
  'expired',
]

type FilingFilterForm = {
  number: string
  collateral: string
  issuedFrom: string
  issuedTo: string
  expiredFrom: string
  expiredTo: string
  createdBy: string
}

const initialFilterForm: FilingFilterForm = {
  number: '',
  collateral: 'all',
  issuedFrom: '',
  issuedTo: '',
  expiredFrom: '',
  expiredTo: '',
  createdBy: '',
}

function parseDate(value: string) {
  if (!value) {
    return null
  }

  const date = new Date(value.includes('-') ? `${value}T00:00:00` : value)
  date.setHours(0, 0, 0, 0)

  return date
}

function isWithinDateRange(value: string, from: string, to: string) {
  const date = parseDate(value)
  const fromDate = parseDate(from)
  const toDate = parseDate(to)

  if (!date) {
    return false
  }

  if (fromDate && date < fromDate) {
    return false
  }

  if (toDate && date > toDate) {
    return false
  }

  return true
}

export function FilingWorkspace() {
  const { filings } = useFilings()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilingFilterForm>(initialFilterForm)
  const filterParam = searchParams.get('filter')
  const activeFilter = filingFilters.includes(filterParam as FilingFilter)
    ? (filterParam as FilingFilter)
    : 'Draft'

  const collateralTypes = useMemo(
    () => Array.from(new Set(filings.map((filing) => filing.collateral))),
    [filings],
  )

  const numberLabel =
    activeFilter === 'Draft' ? 'Draft number' : 'Notice number'
  const hasActiveFilters = Object.entries(filters).some(([key, value]) =>
    key === 'collateral' ? value !== 'all' : Boolean(value),
  )

  const filteredFilings = useMemo(() => {
    const numberQuery = filters.number.trim().toLowerCase()
    const createdByQuery = filters.createdBy.trim().toLowerCase()

    return filings.filter((filing) => {
      const expiry = getFilingExpiryItem(filing)

      if (numberQuery && !filing.id.toLowerCase().includes(numberQuery)) {
        return false
      }

      if (filters.collateral !== 'all' && filing.collateral !== filters.collateral) {
        return false
      }

      if (
        (filters.issuedFrom || filters.issuedTo) &&
        !isWithinDateRange(filing.createdAt, filters.issuedFrom, filters.issuedTo)
      ) {
        return false
      }

      if (
        (filters.expiredFrom || filters.expiredTo) &&
        !isWithinDateRange(expiry.expiresAt, filters.expiredFrom, filters.expiredTo)
      ) {
        return false
      }

      if (
        createdByQuery &&
        !filing.createdBy.toLowerCase().includes(createdByQuery)
      ) {
        return false
      }

      return true
    })
  }, [filings, filters])

  const handleFilterChange = (filter: FilingFilter) => {
    const params = new URLSearchParams(searchParams.toString())

    if (filter === 'Draft') {
      params.delete('filter')
    } else {
      params.set('filter', filter)
    }

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    })
  }

  const updateFilter = <Key extends keyof FilingFilterForm>(
    key: Key,
    value: FilingFilterForm[Key],
  ) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

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

        {hasActiveFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setFilters(initialFilterForm)}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      <div className="border-t px-5 py-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <FilterField label={numberLabel} htmlFor="filing-number-filter">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="filing-number-filter"
                value={filters.number}
                onChange={(event) => updateFilter('number', event.target.value)}
                placeholder={numberLabel}
                className="pl-9"
              />
            </div>
          </FilterField>

          <FilterField label="Collateral type" htmlFor="collateral-filter">
            <Select
              value={filters.collateral}
              onValueChange={(value) => updateFilter('collateral', value)}
            >
              <SelectTrigger id="collateral-filter" className="w-full">
                <SelectValue placeholder="Collateral type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All collateral</SelectItem>
                {collateralTypes.map((collateral) => (
                  <SelectItem key={collateral} value={collateral}>
                    {collateral}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterField>

          <FilterField label="Issued at" htmlFor="issued-from-filter">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                id="issued-from-filter"
                type="date"
                value={filters.issuedFrom}
                onChange={(event) =>
                  updateFilter('issuedFrom', event.target.value)
                }
              />
              <Input
                type="date"
                value={filters.issuedTo}
                onChange={(event) => updateFilter('issuedTo', event.target.value)}
              />
            </div>
          </FilterField>

          <FilterField label="Expired at" htmlFor="expired-from-filter">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                id="expired-from-filter"
                type="date"
                value={filters.expiredFrom}
                onChange={(event) =>
                  updateFilter('expiredFrom', event.target.value)
                }
              />
              <Input
                type="date"
                value={filters.expiredTo}
                onChange={(event) => updateFilter('expiredTo', event.target.value)}
              />
            </div>
          </FilterField>

          <FilterField label="Created by" htmlFor="created-by-filter">
            <Input
              id="created-by-filter"
              value={filters.createdBy}
              onChange={(event) => updateFilter('createdBy', event.target.value)}
              placeholder="Created by"
            />
          </FilterField>
        </div>
      </div>

      <FilingStatusTabs
        activeFilter={activeFilter}
        filings={filteredFilings}
        onFilterChange={handleFilterChange}
        filtersActive={hasActiveFilters}
      />
    </section>
  )
}

function FilterField({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}
