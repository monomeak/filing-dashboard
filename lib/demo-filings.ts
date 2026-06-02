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
  createdBy: string
  securingPartyDocumentId: string
  securedPartyDocumentId: string
  notes: string
}

export type FilingCreationTrendItem = {
  label: string
  count: number
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
    createdAt: 'May 30, 2026',
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
    createdAt: 'May 29, 2026',
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
    createdAt: 'May 27, 2026',
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
    createdAt: 'May 25, 2026',
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
    createdAt: 'May 23, 2026',
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
}
