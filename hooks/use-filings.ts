'use client'

import { useEffect, useState } from 'react'

import {
  buildFilingTimelineEvents,
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
    return formatDisplayDate(new Date())
  }

  return formatDisplayDate(new Date(`${value}T00:00:00`))
}

function formatDisplayDate(value: Date) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value)
}

function getExpiryDate(value: string) {
  const date = value
    ? new Date(value.includes('-') ? `${value}T00:00:00` : value)
    : new Date()
  date.setFullYear(date.getFullYear() + 5)

  return formatDisplayDate(date)
}

function normalizeFilings(filings: FilingRecord[]) {
  return filings.map((filing, index) => {
    const normalizedFiling = {
      ...filing,
      securingPartyDocumentId:
        filing.securingPartyDocumentId ?? `12345678${index + 1}`,
      securedPartyDocumentId:
        filing.securedPartyDocumentId ?? `12345678${index + 2}`,
      expiresAt: filing.expiresAt ?? getExpiryDate(filing.createdAt),
      notes: filing.notes ?? 'Mock filing created from the citizen goods flow.',
    }

    return {
      ...normalizedFiling,
      timelineEvents:
        normalizedFiling.timelineEvents?.length
          ? normalizedFiling.timelineEvents
          : buildFilingTimelineEvents(normalizedFiling),
    }
  })
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
      expiresAt: getExpiryDate(input.createdAt),
      createdBy: input.createdBy.trim() || 'Disha Patel',
      securingPartyDocumentId: input.securingPartyDocumentId.trim(),
      securedPartyDocumentId: input.securedPartyDocumentId.trim(),
      notes: input.notes.trim() || 'Mock filing created from the citizen goods flow.',
    }
    filing.timelineEvents = buildFilingTimelineEvents(filing)

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
