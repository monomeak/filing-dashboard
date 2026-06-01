export const routes = {
  home: '/',
  profile: '/profile',
  dashboard: '/dashboard',
  filing: '/filing',
  searchFiling: '/search-filing',
  createOrganization: '/organizations/new',
} as const

export type AppRoute = (typeof routes)[keyof typeof routes]
export type NavigationIcon = 'user' | 'dashboard' | 'filing' | 'search'
export type NavigationItem = {
  label: string
  href: AppRoute
  icon: NavigationIcon
}

export const primaryNavigation: NavigationItem[] = [
  {
    label: 'My Profile',
    href: routes.profile,
    icon: 'user',
  },
  {
    label: 'Dashboard',
    href: routes.dashboard,
    icon: 'dashboard',
  },
  {
    label: 'Filing',
    href: routes.filing,
    icon: 'filing',
  },
  {
    label: 'Search Filing',
    href: routes.searchFiling,
    icon: 'search',
  },
] as const
