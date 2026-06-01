import { LayoutDashboard } from 'lucide-react'

import { RoutePage } from '@/components/route-page'

export default function DashboardPage() {
  return (
    <RoutePage
      title="Dashboard"
      description="Track filing activity, recent updates, and the key actions that need your attention."
      icon={LayoutDashboard}
      sections={[
        {
          title: 'Overview',
          body: 'Surface the most important filing metrics and account status at a glance.',
        },
        {
          title: 'Recent activity',
          body: 'Show recent submissions, profile switches, and filing updates as the app grows.',
        },
        {
          title: 'Next actions',
          body: 'Guide users toward unfinished filings, searches, and profile maintenance.',
        },
      ]}
    />
  )
}

