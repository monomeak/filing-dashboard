import { Suspense } from 'react'

import { FilingPageHeader } from '@/components/filing/filing-page-header'
import { FilingWorkspace } from '@/components/filing/filing-workspace'

export default function FilingPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <FilingPageHeader
        title="My Filing"
        description="Create, review, and manage draft and paid filing records."
        action="new-filing"
      />

      <Suspense
        fallback={
          <section className="rounded-lg border bg-card p-5 text-sm text-muted-foreground shadow-sm">
            Loading filing records...
          </section>
        }
      >
        <FilingWorkspace />
      </Suspense>
    </main>
  )
}
