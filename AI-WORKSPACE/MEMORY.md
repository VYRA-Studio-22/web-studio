# Project memory

Facts below come from the current source unless a sentence says they were only recorded earlier. Unknown items stay unknown.

## Purpose

Visible product name: **VYRA Studio**.

`index.html` sets `<title>VYRA Studio</title>` and `<html lang="uk">`. The wordmark SVG labels the mark "VYRA" and the subtitle "DIGITAL STUDIO".

The npm package name in `package.json` is `ai-web-studio`, version `0.0.0`, `"private": true`. The repository folder is `ai-web-studio`.

An earlier `AI-WORKSPACE/MEMORY.md` described the project as the first commercial web-development portfolio for the Ukrainian market, meant to attract real clients. That purpose is **not** written in the current page copy. The hero has a logo, navigation, and two calls to action, and no explanatory text.

A fuller business description, service list, and positioning are unknown from the current UI.

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
- Environment files or API clients
- A Git repository (no `.git` directory on 2026-11-19)
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

`index.html` does not load a font stylesheet. The repository has no `@font-face` files. If Manrope and Inter are not installed on the visitor's system, the browser falls back to `system-ui, sans-serif`. Whether that is intentional is unknown.

Other recorded scales in `tokens.css`: font sizes `--font-size-xs` through `--font-size-6xl`, weights 100–700, line heights `1.2` / `1.6` / `1.8`, spacing `--space-1` through `--space-12` (4px base), radii `4px` / `6px` / `8px` / `9999px`, shadows, transitions `150ms` / `250ms` / `350ms` with `cubic-bezier(0.4, 0, 0.2, 1)`, container max `1200px`, breakpoints `640` / `768` / `1024` / `1280`. `--space-16` is used in `Hero.css` and is not defined. Weight 500 is named `--font-medium`, not `--font-weight-medium`.

## Architectural decisions

Observed in the current code:

- Single-page React app. `index.html` mounts `/src/main.tsx`. `main.tsx` renders `<App />` in `StrictMode`. `App` returns only `<Hero />`.
- One section component exists: `src/sections/Hero.tsx` with `src/sections/Hero.css`.
- Styling is global CSS custom properties plus section CSS. No CSS modules and no CSS-in-JS.
- `tsconfig.app.json` uses `verbatimModuleSyntax`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `noUnusedLocals`, and `noUnusedParameters`. It does not set `"strict": true`. `erasableSyntaxOnly` is enabled, so `import type` is required for type-only imports. An earlier root `MEMORY.md` called related edits "TypeScript Strict Mode"; that was a description of those edits, not the `strict` compiler flag.
- The hero logo is an `<img>` of `src/assets/vyra-wordmark.svg`. An earlier note says this replaced an SVG `<use>` because of a display problem. This session did not compare the old markup.
- Navigation and calls to action are anchor links. No click handlers and no shared button component are implemented. `base.css` still defines `.btn` classes, and the hero anchors use them.
- `public/favicon.svg` is the icon linked from `index.html`. `src/assets/vyra-logo.svg` is a similar geometric mark and is not imported.

Planned earlier, and **not** present as folders or components: `src/components/`, `src/hooks/`, and sections About, Services, Portfolio, Process, Contact, and Footer. The hero navigation already links to `#services`, `#portfolio`, `#process`, and `#contacts`.

## Accepted constraints

From the current agent rules and the earlier project notes that are still in force:

- Website content is Ukrainian. Code and technical docs are English.
- Do not change architecture unless the task needs it.
- Do not install dependencies without permission.
- Do not overwrite existing work without reading it.
- Do not delete existing behavior without approval.
- Do not add unused dependencies.
- Do not expose secrets.
- Do not report a verification that was not actually run.
- An earlier memory file also recorded: quality over speed, no unnecessary complexity, mobile-first responsiveness, and real functionality rather than decorative controls. Those principles are not encoded in the source. The current hero menu button and hash links do not yet meet the "real functionality" note; see `HANDOFF.md`.
