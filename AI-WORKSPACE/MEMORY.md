# Project memory

Facts below come from the current source unless a sentence says they were only recorded earlier. Unknown items stay unknown.

## Purpose

Visible product name: **VYRA Studio**.

`index.html` sets `<title>VYRA Studio</title>` and `<html lang="uk">`. The wordmark SVG labels the mark "VYRA" and the subtitle "DIGITAL STUDIO".

The npm package name in `package.json` is `ai-web-studio`, version `0.0.0`, `"private": true`. The repository folder is `ai-web-studio`.

The current page presents a digital studio, its services, portfolio concepts, work process, and contact details. The copy invites prospective clients to discuss a project. The email shown in Contacts and Footer is `vyrastudio2@gmail.com`.

## Target audience

Unknown from the current website. The page does not name a client type.

An earlier memory file recorded this audience, and it is **not** confirmed by the current UI:

- Small and medium Ukrainian businesses.
- Automotive services.
- Beauty salons.
- Restaurants and cafes.
- Medical and dental clinics.

## Technologies

Declared in `package.json` and the Vite config:

- React `^19.3.1` and React DOM `^19.3.1`
- TypeScript `~7.0.2`
- Vite `^8.3.6` with `@vitejs/plugin-react` `^6.1.2`
- CSS, with no UI framework and no CSS preprocessor package
- Oxlint `^1.90.0` (`npm run lint`)
- `@types/node` `^24.19.2`, `@types/react` `^19.3.0`, `@types/react-dom` `^19.3.0`

Scripts: `dev` (`vite`), `build` (`tsc -b && vite build`), `lint` (`oxlint`), `preview` (`vite preview`).

Not present in the source:

- React Router or another router
- A state library
- A component library
- A test runner
- Supabase client SDK or dedicated HTTP client (the contact form uses native `fetch`)
- Environment files or secrets committed to the repository (all `.env`, `.env.*`, and `.env.keys` files are strictly gitignored)
- Git metadata and remotes are present in the current workspace.
- A deployment config file

An earlier memory file said deployment was planned on Cloudflare Pages. No Cloudflare config is in the repository. Whether that plan still stands is unknown.

## Design system

`src/index.css` imports `src/styles/tokens.css` and `src/styles/base.css` and says those files own tokens and base styles.

`tokens.css` wraps custom properties in `:root`. An earlier root `MEMORY.md` says this wrapper was added so lightningcss could minify the file. This session did not re-run the build.

`base.css` provides a reset, page colors, heading and body fonts, `.btn` / `.btn--primary` / `.btn--secondary` / `.btn--ghost`, `.container`, selection color, and a scrollbar style.

`Hero.css` styles only the hero. Several selectors in that file have no matching elements in `Hero.tsx` (see `HANDOFF.md`).

`src/App.css` is the Vite template stylesheet. `App.tsx` does not import it. It references variables such as `--accent` that are not defined in `tokens.css`.

There is no documented spacing, type, or color usage guide beyond the token file itself.

## Colors and fonts

Colors in `src/styles/tokens.css`:

| Token | Value |
| --- | --- |
| `--color-bg-primary` | `#080D0A` |
| `--color-bg-secondary` | `#0D130F` |
| `--color-bg-card` | `#111A13` |
| `--color-accent` | `#B5F477` |
| `--color-accent-hover` | `#A3E86B` |
| `--color-text-primary` | `#F4F7F2` |
| `--color-text-secondary` | `#A5B0A5` |
| `--color-border` | `#263229` |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.06)` |
| `--color-white` | `#FFFFFF` |

Selection color in `base.css`: `rgba(181, 244, 119, 0.3)` background with `--color-accent` text. The hero grid uses `rgba(181, 244, 119, 0.03)`.

Font tokens:

- `--font-family-serif`: `'Manrope', system-ui, sans-serif` — used for headings in `base.css`. The token name says serif; the stack is Manrope, which is not a serif family.
- `--font-family-body`: `'Inter', system-ui, sans-serif` — used for `body`, buttons, hero navigation, and the wordmark SVG.

`index.html` loads Manrope and Inter using the Google Fonts stylesheet, with `system-ui, sans-serif` fallbacks in the CSS tokens.

