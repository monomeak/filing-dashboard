'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2 } from 'lucide-react'

import { useProfiles } from '@/hooks/use-profiles'
import { routes } from '@/lib/routes'

export default function CreateOrganizationPage() {
  const router = useRouter()
  const { createOrganization } = useProfiles()
  const [organizationName, setOrganizationName] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const organization = createOrganization(organizationName)

    if (!organization) {
      return
    }

    setOrganizationName('')
    router.push(routes.profile)
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-8">
      <section className="border-b pb-6 sm:pb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-card sm:h-10 sm:w-10">
            <Building2 className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Create Organization
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Add an organization profile and switch into it automatically.
            </p>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="organization-name"
            className="text-sm font-medium text-foreground"
          >
            Organization name
          </label>
          <input
            id="organization-name"
            value={organizationName}
            onChange={(event) => setOrganizationName(event.target.value)}
            placeholder="Example Co"
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!organizationName.trim()}
          >
            Create organization
          </button>
          <button
            type="button"
            onClick={() => router.push(routes.profile)}
            className="h-10 rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  )
}
