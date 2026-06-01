import { primaryNavigation } from '@/lib/routes'

export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8 sm:justify-center sm:px-6 sm:py-12">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8 sm:gap-12">
        <div className="space-y-3 text-center">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome to FilingApp
          </h1>
          <p className="mx-auto max-w-lg text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-relaxed">
            Click the profile button in the top-right corner to access your menu options.
          </p>
        </div>

        <div className="w-full rounded-lg border bg-card p-5 shadow-sm sm:p-8 lg:p-12">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-semibold text-foreground">Menu Options</h2>
            <p className="text-center text-sm text-muted-foreground">
              Available actions:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {primaryNavigation.map((item) => (
                <li key={item.href}>{item.label}</li>
              ))}
              <li>Switch Profile</li>
              <li>Create Organization</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