Other recorded scales in `tokens.css`: font sizes `--font-size-xs` through `--font-size-6xl`, weights 100–700, line heights `1.2` / `1.6` / `1.8`, spacing `--space-1` through `--space-12` (4px base), radii `4px` / `6px` / `8px` / `9999px`, shadows, transitions `150ms` / `250ms` / `350ms` with `cubic-bezier(0.4, 0, 0.2, 1)`, container max `1200px`, breakpoints `640` / `768` / `1024` / `1280`. `--space-16` is used in `Hero.css` and is not defined. Weight 500 is named `--font-medium`, not `--font-weight-medium`.

## Architectural decisions

Observed in the current code:

- Single-page React app. `index.html` mounts `/src/main.tsx`. `main.tsx` renders `<App />` in `StrictMode`. `App` composes Hero, Services, Portfolio, Process, Contacts, and Footer in that order.
- Each page section has a component and a paired stylesheet in `src/sections/`.
- Styling is global CSS custom properties plus section CSS. No CSS modules and no CSS-in-JS.
- `tsconfig.app.json` uses `verbatimModuleSyntax`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `noUnusedLocals`, and `noUnusedParameters`. It does not set `"strict": true`. `erasableSyntaxOnly` is enabled, so `import type` is required for type-only imports. An earlier root `MEMORY.md` called related edits "TypeScript Strict Mode"; that was a description of those edits, not the `strict` compiler flag.
- The hero logo is an `<img>` of `src/assets/vyra-wordmark.svg`. An earlier note says this replaced an SVG `<use>` because of a display problem. This session did not compare the old markup.
- Navigation and calls to action are in-page anchor links; the contact email uses `mailto:`. No shared button component is implemented. `base.css` defines `.btn` classes used by Hero.
- `public/favicon.svg` is the icon linked from `index.html`. `src/assets/vyra-logo.svg` is a similar geometric mark and is not imported.

Not present: `src/hooks/`, About section, and routes. Implemented section targets are `#hero`, `#services`, `#portfolio`, `#process`, and `#contacts`.

Backend and database integration state:
- Frontend contact form: `src/components/ContactForm.tsx` posts JSON to the deployed `submit-contact` Edge Function using the public `VITE_SUPABASE_PUBLISHABLE_KEY` in `Authorization` and `apikey` headers. It preserves client validation and honeypot handling, maps accepted/duplicate/rate-limited outcomes, and clears fields only after HTTP 201. No secret key is used in the browser.
- Edge Function: `supabase/functions/submit-contact/index.ts` is a server-side Supabase Edge Function using `@supabase/server` and `withSupabase`. It enforces a 16 KiB streaming request limit, strict allowlist validation for `project_type`, honeypot rejection, and invokes `public.submit_contact_request` through `context.supabaseAdmin`. The PostgreSQL function serializes per-normalized-email duplicate/rate-limit checks and insertion using a transaction advisory lock. It is executable only by `service_role`. Neither the migration nor function has been runtime-tested or deployed as part of this work.
- Database & Migration: Table `public.contact_requests` was created manually via the Supabase SQL Editor in the cloud project. The migration file `supabase/migrations/20261120220000_create_contact_requests.sql` was registered as applied using `supabase migration repair --status applied`, not executed via CLI migration commands.

## Accepted constraints

From the current agent rules and the earlier project notes that are still in force:

- Website content is Ukrainian. Code and technical docs are English.
- Do not change architecture unless the task needs it.
- Do not install dependencies without permission.
- Do not overwrite existing work without reading it.
- Do not delete existing behavior without approval.
- Do not add unused dependencies.
- Do not expose secrets or commit local environment files: secret keys (such as Supabase `service_role` / server secret keys, database credentials, private API tokens) and local environment files (`.env`, `.env.*`, `.env.keys`) must NEVER be committed to Git or exposed in client bundles. Only the public publishable / anon key may ever be passed to the frontend, and local configuration must remain strictly gitignored.
- Do not report a verification that was not actually run.
- Contacts provides direct email contact and a validated request form connected to the server-side Edge Function. The honeypot is only a frontend affordance; server-side honeypot validation remains authoritative.
- The contact Edge Function is public to callers with the project publishable key, performs server-side validation, and writes through the server-only Supabase admin context. `contact_requests` has RLS enabled and no public policies. No email delivery is implemented.
