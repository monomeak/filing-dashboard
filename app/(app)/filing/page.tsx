import { FileText } from 'lucide-react'

import { RoutePage } from '@/components/route-page'

export default function FilingPage() {
  return (
    <RoutePage
      title="Filing"
      description="Create, organize, and manage filing records from a dedicated workflow."
      icon={FileText}
      sections={[
        {
          title: 'New filing',
          body: 'Start a filing flow with the information required to submit a complete record.',
        },
        {
          title: 'Drafts',
          body: 'Keep unfinished filings visible so users can return to them quickly.',
        },
        {
          title: 'Submitted records',
          body: 'Give users a reliable place to review completed filing history.',
        },
      ]}
    />
  )
}

