import { DashboardContent } from '@/components/dashboard'

export default function DashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <DashboardContent />
    </main>
  )
}
