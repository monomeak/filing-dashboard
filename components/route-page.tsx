import type { LucideIcon } from 'lucide-react'

type RoutePageProps = {
  title: string
  description: string
  icon: LucideIcon
  sections: {
    title: string
    body: string
  }[]
}

export function RoutePage({
  title,
  description,
  icon: Icon,
  sections,
}: RoutePageProps) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-8">
      <section className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between sm:pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-card sm:h-10 sm:w-10">
              <Icon className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-lg border bg-card p-4 shadow-sm sm:p-5"
          >
            <h2 className="text-sm font-semibold text-foreground">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {section.body}
            </p>
          </article>
        ))}
      </section>
    </main>
  )
}
