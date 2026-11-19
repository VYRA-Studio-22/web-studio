# Handoff

Updated 2026-11-19 after a read-only inspection of the source. No application code was changed in that pass. The dev server, production build, linter, and browser were not run in that pass. A `dist/` directory is already on disk from an earlier build; its current freshness was not checked.

## Current state

VYRA Studio is a Vite + React + TypeScript page with a dark token set and one implemented section, the hero. `App` renders only `Hero`.

The hero shows the wordmark, four Ukrainian nav links, two Ukrainian calls to action, and a menu button. It does not show a headline, supporting copy, or the abstract panels described by unused CSS.

Shared agent memory now lives in `AGENTS.md` and `AI-WORKSPACE/`. The older root `MEMORY.md` is kept as a changelog.

There is no Git repository in this folder, so file history cannot be recovered from commits.

## Implemented

- Vite React TypeScript app with scripts `dev`, `build`, `lint`, and `preview`.
- Ukrainian document language and title `VYRA Studio`.
- Design tokens and base styles in `src/styles/tokens.css` and `src/styles/base.css`.
- Hero section with wordmark image, nav, two links, and a menu button.
- Wordmark and geometric logo SVG files. Only the wordmark is used by the hero. The favicon file is linked from `index.html`.
- `dist/` exists from a previous `vite build`. This session did not rebuild it.

An earlier root `MEMORY.md` records these code edits: tokens moved inside `:root` after a lightningcss `SyntaxError: Invalid qualified rule`; the hero logo switched from SVG `<use>` to `<img>`; `ReactNode` imports changed to `import type`. Those edits match the current source. This session did not reproduce the old build error.

## Not implemented

- About, Services, Portfolio, Process, Contact, and Footer sections.
- `src/components/` and `src/hooks/`.
- Any route other than the single page.
- A working mobile menu. The button does not toggle state. At `max-width: 768px`, `.hero__nav` is hidden unless `.hero__nav--open` is present, and nothing adds that class.
- Destinations for `#services`, `#portfolio`, `#process`, `#contacts`, and `#contact`.
- Font files or a font stylesheet for Manrope and Inter.
- Tests.
- Git, GitHub remote, and deployment configuration. Cloudflare Pages was only mentioned in the previous memory file.
- A project-specific README. `README.md` is still the Vite template text.

## Known problems

Found by reading the source. Not confirmed in a browser in this session.

1. Hash targets do not exist. Nav uses `#contacts`. The primary call to action uses `#contact`.
2. The menu button has no `onClick` and no `aria-expanded`. The mobile nav cannot be opened from the current component.
3. `className={\`hero ${className}\`}` becomes the class `hero undefined` when `className` is omitted. `App` omits it.
4. `.hero__panels`, `.hero__panel--left`, and `.hero__panel--right` are styled and not rendered.
5. `Hero.css` uses `var(--space-16)` inside `@media (min-width: 1024px)`. `--space-16` is not defined in `tokens.css`, so that padding declaration is invalid and the earlier padding remains.
6. The menu button contains an SVG hamburger and also draws `::before` / `::after` bars transformed into an X, while `display` is `flex` only under 768px. The resulting icon was not checked visually.
7. The wordmark SVG sets `fill="currentColor"` and is loaded with `<img>`. An external SVG image does not inherit the page text color. The "DIGITAL STUDIO" line uses `y="4"` in a 36px-tall viewBox, so that line sits on the top edge of the canvas. Visual result not checked in this session.
8. `public/favicon.svg` sets `fill="none"` and `stroke="currentColor"`. How it renders as a favicon was not checked.
9. `base.css` sets `.btn:hover { filter: opacity(0.95); }`. `opacity()` is not a CSS filter function. Effect not checked.
10. `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `src/assets/vyra-logo.svg`, and `public/icons.svg` are unused by the app.
11. Token and base CSS comments, and the previous `AI-WORKSPACE` text before this update, still say "AI Web Studio". The UI title is VYRA Studio. The package name remains `ai-web-studio`.
12. `tsconfig.app.json` does not enable `"strict": true`.

## Next task

No next product task was assigned.

The open product gap visible in the code is the rest of the page: the hero links point at sections that do not exist, and the mobile menu does not open.
