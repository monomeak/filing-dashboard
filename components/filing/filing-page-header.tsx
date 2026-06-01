import Link from 'next/link'
import { FileText, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { routes } from '@/lib/routes'

type FilingPageHeaderProps = {
  title: string
  description: string
  action?: 'new-filing'
}

export function FilingPageHeader({
  title,
  description,
  action,
}: FilingPageHeaderProps) {
  return (
    <section className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-card">
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {action === 'new-filing' && (
        <Button asChild>
          <Link href={routes.newFiling}>
            <Plus className="h-4 w-4" />
            New Filing
          </Link>
        </Button>
      )}
    </section>
  )
}
