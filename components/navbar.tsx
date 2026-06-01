'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ProfileDropdown } from '@/components/profile-dropdown'
import { useProfiles } from '@/hooks/use-profiles'
import { primaryNavigation, routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const { activeProfile } = useProfiles()

  const profileLabel =
    activeProfile.type === 'personal' ? 'My Profile' : 'Organization Profile'

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-3 sm:px-6">
        {/* Logo/Brand */}
        <Link href={routes.home} className="flex items-center gap-2">
          <div className="text-base font-bold text-foreground sm:text-lg">
            FilingApp
          </div>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {primaryNavigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`)
            const label = item.href === routes.profile ? profileLabel : item.label

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                  isActive && 'bg-accent text-foreground',
                )}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right side - Profile Dropdown */}
        <div className="flex items-center gap-4">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  )
}
