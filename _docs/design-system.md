# MDI Design System
> Reference document for Claude Code. Apply these values consistently across every component and page. Do not deviate without explicit instruction.

---

## Brand Identity

- **Company name:** Moderne Development Inc. (MDI)
- **Tone:** Dark, bold, industrial-modern. Premium B2B. Confident, not playful.
- **Visual language:** Flat surfaces, real construction photography, gold used sparingly as an activating accent only.

---

## Color Palette

> **Implementation note:** This project uses Tailwind CSS v4. Tokens are defined in `src/styles/global.css` using `@theme`, not `tailwind.config`. The values below are already implemented correctly — reference this doc for the token names and hex values, not the config syntax shown in the code blocks.

Define all of these in `tailwind.config` under `theme.extend.colors`:

```js
colors: {
  'brand-green':      '#044239', // Primary — navbar, hero overlay, CTA section bg
  'brand-gold':       '#EBBB10', // Accent — headline highlights, buttons, logo icon
  'brand-gold-light': '#EED688', // Logo gradient highlight only
  'brand-gold-dark':  '#C3922E', // Logo gradient shadow / secondary accent
  'surface-cream':    '#F5F2EC', // Light section backgrounds
  'surface-warm':     '#FAFAF8', // Card and content area backgrounds
  'surface-dark':     '#2B3A2A', // Dark non-green sections
  'text-primary':     '#1A1A18', // Headings and body on light sections
  'text-secondary':   '#888885', // Captions, meta, secondary info
  'text-divider':     '#D4D2CD', // Rule lines, borders
}
```

### Section Background Pattern
The page alternates dark/light for scroll rhythm. Follow this sequence:
1. Dark green `#044239` + photography — Hero
2. Cream `#F5F2EC` — Operating System / content sections
3. Dark `#2B3A2A` or charcoal — punchy/statement sections
4. Cream — Built For, Where We Build, People sections
5. Dark green `#044239` — CTA / footer section

### Color Rules
- Gold (`#EBBB10`) is used on **2–3 words maximum per section** — never whole paragraphs
- Buttons are gold fill with dark text only — never green fill
- White text on dark backgrounds; `#1A1A18` text on light backgrounds

---

## Typography

### Font Families

Define in `tailwind.config`:

```js
fontFamily: {
  display: ['"Bebas Neue"', 'sans-serif'],
  sans:    ['"Inter"', 'sans-serif'],
}
```

**Load via Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Role | Size | Weight | Case | Color | Font |
|------|------|--------|------|-------|------|
| Hero H1 (line 1–2) | `text-[80px]` lg / `text-[52px]` md | 400 (Bebas is inherently bold) | ALL CAPS | White | `font-display` |
| Hero H1 accent line | `text-[80px]` lg / `text-[52px]` md | 400 | ALL CAPS | `brand-gold` | `font-display` |
| Section H2 | `text-[48px]` lg / `text-[36px]` md | 400 | ALL CAPS | `text-primary` or White | `font-display` |
| CTA headline | `text-[52px]` lg / `text-[38px]` md | 400 | ALL CAPS | White + gold accent | `font-display` |
| Card / Sub-section H3 | `text-xl` (20px) | 600 | Title Case | `text-primary` | `font-sans` |
| Body regular | `text-base` (16px) | 400 | Sentence | `text-primary` | `font-sans` |
| Body secondary | `text-sm` (14px) | 400 | Sentence | `text-secondary` | `font-sans` |
| Label / nav / caption | `text-xs` (12px) | 500 | ALL CAPS | varies | `font-sans` |

### Line Height & Tracking
- Display headings: `leading-none` (0.95–1.0) with `tracking-tight` (-0.02em)
- Section H2: `leading-tight` (1.1)
- Body: `leading-relaxed` (1.625)
- Labels/caps: `tracking-widest` (0.1em)

---

## Spacing System

> **Implementation note:** Custom spacing values are defined in `src/styles/global.css` under `@theme` as `--spacing-18`, `--spacing-22`, etc. — not in `tailwind.config`.

Use Tailwind's default scale. Key values mapped to the design:

| Tailwind | px | Common use |
|----------|----|------------|
| `p-1` | 4px | Icon-to-label tight gaps |
| `p-4` | 16px | Card inner padding, paragraph margin |
| `p-6` | 24px | Nav item gaps |
| `p-8` | 32px | Gap between stat blocks, card columns |
| `p-12` | 48px | Heading-to-body within section |
| `p-20` | 80px | Section horizontal padding (desktop) |
| `py-20` | 80px | Section vertical padding (min) |
| `py-28` | 112px | Section vertical padding (preferred) |

