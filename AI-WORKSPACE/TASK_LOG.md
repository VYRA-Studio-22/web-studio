# Task log

No Git history is available. Entries before 2026-11-19 are reconstructed only from files that were already in the repo. They were not re-verified by build, lint, or a browser in the memory-setup session.

## Earlier recorded work

Source: root `MEMORY.md`. Author, date, and commit are unknown.

### CSS tokens

- Change recorded: custom properties in `src/styles/tokens.css` were wrapped in `:root` after lightningcss reported `SyntaxError: Invalid qualified rule` during a Vite build.
- Current file matches that shape. The failing build was not reproduced in the 2026-11-19 memory-setup session.

### Hero logo

- Change recorded: `src/sections/Hero.tsx` stopped using SVG `<use>` and now uses `<img src={vyraWordmark}>`. `.hero__logo` sets width `120px`, height `36px`, and `object-fit: contain`.
- Current `Hero.tsx` and `Hero.css` match that description.

### Type-only imports

- Change recorded: `src/App.tsx` and `src/sections/Hero.tsx` use `import type { ReactNode }`.
- Current files match that. The same note mentioned an `<use xlink:href>` fix on line 29 of `Hero.tsx`. The current file has no `<use>` element. The intermediate markup is not in the repo.

### Hero section

- Change recorded: premium dark hero, responsive grid, Ukrainian calls to action, mobile menu toggle.
- Current code has the dark hero shell, a two-column grid that becomes one column at `768px`, Ukrainian link labels, and a menu button. The button does not toggle the menu. See `HANDOFF.md`.

### Shared workspace, first version

- Files already present before this session: `AGENTS.md`, `AI-WORKSPACE/MEMORY.md`, `AI-WORKSPACE/PROJECT_MAP.md`, `AI-WORKSPACE/HANDOFF.md`.
- Those copies described an unimplemented Vite template named "AI Web Studio" and a planned section list. They were behind the hero and token work above. `TASK_LOG.md` did not exist.

Checks recorded for that earlier work: the old handoff said Node.js and Git were installed and that the dev server had started. This session found no `.git` directory. Node and the dev server were not checked again.

## 2026-11-19 — Shared agent memory

Goal: one memory set for Cursor, Claude Code, Codex, and Antigravity. No application source was edited.

Files changed:

- `AGENTS.md` — replaced the stale "AI Web Studio" agent rules with shared instructions. Kept the Ukrainian-copy rule, English code and docs, no secrets, no unrequested dependency installs, and no unverified test claims.
- `AI-WORKSPACE/MEMORY.md` — rewrote from the current source. Kept the earlier audience and portfolio purpose, labeled as unconfirmed by the UI.
- `AI-WORKSPACE/PROJECT_MAP.md` — replaced the planned tree with the files that are actually in the repo.
- `AI-WORKSPACE/HANDOFF.md` — replaced the "template only" status with the hero-stage status and code-level problems.
- `AI-WORKSPACE/TASK_LOG.md` — created this log.
- `MEMORY.md` — added a pointer to `AI-WORKSPACE/`. The existing changelog was left in place.

Checks:

- Source, config, public assets, and the existing memory files were read.
- `npm run build` and `npm run lint` were not run.
- The page was not opened in a browser.
- No Git status, because the folder is not a Git repository.

## 2026-11-19 — QA fixes for the hero

Goal: address the confirmed typography, mobile CTA/menu, hover, focus behavior, and future section link issues without changing the visual direction.

Files changed:

- `index.html` — added Google Fonts preconnects and stylesheet for Manrope and Inter; CSS token stacks retain `system-ui, sans-serif` fallbacks.
- `src/sections/Hero.tsx` — removed focus-out auto-close and body scroll locking from the non-modal mobile menu. Existing Escape, outside pointer, link activation, focus-on-open, and Escape focus return behavior remain. Navigation and CTA destinations consistently point to named future section IDs; no empty targets were created.
- `src/sections/Hero.css` — H1 line-height is 1.18, mobile CTA buttons are 52px tall, mobile menu and burger borders use `--color-border`.
- `src/styles/base.css` — simplified button hover to `opacity: 0.95`.
- `AI-WORKSPACE/HANDOFF.md` — current status, remaining section destinations, and browser verification limitation.

Checks:

- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed; Vite production build completed.
- `npm run lint` — passed (exit code 0).
- Browser responsive check at 1440, 1280, 768, 390, and 360px — not completed. The in-app browser timed out opening `http://127.0.0.1:5173/`; no visual layout claim is made.
- Link scan — brand points to existing `#hero`; navigation/CTAs point to the planned `#services`, `#portfolio`, `#process`, `#contacts`. Only `#hero` currently exists; planned section targets await their sections.

## 2026-11-19 — Services section

Goal: add the responsive Ukrainian Services section using the existing tokens and visual language, without creating other sections.

Files changed:

- `src/sections/Services.tsx` — added the `#services` section, requested heading and description, three service cards, and original inline SVG line icons.
- `src/sections/Services.css` — added desktop three-column cards, tablet/mobile stacked cards, restrained hover states, and reduced-motion support. Reconciled inline icon styles with the existing global SVG reset after browser review showed filled icons.
- `src/App.tsx` — renders Services after Hero; there is no nested `<main>`.
- `AI-WORKSPACE/PROJECT_MAP.md` — documented the new section and App composition.
- `AI-WORKSPACE/HANDOFF.md` — updated current page status, implemented sections, checks, and remaining gaps.

Checks:

- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed; Vite production build completed.
- `npm run lint` — passed (exit code 0).
- Browser preview — opened successfully. Verified content hierarchy, three cards, and custom line icons at the available viewport (about 864px wide). The browser tool did not expose viewport controls, so exact 1440/1280/768/390/360 checks were unavailable.

## 2026-11-19 — Portfolio section

Goal: add an adaptive Portfolio section with three fictional concepts, distinct visual treatments, and clear concept labeling.

Files changed:

- `src/sections/Portfolio.tsx` — added `#portfolio`, requested Ukrainian heading and intro, three concept cards with the specified names/categories/descriptions/technologies, and distinct in-page previews. Each preview is labeled “Концепт”.
- `src/sections/Portfolio.css` — added responsive three-column wide layout, stacked mobile layout, CSS/SVG preview compositions, hover states, and reduced-motion support.
- `src/App.tsx` — renders Portfolio after Services.
- `AI-WORKSPACE/PROJECT_MAP.md` — documented Portfolio files and App composition.
- `AI-WORKSPACE/HANDOFF.md` — updated implemented sections, remaining anchors, and verification status.

Checks:

- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed; Vite production build completed.
- `npm run lint` — passed (exit code 0).
- Browser preview — opened successfully. Reviewed all three cards and their project preview compositions at about 864px wide. The browser tool does not expose viewport resizing; exact breakpoint checks were unavailable.

## 2026-11-19 — Process section

Goal: add an adaptive four-step Process timeline and connect it after Portfolio.

Files changed:

- `src/sections/Process.tsx` — added `#process`, the requested Ukrainian heading and intro, and four ordered stage descriptions in an accessible ordered list.
- `src/sections/Process.css` — added a horizontal four-step desktop timeline, tablet two-column transition, mobile vertical timeline, hover feedback, and reduced-motion handling using existing tokens.
- `src/App.tsx` — renders Process after Portfolio.
- `AI-WORKSPACE/PROJECT_MAP.md` — documented the new component and App composition.
- `AI-WORKSPACE/HANDOFF.md` — updated implemented sections and the remaining Contact gap.

Checks:

- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed; Vite production build completed.
- `npm run lint` — passed (exit code 0).
- Browser responsive review — not performed in this task.
- Change scope — verified with `git status`; only `src/App.tsx`, the two new Process files, and the three requested workspace documents were changed for this task.

## 2026-11-19 — Visual QA follow-up

Goal: correct the mobile menu icon stroke reset, Process tablet/mobile connectors, and small Portfolio preview labels; inspect Services and Portfolio card sizing without broad redesign.

Files changed:

- `src/sections/Hero.css` — added `.hero__menu-icon *` fill/stroke overrides so only the menu icon paths escape the global SVG reset.
- `src/sections/Process.css` — added a serpentine 2×2 tablet order with horizontal links through the marker row and a downward connector confined to the row gap. The mobile guide position now uses the list top padding plus half the shared marker size, with a matching bottom calculation.
- `src/sections/Process.tsx` — added a decorative connector element used only for the tablet row transition.
- `src/sections/Portfolio.css` — increased the interior preview menu and fitness preview index text sizes without changing project copy.
- `AI-WORKSPACE/PROJECT_MAP.md` — described the focused SVG, preview microcopy, and Process connector behavior.
- `AI-WORKSPACE/HANDOFF.md` — recorded fixes and browser coverage limits.

