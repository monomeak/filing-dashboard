'use client'

import {
  BankOutlined as Building2,
  UserOutlined as User,
} from '@ant-design/icons'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useProfiles } from '@/hooks/use-profiles'
import { personalProfile } from '@/lib/profile-data'

export default function ProfilePage() {
  const { activeProfile, organizations } = useProfiles()
  const isPersonalProfile = activeProfile.type === 'personal'
  const activeOrganization =
    activeProfile.type === 'organization'
      ? organizations.find((organization) => organization.id === activeProfile.id)
      : undefined
  const Icon = isPersonalProfile ? User : Building2

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-8">
      <section className="flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-center sm:justify-between sm:pb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 sm:h-16 sm:w-16">
            <AvatarImage
              src={isPersonalProfile ? personalProfile.avatar : undefined}
              alt={activeProfile.name}
            />
            <AvatarFallback>
              {isPersonalProfile ? (
                activeProfile.initials
              ) : (
                <Building2 className="h-6 w-6" />
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4" />
              <span>
                {isPersonalProfile ? 'Personal profile' : 'Organization profile'}
              </span>
            </div>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {activeProfile.name}
            </h1>
          </div>
        </div>
      </section>

      {isPersonalProfile ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border bg-card p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-foreground">
              Account number
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {personalProfile.accountNumber}
            </p>
          </article>
          <article className="rounded-lg border bg-card p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-foreground">Balance</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {personalProfile.balance}
            </p>
          </article>
          <article className="rounded-lg border bg-card p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-foreground">
              Organizations
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {organizations.length} connected organization
              {organizations.length === 1 ? '' : 's'}
            </p>
          </article>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-lg border bg-card p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-foreground">
              Organization name
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeProfile.name}
            </p>
          </article>
          <article className="rounded-lg border bg-card p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-foreground">
              Account number
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeOrganization?.accountNumber ?? 'Not available'}
            </p>
          </article>
          <article className="rounded-lg border bg-card p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-foreground">Balance</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeOrganization?.balance ?? '$0.00'}
            </p>
          </article>
          <article className="rounded-lg border bg-card p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-semibold text-foreground">
              Personal owner
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeOrganization?.ownerName ?? personalProfile.name}
            </p>
          </article>
        </section>
      )}
    </main>
  )
}
