import { FilingPageHeader, FilingWorkspace } from '@/components/filing'

export default function FilingPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <FilingPageHeader
        title="My Filing"
        description="Create, review, and manage draft and paid filing records."
        action="new-filing"
      />

      <FilingWorkspace />
    </main>
  )
}
