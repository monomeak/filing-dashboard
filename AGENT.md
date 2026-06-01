# AGENT.md

## Project

SETFO Dashboard is a demo-ready Next.js app for profile and filing workflows. It uses the App Router, React 19, TypeScript, Tailwind CSS 4, Radix UI primitives, lucide icons, and local demo data.

## Commands

- Install dependencies: `pnpm install`
- Run locally: `pnpm dev`
- Build for demo: `pnpm build`
- Run production build: `pnpm start`
- Validate TypeScript: `pnpm typecheck`
- Lint/check: `pnpm lint`

Use pnpm for this project because `pnpm-lock.yaml` is committed.

## Structure

- `app/layout.tsx`: root document shell, global CSS, and production-only Vercel Analytics.
- `app/(app)/layout.tsx`: main app shell with the shared navbar.
- `app/(app)/page.tsx`: welcome screen and menu overview.
- `app/(app)/profile/page.tsx`: personal and organization profile details.
- `app/(app)/dashboard/page.tsx`: dashboard placeholder content.
- `app/(app)/filing/page.tsx`: filing placeholder content.
- `app/(app)/search-filing/page.tsx`: search filing placeholder content.
- `app/(app)/organizations/new/page.tsx`: create organization demo flow.
- `components/navbar.tsx`: primary navigation and profile menu.
- `components/profile-dropdown.tsx`: profile switching and create organization entry point.
- `components/route-page.tsx`: reusable page layout for placeholder routes.
- `components/ui/*`: shadcn/Radix-style UI primitives.
- `hooks/use-profiles.ts`: client-side demo profile state.
- `lib/profile-data.ts`: seeded personal and organization data.
- `lib/routes.ts`: route constants and primary navigation config.

## Demo Flow

1. Start the app with `pnpm dev`.
2. Open the local URL printed by Next.js.
3. Use the top-right profile menu to view the current personal profile.
4. Switch between the personal profile and seeded organizations.
5. Create a new organization from the profile menu.
6. Confirm the app routes back to the profile page with the new organization active.
7. Visit Dashboard, Filing, and Search Filing from the nav/menu to show the planned app areas.

## Implementation Notes

- Demo data is intentionally local and client-side. Do not add persistence unless the task explicitly asks for it.
- Keep route paths centralized in `lib/routes.ts`.
- Keep profile demo entities centralized in `lib/profile-data.ts`.
- Use existing UI primitives from `components/ui` before adding custom controls.
- Prefer lucide icons for navigation and action affordances.
- Preserve responsive layouts; pages should work at mobile and desktop widths.
- Avoid broad refactors during demo polish. Keep changes small and visible.

## Demo Readiness Checklist

- `pnpm typecheck` passes.
- `pnpm lint` passes.
- `pnpm build` passes.
- The profile menu opens and closes.
- Personal and organization profile switching works.
- Creating an organization with a non-empty name works.
- Newly created organization becomes the active profile.
- Main routes render without errors: `/`, `/profile`, `/dashboard`, `/filing`, `/search-filing`, `/organizations/new`.