Checks:

- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed; Vite production build completed.
- `npm run lint` — passed (exit code 0).
- Browser review — tablet layout was checked at about 864px wide. Process links did not cross stage text; Services and Portfolio cards appeared balanced, with no apparent overflow or forced empty height. The browser control did not provide exact mobile or desktop viewport resizing, so those sizes were not visually verified.
- Scope — `git status` was checked; changes are limited to Hero/Process/Portfolio styles, Process markup, and the requested workspace documents.

## 2026-11-19 — Contacts and Footer

Goal: add the Contacts and Footer sections using the existing tokens and section architecture, with working page/email links and a clearly future-only form area.

Files changed:

- `src/sections/Contacts.tsx` and `src/sections/Contacts.css` — added `#contacts`, Ukrainian intro and email details, and a visual area reserved for a future application form. No form or fake submission behavior was added.
- `src/sections/Footer.tsx` and `src/sections/Footer.css` — added the existing VYRA wordmark, links to Hero/Services/Portfolio/Process/Contacts, clickable email, and automatic current year.
- `src/App.tsx` — appends Contacts and Footer after Process.
- `AI-WORKSPACE/MEMORY.md`, `PROJECT_MAP.md`, `HANDOFF.md`, and `TASK_LOG.md` — synchronized project facts and documented this task.

Checks:

- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed; Vite production build completed.
- `npm run lint` — passed (exit code 0, no warnings) after moving the automatic year calculation to module scope.
- Browser preview — attempted at `http://127.0.0.1:5174/`; the browser timed out. Visual breakpoints, link activation, and overflow could not be verified in-browser.
- `git diff --stat` and `git status --short` — checked; no commit created. Status and stats are reported in the task response.

## 2026-11-19 — Contact form frontend

Goal: add a reusable, accessible client-side application form to Contacts without connecting a submission service.

Files changed:

- `src/components/ContactForm.tsx` — added name, email, optional project type, message, client-side validation, inline errors linked through `aria-describedby`/`aria-invalid`, first-invalid-field focus, four typed status values, and a hidden honeypot. Valid submit reports that sending is not connected; it does not show success or transmit data.
- `src/components/ContactForm.css` — added responsive token-based fields, keyboard focus states, error styling, honeypot hiding, and reduced-motion handling.
- `src/sections/Contacts.tsx` — embedded `ContactForm` in the existing highlighted contact panel, replacing the future-form placeholder.
- `src/sections/Contacts.css` — adjusted form-panel heading spacing for the embedded component.
- `AI-WORKSPACE/PROJECT_MAP.md`, `HANDOFF.md`, and `MEMORY.md` — recorded component responsibilities and form limitations.

Checks:

- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed; Vite production build completed.
- `npm run lint` — passed (exit code 0, no warnings).
- Browser interaction/responsive verification — not performed in this task.
- Git status and diff stats — checked; no commit created.

## 2026-11-20 — Contact submission Edge Function

Goal: implement the server-side `submit-contact` endpoint without exposing privileged credentials, changing the migration/cloud database, or connecting email services.

Files changed:

- `supabase/functions/submit-contact/index.ts` — replaced the generated greeting stub with POST JSON processing, streamed 16 KiB request cap, input normalization and server-side validation, honeypot rejection, persistent same-payload duplicate rejection and per-email throttling, allowlisted insertion through `ctx.supabaseAdmin`, generic database failure responses, and non-PII static logs. `withSupabase` uses publishable-key auth and its built-in CORS/OPTIONS handling.
- `AI-WORKSPACE/MEMORY.md` — documented the Edge Function and clarified that frontend form integration remains absent.
- `AI-WORKSPACE/HANDOFF.md` — recorded behavior, limitations, and deployment requirements.

Checks:

- `npx tsc --noEmit` — passed for the frontend project (exit code 0); this does not include Deno function source.
- `npm run build` — passed.
- Strict TypeScript compile of the Edge Function source with a temporary local declaration stub — passed. This is a source-level check, not a Deno check; the temporary file was removed.
- `npm run lint` — attempted, but Oxlint failed to load its Windows native binding because Application Control blocked the `.node` binary; no WASI fallback is installed. No dependencies were changed.
- Deno check and HTTP tests (OPTIONS, invalid payloads, honeypot, successful database insert) — not run: Deno is absent and the local Supabase stack cannot start because Docker Desktop's Linux engine is unavailable.
- `npx supabase --version` — passed (3.2.0). `npx supabase status` confirmed local stack unavailable. No function deployment or cloud database operation was performed.
- Rate-limit design — limited to persisted per-email throttling using existing rows; no in-memory limiter, migration, extra table, or external service added. This limiter is not atomic or IP-based.

