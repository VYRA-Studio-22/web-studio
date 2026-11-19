# Handoff

Updated 2026-11-19 after adding the Process section. TypeScript, production build, and lint pass. Exact responsive browser breakpoints were not checked in this task.

## Current state

VYRA Studio is a Vite + React + TypeScript single page with a dark token set. `App` renders Hero, Services, Portfolio, then Process. Services has three service cards with inline SVG icons. Portfolio has three clearly labeled concept projects with distinct CSS/SVG previews. Process has four ordered steps and a timeline connector that switches from horizontal to vertical. The sections use responsive layouts and reduced-motion behavior.

The hero shows the wordmark, four Ukrainian nav links, headline, supporting copy, abstract interface artwork, two Ukrainian calls to action, and a working mobile menu.

Shared agent memory now lives in `AGENTS.md` and `AI-WORKSPACE/`. The older root `MEMORY.md` is kept as a changelog.

There is no Git repository in this folder, so file history cannot be recovered from commits.

## Implemented

- Vite React TypeScript app with scripts `dev`, `build`, `lint`, and `preview`.
- Ukrainian document language and title `VYRA Studio`.
- Design tokens and base styles in `src/styles/tokens.css` and `src/styles/base.css`.
- Hero section with wordmark image, nav, two links, and a menu button.
- Wordmark and geometric logo SVG files. Only the wordmark is used by the hero. The favicon file is linked from `index.html`.
- Google Fonts stylesheet loads Manrope and Inter, with system sans-serif fallback stacks.
- Mobile menu opens from its button, starts keyboard focus on the first link, closes on Escape (returning focus to the button), outside pointer click, navigation link activation, or desktop breakpoint. Focus moving elsewhere no longer closes the menu, and page scrolling is not locked.
- Both mobile CTA links use a fixed 52px height. Mobile menu and toggle borders use `--color-border`; H1 line-height is 1.18.
- Services section at `#services` with Ukrainian copy, three offerings, custom line icons, and tablet/mobile responsive card layouts.
- Portfolio section at `#portfolio` with three concept projects, distinct website preview compositions, Ukrainian descriptions, English categories and technology labels, and explicit “Концепт” badges.
- Process section at `#process` with four Ukrainian stages and a connected, responsive timeline.
- `dist/` exists from a previous `vite build`. This session did not rebuild it.

An earlier root `MEMORY.md` records these code edits: tokens moved inside `:root` after a lightningcss `SyntaxError: Invalid qualified rule`; the hero logo switched from SVG `<use>` to `<img>`; `ReactNode` imports changed to `import type`. Those edits match the current source. This session did not reproduce the old build error.

## Not implemented

- About, Contact, and Footer sections.
- `src/components/` and `src/hooks/`.
- Any route other than the single page.
- Actual section destination for `#contacts`; that hash name is ready for the future Contact section.
- Tests.
- Git, GitHub remote, and deployment configuration. Cloudflare Pages was only mentioned in the previous memory file.
- A project-specific README. `README.md` is still the Vite template text.

## Known problems

Found by reading the source. Not confirmed in a browser in this session.

1. Hash target for the planned Contacts section does not exist yet.
2. `className={\`hero ${className}\`}` becomes the class `hero undefined` when `className` is omitted. `App` omits it.
3. `Hero.css` uses `var(--space-16)` inside `@media (min-width: 1024px)`. `--space-16` is not defined in `tokens.css`, so that padding declaration is invalid and the earlier padding remains.
4. The wordmark SVG sets `fill="currentColor"` and is loaded with `<img>`. An external SVG image does not inherit the page text color. The "DIGITAL STUDIO" line uses `y="4"` in a 36px-tall viewBox, so that line sits on the top edge of the canvas. Visual result not checked in this session.
5. `public/favicon.svg` sets `fill="none"` and `stroke="currentColor"`. How it renders as a favicon was not checked.
6. `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `src/assets/vyra-logo.svg`, and `public/icons.svg` are unused by the app.
7. Token and base CSS comments, and the previous `AI-WORKSPACE` text before this update, still say "AI Web Studio". The UI title is VYRA Studio. The package name remains `ai-web-studio`.
8. `tsconfig.app.json` does not enable `"strict": true`.

## Next task

Implement the planned Contact section and provide its matching anchor. Recheck all sections visually at specific desktop and mobile breakpoints when viewport controls are available.

The open product gap visible in the code is the Contact section: navigation and the primary CTA point to `#contacts`, which does not exist yet.
