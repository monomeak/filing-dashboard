'use client'

import { useEffect, useState } from 'react'

import {
  demoFilings,
  type FilingRecord,
  type FilingType,
} from '@/lib/demo-filings'

const filingsStorageKey = 'filing-app-filings'
const filingsStorageEvent = 'filing-app-filings-storage'

export type CreateFilingInput = {
  contractNumber: string
  type: FilingType
  loanValue: number
  collateral: string
  securingPartyDocumentId: string
  securedPartyDocumentId: string
  createdBy: string
  createdAt: string
  notes: string
}

function readJson<T>(key: string, fallback: T) {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function formatDate(value: string) {
  if (!value) {
    return new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date())
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

function normalizeFilings(filings: FilingRecord[]) {
  return filings.map((filing, index) => ({
    ...filing,
    securingPartyDocumentId:
      filing.securingPartyDocumentId ?? `12345678${index + 1}`,
    securedPartyDocumentId:
      filing.securedPartyDocumentId ?? `12345678${index + 2}`,
    notes: filing.notes ?? 'Mock filing created from the citizen goods flow.',
  }))
}

export function useFilings() {
  const [filings, setFilings] = useState<FilingRecord[]>(demoFilings)

  useEffect(() => {
    const syncFilings = () => {
      setFilings(normalizeFilings(readJson(filingsStorageKey, demoFilings)))
    }

    syncFilings()

    window.addEventListener('storage', syncFilings)
    window.addEventListener(filingsStorageEvent, syncFilings)

    return () => {
      window.removeEventListener('storage', syncFilings)
      window.removeEventListener(filingsStorageEvent, syncFilings)
    }
  }, [])

  const saveFilings = (nextFilings: FilingRecord[]) => {
    setFilings(nextFilings)
    window.localStorage.setItem(filingsStorageKey, JSON.stringify(nextFilings))
    window.dispatchEvent(new Event(filingsStorageEvent))
  }

  const createFiling = (input: CreateFilingInput) => {
    const contractNumber = input.contractNumber.trim()

    if (!contractNumber) {
      return null
    }

    const filing: FilingRecord = {
      id: contractNumber,
      title: `Citizen goods ${input.type.toLowerCase()} filing`,
      status: 'Draft',
      type: input.type,
      loanValue: input.loanValue,
      securingParties: 1,
      securedParties: 1,
      collateral: input.collateral,
      createdAt: formatDate(input.createdAt),
      createdBy: input.createdBy.trim() || 'Disha Patel',
      securingPartyDocumentId: input.securingPartyDocumentId.trim(),
      securedPartyDocumentId: input.securedPartyDocumentId.trim(),
      notes: input.notes.trim() || 'Mock filing created from the citizen goods flow.',
    }

    saveFilings([filing, ...filings.filter((item) => item.id !== filing.id)])

    return filing
  }

  const findFiling = (id: string) =>
    filings.find((filing) => filing.id === decodeURIComponent(id))

  return {
    createFiling,
    filings,
    findFiling,
  }
}