## 2026-11-20 — Form audit fixes & validation alignment

Goal: address audit findings by adding a server-side whitelist for `project_type`, adding `Allow: POST, OPTIONS` to 405 response, aligning frontend text length calculation with Unicode code points, and verifying safe honeypot handling without connecting `fetch` or changing SQL schema/deployments.

Files changed:

- `supabase/functions/submit-contact/index.ts`:
  - Added `ALLOWED_PROJECT_TYPES` Set (`landing`, `business-website`, `redesign`, `other`).
  - Added whitelist validation rejecting unknown project types with 400 Bad Request.
  - Added support for `payload.project_type ?? payload.projectType` alias mapping.
  - Added `Allow: POST, OPTIONS` header to 405 Method Not Allowed response.
  - Preserved `withSupabase` and `context.supabaseAdmin` architecture, 16 KiB streamed body bound, and RLS bypass isolation.
  - Maintained honeypot rejection without persisting to DB or returning fake success.
- `src/components/ContactForm.tsx`:
  - Added `characterCount(value)` (`Array.from(value).length`) counting Unicode code points identically to backend.
  - Updated `validate()` to use `characterCount` for `name`, `email`, and `message`.
  - Added `/u` flag to `EMAIL_PATTERN` matching backend regex.
  - Kept frontend submission disconnected (no `fetch`), preserving existing unconnected status behavior.
- `AI-WORKSPACE/HANDOFF.md` and `AI-WORKSPACE/TASK_LOG.md` — updated status and recorded verification results.

Checks:

- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed (exit code 0, 31 modules transformed, clean production build).
- `git diff --check` — passed (exit code 0, no trailing whitespace or merge conflict markers).
- Edge Function runtime tests — not run: Deno is not installed in the environment and Docker Desktop is unavailable; function logic was verified via static code analysis.
- Scope — no dependencies added, no SQL migration modified or executed, no deployment executed, no git commit created.

## 2026-11-22 — Documentation and Git configuration audit

Goal: update and synchronize project documentation (`HANDOFF.md`, `MEMORY.md`, `PROJECT_MAP.md`) following the Supabase Edge Function implementation and cloud database registration, ensure `.gitignore` completely prevents `.env*` secrets and `supabase/.temp/` from being tracked, verify `.npmrc` has no credentials, and confirm no secrets exist in tracked files without modifying React components, Edge Function, SQL schema, or creating commits.

Files changed:

- `AI-WORKSPACE/HANDOFF.md` — restored full site architecture details (Hero, Services, Portfolio, Process, Contacts, Footer, typography, tokens, navigation); documented `ContactForm` validation, honeypot, and disconnected status; documented `submit-contact` Edge Function architecture; explicitly recorded that `contact_requests` was created manually via Supabase SQL Editor and the migration was registered as applied via `supabase migration repair --status applied`; stated that the function is not deployed or tested in runtime; documented backend limitations and next deployment steps.
- `AI-WORKSPACE/MEMORY.md` — clarified absence of frontend API client / network wiring for `ContactForm`; explicitly mandated that secret keys (service_role, db credentials) and local `.env` files must never be committed to Git; recorded SQL Editor table creation and `migration repair` registration; preserved site structure and design tokens.
- `AI-WORKSPACE/PROJECT_MAP.md` — added `supabase/` entry in root table and documented `supabase/config.toml`, `supabase/.gitignore`, migration file, Edge Function files, and `.temp/` cache.
- `.gitignore` — added explicit ignore rules for `.env`, `.env.*`, `!.env.example`, `.env.keys`, and `supabase/.temp/`.
- `AI-WORKSPACE/TASK_LOG.md` — recorded documentation corrections, Git configuration audit, and verification checks.

Checks:

