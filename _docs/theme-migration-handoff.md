# Theme Migration Handoff

## What This Document Is

This is a handoff document for continuing a site-wide theme overhaul for **Moderne Development Inc. (MDI)**. The client provided an HTML mockup of a new design direction. Work has started on the platform page — that page is complete and approved. The next task is applying the same theme to the rest of the site (the homepage sections). Read this entire document before touching any code.

---

## Project Basics

- **Repo:** `c:\Users\rhwoo\Desktop\MODERNE REPO\moderne-development`
- **Framework:** Astro + Tailwind CSS v4
- **Dev server:** `npm run dev` (starts at localhost:4321, may increment if ports are in use)
- **Hosting:** Netlify
- **Reference docs in `_docs/`:** Read `design-system.md`, `mobile-responsive.md`, and `content-brief.md` before making layout or copy decisions

---

## What Changed in This Session

### 1. `src/layouts/Layout.astro`
Added **Geist** to the Google Fonts import alongside Bebas Neue and Inter:
```
family=Geist:wght@300;400;500;600
```
Geist is now loaded on every page.

### 2. `src/components/Navbar.astro`
- Added a `variant?: 'dark' | 'light'` prop (default: `'dark'`)
- **Light variant:** white/92 background, `backdrop-blur-md`, `border-b border-black/[0.08]`, logo fills switch from white → `#1a4a3a`, nav links use `text-[#637066]`, CTA button uses green border/text with `rounded-md`
- **Dark variant:** unchanged from original (`bg-brand-green`, white links)
- Updated the Platform nav link from `/#platform` → `/platform` (dedicated page)
- Mobile overlay remains dark green regardless of variant

### 3. `src/pages/platform.astro`
**Complete rewrite.** This is the reference implementation for the new design system. The page includes:
- Custom cursor (8px dot + 30px lagging ring, pointer devices only)
- Scroll progress bar (2px green, fixed top)
- Hero: chip badge, animated headline (slideUp keyframe), sub, two buttons, proof stats (4 Filed / 6 Modules / Alpha / US·UK·MENA), ticker marquee
- "What is MDOS" section: 2-column, image left + callout cards right — image uses local asset `src/assets/images/projects/clarskville.jpg`
- Modules: 6-tab switcher with spec lists and images (modules 01–05 use local assets in `src/assets/images/modules/`, module 06 still uses an external URL — needs a local image)
- Pipeline: 6-step grid with animated green bars
- IP: 2×2 patent cards
- Alpha JV: forest-green section, 4 list items + 3 status boxes
- CTA: heading, 2 buttons, 3 audience cards, footer row
- All styles in a `<style is:global>` block using new CSS variables (`--plat-*`)
- All scripts in a single `<script>` block (cursor, progress, IntersectionObserver, tabs)

---

## The New Design System

The platform page is the approved reference for the new visual language. Everything below is derived from it and should be applied site-wide.

### Colors (new values)

| Role | Old value | New value |
|---|---|---|
| Forest/dark green (sections, alpha bg) | `#044239` | `#1a4a3a` |
| Green (accents, links, borders) | `#044239` | `#38663f` |
| Gold (accent) | `#EBBB10` | `#b8952a` (muted) |
| Background 1 (white sections) | `#F5F2EC` cream | `#ffffff` |
| Background 2 (grey sections) | — | `#f6f8f6` |
| Dark text | `#1A1A18` | `#0d1310` |
| Muted text | `#888885` | `#637066` |
| Border (default) | — | `rgba(13,19,16,0.08)` |
| Border (green hover) | — | `rgba(56,102,63,0.15)` |

### Typography

| Role | Old | New |
|---|---|---|
| Headings | Bebas Neue, ALL CAPS, `font-display` | Geist, mixed case, `font-weight: 600`, `letter-spacing: -0.025em` |
| Body | Inter | Geist (falls back to Inter — same load) |
| Font stack | `'Geist', 'Inter', system-ui, sans-serif` | same |

### Shape & Depth

| Element | Old | New |
|---|---|---|
| Buttons | `rounded-none` (sharp), 3D press effect | `rounded-md` (6px), flat with hover color change |
| Cards | `rounded-none`, 3D gold shadow effect | `rounded-xl` (10-12px), flat with `border` + hover `box-shadow` |
| Images | Sharp | `rounded-xl` (12px) with `overflow: hidden` |

### Layout Patterns

| Pattern | Description |
|---|---|
| Section backgrounds | Alternate white (`#fff`) / light grey (`#f6f8f6`) — dark forest only for the Alpha JV section |
| Content width | `max-width: 1120px`, `margin: 0 auto`, `padding: 96px 52px` (desktop) → `padding: 64px 20px` (mobile) |
| 2-column grid | `grid-template-columns: 1fr 1fr; gap: 64px` — stacks to 1-col at 900px |
| Section label | Small green uppercase text above heading (`font-size: 12px`, `letter-spacing: 0.06em`) |
| Cards | Border + rounded + light grey bg, border-color transitions to green on hover |
| Section headings | `font-size: clamp(28px, 3.5vw, 44px)`, `font-weight: 600`, `letter-spacing: -0.025em` |

### CSS Variables (defined in platform.astro — need to move to global.css)