Add custom values to `tailwind.config`:
```js
spacing: {
  '18': '72px',
  '22': '88px',
  '30': '120px',
  '36': '144px',
}
```

### Container
```js
container: {
  center: true,
  padding: {
    DEFAULT: '1.25rem', // 20px mobile
    md: '2.5rem',       // 40px tablet
    lg: '5rem',         // 80px desktop
  },
  screens: {
    lg: '1280px',
  }
}
```

---

## Layout

- **Max content width:** 1280px
- **Grid:** 12-column. Most sections use 2-col at desktop (content left, visual right)
- **Photo/card rows:** 3–4 column grid
- **Navbar height:** 64–72px (`h-16` to `h-18`)

---

## Components

### Navbar
- Background: `brand-green` (#044239) — solid, no blur/glass
- Logo: left-aligned
- Nav links: center or right-aligned, `font-sans text-xs font-medium tracking-widest uppercase text-white`
- CTA button: far right (see Button spec below)
- Height: `h-16` (64px)
- No box shadow; flat

### Buttons

**Primary CTA (Gold):**
```
bg-brand-gold text-text-primary font-sans text-xs font-semibold tracking-widest uppercase
px-8 py-3 rounded-none
hover: brightness-105 transition-all duration-200
```
- No border-radius (`rounded-none`) — sharp corners
- No shadow

**Secondary / Outline:**
```
border border-white text-white font-sans text-xs font-semibold tracking-widest uppercase
px-8 py-3 rounded-none bg-transparent
hover: bg-white text-text-primary transition-all duration-200
```

### Hero Section
- Full-bleed background: construction photography + `brand-green` overlay at ~60% opacity
- Content: left-aligned, vertically centered or lower-third
- Headline: 3 lines stacked — white / white / gold
- Sub-copy: white, `text-base font-sans`
- Stats/counter strip: small numbers with uppercase labels, right column area or below hero

### Section Headings
All section headings follow this pattern:
```
font-display text-[48px] leading-none tracking-tight uppercase
```
On light bg: `text-text-primary`
On dark bg: `text-white`, with 1–2 words in `text-brand-gold`

### Cards (Project / Location)
- No border, no shadow — flat
- Image fills top ~60% of card
- Label text below: `font-sans text-sm text-text-secondary uppercase tracking-widest`
- Title: `font-sans text-base font-semibold text-text-primary`

### People Cards
- Square or circle photo crop
- Name: `font-sans text-base font-semibold text-text-primary`
- Title: `font-sans text-xs text-text-secondary uppercase tracking-widest`
- Clean grid, no card borders

### Stat / Metric Strip
- Numbers: `font-display text-[48px] text-brand-gold`
- Labels: `font-sans text-xs text-text-secondary uppercase tracking-widest`
- Spaced evenly in a row, thin divider between items

### Dividers
- Color: `text-divider` (#D4D2CD)
- Style: 1px horizontal rule, `border-t border-text-divider`

### CTA / Footer Section
- Background: `brand-green` (#044239)
- Headline: white + gold (two-color, stacked `font-display`)
- Single centered CTA button (gold)
- No imagery — text and button only

---

## Logo Usage

The MDI logo is an SVG at `_brief/brand/mdi-logo.svg`.

- **Letterforms (M, D, I):** Solid `#044239` (Deep Forest Green)
- **Icon mark (stacked squares):** Radial gradient `#EED688` → `#EBBB10` → `#C3922E`
- **On dark green backgrounds:** Use a white/reversed version — letterforms white, icon mark keeps gradient
- **On light backgrounds:** Use standard version (green letterforms + gold icon)
- **Never** recolor, stretch, or add effects to the logo

---

## Photography Style

- Real people, real construction sites — not stock
- Outdoor and construction contexts
- Dark tint overlay (`brand-green` at 50–70% opacity) when used as section backgrounds
- Images in cards: no tint, shown naturally
- Aspect ratios: hero = 16:9 or full viewport; cards = 4:3 or 3:2

---

## What to Avoid

- No drop shadows on any UI element
- No gradients in UI (logo icon is the only exception)
- No rounded corners on buttons or cards (`rounded-none`)
- No playful or decorative typefaces
- No use of gold on more than 2–3 words per section
- No centered body text (left-align everything)
- No stock photography
