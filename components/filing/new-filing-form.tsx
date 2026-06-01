'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'

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
import { Textarea } from '@/components/ui/textarea'
import { useFilings, type CreateFilingInput } from '@/hooks/use-filings'
import { filingTypes, type FilingType } from '@/lib/demo-filings'
import { routes } from '@/lib/routes'

export function NewFilingForm() {
  const router = useRouter()
  const { createFiling } = useFilings()
  const [form, setForm] = useState<CreateFilingInput>({
    contractNumber: 'CN-CITIZEN-GOODS-5',
    type: 'Creation',
    loanValue: 1400,
    collateral: 'Goods',
    securingPartyDocumentId: '123456785',
    securedPartyDocumentId: '123456786',
    createdBy: 'Disha Patel',
    createdAt: '2026-06-01',
    notes: 'Mock filing created from the citizen goods flow.',
  })

  const updateForm = <Key extends keyof CreateFilingInput>(
    key: Key,
    value: CreateFilingInput[Key],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const filing = createFiling(form)

    if (filing) {
      router.push(`/filing/${encodeURIComponent(filing.id)}`)
    }
  }

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
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            New Filing
          </h1>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Create a mock citizen goods filing with contract, party, and
            collateral details.
          </p>
        </div>
        <span className="inline-flex w-fit rounded-md border px-2.5 py-1 text-xs font-medium text-muted-foreground">
          Draft
        </span>
      </section>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <section className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-foreground">
            Filing Details
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Contract number" htmlFor="contract-number">
              <Input
                id="contract-number"
                value={form.contractNumber}
                onChange={(event) =>
                  updateForm('contractNumber', event.target.value)
                }
              />
            </Field>
            <Field label="Filing type" htmlFor="filing-type">
              <Select
                value={form.type}
                onValueChange={(value) =>
                  updateForm('type', value as FilingType)
                }
              >
                <SelectTrigger id="filing-type" className="w-full">
                  <SelectValue placeholder="Select filing type" />
                </SelectTrigger>
                <SelectContent>
                  {filingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Loan value" htmlFor="loan-value">
              <Input
                id="loan-value"
                type="number"
                value={form.loanValue}
                onChange={(event) =>
                  updateForm('loanValue', Number(event.target.value))
                }
              />
            </Field>
            <Field label="Collateral type" htmlFor="collateral-type">
              <Select
                value={form.collateral}
                onValueChange={(value) => updateForm('collateral', value)}
              >
                <SelectTrigger id="collateral-type" className="w-full">
                  <SelectValue placeholder="Select collateral" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Goods">Goods</SelectItem>
                  <SelectItem value="Vehicle">Vehicle</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Inventory">Inventory</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-foreground">Parties</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Securing party document ID" htmlFor="securing-party">
              <Input
                id="securing-party"
                value={form.securingPartyDocumentId}
                onChange={(event) =>
                  updateForm('securingPartyDocumentId', event.target.value)
                }
              />
            </Field>
            <Field label="Secured party document ID" htmlFor="secured-party">
              <Input
                id="secured-party"
                value={form.securedPartyDocumentId}
                onChange={(event) =>
                  updateForm('securedPartyDocumentId', event.target.value)
                }
              />
            </Field>
            <Field label="Created by" htmlFor="created-by">
              <Input
                id="created-by"
                value={form.createdBy}
                onChange={(event) => updateForm('createdBy', event.target.value)}
              />
            </Field>
            <Field label="Created at" htmlFor="created-at">
              <Input
                id="created-at"
                type="date"
                value={form.createdAt}
                onChange={(event) => updateForm('createdAt', event.target.value)}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-5 shadow-sm sm:p-6">
          <Field label="Notes" htmlFor="notes">
            <Textarea
              id="notes"
              className="min-h-28"
              value={form.notes}
              onChange={(event) => updateForm('notes', event.target.value)}
            />
          </Field>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button asChild variant="outline">
            <Link href={routes.filing}>Cancel</Link>
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
        </div>
      </form>
    </main>
  )
}

function Field({
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