```css
--plat-bg1: #ffffff;
--plat-bg2: #f6f8f6;
--plat-forest: #1a4a3a;
--plat-green: #38663f;
--plat-gold: rgba(200,169,110,0.85);
--plat-dark: #0d1310;
--plat-muted: #637066;
--plat-border: rgba(13,19,16,0.08);
--plat-border-g: rgba(56,102,63,0.15);
--plat-font: 'Geist', 'Inter', system-ui, sans-serif;
```

---

## What Still Needs to Be Done

### Step 1 — Consolidate design tokens into `global.css`

Move/rename the `--plat-*` variables from `platform.astro` into `src/styles/global.css` under `@theme`, replacing the current Tailwind tokens. Suggested naming that plays well with Tailwind v4:

```css
--color-brand-green: #38663f;       /* was #044239 */
--color-brand-forest: #1a4a3a;      /* new dark section bg */
--color-brand-gold: #b8952a;        /* was #EBBB10 */
--color-surface-white: #ffffff;     /* new bg1 */
--color-surface-light: #f6f8f6;     /* new bg2 */
--color-text-primary: #0d1310;      /* was #1A1A18 */
--color-text-secondary: #637066;    /* was #888885 */
--color-border: rgba(13,19,16,0.08);
--color-border-green: rgba(56,102,63,0.15);
--font-sans: 'Geist', 'Inter', system-ui, sans-serif;
```

Also remove the 3D button/card CSS from `global.css` (`@layer components`) — these are no longer used in the new design.

### Step 2 — Change Navbar default variant to `'light'`

In `src/components/Navbar.astro`, change:
```astro
const { variant = 'dark' } = Astro.props;
```
to:
```astro
const { variant = 'light' } = Astro.props;
```
This makes the new light navbar the site-wide default without touching every page.

### Step 3 — Rebuild each section in `src/sections/`

Do these one at a time, top to bottom. Verify each in the browser before moving on. The homepage (`src/pages/index.astro`) imports them all.

**Files to rebuild:**

| File | Current state | Priority notes |
|---|---|---|
| `src/sections/Hero.astro` | Dark green bg, Bebas Neue headline, cream text | Biggest rebuild. New style: white bg, dot-grid overlay, Geist headline, chip badge optional. No ticker needed (that's platform-specific). |
| `src/sections/WhatWeDo.astro` | Dark bg, 3 capability cards with 3D effect | New style: light grey bg, flat card grid, rounded corners, green accent borders |
| `src/sections/Platform.astro` | Homepage teaser for MDOS | New style: white bg, probably a simplified version of the platform page hero — headline + body + CTA button linking to `/platform` |
| `src/sections/WhoWeServe.astro` | Unknown — read before touching | Apply new typography, color, and card patterns |
| `src/sections/Projects.astro` | Accordion: Commercial / Residential / Multi-Unit | Keep accordion behavior, update visual style (borders, typography, bg) |
| `src/sections/Team.astro` | Team grid with headshots | Update card style (rounded image, border card), new typography |
| `src/sections/CTA.astro` | Dark green bg, Bebas Neue headline | New style: light grey bg, Geist headline, updated button style |

**For each section, the pattern is:**
1. Read the current file
2. Identify: bg color, heading style, card/layout structure, any special components
3. Rewrite applying: new bg, new heading style (`plat-sh` pattern), new card style, rounded images, correct border colors
4. Keep all existing content/copy — only change the visual presentation
5. Keep `data-contact-trigger` on any CTA buttons so ContactModal still works

### Step 4 — Update `platform.astro` module 06 image

Module 06 ("Deploy & Scale") still uses an external URL:
```
https://modernedevelopment.com/wp-content/uploads/2025/08/03-right_tides_hero-01.jpg
```
A local asset should replace this when available. Add it to `src/assets/images/modules/module-06.jpg` and import it the same way as modules 01–05.

---

## Key Decisions Already Made (do not re-litigate)

- **Font:** Geist loaded site-wide via Layout.astro
- **Navbar:** Light variant with backdrop blur — white bg, dark logo, muted links
- **Custom cursor:** Active on the platform page (`/platform`) only — do NOT add it to the homepage or other pages unless the client explicitly requests it
- **Sharp corners:** Removed. Everything uses rounded corners in the new theme.
- **3D press button:** Removed. New buttons are flat with hover color transitions.
- **Section background alternation:** White / light grey (not dark green / cream). Dark forest (`#1a4a3a`) is reserved for the Alpha JV section on the platform page and the homepage CTA if it stays dark.
- **Stats bar below hero:** Client removed it — do not add a dark stats strip below the hero on the platform page or homepage.

---

## Dev Commands

```bash
npm run dev      # dev server (localhost:4321, may increment)
npm run build    # production build
npm run preview  # preview production build
```

---

## Files to Read Before Doing Anything

1. `_docs/design-system.md` — original design tokens (now being superseded — use as reference for what's changing)
2. `_docs/mobile-responsive.md` — breakpoint rules for every section (still applies, new theme must be mobile-first)
3. `_docs/content-brief.md` — approved copy and stats (do not invent content)
4. `src/pages/platform.astro` — the fully approved reference implementation for the new design language
5. `src/styles/global.css` — current token file (will be updated in Step 1)
