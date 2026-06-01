import { Search } from 'lucide-react'

import { RoutePage } from '@/components/route-page'

export default function SearchFilingPage() {
  return (
    <RoutePage
      title="Search Filing"
      description="Find filing records by keyword, organization, status, or reference details."
      icon={Search}
      sections={[
        {
          title: 'Search criteria',
          body: 'Prepare space for filters such as status, date, organization, and filing type.',
        },
        {
          title: 'Results',
          body: 'Keep search results structured and ready for sorting, review, and follow-up actions.',
        },
        {
          title: 'Saved searches',
          body: 'Make repeated searches easy to revisit when the product needs that workflow.',
        },
      ]}
    />
  )
}

