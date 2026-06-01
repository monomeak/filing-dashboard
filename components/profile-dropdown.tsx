'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  LogOut,
  User,
  FileText,
  LayoutDashboard,
  Search,
  ChevronLeft,
  Plus,
  Check,
  Building2,
  Menu,
  LoaderCircle,
} from 'lucide-react'
import type { ActiveProfile } from '@/lib/profile-data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useProfiles } from '@/hooks/use-profiles'
import { getInitials, personalProfile } from '@/lib/profile-data'
import {
  primaryNavigation,
  routes,
  type AppRoute,
  type NavigationItem,
} from '@/lib/routes'

const navigationIcons = {
  user: User,
  dashboard: LayoutDashboard,
  filing: FileText,
  search: Search,
}

type ProfileDropdownProps = {
  navItems?: NavigationItem[]
}

export function ProfileDropdown({
  navItems = primaryNavigation,
}: ProfileDropdownProps) {
  const router = useRouter()
  const switchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<'menu' | 'switch'>('menu')
  const [switchingProfileId, setSwitchingProfileId] = useState<string | null>(
    null,
  )
  const { activeProfile, organizations, switchProfile } = useProfiles()
  const profileLabel =
    activeProfile.type === 'personal' ? 'Personal Profile' : 'Organization Profile'

  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current) {
        clearTimeout(switchTimeoutRef.current)
      }
    }
  }, [])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)

    if (!open) {
      setView('menu')
      setSwitchingProfileId(null)
    }
  }

  const handleNavigation = (path: AppRoute) => {
    setIsOpen(false)
    router.push(path)
  }

  const handleSwitchProfile = (profile: ActiveProfile, profileId: string) => {
    if (switchingProfileId) {
      return
    }

    setSwitchingProfileId(profileId)

    switchTimeoutRef.current = setTimeout(() => {
      switchProfile(profile)
      setIsOpen(false)
      setView('menu')
      setSwitchingProfileId(null)
      router.push(routes.profile)
      switchTimeoutRef.current = null
    }, 450)
  }

  const handleSignOut = () => {
    setIsOpen(false)
    console.log('[v0] User signed out')
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md border bg-background transition-colors hover:bg-accent sm:rounded-full sm:border-0"
          aria-label="Open profile menu"
        >
          <Menu className="h-5 w-5 text-foreground sm:hidden" />
          <Avatar className="hidden h-10 w-10 sm:flex">
            <AvatarImage
              src={
                activeProfile.type === 'personal'
                  ? personalProfile.avatar
                  : undefined
              }
              alt={activeProfile.name}
            />
            <AvatarFallback>
              {activeProfile.type === 'personal' ? (
                activeProfile.initials
              ) : (
                <Building2 className="h-5 w-5" />
              )}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[calc(100vw-1.5rem)] max-w-72 p-0"
      >
        {view === 'menu' && (
          <>
            <div className="px-4 py-5 border-b bg-gradient-to-br from-slate-50 to-slate-100 sm:py-6 dark:from-slate-900 dark:to-slate-800">
              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="h-14 w-14 sm:h-16 sm:w-16">
                  <AvatarImage
                    src={
                      activeProfile.type === 'personal'
                        ? personalProfile.avatar
                        : undefined
                    }
                    alt={activeProfile.name}
                  />
                  <AvatarFallback>
                    {activeProfile.type === 'personal' ? (
                      activeProfile.initials
                    ) : (
                      <Building2 className="h-6 w-6" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">
                    {activeProfile.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {activeProfile.type === 'personal'
                      ? 'Personal profile'
                      : 'Organization profile'}
                  </p>
                  {activeProfile.type === 'personal' && (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Account {personalProfile.accountNumber}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        Balance {personalProfile.balance}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="px-2 py-2 sm:py-3">
              {navItems.map((item) => {
                const Icon = navigationIcons[item.icon]
                const label =
                  item.href === routes.profile ? profileLabel : item.label

                return (
                  <DropdownMenuItem
                    key={item.href}
                    onSelect={() => handleNavigation(item.href)}
                    className="flex items-center gap-3 cursor-pointer rounded px-3 py-2.5 text-sm sm:py-2"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{label}</span>
                  </DropdownMenuItem>
                )
              })}
            </div>

            <DropdownMenuSeparator className="my-1" />

            <div className="px-2 py-2 sm:py-3">
              <button
                onClick={() => setView('switch')}
                className="flex w-full items-center gap-3 cursor-pointer rounded px-3 py-2.5 text-sm hover:bg-accent text-left sm:py-2"
              >
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>Switch Profile</span>
              </button>
            </div>

            <DropdownMenuSeparator className="my-1" />

            <div className="px-2 py-2 sm:py-3">
              <DropdownMenuItem
                onSelect={handleSignOut}
                className="flex items-center gap-3 cursor-pointer rounded px-3 py-2.5 text-sm text-destructive hover:text-destructive hover:bg-destructive/10 sm:py-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </div>
          </>
        )}

        {view === 'switch' && (
          <>
            <div className="px-4 py-4 border-b flex items-center gap-3">
              <button
                onClick={() => setView('menu')}
                className="p-1 hover:bg-accent rounded transition-colors"
                aria-label="Back to profile menu"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="font-semibold text-sm">Switch Profile</h3>
            </div>

            <div className="px-2 py-3 max-h-80 overflow-y-auto">
              <button
                onClick={() => {
                  handleSwitchProfile(
                    {
                      type: 'personal',
                      name: personalProfile.name,
                      initials: personalProfile.initials,
                    },
                    'personal',
                  )
                }}
                disabled={Boolean(switchingProfileId)}
                className="flex w-full items-center gap-3 cursor-pointer rounded px-3 py-3 text-sm transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-70"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={personalProfile.avatar}
                    alt={personalProfile.name}
                  />
                  <AvatarFallback>{personalProfile.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">
                    {personalProfile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {switchingProfileId === 'personal'
                      ? 'Switching...'
                      : 'Personal'}
                  </p>
                </div>
                {switchingProfileId === 'personal' ? (
                  <LoaderCircle className="h-4 w-4 flex-shrink-0 animate-spin text-muted-foreground" />
                ) : activeProfile.type === 'personal' ? (
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                ) : null}
              </button>

              {organizations.map((organization) => {
                const initials = getInitials(organization.name) || 'O'

                return (
                  <button
                    key={organization.id}
                    onClick={() => {
                      handleSwitchProfile(
                        {
                          type: 'organization',
                          id: organization.id,
                          name: organization.name,
                          initials,
                        },
                        organization.id,
                      )
                    }}
                    disabled={Boolean(switchingProfileId)}
                    className="flex w-full items-center gap-3 cursor-pointer rounded px-3 py-3 text-sm transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-70"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium truncate">
                        {organization.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {switchingProfileId === organization.id
                          ? 'Switching...'
                          : 'Organization'}
                      </p>
                    </div>
                    {switchingProfileId === organization.id ? (
                      <LoaderCircle className="h-4 w-4 flex-shrink-0 animate-spin text-muted-foreground" />
                    ) : activeProfile.type === 'organization' &&
                      activeProfile.id === organization.id ? (
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    ) : null}
                  </button>
                )
              })}

              <DropdownMenuSeparator className="my-2" />

              <button
                onClick={() => handleNavigation(routes.createOrganization)}
                className="flex w-full items-center gap-3 cursor-pointer rounded px-3 py-3 text-sm hover:bg-accent transition-colors text-blue-600 dark:text-blue-400 font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Create Organization</span>
              </button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
