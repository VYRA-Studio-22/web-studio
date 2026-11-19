# Project Memory — VYRA Studio

Canonical project memory is `AI-WORKSPACE/MEMORY.md`. This file is an earlier changelog and is kept so the notes below are not lost. New decisions go into `AI-WORKSPACE/`.

## Recent Changes

### CSS Tokens Fix
Wrapped all design tokens in `src/styles/tokens.css` inside `:root {}` block to fix lightningcss minification error during Vite build.

**Before:** Standalone `--variable: value;` declarations at module level  
**After:** All variables inside `:root { --variable: value; }` 

This allows the CSS minifier (lightningcss) to properly parse and minify the file, resolving the `SyntaxError: Invalid qualified rule` build failure.

### Logo Display Fix
Changed `src/sections/Hero.tsx` from SVG `<use>` element to HTML `<img>` tag:
- Replaced `<svg><use href={vyraWordmark} /></svg>` with `<img src={vyraWordmark} alt="VYRA Studio" className="hero__logo" />`
- Added `.hero__logo` CSS rules with `width: 120px`, `height: 36px`, `object-fit: contain`

### TypeScript Strict Mode
- `src/App.tsx`: Changed `import { ReactNode }` to `import type { ReactNode }`
- `src/sections/Hero.tsx`: Changed `import { ReactNode }` to `import type { ReactNode }`
- `src/sections/Hero.tsx` line 29: Fixed `<use xlink:href={...} />` syntax

### Hero Section
- Built premium dark-themed hero with abstract digital interface panels
- Added responsive grid layout (2 columns desktop → 1 column mobile)
- Included navigation, CTA buttons in Ukrainian
- Added mobile menu toggle