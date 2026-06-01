'use client'

import Link from 'next/link'

import { ProfileDropdown } from '@/components/profile-dropdown'
import { routes } from '@/lib/routes'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-3 sm:px-6">
        {/* Logo/Brand */}
        <Link href={routes.home} className="flex items-center gap-2">
          <div className="text-base font-bold text-foreground sm:text-lg">
            FilingApp
          </div>
        </Link>

        {/* Right side - Profile Dropdown */}
        <div className="flex items-center gap-4">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  )
}
