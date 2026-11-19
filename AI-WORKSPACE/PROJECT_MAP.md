# Project map

Map of the repository as inspected on 2026-11-19. `node_modules/` and `dist/` exist on disk. `dist/` is a previous production build output and is gitignored. There is no `.git` directory.

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
| `App.tsx` | Renders `<Hero />` only. |
| `App.css` | Vite template styles. Not imported. |
| `index.css` | Imports `styles/tokens.css` and `styles/base.css`. |
| `styles/tokens.css` | Design tokens on `:root`. File comment still says "AI Web Studio Design Tokens". |
| `styles/base.css` | Reset, document styles, button classes, container. File comment still says "AI Web Studio Base Styles". |
| `sections/Hero.tsx` | Only page section: wordmark, nav, two CTA links, menu button. |
| `sections/Hero.css` | Hero layout, grid background, nav, CTA, and mobile rules. |
| `assets/vyra-wordmark.svg` | Logo used by the hero `<img>`. Text "VYRA" and "DIGITAL STUDIO". |
| `assets/vyra-logo.svg` | Geometric V mark. Not imported. |
| `assets/hero.png` | Vite template isometric graphic. Not imported. |
| `assets/react.svg` | Vite template asset. Not imported. |
| `assets/vite.svg` | Vite template asset. Not imported. |

## Components

There is no `src/components/` directory.

### `Hero`

`src/sections/Hero.tsx` exports `Hero`. Optional prop: `className?: string`. `App` does not pass it.

Rendered content:

- `<img>` of the wordmark, alt text "VYRA Studio".
- Nav links: Послуги `#services`, Портфоліо `#portfolio`, Процес `#process`, Контакти `#contacts`.
- Links: "Обговорити проєкт" to `#contact`, "Переглянути роботи" to `#portfolio`.
- A `<button class="hero__menu-toggle">` with a hamburger SVG. It has no event handler.

`aria-label` values on the section and buttons are English. Visible link text is Ukrainian.

No other section components exist. The folders `src/components/` and `src/hooks/` from the earlier planned map were not created.
