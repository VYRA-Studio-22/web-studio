# Handoff

Updated 2026-11-22 after source-verified documentation corrections for page sections and Supabase environment variables.

## Current state

VYRA Studio is a Ukrainian single-page website built with React 19, TypeScript, and Vite. `src/App.tsx` composes all sections in sequential order: Hero, Services, Portfolio, Process, Contacts, and Footer. Sections use dedicated stylesheets and the shared design tokens in `src/styles/tokens.css` (Premium Dark palette with `#080D0A`, `#0D130F`, `#111A13`, and Fresh Green accents `#B5F477`, `#A3E86B`). Typography pairs Google Fonts Manrope for headings and Inter for body/interface text with system fallbacks.

### Implemented site sections

- **Hero (`#hero`)**: Premium dark shell, responsive 2-column layout (collapses to single column at 768px), brand wordmark (`src/assets/vyra-wordmark.svg`), desktop navigation, two primary CTA links ("Обговорити проєкт" pointing to `#contacts` and "Переглянути роботи" pointing to `#portfolio`), and a mobile hamburger menu with accessible keyboard and pointer behaviors (Escape key, outside click handling, focus preservation).
- **Services (`#services`)**: Studio service offerings with heading, intro text, and three responsive cards (Landing Pages, Business Websites, Website Redesign). Each card includes a custom inline SVG line icon styled using design tokens.
- **Portfolio (`#portfolio`)**: Showcase section with three projects: Auto-Ritm — «Auto-Ritm — автосервіс нового покоління» (Business Website) is a real implemented project with live screenshot (`public/images/portfolio/auto-ritm-preview.png`), external clickable link (`https://vyra-studio-22.github.io/Portfolio_Auto-Ritm/`), and `Реальний проєкт` badge; Interior Studio — «Простір для натхнення» (Creative Website) and Fitness Studio — «Рухайся до більшого» (Landing Page) remain educational concept cards with CSS/SVG previews and `Концепт` badges.
- **Process (`#process`)**: Four-step accessible ordered list using the source titles «Знайомство та обговорення», «Дизайн та структура», «Розробка та тестування», and «Запуск та підтримка». CSS adapts the timeline from a desktop horizontal sequence to a 2×2 serpentine layout on tablet and a vertical centered guide on mobile.
- **Contacts (`#contacts`)**: Ukrainian contact section with introductory copy, direct email link (`mailto:vyrastudio2@gmail.com`), and the embedded `ContactForm` inside a highlighted panel. The form validates input and submits to the Supabase Edge Function.
- **Footer**: Existing VYRA wordmark, anchor links to `#hero`, `#services`, `#portfolio`, `#process`, and `#contacts`, clickable email, and the current year calculated at module load.

### ContactForm implementation

`src/components/ContactForm.tsx` is an accessible, client-side application form:
- Validates name (2–80 characters), email (valid syntax via regex with `/u` flag, max 254 characters), optional project type (`landing`, `business-website`, `redesign`, `other`), and message (20–2000 characters). Length is computed via `characterCount(value)` (`Array.from(value).length`) to match server-side Unicode code point counting.
- Associates field errors using `aria-describedby` and `aria-invalid`, and moves focus to the first invalid control upon failed submission.
- Includes a hidden honeypot field (`website`) to trap automated submissions.
- **Connection status**: The form sends a JSON POST to the configured Supabase `submit-contact` Edge Function using `VITE_SUPABASE_PUBLISHABLE_KEY` in both `Authorization: Bearer` and `apikey` headers. It handles accepted, duplicate, rate-limited, network, and generic server errors without displaying backend internals. Ordinary fields clear only after HTTP 201 success.

### Supabase Edge Function implementation

