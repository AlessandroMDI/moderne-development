# MDI Mobile & Responsiveness Specification
> Reference document for Claude Code. Every layout decision is made here — do not invent or interpret. Implement exactly as specified.

---

## 1. Breakpoint Strategy

This project uses Tailwind CSS v4 default breakpoints. The definitions below establish what "mobile", "tablet", and "desktop" mean for every decision in this document.

| Tier | Breakpoint range | Tailwind prefix | Notes |
|------|-----------------|-----------------|-------|
| Mobile | 0–639px | (none / default) | Base styles, no prefix |
| Tablet | 640px–1023px | `sm:` and `md:` | `sm` handles 640–767px; `md` handles 768–1023px |
| Desktop | 1024px+ | `lg:` and `xl:` | `lg` is the primary desktop pivot; `xl` caps content at 1280px |

### Mobile-First Build Approach

**Build mobile-first.** All base styles are written for mobile (0–639px). Tablet and desktop styles are added with `sm:`, `md:`, `lg:`, and `xl:` prefixes as progressive enhancements.

This means the default (unprefixed) Tailwind class applies at mobile, and prefixed classes override upward. Example:

```html
<!-- Correct: mobile-first -->
<div class="flex flex-col lg:flex-row">

<!-- Wrong: desktop-first override -->
<div class="flex flex-row md:flex-col">
```

The container uses the padding values defined in the design system:
- Mobile: `px-5` (20px)
- Tablet (`md:`): `px-10` (40px)
- Desktop (`lg:`): `px-20` (80px)

All sections use `max-w-[1280px] mx-auto` for content containment.

---

## 2. Navbar

### Collapse Breakpoint

The desktop navbar collapses at **`lg` (1024px)**. Below 1024px, the hamburger trigger is shown and the desktop link row is hidden.

```html
<nav class="h-14 lg:h-16 bg-brand-green ...">
  <div class="... flex items-center justify-between">
    <!-- Logo: always visible -->
    <a href="#hero"><!-- logo --></a>

    <!-- Desktop nav links: hidden below lg -->
    <ul class="hidden lg:flex ...">...</ul>

    <!-- Desktop CTA button: hidden below lg -->
    <a class="hidden lg:inline-flex ...">Get Started</a>

    <!-- Mobile hamburger: shown below lg -->
    <button class="lg:hidden ..."><!-- icon --></button>
  </div>
</nav>
```

### Mobile Navbar Height

- Mobile/tablet navbar height: `h-14` (56px)
- Desktop navbar height: `h-16` (64px)

### Hamburger Icon

- **Icon:** Three horizontal bars (standard hamburger). Use an SVG or an icon library (`☰` style). When the menu is open, swap to an X close icon.
- **Color:** White (`text-white`)
- **Size:** 24×24px icon inside a 44×44px tap target (`w-11 h-11 flex items-center justify-center`)
- **Position:** Far right of the navbar, aligned to the right edge of the container
- **Background:** None — icon sits directly on the brand-green navbar

```html
<button class="lg:hidden w-11 h-11 flex items-center justify-center text-white" aria-label="Open menu">
  <!-- hamburger SVG 24x24 -->
</button>
```

### Mobile Menu — Full-Screen Overlay

Use a **full-screen overlay** that slides down from the top and covers the entire viewport. No drawer, no dropdown partial. The overlay occupies 100vw × 100vh and sits above all page content (`z-50`).

