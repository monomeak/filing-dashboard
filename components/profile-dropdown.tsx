"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BankOutlined as Building2,
  CheckOutlined as Check,
  DashboardOutlined as LayoutDashboard,
  FileTextOutlined as FileText,
  LeftOutlined as ChevronLeft,
  LoadingOutlined as LoaderCircle,
  LogoutOutlined as LogOut,
  MenuOutlined as Menu,
  PlusOutlined as Plus,
  SearchOutlined as Search,
  SwapOutlined as Repeat,
  UserOutlined as User,
} from "@ant-design/icons";
import type { ActiveProfile } from "@/lib/profile-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfiles } from "@/hooks/use-profiles";
import { getInitials, personalProfile } from "@/lib/profile-data";
import {
  primaryNavigation,
  routes,
  type AppRoute,
  type NavigationItem,
} from "@/lib/routes";

const navigationIcons = {
  user: User,
  dashboard: LayoutDashboard,
  filing: FileText,
  search: Search,
};

type ProfileDropdownProps = {
  readonly navItems?: NavigationItem[];
};

export function ProfileDropdown({
  navItems = primaryNavigation,
}: ProfileDropdownProps) {
  const router = useRouter();
  const switchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"menu" | "switch">("menu");
  const [switchingProfileId, setSwitchingProfileId] = useState<string | null>(
    null,
  );
  const { activeProfile, organizations, switchProfile } = useProfiles();
  const profileLabel =
    activeProfile.type === "personal" ? "My Profile" : "Organization Profile";

  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current) {
        clearTimeout(switchTimeoutRef.current);
      }
    };
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setView("menu");
      setSwitchingProfileId(null);
    }
  };

  const handleNavigation = (path: AppRoute) => {
    setIsOpen(false);
    router.push(path);
  };

  const handleSwitchProfile = (profile: ActiveProfile, profileId: string) => {
    if (switchingProfileId) {
      return;
    }

    setSwitchingProfileId(profileId);

    switchTimeoutRef.current = setTimeout(() => {
      switchProfile(profile);
      setIsOpen(false);
      setView("menu");
      setSwitchingProfileId(null);
      router.push(routes.profile);
      switchTimeoutRef.current = null;
    }, 450);
  };

  const handleSignOut = () => {
    setIsOpen(false);
    console.log("[v0] User signed out");
  };

  const renderProfileStatus = (profileId: string) => {
    if (switchingProfileId === profileId) {
      return (
        <LoaderCircle className="h-4 w-4 flex-shrink-0 animate-spin text-muted-foreground" />
      );
    }
    if (activeProfile.id === profileId) {
      return <Check className="h-4 w-4 flex-shrink-0 text-green-600" />;
    }

    return null;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-lg border bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:bg-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:rounded-full md:border-0"
          aria-label="Open profile menu"
        >
          <span className="flex md:hidden">
            <Menu className="h-5 w-5 text-foreground" />
          </span>
          <Avatar className="hidden h-11 w-11 ring-2 ring-background shadow-sm md:flex">
            <AvatarImage
              src={
                activeProfile.type === "personal"
                  ? personalProfile.avatar
                  : undefined
              }
              alt={activeProfile.name}
            />
            <AvatarFallback className="text-center font-semibold leading-none [&_.anticon]:flex [&_.anticon]:items-center [&_.anticon]:justify-center [&_svg]:block">
              {activeProfile.type === "personal" ? (
                activeProfile.initials
              ) : (
                <Building2 className="flex h-5 w-5 items-center justify-center leading-none" />
              )}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[calc(100vw-1.5rem)] max-w-80 overflow-hidden rounded-xl border bg-popover p-0 shadow-xl shadow-slate-900/10 md:w-80 dark:shadow-black/30"
      >
        {view === "menu" && (
          <>
            <div className="border-b bg-gradient-to-br from-primary/10 via-background to-primary/5 px-5 py-5 sm:py-6 dark:from-primary/20 dark:via-slate-950 dark:to-primary/10">
              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="h-16 w-16 border-4 border-background shadow-lg sm:h-[72px] sm:w-[72px]">
                  <AvatarImage
                    src={
                      activeProfile.type === "personal"
                        ? personalProfile.avatar
                        : undefined
                    }
                    alt={activeProfile.name}
                  />
                  <AvatarFallback className="text-center font-semibold leading-none [&_.anticon]:flex [&_.anticon]:items-center [&_.anticon]:justify-center [&_svg]:block">
                    {activeProfile.type === "personal" ? (
                      activeProfile.initials
                    ) : (
                      <Building2 className="flex h-7 w-7 items-center justify-center leading-none" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {activeProfile.type === "personal"
                      ? "Personal account"
                      : "Organization account"}
                  </p>
                  <h3 className="truncate text-lg font-bold leading-tight text-foreground">
                    {activeProfile.name}
                  </h3>
                  {activeProfile.type === "personal" && (
                    <div className="mt-3 rounded-lg border bg-background/80 px-4 py-2.5 shadow-sm backdrop-blur">
                      <p className="text-xs font-medium text-muted-foreground">
                        Account {personalProfile.accountNumber}
                      </p>
                      <p className="mt-1 text-base font-bold text-primary">
                        Balance {personalProfile.balance}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="px-2.5 py-2.5">
              {navItems.map((item) => {
                const Icon = navigationIcons[item.icon];
                const label =
                  item.href === routes.profile ? profileLabel : item.label;

                return (
                  <DropdownMenuItem
                    key={item.href}
                    onSelect={() => handleNavigation(item.href)}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-base font-medium transition-colors hover:bg-accent focus:bg-accent"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg  text-muted-foreground leading-none transition-colors  group-hover:text-foreground">
                      <Icon className="flex h-[18px] w-[18px] items-center justify-center" />
                    </span>
                    <span>{label}</span>
                  </DropdownMenuItem>
                );
              })}
            </div>

            <DropdownMenuSeparator className="my-1" />

            <div className="px-2.5 py-2.5 sm:py-3">
              <button
                onClick={() => setView("switch")}
                className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left text-base font-semibold transition-colors hover:bg-accent sm:py-2.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary leading-none transition-colors ">
                  <Repeat className="flex h-[18px] w-[18px] items-center justify-center" />
                </span>

                <span>Switch Profile</span>
              </button>

              <DropdownMenuItem
                onSelect={handleSignOut}
                className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-base font-semibold text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive sm:py-2.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg  text-destructive leading-none">
                  <LogOut className="flex h-[18px] w-[18px] items-center justify-center" />
                </span>
                <span>Sign out</span>
              </DropdownMenuItem>
            </div>
          </>
        )}

        {view === "switch" && (
          <>
            <div className="border-b bg-gradient-to-br from-primary/10 via-background to-primary/5 px-4 py-4 dark:from-primary/20 dark:via-slate-950 dark:to-primary/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView("menu")}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background/80 text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Back to profile menu"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Choose account
                  </p>
                  <h3 className="text-base font-bold leading-tight text-foreground">
                    Switch Profile
                  </h3>
                </div>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto px-2.5 py-3">
              <button
                onClick={() => {
                  handleSwitchProfile(
                    {
                      type: "personal",
                      id: personalProfile.id,
                      name: personalProfile.name,
                      initials: personalProfile.initials,
                    },
                    "personal",
                  );
                }}
                disabled={Boolean(switchingProfileId)}
                className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-base transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-70"
              >
                <Avatar className="h-11 w-11 shrink-0 shadow-sm ring-2 ring-background">
                  <AvatarImage
                    src={personalProfile.avatar}
                    alt={personalProfile.name}
                  />
                  <AvatarFallback className="text-center font-semibold leading-none">
                    {personalProfile.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate font-semibold">
                    {personalProfile.name}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">
                    {switchingProfileId === "personal"
                      ? "Switching..."
                      : "Personal account"}
                  </p>
                </div>

                {renderProfileStatus("personal")}
              </button>

              {organizations.map((organization) => {
                const initials = getInitials(organization.name) || "O";

                return (
                  <button
                    key={organization.id}
                    onClick={() => {
                      handleSwitchProfile(
                        {
                          type: "organization",
                          id: organization.id,
                          name: organization.name,
                          initials,
                        },
                        organization.id,
                      );
                    }}
                    disabled={Boolean(switchingProfileId)}
                    className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-base transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-70"
                  >
                    <Avatar className="h-11 w-11 shrink-0 shadow-sm ring-2 ring-background">
                      <AvatarFallback className="bg-primary/10 text-primary [&_.anticon]:flex [&_.anticon]:items-center [&_.anticon]:justify-center [&_svg]:block">
                        <Building2 className="flex h-[18px] w-[18px] items-center justify-center leading-none" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate font-semibold">
                        {organization.name}
                      </p>
                      <p className="text-sm font-medium text-muted-foreground">
                        {switchingProfileId === organization.id
                          ? "Switching..."
                          : "Organization account"}
                      </p>
                    </div>
                    {renderProfileStatus(organization.id)}
                  </button>
                );
              })}

              <DropdownMenuSeparator className="my-2" />

              <button
                onClick={() => handleNavigation(routes.createOrganization)}
                className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 text-base font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary leading-none">
                  <Plus className="h-[18px] w-[18px]" />
                </span>
                <span>Create Organization</span>
              </button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
