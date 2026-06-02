export type FilingStatus = 'Draft' | 'Paid'
export type FilingType =
  | 'Creation'
  | 'Amendment'
  | 'Correction'
  | 'Renewal'
  | 'Termination'
  | 'Certified'

export const filingTypes: FilingType[] = [
  'Creation',
  'Amendment',
  'Correction',
  'Renewal',
  'Termination',
  'Certified',
]

export type FilingRecord = {
  id: string
  title: string
  status: FilingStatus
  type: FilingType
  loanValue: number
  securingParties: number
  securedParties: number
  collateral: string
  createdAt: string
  expiresAt: string
  createdBy: string
  securingPartyDocumentId: string
  securedPartyDocumentId: string
  notes: string
}

export type FilingCreationTrendItem = {
  label: string
  count: number
}

export type FilingExpiryStatus = 'Expired' | 'Expiring Soon' | 'Active'

export type FilingExpiryItem = {
  id: string
  title: string
  expiresAt: string
  daysUntilExpiry: number
  status: FilingExpiryStatus
  renewalRequired: boolean
}

const filingLifetimeYears = 5
const renewalWindowMonths = 6
const today = new Date()
today.setHours(0, 0, 0, 0)

function parseDate(value: string) {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date
}

function getDaysUntilExpiry(value: string) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  return Math.ceil(
    (parseDate(value).getTime() - today.getTime()) / millisecondsPerDay,
  )
}

function getExpiryDate(createdAt: string) {
  const expiryDate = parseDate(createdAt)
  expiryDate.setFullYear(expiryDate.getFullYear() + filingLifetimeYears)

  return expiryDate
}

function getRenewalWindowStart(expiresAt: string) {
  const renewalWindowStart = parseDate(expiresAt)
  renewalWindowStart.setMonth(
    renewalWindowStart.getMonth() - renewalWindowMonths,
  )

  return renewalWindowStart
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value)
}

function isInRenewalWindow(expiresAt: string) {
  return today >= getRenewalWindowStart(expiresAt)
}

function getExpiryStatus(
  expiresAt: string,
  daysUntilExpiry: number,
): FilingExpiryStatus {
  if (daysUntilExpiry < 0) {
    return 'Expired'
  }

  if (isInRenewalWindow(expiresAt)) {
    return 'Expiring Soon'
  }

  return 'Active'
}

function requiresRenewal(filing: FilingRecord, expiresAt: string) {
  return (
    filing.type !== 'Termination' &&
    filing.type !== 'Certified' &&
    isInRenewalWindow(expiresAt)
  )
}

export function getFilingExpiryItem(filing: FilingRecord): FilingExpiryItem {
  const expiresAt = formatDate(getExpiryDate(filing.createdAt))
  const daysUntilExpiry = getDaysUntilExpiry(expiresAt)

  return {
    id: filing.id,
    title: filing.title,
    expiresAt,
    daysUntilExpiry,
    status: getExpiryStatus(expiresAt, daysUntilExpiry),
    renewalRequired: requiresRenewal(filing, expiresAt),
  }
}