**Overlay appearance:**
- Background: `bg-brand-green` (#044239) — same as navbar, solid, no blur
- Opens from top: `translate-y-0` when open, `-translate-y-full` when closed (Phase 2 adds the animation; for Phase 1 use `hidden`/`block` toggle)
- The navbar bar remains visible at the top while the overlay is open — the overlay sits below the navbar bar or the navbar is re-rendered inside the overlay header

**Layout inside the overlay:**
- Full-screen, flex column, vertically and horizontally centered
- Nav links stacked vertically, center-aligned within the overlay
- Large link text: `font-display text-[36px] text-white uppercase tracking-tight leading-none`
- Each link separated by `border-t border-white/10` or `gap-6`
- Tap target per link: minimum `py-4` (making each row at least 56px tall) with full-width clickable area

**Link list** (same order as desktop navbar):
1. What We Do
2. Platform
3. Who We Serve
4. Projects
5. Team
6. Contact

**CTA button in mobile menu:**
- Yes — include the primary gold CTA button at the bottom of the link list
- Style: standard primary button (`bg-brand-gold text-text-primary font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 rounded-none w-full`)
- Full-width inside the overlay container for easy tapping

**Close behavior:**
- Tapping the X icon in the top-right of the overlay closes it
- Tapping any nav link closes the overlay and scrolls to the anchor
- Tapping outside the overlay does not close it (the overlay is full-screen; there is no "outside")

**Accessibility:**
- `aria-expanded` on the hamburger button, toggled by JS
- `aria-label="Close menu"` on the X button
- Trap focus within the overlay while it is open
- `role="dialog"` and `aria-modal="true"` on the overlay container

---

## 3. Section-by-Section Responsive Layouts

### `#hero`

**Desktop (`lg:`):**
- Full-viewport height (`min-h-screen`)
- Background: full-bleed construction photo + `brand-green` overlay at 60% opacity
- Content: left-aligned, positioned in lower third or vertically centered
- Layout: two-column — headline/text left (~50% width), optional stat/visual right
- Headline: 3 stacked lines, `text-[80px] font-display leading-none tracking-tight`
- Sub-copy: `text-base font-sans text-white max-w-[520px]`
- CTA button below sub-copy

**Tablet (`md:`):**
- Still full-viewport height
- Still two-column but columns are more equal (50/50)
- Headline: `text-[52px]`
- Sub-copy: `max-w-full`

**Mobile (base):**
- Full-viewport height (`min-h-screen`)
- Single column, content centered vertically, left-aligned text
- Background photo still full-bleed; overlay stays at 60%
- Headline: `text-[36px] font-display leading-none tracking-tight` (see Section 7)
- Sub-copy: `text-sm font-sans text-white`
- CTA button below sub-copy, full-width (`w-full`)
- No right-column visual — headline and CTA are the entire hero on mobile
- Horizontal padding: `px-5`

**Stacking order on mobile:** Headline → sub-copy → CTA button (top to bottom, all left-aligned within the padding container)

---

### `#what-we-do`

**Desktop (`lg:`):**
- Background: `surface-cream`
- Two-column layout: text content left (7 of 12 cols), supporting visual or stat callout right (5 of 12 cols)
- Section H2: `text-[48px]`
- Body copy: `text-base leading-relaxed max-w-[640px]`
- Horizontal padding: `px-20`, vertical: `py-28`

**Tablet (`md:`):**
- Still two-column but narrower right column
- Section H2: `text-[36px]`
- Vertical padding: `py-20`
- Horizontal padding: `px-10`

**Mobile (base):**
- Single column, stacked
- Section H2: `text-[28px]` (see Section 7)
- Body copy: `text-base leading-relaxed` (full width)
- Right-column visual: **placed below** the body text if it exists; do not hide it
- Horizontal padding: `px-5`, vertical: `py-16`
- Stacking order: Label/eyebrow → H2 → body copy → visual/supporting element

---

### `#platform`

**Desktop (`lg:`):**
- Background: `surface-dark` (#2B3A2A) or `brand-green` — per alternating pattern, this is a dark section
- Two-column: text/description left, feature list or diagram right
- Section H2: `text-[48px] text-white`
- Body copy: `text-base text-white/80 leading-relaxed`
- Feature list: 2-column grid of capability items (`grid grid-cols-2 gap-4`)
- Horizontal padding: `px-20`, vertical: `py-28`

**Tablet (`md:`):**
- Two-column layout maintained, columns stack if content is long
- Section H2: `text-[36px]`
- Feature list: still 2-column
- Padding: `px-10 py-20`

**Mobile (base):**
- Single column
- Section H2: `text-[28px] text-white` (see Section 7)
- Feature list collapses to **1 column** (`grid grid-cols-1 gap-3`)
- Right-column diagram/visual: stacked **below** the text block
- Padding: `px-5 py-16`
- Stacking order: Eyebrow label → H2 → body copy → feature list → visual

---

### `#who-we-serve`

**Desktop (`lg:`):**
- Background: `surface-cream`
- Layout: 3 or 4 audience cards in a row (`grid grid-cols-3 gap-8` or `grid-cols-4`)
- Each card: flat, no border, no shadow — icon or label + title + description
- Section H2: `text-[48px]`
- Padding: `px-20 py-28`

**Tablet (`md:`):**
- Cards: 2-column grid (`grid grid-cols-2 gap-6`)
- Section H2: `text-[36px]`
- Padding: `px-10 py-20`

**Mobile (base):**
- Cards: 1-column stack (`grid grid-cols-1 gap-6`)
- Section H2: `text-[28px]`
- Each card: full-width, left-aligned, `py-5` inner vertical padding
- Padding: `px-5 py-16`

---

### `#projects`

See also Section 4 (accordion detail).

**Desktop (`lg:`):**
- Background: `surface-cream`
- Three accordion rows stacked vertically, each full-width
- Each collapsed row: label left, 3 project images right (see Section 4)
- Each expanded row: text block drops below the row, full-width
- Section H2 above accordion: `text-[48px]`
- Padding: `px-20 py-28`

**Tablet (`md:`):**
- Same structure as desktop
- Section H2: `text-[36px]`
- Images in collapsed row: 3 images still visible, smaller (`h-24`)
- Padding: `px-10 py-20`

**Mobile (base):**
- Same accordion structure
- Section H2: `text-[28px]`
- Images in collapsed row: **1 image visible** (first/hero image of the category), others hidden on mobile. The image is right-aligned within the row, `w-24 h-16 object-cover`
- Collapsed row height: minimum 64px for touch target
- Padding: `px-5 py-16`

---

### `#team`

See also Section 6 (grid detail).

**Desktop (`lg:`):**
- Background: `surface-cream`
- 4-column grid for team members
- Section H2: `text-[48px]`
- Padding: `px-20 py-28`

**Tablet (`md:`):**
- 3-column grid
- Section H2: `text-[36px]`
- Padding: `px-10 py-20`

**Mobile (base):**
- 2-column grid (see Section 6)
- Section H2: `text-[28px]`
- Padding: `px-5 py-16`

---

### `#cta`

**Desktop (`lg:`):**
- Background: `brand-green`
- Single column, centered text — this section has no imagery at any breakpoint
- Headline: `text-[52px] font-display text-white` with 2–3 gold words
- CTA button: centered, standard gold primary button
- Padding: `px-20 py-28`

**Tablet (`md:`):**
- Same centered single-column layout
- Headline: `text-[38px]`
- Padding: `px-10 py-20`

**Mobile (base):**
- Same centered single-column layout
- Headline: `text-[30px]` (see Section 7)
- CTA button: full-width (`w-full`) up to `max-w-xs mx-auto` — do not stretch it past 320px
- Padding: `px-5 py-16`

---

## 4. Projects Accordion

### Structure

Each accordion item has two states:

- **Collapsed:** A single horizontal row showing the category label/title and a set of preview images
- **Expanded:** The row remains, and a full-width text block drops below it (like a drawer)

### Collapsed Row — Desktop (`lg:`)

- Full-width row, `flex items-center justify-between`
- Left side: category label (`font-sans text-xs uppercase tracking-widest text-text-secondary`) + category title (`font-display text-[32px]`)
- Right side: 3 project images in a horizontal row, each `w-40 h-28 object-cover` with no gap or `gap-2`
- Row height: approx. 96px (`py-6`)
- Bottom border: `border-b border-text-divider`
- Full row is clickable — `cursor-pointer`
- Arrow/chevron indicator: `text-text-secondary` right-pointing chevron, rotates 90° when expanded

### Collapsed Row — Tablet (`md:`)

- Same structure as desktop
- Images: 3 images at `w-28 h-20 object-cover`
- Row padding: `py-5`

### Collapsed Row — Mobile (base)

- Same flex row structure: `flex items-center justify-between`
- Left side: label + title (title at `font-display text-[22px]`)
- Right side: **1 image only** — the first/hero image for that category, `w-20 h-14 object-cover`. The second and third images are `hidden` at mobile.
- Row height: minimum 64px (`min-h-[64px] py-4`) — satisfies 44px touch target with padding
- Chevron indicator remains, same as desktop

### Expanded State — All Breakpoints

- When a row is tapped/clicked, a content block expands below the row
- The content block is full-width (same width as the row, contained within the section padding)
- Only one item can be open at a time — opening a new row closes the previously open one

**Desktop expanded block:**
- `max-w-[720px]` text area inside the full-width container, left-aligned
- Body copy: `text-base font-sans leading-relaxed text-text-primary`
- Inner padding: `pt-6 pb-8`

**Tablet expanded block:**
- `max-w-full` — text spans the available content width
- Same type treatment
- Inner padding: `pt-5 pb-6`

**Mobile expanded block:**
- Full-width, no max-width constraint
- Body copy: `text-base font-sans leading-relaxed`
- Inner padding: `pt-4 pb-6`

### Touch Target

- The entire collapsed row is the tap target — not just the label or chevron
- Minimum row height is `min-h-[64px]` at mobile (exceeds the 44px WCAG minimum)
- Do not add a separate small tap zone — the whole row is interactive

---

## 5. Stats Strip

The stats strip displays 4 numbers with labels.

### Desktop (`lg:`)

- 4 stats in a single horizontal row: `flex items-center justify-between` or `grid grid-cols-4`
- Thin vertical dividers between items: `border-r border-text-divider` on all but the last
- Numbers: `font-display text-[48px] text-brand-gold`
- Labels: `font-sans text-xs text-text-secondary uppercase tracking-widest`
- Each stat centered within its column
- No wrapping

### Tablet (`md:`)

- 4 stats still in a single row — same as desktop
- Numbers: `font-display text-[36px] text-brand-gold` (scale down to fit)
- Same dividers

### Mobile (base)

- **2×2 grid:** `grid grid-cols-2 gap-8`
- No vertical dividers between items — remove them at mobile; rely on grid gap for separation
- Add a horizontal rule `border-t border-text-divider` between the top row and bottom row, or use the gap alone
- Numbers: `font-display text-[40px] text-brand-gold`
- Labels: `font-sans text-xs text-text-secondary uppercase tracking-widest`
- Each stat: left-aligned text within its grid cell (do not center — keep consistent with the left-align rule for all body text)

```html
<!-- Mobile: 2x2, Tablet+: 4-col row -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
  <!-- stat items -->
</div>
```

---

## 6. Team Grid

8 team members total (5 leadership + 3 board/investors). Render them in a single unified grid — no separate "leadership" vs "board" sub-headings unless the design calls for a divider row.

### Column Count by Breakpoint

| Breakpoint | Columns | Tailwind class |
|------------|---------|----------------|
| Mobile (base) | 2 | `grid-cols-2` |
| Tablet sm (640px) | 2 | `sm:grid-cols-2` |
| Tablet md (768px) | 3 | `md:grid-cols-3` |
| Desktop lg (1024px) | 4 | `lg:grid-cols-4` |

```html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  <!-- people cards -->
</div>
```

### People Card — Mobile

- Photo: square crop, full-width of card, `aspect-square object-cover`. Use a placeholder `bg-surface-warm` block with `text-text-secondary text-xs text-center` "Photo TBD" label until client provides headshots.
- Name: `font-sans text-sm font-semibold text-text-primary mt-3`
- Title: `font-sans text-xs text-text-secondary uppercase tracking-widest mt-1`
- No border, no card shadow, no background color on the card — flat
- No hover effects needed at mobile

### People Card — Desktop

- Same flat card structure
- Name: `font-sans text-base font-semibold text-text-primary mt-4`
- Title: `font-sans text-xs text-text-secondary uppercase tracking-widest mt-1`
- Hover: `opacity-90 transition-opacity duration-150` on the photo only

---

## 7. Typography Scale — Mobile Overrides

The design system specifies `lg` (1024px+) and `md` (768px+) sizes. This section adds mobile (below 640px) sizes for all display-level type.

The pattern is a consistent step-down: each tier reduces by approximately 25–30% from the tier above.

### Hero H1

| Breakpoint | Size | Tailwind class |
|------------|------|----------------|
| Desktop (`lg:`) | 80px | `lg:text-[80px]` |
| Tablet (`md:`) | 52px | `md:text-[52px]` |
| Mobile (base) | 36px | `text-[36px]` |

```html
<h1 class="font-display text-[36px] md:text-[52px] lg:text-[80px] leading-none tracking-tight uppercase">
```

### Section H2

| Breakpoint | Size | Tailwind class |
|------------|------|----------------|
| Desktop (`lg:`) | 48px | `lg:text-[48px]` |
| Tablet (`md:`) | 36px | `md:text-[36px]` |
| Mobile (base) | 28px | `text-[28px]` |

```html
<h2 class="font-display text-[28px] md:text-[36px] lg:text-[48px] leading-tight tracking-tight uppercase">
```

### CTA Headline

| Breakpoint | Size | Tailwind class |
|------------|------|----------------|
| Desktop (`lg:`) | 52px | `lg:text-[52px]` |
| Tablet (`md:`) | 38px | `md:text-[38px]` |
| Mobile (base) | 30px | `text-[30px]` |

```html
<h2 class="font-display text-[30px] md:text-[38px] lg:text-[52px] leading-tight tracking-tight uppercase text-white">
```

### Accordion Category Title

| Breakpoint | Size |
|------------|------|
| Desktop | 32px |
| Tablet | 28px |
| Mobile | 22px |

```html
<span class="font-display text-[22px] md:text-[28px] lg:text-[32px] uppercase leading-none">
```

### Body Copy and Labels — No Changes

`text-base` (16px), `text-sm` (14px), and `text-xs` (12px) do **not** change across breakpoints. These are already at readable minimum sizes.

---

## 8. Touch and Interaction

### Minimum Touch Target: 44×44px (WCAG AA)

Every interactive element must have a minimum tappable area of 44×44px on mobile. Use padding to extend the visual element's tap area rather than enlarging the visible element itself.

| Element | Mobile tap target method |
|---------|--------------------------|
| Hamburger button | `w-11 h-11` wrapper (`44px × 44px`) |
| Nav links (mobile menu) | `py-4` padding on `<a>` tags, full-width links |
| Accordion row | `min-h-[64px]` on the row, full-row clickable |
| CTA buttons | `px-8 py-4` minimum (`48px height`) |
| People cards — no action needed | Cards are not interactive |
| Stats strip — no action needed | Stats are not interactive |
| Close (X) button in mobile menu | `w-11 h-11` wrapper |

### Hover States on Desktop — Touch Equivalents on Mobile

The design system defines these hover effects. On touch devices, hover states are suppressed (`:hover` does not fire reliably on touch). The following applies:

| Element | Desktop hover | Mobile behavior |
|---------|--------------|-----------------|
| Nav links | `opacity-70` or underline | No hover; active state (`active:opacity-70`) on tap |
| Primary CTA button | `brightness-105 transition-all duration-200` | No hover; `active:brightness-90` on tap |
| Secondary outline button | `bg-white text-text-primary` fill | No hover; `active:bg-white/10` on tap |
| Team photo | `opacity-90 transition-opacity` | No hover on mobile — static |
| Accordion row | `bg-surface-warm` background shift | No hover; the tap opens/closes the row |
| Mobile menu links | No hover applied | `active:text-brand-gold` on tap for feedback |

To prevent hover states from "sticking" on touch devices (the 300ms tap ghost), use `@media (hover: hover)` to wrap hover rules:

```css
@media (hover: hover) {
  .btn-primary:hover { filter: brightness(1.05); }
}
```

Or in Tailwind, prefer using `hover:` only on elements that are not critical tap targets on mobile.

### Accordion — Touch Behavior

- Tap anywhere on the collapsed row to expand
- Tap again to collapse, or tap a different row to switch (which collapses the current one)
- No hover state on mobile — the visual affordance is the chevron icon
- The chevron rotates 90° when expanded; this is a CSS transform, not an animation (Phase 1 — no GSAP)
- Use `transition-none` in Phase 1; Phase 2 will add `transition-transform duration-200`

### Scroll Behavior

- Use `scroll-behavior: smooth` on the `<html>` element for anchor navigation
- Account for fixed navbar height when scrolling to sections — use `scroll-margin-top` on each section:

```css
/* Mobile */
section { scroll-margin-top: 56px; } /* h-14 = 56px */

/* Desktop */
@media (min-width: 1024px) {
  section { scroll-margin-top: 64px; } /* h-16 = 64px */
}
```

Or in Tailwind on each section element:
```html
<section id="what-we-do" class="scroll-mt-14 lg:scroll-mt-16 ...">
```

### Form Inputs (CTA or Contact — if added)

If any form inputs are added to the site:
- Minimum height: `h-12` (48px) on mobile
- Font size: `text-base` or larger (16px minimum) — prevents iOS auto-zoom on focus
- Never use `text-sm` or smaller on inputs

---

## 9. Image Behavior Summary

| Section | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Hero | Full-bleed background, full viewport | Same | Same — background photo maintained |
| What We Do | Right-column visual | Right-column, smaller | Below text block, full-width |
| Platform | Right-column diagram | Stacked below if needed | Below text block, full-width |
| Who We Serve | Card icons/images | Card icons/images | Card icons/images (no change) |
| Projects (collapsed row) | 3 images, `w-40 h-28` | 3 images, `w-28 h-20` | 1 image, `w-20 h-14` |
| Projects (expanded block) | No images in text block | Same | Same |
| Team | Square headshot, full card width | Same | Same |
| CTA | No imagery | No imagery | No imagery |

All images use `object-cover` to maintain aspect ratio within their container. All images use `loading="lazy"` except the hero background (which is a CSS background image, not an `<img>` tag).

---

## 10. Quick-Reference Tailwind Patterns

These are the most commonly needed responsive patterns for this project. Use these as templates.

### Section wrapper
```html
<section class="px-5 py-16 md:px-10 md:py-20 lg:px-20 lg:py-28">
  <div class="max-w-[1280px] mx-auto">
    <!-- content -->
  </div>
</section>
```

### Two-column layout (stacked on mobile, side-by-side on desktop)
```html
<div class="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
  <div class="lg:w-7/12"><!-- text --></div>
  <div class="lg:w-5/12"><!-- visual --></div>
</div>
```

### Section H2
```html
<h2 class="font-display text-[28px] md:text-[36px] lg:text-[48px] leading-tight tracking-tight uppercase text-text-primary">
```

### Hero H1 (three-line, two-color)
```html
<h1 class="font-display text-[36px] md:text-[52px] lg:text-[80px] leading-none tracking-tight uppercase">
  <span class="text-white block">Building a</span>
  <span class="text-white block">Better</span>
  <span class="text-brand-gold block">Tomorrow</span>
</h1>
```

### Stats strip (2×2 mobile, 4-col desktop)
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
  <div class="md:border-r md:border-text-divider md:px-8 text-left">
    <div class="font-display text-[40px] md:text-[48px] text-brand-gold">20,000+</div>
    <div class="font-sans text-xs text-text-secondary uppercase tracking-widest mt-1">Homes in Pipeline</div>
  </div>
  <!-- repeat for other stats -->
</div>
```

### Team grid
```html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  <!-- person cards -->
</div>
```

### CTA button — responsive width
```html
<!-- Inline (default) — stretches to full-width only on mobile if needed -->
<a class="inline-flex items-center justify-center bg-brand-gold text-text-primary font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 rounded-none w-full sm:w-auto">
  Get Started
</a>
```
