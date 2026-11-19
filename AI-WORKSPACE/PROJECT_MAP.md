# Project map

Map of the repository as inspected on 2026-11-19. `node_modules/` and `dist/` exist on disk. `dist/` is generated build output and is gitignored.

## Root

| Path | Role |
| --- | --- |
| `index.html` | HTML shell. Language `uk`, title `VYRA Studio`, favicon `/favicon.svg`, mounts `/src/main.tsx`. |
| `package.json` | Package name `ai-web-studio`. Scripts and dependency versions. |
| `package-lock.json` | npm lockfile. |
| `vite.config.ts` | Vite config. Only plugin: `@vitejs/plugin-react`. |
| `tsconfig.json` | Project references to `tsconfig.app.json` and `tsconfig.node.json`. |
| `tsconfig.app.json` | Compiler options for `src`. |
| `tsconfig.node.json` | Compiler options for `vite.config.ts`. |
| `.oxlintrc.json` | Oxlint plugins `react`, `typescript`, `oxc`. Enables `react/rules-of-hooks` and `react/only-export-components`. |
| `.gitignore` | Ignores `node_modules`, `dist`, logs, and editor files. |
| `README.md` | Unmodified Vite + React + TypeScript template readme. It does not describe VYRA Studio. |
| `AGENTS.md` | Shared instructions for Cursor, Claude Code, Codex, and Antigravity. |
| `MEMORY.md` | Earlier changelog. Canonical memory is `AI-WORKSPACE/MEMORY.md`. |
| `AI-WORKSPACE/` | Shared memory for sequential agent work. |
| `.claude/scheduled_tasks.lock` | Claude lock file. Its purpose in this project is unknown. |

## `AI-WORKSPACE/`

| File | Role |
| --- | --- |
| `MEMORY.md` | Purpose, audience, stack, design system, decisions, constraints. |
| `PROJECT_MAP.md` | This file. |
| `HANDOFF.md` | Current status and known problems. |
| `TASK_LOG.md` | Record of completed work and checks. |

## `public/`

| File | Role |
| --- | --- |
| `favicon.svg` | Favicon linked from `index.html`. Geometric mark, root `fill="none"`, circle stroke `currentColor`. |
| `icons.svg` | Vite template social/documentation symbols. Not referenced by `index.html` or `src`. |

## `src/`

| File | Role |
| --- | --- |
| `main.tsx` | React entry. Imports `./index.css` and renders `<App />` in `StrictMode`. |
| `App.tsx` | Composes `<Hero />`, `<Services />`, `<Portfolio />`, `<Process />`, `<Contacts />`, and `<Footer />` in page order. |
| `App.css` | Vite template styles. Not imported. |
| `index.css` | Imports `styles/tokens.css` and `styles/base.css`. |
| `styles/tokens.css` | Design tokens on `:root`. File comment still says "AI Web Studio Design Tokens". |
| `styles/base.css` | Reset, document styles, button classes, container. File comment still says "AI Web Studio Base Styles". |
| `sections/Hero.tsx` | Only page section: wordmark, nav, two CTA links, menu button. |
| `sections/Hero.css` | Hero layout, grid background, nav, CTA, mobile rules, and local menu SVG stroke overrides. |
| `sections/Services.tsx` | Ukrainian Services section with three service cards and inline SVG icons. |
| `sections/Services.css` | Responsive Services layout, card styles, hover and reduced-motion behavior. |
| `sections/Portfolio.tsx` | Ukrainian Portfolio section with three clearly labeled fictional concepts and custom CSS/SVG previews. |
| `sections/Portfolio.css` | Responsive project card grid, distinct concept compositions, readable preview microcopy, hover and reduced-motion behavior. |
| `sections/Process.tsx` | Ukrainian Process section with four ordered project stages. |
| `sections/Process.css` | Responsive process timeline with horizontal desktop links, a tablet 2×2 path, and a mobile vertical connector centered on its markers. |
| `sections/Contacts.tsx` | Ukrainian contact section with `#contacts`, email `mailto:` links, and a visual placeholder describing the future form; no form submission behavior. |
| `sections/Contacts.css` | Responsive two-column desktop contact layout, stacked mobile layout, panel, focus styles, and reduced-motion support using shared tokens. |
| `sections/Footer.tsx` | Site footer with existing VYRA wordmark, links to all page sections, contact email, and current year. |
| `sections/Footer.css` | Responsive footer layout, link hover/focus states, and shared token styling. |
| `components/ContactForm.tsx` | Accessible Ukrainian contact form with client-side validation, inline errors, status messaging, and honeypot field. Submission is intentionally not connected. |
| `components/ContactForm.css` | Responsive form controls, visible keyboard focus, validation feedback, and reduced-motion styling using shared tokens. |
| `assets/vyra-wordmark.svg` | Logo used by the hero `<img>`. Text "VYRA" and "DIGITAL STUDIO". |
| `assets/vyra-logo.svg` | Geometric V mark. Not imported. |
| `assets/hero.png` | Vite template isometric graphic. Not imported. |
| `assets/react.svg` | Vite template asset. Not imported. |
| `assets/vite.svg` | Vite template asset. Not imported. |

## Components

`src/components/` currently contains the reusable `ContactForm` component.

### `Hero`

`src/sections/Hero.tsx` exports `Hero`. Optional prop: `className?: string`. `App` does not pass it.

Rendered content:

- `<img>` of the wordmark, alt text "VYRA Studio".
- Nav links: Послуги `#services`, Портфоліо `#portfolio`, Процес `#process`, Контакти `#contacts`.
- Links: "Обговорити проєкт" to `#contacts`, "Переглянути роботи" to `#portfolio`.
- A `<button class="hero__menu-toggle">` with a hamburger SVG and working mobile menu behavior.

`aria-label` values on the section and buttons are English. Visible link text is Ukrainian.

### `Services`

`src/sections/Services.tsx` exports `Services`, with styling in `src/sections/Services.css`. It renders `#services` with Landing Pages, Business Websites, and Website Redesign cards. Inline SVG line icons require no external images or dependencies.

### `Portfolio`

`src/sections/Portfolio.tsx` exports `Portfolio`, with styling in `src/sections/Portfolio.css`. It renders `#portfolio` with three explicitly labeled concept projects, each with its own CSS/SVG website preview. The examples do not claim real clients or business results.

`src/hooks/` from the earlier planned map has not been created; `src/components/` now contains `ContactForm`.

### `Process`

`src/sections/Process.tsx` exports `Process`, with styling in `src/sections/Process.css`. It renders `#process` as four sequential stages. CSS draws the timeline connectors and adapts the layout from a horizontal desktop row to a vertical mobile timeline.

### `Contacts` and `Footer`

`src/sections/Contacts.tsx` exports `Contacts`, with paired `Contacts.css`. It renders `#contacts`, contact details, and embeds `ContactForm`. Email links use `mailto:vyrastudio2@gmail.com`.

`src/sections/Footer.tsx` exports `Footer`, with paired `Footer.css`. It uses the existing VYRA wordmark, links to `#hero`, `#services`, `#portfolio`, `#process`, and `#contacts`, and computes the current year at module load.

### `ContactForm`

`src/components/ContactForm.tsx` exports `ContactForm`. It validates name and message lengths after trimming, validates email syntax and length, and treats project type as optional. On invalid submission it displays field-level errors associated by `aria-describedby` and focuses the first invalid control. A valid submission displays a truthful not-connected message; no data is transmitted. A visually hidden honeypot field is present for future server-side spam handling.
