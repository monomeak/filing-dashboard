export const routes = {
  home: "/",
  profile: "/profile",
  dashboard: "/dashboard",
  filing: "/filing",
  newFiling: "/filing/new",
  searchFiling: "/search-filing",

  createOrganization: "/organizations/new",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
export type NavigationIcon = "user" | "dashboard" | "filing" | "search";
export type NavigationItem = {
  label: string;
  href: AppRoute;
  icon: NavigationIcon;
};

export const primaryNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: routes.dashboard,
    icon: "dashboard",
  },
  {
    label: "My Profile",
    href: routes.profile,
    icon: "user",
  },
  {
    label: "My Filing",
    href: routes.filing,
    icon: "filing",
  },

  {
    label: "Search Filing",
    href: routes.searchFiling,
    icon: "search",
  },
] as const;