export const demoFilings: FilingRecord[] = [
  {
    id: 'CN-CITIZEN-GOODS-1',
    title: 'Citizen goods security filing',
    status: 'Paid',
    type: 'Creation',
    loanValue: 1000,
    securingParties: 1,
    securedParties: 2,
    collateral: 'Goods',
    createdAt: 'Nov 18, 2021',
    expiresAt: 'Nov 18, 2026',
    createdBy: 'Disha Patel',
    securingPartyDocumentId: '123456781',
    securedPartyDocumentId: '123456782',
    notes: 'Initial creation filing for citizen goods collateral.',
  },
  {
    id: 'CN-CITIZEN-GOODS-2',
    title: 'Citizen goods amendment',
    status: 'Draft',
    type: 'Amendment',
    loanValue: 1100,
    securingParties: 1,
    securedParties: 2,
    collateral: 'Goods',
    createdAt: 'Nov 28, 2021',
    expiresAt: 'Nov 28, 2026',
    createdBy: 'Rahul Mehta',
    securingPartyDocumentId: '123456782',
    securedPartyDocumentId: '123456783',
    notes: 'Draft amendment prepared for review.',
  },
  {
    id: 'CN-CITIZEN-GOODS-3',
    title: 'Citizen goods renewal',
    status: 'Paid',
    type: 'Renewal',
    loanValue: 1200,
    securingParties: 1,
    securedParties: 2,
    collateral: 'Goods',
    createdAt: 'Jul 24, 2021',
    expiresAt: 'Jul 24, 2026',
    createdBy: 'Caroline Watson',
    securingPartyDocumentId: '123456783',
    securedPartyDocumentId: '123456784',
    notes: 'Paid renewal filing for existing collateral registration.',
  },
  {
    id: 'CN-CITIZEN-GOODS-4',
    title: 'Citizen goods search request',
    status: 'Draft',
    type: 'Certified',
    loanValue: 1300,
    securingParties: 1,
    securedParties: 2,
    collateral: 'Goods',
    createdAt: 'Jun 01, 2021',
    expiresAt: 'Jun 01, 2026',
    createdBy: 'Disha Patel',
    securingPartyDocumentId: '123456784',
    securedPartyDocumentId: '123456785',
    notes: 'Certified search request draft for citizen goods filing.',
  },
  {
    id: 'CN-CITIZEN-GOODS-5',
    title: 'Citizen goods termination',
    status: 'Paid',
    type: 'Termination',
    loanValue: 1000,
    securingParties: 1,
    securedParties: 2,
    collateral: 'Goods',
    createdAt: 'Jan 30, 2022',
    expiresAt: 'Jan 30, 2027',
    createdBy: 'Rahul Mehta',
    securingPartyDocumentId: '123456785',
    securedPartyDocumentId: '123456786',
    notes: 'Paid termination filing for completed citizen goods registration.',
  },
]

export const filingCreationTrend: FilingCreationTrendItem[] = [
  { label: 'May 24', count: 1 },
  { label: 'May 25', count: 2 },
  { label: 'May 26', count: 1 },
  { label: 'May 27', count: 3 },
  { label: 'May 28', count: 2 },
  { label: 'May 29', count: 4 },
  { label: 'May 30', count: 5 },
]

const filingExpiryItems = demoFilings
  .map(getFilingExpiryItem)
  .sort((first, second) => first.daysUntilExpiry - second.daysUntilExpiry)

export const filingDashboardMetrics = {
  totalDraft: demoFilings.filter((filing) => filing.status === 'Draft').length,
  totalPaid: demoFilings.filter((filing) => filing.status === 'Paid').length,
  totalPaidCreation: demoFilings.filter(
    (filing) => filing.status === 'Paid' && filing.type === 'Creation',
  ).length,
  totalPaidOther: demoFilings.filter(
    (filing) =>
      filing.status === 'Paid' &&
      filing.type !== 'Creation' &&
      filing.type !== 'Termination',
  ).length,
  totalPaidTermination: demoFilings.filter(
    (filing) => filing.status === 'Paid' && filing.type === 'Termination',
  ).length,
  totalCertifiedSearches: demoFilings.filter(
    (filing) => filing.type === 'Certified',
  ).length,
  totalLoanValue: demoFilings.reduce(
    (sum, filing) => sum + filing.loanValue,
    0,
  ),
  totalSecuringParties: demoFilings.reduce(
    (sum, filing) => sum + filing.securingParties,
    0,
  ),
  totalSecuredParties: demoFilings.reduce(
    (sum, filing) => sum + filing.securedParties,
    0,
  ),
  expiryMonitoring: {
    totalExpired: filingExpiryItems.filter(
      (filing) => filing.status === 'Expired',
    ).length,
    totalExpiringSoon: filingExpiryItems.filter(
      (filing) => filing.status === 'Expiring Soon',
    ).length,
    totalActive: filingExpiryItems.filter(
      (filing) => filing.status === 'Active',
    ).length,
    totalRenewalRequired: filingExpiryItems.filter(
      (filing) => filing.renewalRequired,
    ).length,
    nearestExpiries: filingExpiryItems.slice(0, 3),
  },
}