`supabase/functions/submit-contact/index.ts` is a server-side Deno function using `@supabase/server` and `withSupabase`:
- Accepts HTTP POST requests authenticated with the project publishable key; handles CORS and OPTIONS preflight requests automatically, and returns HTTP 405 with `Allow: POST, OPTIONS` for other methods.
- Enforces a 16 KiB streamed body bound (`MAX_BODY_BYTES = 16 * 1024`) to guard against oversized payloads.
- Validates and normalizes payload fields server-side with Unicode-aware checks; aliases both `project_type` and `projectType` while enforcing a strict allowlist (`landing`, `business-website`, `redesign`, `other`, or `null`). Disallowed values return 400 Bad Request.
- Honeypot check: submissions with a populated `website` field are rejected with 400 Bad Request without writing to the database or returning simulated success.
- Atomic rate limiting and duplicate handling: calls `public.submit_contact_request` through `context.supabaseAdmin.rpc`. The PostgreSQL function acquires a transaction advisory lock keyed by normalized email, checks exact duplicates and a maximum of 3 submissions in the trailing 15 minutes, then inserts in the same transaction. It returns only `accepted`, `duplicate`, or `rate_limited` statuses.
- Function access: the migration revokes execute from `PUBLIC`, `anon`, `authenticated`, and `service_role` before granting it only to `service_role`. The function is `SECURITY DEFINER` with `search_path` restricted to `pg_catalog, pg_temp`; the table is schema-qualified.
- The Edge Function maps known statuses to 201/409/429. RPC errors and unknown statuses receive generic responses; PostgreSQL details and email-specific information are not returned.
- Generic database error responses and non-PII console logging.

### Database schema and migration registration

- The table `public.contact_requests` was created **manually in the Supabase SQL Editor** on the cloud project (UUID primary key, checked length constraints on name/email/message/project_type, timestamp default, and RLS enabled with no public policies).
- The migration file `supabase/migrations/20261120220000_create_contact_requests.sql` matches the table schema and was registered into the project's migration history using `supabase migration repair --status applied`, **not** executed by the Supabase CLI (`db push` / `migration up`).

## Implemented

- Complete frontend site (Hero, Services, Portfolio, Process, Contacts, Footer) with responsive layouts, accessible navigation, and token styling.
- `ContactForm` component with synchronized Unicode length validation, inline accessible error states, honeypot input, and connected submission states.
- Server-side `submit-contact` Edge Function codebase with 16 KiB body limit, strict allowlist, honeypot handling, and atomic duplicate/rate-limit enforcement plus insertion via a service-role-only PostgreSQL function.
- Migration `20261122230000_atomic_contact_request_rate_limit.sql` adds the transaction-locked submission function without rewriting prior migration history.
- Migration file `20261120220000_create_contact_requests.sql` registered as applied via `migration repair`.
- Secure Git ignore rules for `.env*`, `.env.keys`, and `supabase/.temp/`. Checked `supabase/functions/submit-contact/.npmrc` to confirm absence of tokens and private credentials.

## Known limitations and verification status

- **Edge Function runtime / deployment**: The user reports the production `submit-contact` function is ACTIVE and PostgreSQL migrations are applied. This frontend task did not send a production request or independently verify the deployed runtime.
- **Database index**: No composite index on `(email, created_at)` is defined in the existing table migration. Consider adding it before production traffic grows.
- **Rate limiting scope**: Per-email limit checks and inserts are serialized atomically by the database function. There is no IP-based throttling.
- **Frontend key configuration**: `VITE_SUPABASE_PUBLISHABLE_KEY` must be supplied in the Vite hosting environment; `.env.example` documents the variable name without a key. The key is public and is not a server secret.
- **Email notifications**: No notification service (Resend, SendGrid, SMTP) is configured.

## Operational follow-up

1. Set `VITE_SUPABASE_PUBLISHABLE_KEY` in the frontend hosting environment and verify the form against the deployed endpoint in a controlled manual check.
2. `withSupabase` uses the standard Supabase Edge Function platform variables automatically: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEYS`, and `SUPABASE_SECRET_KEYS`. For local configuration, `SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY` are fallback variable names. Do not manually add `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_ANON_KEY` for the standard `@supabase/server` setup. Never expose server secret keys in frontend code or Git.
3. In production, consider restricting CORS origin from wildcard to the production domain, adding an index on `(email, created_at)`, and setting up email notifications for new contact submissions.

The table was reported as created manually in the Supabase SQL Editor, and its initial migration was registered with `supabase migration repair --status applied`. The user reports the PostgreSQL migrations are now applied in production; this task did not query cloud migration state.