- `git check-ignore -v` — verified that `.env`, `.env.local`, `.env.production`, `.env.development`, `.env.staging`, `.env.keys`, `supabase/.temp`, and `supabase/.temp/project-ref` are ignored, and `!.env.example` is retained as an unignored template.
- Static credential audit of `supabase/functions/submit-contact/.npmrc` — confirmed file contains only 3 comment lines and no tokens, credentials, or registries.
- Secret scan across git-tracked files (`git grep -i -E ...`) — confirmed zero API keys, secrets, tokens, or credentials in tracked repository files.
- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed (exit code 0, Vite build completed cleanly).
- `git diff --check` — passed (exit code 0, no whitespace errors or conflict markers).
- `git status --short` — verified working copy status.
- Scope constraints — no React components modified, no Edge Function code modified, no SQL migration modified/run, no dependencies installed, no deployment executed, and no git commit created.

## 2026-11-22 — Documentation corrections after read-only audit

Goal: align the handoff and project map with the current source, correct the documented Supabase Edge Function environment variables, and preserve the recorded cloud table/migration history.

Files changed:

- `AI-WORKSPACE/HANDOFF.md` — corrected the Portfolio concepts and Process stage names against their components; verified the remaining section descriptions against `App.tsx` and section sources; clarified that ContactForm is rendered but sends no data; documented standard platform Supabase variables and local fallback names separately from future browser-visible Vite variables; retained the reported manual SQL Editor creation and `migration repair` registration history.
- `AI-WORKSPACE/PROJECT_MAP.md` — documented the real App section order, Hero-owned header and `<main>`, and the actual embedded but unconnected ContactForm.
- `AI-WORKSPACE/TASK_LOG.md` — recorded this documentation-only correction and its checks.

Checks:

- Source comparison — read `src/App.tsx`, all files under `src/sections/` and `src/components/`, `src/styles/`, `supabase/functions/submit-contact/index.ts`, and `supabase/config.toml`; section copy/order and described form/backend status were matched to current code. Migration history is preserved as a previously reported action, not independently verified against cloud state.
- `git diff --check` — passed (exit code 0; only Git line-ending conversion warnings for already modified working-tree files).
- `git status --short` — checked; this task changed only the three documentation files listed above, alongside existing unrelated working-tree changes.
- No React/TypeScript or Edge Function source, SQL, database, dependencies, or deployment were changed or used.
- No runtime verification was performed.

## 2026-11-22 — Markdown and project map date correction

Goal: verify the handoff heading formatting and bring the project map inspection date up to date.

Files changed:

- `AI-WORKSPACE/PROJECT_MAP.md` — updated the map's inspection date to 2026-11-22.
- `AI-WORKSPACE/TASK_LOG.md` — recorded this documentation-only correction. The `Implemented` heading in `HANDOFF.md` is already a correctly formatted level-two heading.

Checks:

- `git diff --check` — passed (exit code 0; Git emitted only line-ending conversion warnings for existing working-tree edits).
- `git status --short` — checked; unrelated prior changes remain present.
- No application source, backend function, SQL, database, dependencies, or deployment were changed or used.

## 2026-11-22 — Atomic contact request rate limiting

Goal: prevent concurrent requests from bypassing the per-email duplicate/rate limit by moving duplicate check, 3-per-15-minute limit check, and insertion into one transaction-scoped PostgreSQL function.

Files changed:

- `supabase/migrations/20261122230000_atomic_contact_request_rate_limit.sql` — creates `public.submit_contact_request` as `SECURITY DEFINER` with a restricted `pg_catalog, pg_temp` search path, transaction advisory lock keyed by normalized email, the existing duplicate and 3-per-15-minute checks, same-transaction insert, and `accepted` / `duplicate` / `rate_limited` status results. Revokes execute from `PUBLIC`, `anon`, `authenticated`, and `service_role`, then grants execute only to `service_role`.
- `supabase/functions/submit-contact/index.ts` — replaces separate duplicate/rate queries and insert with `context.supabaseAdmin.rpc("submit_contact_request", ...)`; maps the three expected statuses to 201/409/429 and returns generic errors for RPC failures or unexpected statuses. Existing request limits, validation, honeypot, and generic error handling remain.
- `AI-WORKSPACE/HANDOFF.md` — documents transactional flow, privileges, status mapping, and that the new migration remains unapplied and untested in runtime.
- `AI-WORKSPACE/MEMORY.md` — records the backend architectural change to atomic database-side enforcement.
- `AI-WORKSPACE/PROJECT_MAP.md` — adds the new migration to the repository map.
- `AI-WORKSPACE/TASK_LOG.md` — records implementation and checks.

Checks:

- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed (Vite production build completed).
- `git diff --check` — passed (exit code 0; Git emitted line-ending conversion warnings for pre-existing edited files).
- `npx supabase config validate` — passed; `supabase/config.toml` is valid.
- SQL permissions and function security — statically inspected migration: restricted `search_path`, transaction advisory lock, revoke/grant statements as required. Not queried against a running database.
- Status handling — statically inspected Edge Function mapping for `accepted`, `duplicate`, and `rate_limited` to 201, 409, and 429 respectively.
- PostgreSQL runtime, concurrent HTTP requests, migration application, and deployed endpoint — not tested. No migration or deployment was run.
- No frontend, design, other sections, dependencies, or Git commit were changed.

## 2026-11-22 — Connect contact form to Supabase Edge Function

Goal: connect the existing ContactForm to the user-reported active production `submit-contact` endpoint using only a Vite-exposed publishable key.

Files changed:

- `src/components/ContactForm.tsx` — added JSON POST with `Authorization: Bearer` and `apikey` headers using `VITE_SUPABASE_PUBLISHABLE_KEY`; retained client validation and honeypot; added loading, success, duplicate, rate-limit, and generic network/server handling; clears form values only on HTTP 201.
- `.env.example` — documents `VITE_SUPABASE_PUBLISHABLE_KEY` with no key value.
- `AI-WORKSPACE/HANDOFF.md` — documented form API behavior, deployment state as reported by the user, required frontend env configuration, and lack of live request verification.
- `AI-WORKSPACE/MEMORY.md` — updated the architecture record to note native fetch integration and the public key boundary.
- `AI-WORKSPACE/PROJECT_MAP.md` — documented the env example and connected ContactForm responsibility.
- `AI-WORKSPACE/TASK_LOG.md` — recorded this task and checks.

Checks:

- `git check-ignore -v .env.local` — passed; `.gitignore` pattern `.env.*` ignores the local file.
- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed (Vite production build completed).
- `git diff --check` — passed (exit code 0; only line-ending conversion warnings for already modified files).
- No live submission was made; production endpoint status and applied migrations are based on user-provided context, not independently verified here.
- No deployment, migration, dependency installation, or Git commit was performed.

## 2026-11-22 — Auto-Ritm Portfolio card update with real screenshot

Goal: update the auto service card in the Portfolio section from an educational concept to the live Auto-Ritm project (`https://vyra-studio-22.github.io/Portfolio_Auto-Ritm/`), capture a real desktop screenshot of the site via browser subagent, make the entire card clickable opening in a new tab (`target="_blank"`, `rel="noopener noreferrer"`), add clear hover and focus feedback, and preserve the responsive design and other concept cards.

Files changed:

- `public/images/portfolio/auto-ritm-preview.png` — saved actual desktop hero screenshot captured from the live Auto-Ritm website.
- `src/sections/Portfolio.tsx` — updated project 01 to `Auto-Ritm — автосервіс нового покоління` with link `https://vyra-studio-22.github.io/Portfolio_Auto-Ritm/`, descriptive alt text, external arrow indicator, and `Реальний проєкт` badge; rendered linkable cards as interactive `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"`; preserved static `<article>` and SVG/CSS mock rendering for Interior and Fitness concepts.
- `src/sections/Portfolio.css` — added `.portfolio__card--link`, `.portfolio__external-arrow`, `.portfolio__mock--image`, `.portfolio__image`, and `.portfolio__concept--live` with hover lift, accent glow, focus-visible outline, and reduced-motion support; preserved responsive grid and stacked mobile layouts.
- `AI-WORKSPACE/PROJECT_MAP.md` — documented the new public screenshot asset and updated Portfolio card structure.
- `AI-WORKSPACE/HANDOFF.md` — updated the Portfolio section description reflecting the live Auto-Ritm project.
- `AI-WORKSPACE/TASK_LOG.md` — recorded this task and verification results.

Checks:

- Screenshot capture — captured real desktop viewport (1024x680) from `https://vyra-studio-22.github.io/Portfolio_Auto-Ritm/` via browser subagent (verified by host fact `visited_origins: https://vyra-studio-22.github.io`).
- `npx tsc --noEmit` — passed (exit code 0).
- `npm run build` — passed (exit code 0, 31 modules transformed, clean production build).
- `git diff --check` — passed (exit code 0).
- `git status --short` — verified working tree status; no commits created.
- Scope constraints — no changes to Auto-Ritm itself, other VYRA Studio sections, or the Interior/Fitness cards; no new dependencies installed.
