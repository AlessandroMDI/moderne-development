# MDI Animation Audit

> Read-only review document. No edits have been made to any source files.
> Stack: GSAP + ScrollTrigger + Lenis (Phase 2 only — see `CLAUDE.md`).
> Tiers reference `_docs/animation-guide.md`: Tier 1 = core premium, Tier 2 = polished details, Tier 3 = optional refinements.

---

## Table of Contents

**Homepage Sections**
1. [Hero](#1-hero-section)
2. [What We Do](#2-what-we-do-section)
3. [Platform](#3-platform-section)
4. [Who We Serve](#4-who-we-serve-section)
5. [Projects](#5-projects-section)
6. [Team](#6-team-section)
7. [CTA / Footer](#7-cta--footer-section)

**Subpages**
8. [platform.astro](#8-platformastro-subpage)
9. [projects.astro](#9-projectsastro-subpage)
10. [team.astro](#10-teamastro-subpage)

---

## 1. Hero Section

**File:** `src/sections/Hero.astro`

### Background Image
- **What it is:** Full-bleed construction site photo behind the green overlay
- **Animation:** Parallax — image moves at slower vertical rate than foreground as user scrolls
- **How it looks:** Image feels "weighted" and grounded while text floats upward; creates depth illusion
- **Trigger:** Scroll-based, continuous (scrub: 0.5). Pinned from `top top` to `bottom top`
- **Notes:** Mark with `data-hero-bg`. Background moves at `yPercent: 30`. The entire section should be pinned for ~150vh of scroll.

### Green Overlay (`.bg-brand-green/60`)
- **Animation:** None — static contrast/readability element. Skip.

### Headline Line 1 ("Build Smarter.")
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Text masked and revealed left-to-right via `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)`. Gold bar sweeps across simultaneously (`scaleX: 1` → `scaleX: 0`), painting the text into view
- **Trigger:** Once, as hero enters viewport (`top 90%`)
- **Notes:** Mark `<h1>` with `data-anim-heading`. Line index 0, duration 0.6s, overlay starts at +0.3s offset.

### Headline Line 2 ("Scale Faster.")
- **Animation:** Same Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Identical to line 1 but delayed — arrives after "Build Smarter." completes its reveal
- **Trigger:** Same `data-anim-heading` timeline, line index 1
- **Notes:** Stagger 0.15s from line 1. Reveal starts at t=0.15s, overlay at t=0.45s.

### Subheadline (`<p>`)
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Fades in while shifting upward from `y: 40, autoAlpha: 0` to rest
- **Trigger:** Once at `top 85%`. Mark with `data-anim-enter`
- **Notes:** Add small delay (~0.1s) so it enters after headline finishes at ~0.85s total.

### CTA Button ("Learn More")
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Same fade + slide-up as subheadline; enters last in the cascade
- **Trigger:** Once at `top 85%`. Mark with `data-anim-enter`
- **Notes:** Last element in entrance sequence. Delay ~0.2s from subheadline (~1.0s total from trigger).

### Content Container (text layer)
- **Animation:** Parallax text layer — moves upward and fades as user scrolls
- **How it looks:** As user scrolls, the container drifts upward (`yPercent: -15, autoAlpha: 0.3`); feels "left behind" by the scroll
- **Trigger:** Continuous scrub, runs for the duration of the hero pin. Mark with `data-hero-text`
- **Notes:** This is separate from the entrance reveals — it begins after entrance completes.

### Full Animation Sequence
```
t=0ms    — Hero pins. Headline line 1 reveals + gold wipe
t=150ms  — Headline line 2 reveals + gold wipe
t=750ms  — Subheadline fades in (slide up)
t=850ms  — Button fades in (slide up)
t=1000ms — All entrances complete; parallax begins with scroll
```

### Data Attributes to Add
- `data-anim-heading` → `<h1>`
- `data-anim-enter` → `<p>` (subheadline)
- `data-anim-enter` → Button component (or wrap content in `data-anim-stagger`)
- `data-hero-bg` → Image container
- `data-hero-text` → Content wrapper div

---

## 2. What We Do Section

**File:** `src/sections/WhatWeDo.astro`

### Ticker / Marquee Component
- **Animation:** Scroll-Velocity Marquee (Tier 2)
- **How it looks:** Horizontal text loop that accelerates and decelerates in response to scroll velocity; reverses direction on scroll-up
- **Trigger:** Continuous, velocity-reactive via Lenis scroll listener
- **Notes:** 30s baseline loop duration. Velocity multiplier: 1–3×.

### Section Nav Theme
- **Animation:** Nav Theme Switching (Tier 2)
- **How it looks:** Navbar text/icons swap to "dark" theme as cream section enters
- **Trigger:** ScrollTrigger at `top 64px`
- **Notes:** Add `data-nav-theme="dark"` to `<section id="what-we-do">`.

### Team Photo (left column)
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Image fades in and rises from below (`y: 40, autoAlpha: 0`)
- **Trigger:** Scroll into view at `top 85%`. Mark image wrapper with `data-anim-enter`
- **Notes:** Enters slightly before right column text for a natural two-column cascade.

### Eyebrow Label ("What We Do")
- **Animation:** Clip-path Ellipse Reveal (Tier 3) or simple Entrance Reveal (Tier 1)
- **How it looks:** Option A (premium): gold rule and text unfold from `ellipse(100% 0% at 50% 0%)` to full reveal. Option B: standard fade + rise
- **Trigger:** Scroll into view at `top 85%`
- **Notes:** Fires 0.1–0.15s before the main heading to lead the eye.

### Main Section Heading (h2)
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Two lines (split at `<br />`) mask in left-to-right; gold overlay sweeps simultaneously. Signature effect — execute at highest fidelity
- **Trigger:** Scroll into view at `top 90%`. Mark `<h2>` with `data-anim-heading`
- **Notes:** Stagger 0.15s per line. Duration 0.6s per line, overlay +0.3s offset.

### Body Copy Paragraph
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Text block fades in and rises from below
- **Trigger:** Scroll into view at `top 85%`. Mark with `data-anim-enter`
- **Notes:** ~0.05s stagger if multiple paragraphs.

### Feature Cards Container (three bordered cards)
- **Animation:** Staggered List Entrance (Tier 1)
- **How it looks:** Each card (`border-b` div) rises and fades in with stagger, top to bottom
- **Trigger:** Scroll into view at `top 85%`. Mark parent with `data-anim-stagger`
- **Notes:** `stagger: { amount: 0.4, from: 'start' }`. 3 cards × ~0.133s = 0.4s total. Each card: `y: 40, autoAlpha: 0`, duration 0.5s.

### Card Titles, Body Text, Gold Borders, Dividers
- **Animation:** None independently — all inherit from parent card stagger entrance
- **Notes:** Static borders should remain static (no dedicated animation).

### Suggested Attribute Layout
```
t=0.0s  — Image [data-anim-enter]
t=0.1s  — Eyebrow
t=0.2s  — Heading line 1 [data-anim-heading]
t=0.35s — Heading line 2
t=0.5s  — Body paragraph [data-anim-enter]
t=0.6s  — Card 1 [data-anim-stagger on parent]
t=0.7s  — Card 2
t=0.8s  — Card 3
```

---

## 3. Platform Section

**File:** `src/sections/Platform.astro`

### Eyebrow Label ("MDOS")
- **Animation:** Clip-path Ellipse Reveal (Tier 3)
- **How it looks:** Unfolds from `ellipse(100% 0% at 50% 0%)` to full reveal — softer than a line reveal, signals hierarchy
- **Trigger:** Scroll into view at `top 85%`. Duration 0.4s, `power2.out`
- **Notes:** Reveals before main heading to set context.

### Main Heading (h2: "One System. Every Stage of the Build.")
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Lines mask in right-to-left reveal; gold overlay wipes across simultaneously. "Every Stage" is already gold — the wipe flash complements it
- **Trigger:** Scroll into view at `top 90%`. Mark with `data-anim-heading`
- **Notes:** 2 lines, 0.15s stagger. Per-line duration 0.6s, overlay at +0.3s offset.

### Section Subtitle and Body Text
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Each block fades in + slides up from below
- **Trigger:** `top 85%`. Mark each with `data-anim-enter`
- **Notes:** Subtitle 0.05s delay, body text 0.1s delay after eyebrow.

### "Explore MDOS" CTA Button
- **Animation:** Entrance Reveal (Tier 1) + Hover Micro-Interaction (Tier 2)
- **How it looks:** Fades in + slides up on scroll; on hover, border/background shifts with 0.3s ease
- **Trigger:** Entrance at `top 85%`. Hover on `mouseenter`/`mouseleave`
- **Notes:** Entrance 0.15s after body text.

### "Platform Capabilities" Subheading (h3)
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1) or Entrance Reveal (Tier 1)
- **How it looks:** Either full line reveal treatment or simpler fade + rise — line reveal preferred for consistency
- **Trigger:** `top 90%`, fires independently

### Capability Cards Grid (6 cards, numbered 01–06)
- **Animation:** Staggered Grid Entrance (Tier 1)
- **How it looks:** Cards enter from `y: 40, autoAlpha: 0` in sequence, left-to-right cascade across the 3-column grid
- **Trigger:** `top 85%`. Mark parent `.grid` with `data-anim-stagger`
- **Notes:** `stagger: { amount: 0.4, from: 'start' }`. 6 cards ÷ 0.4s = ~0.067s per card. Duration 0.5s per card.

### Card Internals (number badges, titles, body text)
- **Animation:** None independently — inherit from parent card stagger

### Card 3D Depth Elements (`.card-3d-depth`, `.card-3d-left`, `.card-3d-bottom`)
- **Animation:** None independently — fade in with parent `autoAlpha` transition

### Gold Top Border on Cards
- **Animation:** Optional hover glow (Tier 2). Static by default
- **Notes:** If hover: `box-shadow` glow, 0.3s `power1.inOut`. Keep subtle.

### Nav Theme (dark green background)
- **Animation:** Nav Theme Switching (Tier 2)
- **Notes:** Add `data-nav-theme="light"` to the `<section>` element.

### Priority Order
1. **High:** Line reveal on h2, card grid stagger
2. **Medium:** Entrance reveals for text and CTA
3. **Polish:** Ellipse reveal on eyebrow, nav theme switching, hover effects

---

## 4. Who We Serve Section

**File:** `src/sections/WhoWeServe.astro`

### Eyebrow Label
- **Animation:** Clip-path Ellipse Reveal (Tier 3)
- **How it looks:** Gold rule and text unfold from `ellipse(100% 0% at 50% 0%)` to full reveal
- **Trigger:** `top 85%`. Duration 0.4–0.5s
- **Notes:** Fires 0.15s before main heading.

### Main Heading (two-line, with gold accent)
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Both lines mask in left-to-right; gold overlay sweeps across each in sequence. Second line includes gold-colored text — overlay flash complements the existing gold
- **Trigger:** `top 90%`. Mark with `data-anim-heading`
- **Notes:** Line 1 at t=0, line 2 at t=0.15s. Each: 0.6s clip-path, overlay at +0.3s.

### Body Paragraph
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Block fades in + rises from `y: 40, autoAlpha: 0`
- **Trigger:** `top 85%`. Mark with `data-anim-enter`
- **Notes:** Delay 0.3–0.4s after heading completes to keep focus on headline.

### Audience Cards Grid (6 cards, responsive)
- **Animation:** Staggered Grid Entrance (Tier 2)
- **How it looks:** Cards enter from `y: 40, autoAlpha: 0` in a wave, top-left to bottom-right
- **Trigger:** `top 85%`. Mark parent with `data-anim-stagger`
- **Notes:** `{ amount: 0.4, from: 'start' }` or `'center'` for premium feel. Fires after body paragraph (~0.5s delay from paragraph trigger). On mobile (single column), stagger cascades vertically.

### Card Internals (icon, title, body)
- **Animation:** None independently — card animates as a single cohesive unit
- **Notes:** Animating sub-elements would add visual noise. Keep the card unified.

### Border Lines (top/bottom/vertical dividers)
- **Animation:** None — static structural elements
- **Notes:** Horizontal lines could do a `scaleX: 0 → 1` wipe, but recommend against it — static is cleaner.

### Section Background (cream)
- **Animation:** Nav Theme Switching (Tier 2)
- **Notes:** Add `data-nav-theme="dark"` to section for navbar text adaptation.

### Full Sequence
```
t=0.0s  — Eyebrow ellipse reveal
t=0.15s — Heading line 1 (clip-path + gold wipe)
t=0.3s  — Heading line 2
t=0.5s  — Body paragraph entrance
t=0.8s  — Audience card grid stagger begins
```

---

## 5. Projects Section

**File:** `src/sections/Projects.astro`

### Eyebrow Label
- **Animation:** Clip-path Ellipse Reveal + Entrance Reveal stagger (Tier 1/3)
- **How it looks:** Gold line wipes from zero width; text fades in + rises simultaneously. Soft, elegant reveal
- **Trigger:** `top 85%`. 0.65s total span (line 0.5s, text 0.15s staggered)

### Main Section Heading (h2)
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Up to 3 lines (responsive) mask in left-to-right with gold overlay flash
- **Trigger:** `top 90%`. Mark with `data-anim-heading`
- **Notes:** 0.15s stagger per line. Total duration ~0.9s across all lines.

### Body Text and CTA Button ("See Our Projects")
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Each fades in + rises from below
- **Trigger:** `top 85%`. Body: 0.15s delay from heading. Button: 0.25–0.3s delay
- **Notes:** Button also gets hover micro-interaction: `scale: 1.02` on hover (0.3s), or enhances existing `hover:brightness-105`.

### Project Card Grid (3 cards: Commercial, Residential, Multi-Unit)
- **Animation:** Staggered Grid Entrance (Tier 1)
- **How it looks:** Cards enter from `y: 40, autoAlpha: 0` left-to-right (desktop) or top-to-bottom (mobile). `stagger: { amount: 0.4, from: 'start' }`
- **Trigger:** `top 85%`. Mark parent with `data-anim-stagger`

### Card Images (hover)
- **Animation:** Scale micro-interaction (Tier 2) — enhance existing CSS transition
- **How it looks:** On hover, image scales from 1.0 → 1.04 over 0.4s (`power2.out`); on leave, returns over 0.5s (`power2.inOut`) — slightly slower for elegance
- **Trigger:** `mouseenter` / `mouseleave`

### Active Indicator (gold top bar on selected card)
- **Animation:** Opacity transition (Tier 2)
- **How it looks:** On activate: `autoAlpha: 0 → 1` over 0.2s. On deactivate: `autoAlpha: 1 → 0` over 0.15s. Quick and unobtrusive
- **Trigger:** Click (card selection)

### Desktop Accordion Panel (content below cards)
- **Animation:** GSAP Accordion Expand/Collapse (Tier 2)
- **How it looks:** Panel animates from `height: 0, autoAlpha: 0` → `height: 'auto', autoAlpha: 1` over 0.5s (`power2.out`) on open. Collapses in 0.4s (`power2.inOut`) — slightly faster for snappy feel
- **Trigger:** Click on a card (desktop only, `window.innerWidth >= 768`)
- **Notes:** Call `ScrollTrigger.refresh()` after each open/close (page height changes). Internal content stagger optional — simplicity preferred.

### Mobile Modal (backdrop + bottom sheet)
- **Animation:** Slide-up + Fade-in (Tier 2)
- **How it looks — backdrop:** Fades in from `autoAlpha: 0 → 1` over 0.3s, parallel with sheet
- **How it looks — bottom sheet:** Slides up from `y: 100%` to `y: 0` over 0.5s (`power2.out`); simultaneously fades in. On close: slides back down in 0.4s, backdrop fades out in 0.25s
- **Trigger:** Click on a card (mobile only, `window.innerWidth < 768`)

### Gradient Overlays on Cards
- **Animation:** None — functional readability elements. Skip.

### Priority Table
| Element | Animation | Tier | Effort |
|---|---|---|---|
| Section heading | Line reveal + gold wipe | 1 | High |
| Eyebrow | Ellipse reveal | 1/3 | Medium |
| Body text + CTA | Entrance reveal | 1 | Low |
| Card grid | Staggered entrance | 1 | Low |
| Card images (hover) | Scale micro-interaction | 2 | Low |
| Accordion expand/collapse | GSAP height tween | 2 | Medium |
| Card indicator | Opacity micro-transition | 2 | Low |
| Mobile modal | Slide-up + fade | 2 | Medium |

---

## 6. Team Section

**File:** `src/sections/Team.astro`

### Nav Theme
- **Animation:** Nav Theme Switching (Tier 2)
- **Notes:** Add `data-nav-theme="dark"` to section (cream background).

### Eyebrow Label & Gold Rule
- **Animation:** Clip-path Ellipse Reveal (Tier 3)
- **How it looks:** Gold rule and label text unfold from `ellipse(100% 0% at 50% 0%)`
- **Trigger:** `top 90%`. Reveals 0.4s before main heading

### Main Heading (h2: "The People Behind MDI.")
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Lines mask in left-to-right; gold overlay sweeps. "Behind MDI." is already gold — the overlay flash briefly accents it further
- **Trigger:** `top 90%`. Mark with `data-anim-heading`
- **Notes:** Lines stagger 0.15s each. Duration 0.6s per line, overlay at +0.3s.

### Top CTA Button ("See Full Team")
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Fades in + slides up from `y: 40, autoAlpha: 0`
- **Trigger:** `top 85%`. Mark with `data-anim-enter`
- **Notes:** Begins ~0.2–0.3s after heading finishes (~0.9–1.0s total from trigger).

### Member Rows Container (three featured members)
- **Animation:** Staggered Entrance (Tier 1)
- **How it looks:** Each row (image + name + title + bio) rises and fades in as a cohesive unit, in sequence
- **Trigger:** `top 85%`. Mark the `.flex.flex-col.divide-y` container with `data-anim-stagger`
- **Notes:** `{ amount: 0.4, from: 'start' }`. 3 rows × 0.133s = 0.4s total stagger. Each row: `y: 40, autoAlpha: 0`, duration 0.5s.

### Member Headshots
- **Animation:** Inherit from parent row + optional subtle scale (0.95 → 1.0)
- **Notes:** Adding `scale: 0.95` in the `gsap.from()` alongside `y: 40, autoAlpha: 0` gives images a gentle sense of arrival.

### Member Names, Titles, Bios
- **Animation:** Inherit from parent row stagger — animate as one unified unit
- **Notes:** No sub-element stagger within a row. Unified entrance maintains clarity.

### Gold Divider Lines (`divide-y divide-brand-gold/20`)
- **Animation:** None — static at 20% opacity. Skip.

### Bottom CTA Button ("See Full Team")
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Fades in + slides up
- **Trigger:** `top 85%`. Mark with `data-anim-enter`
- **Notes:** Delay 0.5–0.7s after last member row finishes, to feel like a natural close.

### Full Sequence
```
t=0.0s    — Eyebrow ellipse reveal
t=0.4s    — Heading lines (staggered)
t=0.9–1.0s — Top CTA button
t=1.0s    — Member row 1
t=1.133s  — Member row 2
t=1.266s  — Member row 3
t=2.0s    — Bottom CTA button
```

---

## 7. CTA / Footer Section

**File:** `src/sections/CTA.astro`

### Nav Theme
- **Notes:** Add `data-nav-theme="light"` to `<section id="cta">` (dark green background → light navbar text).

### Headline Line 1 ("Ready to Build")
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** White text masks in left-to-right while gold overlay wipes simultaneously
- **Trigger:** `top 90%`. Mark `<h2>` with `data-anim-heading`
- **Notes:** Line 1 at t=0. Duration 0.6s, overlay at +0.3s.

### Headline Line 2 ("What's Next?" — gold text)
- **Animation:** Same Line Reveal + Highlight Wipe (Tier 1)
- **How it looks:** Identical mechanics; since text is already gold, use a lighter or brighter overlay color for contrast on reveal
- **Trigger:** Part of same `data-anim-heading` timeline
- **Notes:** Stagger 0.15s from line 1 (fires at t=0.15s). Overlay flash at t=0.45s.

### Supporting Paragraph
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Fades in + rises from `y: 40, autoAlpha: 0`
- **Trigger:** `top 85%`. Mark with `data-anim-enter`
- **Notes:** Delay 0.2–0.3s after headlines finish.

### Audience Cards Grid (Developers & Builders / Investors & Partners)
- **Animation:** Staggered Grid Entrance (Tier 1)
- **How it looks:** Both cards enter from below with ~0.1–0.2s offset between them
- **Trigger:** `top 85%`. Mark parent with `data-anim-stagger`
- **Notes:** `{ amount: 0.4, from: 'start' }`. Delay entire grid ~0.5s after paragraph entrance.

### "Work With Us" Button
- **Animation:** Entrance Reveal (Tier 1) + Hover Micro-Interaction (Tier 1)
- **How it looks:** Entrance: fades in + rises. Hover: scale `1.0 → 1.02` or subtle lift (`y: -2`) over 0.3s; CSS `transition-colors` already handles color swap
- **Trigger:** Entrance at `top 85%`. Hover on `mouseenter`
- **Notes:** Part of the buttons `data-anim-stagger` group.

### "Request Access to Alpha" Button
- **Animation:** Entrance Reveal (Tier 1) + Hover Micro-Interaction (Tier 1)
- **How it looks:** Same entrance as left button, staggered 0.05s later. Arrow (`→`) could slide right (+4px) on hover for tactile "push" feel
- **Trigger:** Entrance at `top 85%`. Hover on `mouseenter`
- **Notes:** Mark both buttons in a shared `data-anim-stagger` parent.

### Footer Divider (`border-t`)
- **Animation:** Optional — `scaleX: 0 → 1` from center (`transform-origin: center`), 0.4s `power2.inOut` (Tier 3)
- **Trigger:** `top 85%`. Fires after buttons
- **Notes:** Can be skipped — static divider is cleaner.

### Copyright Text
- **Animation:** Section Entrance Reveal (Tier 1) — gentler variant
- **How it looks:** Fades in from `y: 20, autoAlpha: 0` (shorter offset since it's secondary content)
- **Trigger:** `top 85%`. Mark with `data-anim-enter`
- **Notes:** Delay after buttons (~1.1s from section trigger).

### Full Waterfall Sequence
```
t=0.0s   — Headline line 1 (clip-path + gold wipe)
t=0.15s  — Headline line 2
t=0.45s  — Supporting paragraph
t=0.5s   — Audience card 1
t=0.6s   — Audience card 2
t=0.9s   — "Work With Us" button
t=0.95s  — "Request Access" button
t=1.0s   — Footer divider (optional)
t=1.1s   — Copyright text
```

---

## 8. platform.astro Subpage

**File:** `src/pages/platform.astro`

### Back Navigation Link
- **Animation:** Subtle hover (CSS already handles `transition-colors duration-200`). No GSAP needed.

### H1 Heading: "The Operating Layer Every Project Runs On"
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Lines mask in right-to-left; gold overlay wipes simultaneously. "Operating Layer" (brand-green span) inherits the same animation
- **Trigger:** `top 90%`. Mark with `data-anim-heading`
- **Notes:** 2–3 lines depending on viewport. Stagger 0.15s per line. Duration 0.6s.

### Intro Paragraphs (2 paragraphs, left column)
- **Animation:** Section Entrance Reveal (Tier 1) with stagger
- **How it looks:** Each paragraph fades in + rises from below, 0.05s stagger between them
- **Trigger:** `top 85%`. Mark with `data-anim-enter`

### Three Info Panels (right column: Construction Methods, Robotics Partners, Defensible IP)
- **Animation:** Staggered Entrance Reveal (Tier 1)
- **How it looks:** Panels fade in + rise in sequence (0.1s stagger between each)
- **Trigger:** `top 85%`. Mark panel container with `data-anim-stagger`
- **Notes:** "Construction Methods" list items can further stagger at 0.05s each for a premium cascade.

### "Platform Capabilities" H2
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Single line masks in; gold wipe follows
- **Trigger:** `top 90%`. Mark with `data-anim-heading`

### 6-Card Capabilities Grid
- **Animation:** Staggered Grid Entrance (Tier 1)
- **How it looks:** Cards cascade left-to-right from `y: 40, autoAlpha: 0`. 3D depth divs fade in with parent card
- **Trigger:** `top 85%`. Mark parent `.grid` with `data-anim-stagger`
- **Notes:** `{ amount: 0.4, from: 'start' }`. Total stagger span ~0.4s across 6 cards.

### CTA H2: "See MDOS in Action"
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** "MDOS" span (already gold) inherits the line reveal; overlay flash momentarily highlights it
- **Trigger:** `top 90%`. Mark with `data-anim-heading`

### "Work With Us" CTA Button
- **Animation:** Entrance Reveal (Tier 1) + Hover Micro-Interaction (CSS existing + optional GSAP scale)
- **Trigger:** Entrance at `top 85%`, 0.1s after heading. Hover on `mouseenter`

### Overall Page Flow
```
Page load:  H1 line reveal
Scroll →    Intro paragraphs → Right panels (staggered)
Scroll →    "Platform Capabilities" H2 line reveal
Scroll →    6-card grid stagger
Scroll →    CTA H2 line reveal → "Work With Us" button
```
All animations fire once (`once: true`). No parallax on subpages (reserved for hero).

---

## 9. projects.astro Subpage

**File:** `src/pages/projects.astro`

### Back Navigation Link
- **Animation:** CSS hover already present. No GSAP needed.

### H1: "Our Projects" (with gold "Projects" span)
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Lines mask in left-to-right; gold overlay wipes. The gold-colored word "Projects" inherits the animation — overlay flash emphasizes it
- **Trigger:** `top 90%`. Mark with `data-anim-heading`
- **Notes:** Wrap lines with `<span class="line">` or use SplitText.

### Category Headings (h2: Multi-Unit, Residential, Commercial)
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Single-line heading masks in quickly (~0.6s total)
- **Trigger:** `top 85%` per category section as it scrolls into view. Mark each with `data-anim-heading`

### Project Name Subheadings (h3)
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Fades in + rises from `y: 40, autoAlpha: 0`
- **Trigger:** `top 85%`. Mark with `data-anim-enter`
- **Notes:** 0.1–0.2s delay after category h2.

### Body Text Paragraphs
- **Animation:** Section Entrance Reveal with stagger (Tier 1)
- **How it looks:** Each paragraph fades in + rises, 0.05s stagger between paragraphs
- **Trigger:** `top 85%`. Mark parent with `data-anim-stagger` or mark paragraphs individually

### Project Images and Placeholders
- **Animation:** Section Entrance Reveal (Tier 1)
- **How it looks:** Fades in + rises from `y: 40, autoAlpha: 0`
- **Trigger:** `top 85%`. Mark image wrapper with `data-anim-enter`
- **Notes:** Offset 0.15–0.25s after subheading — text appears first, image follows.

### "Project details coming soon" Placeholder
- **Animation:** Section Entrance Reveal (Tier 1)
- **Trigger:** `top 85%`. Mark with `data-anim-enter`

### Page-Level Notes
- No accordion on this page
- No marquee or stat counters
- No nav theme switching needed (single cream background)
- Simple linear layout — no grid stagger needed at page level (stagger only within category sections)

### Per-Category Entrance Order
```
→ Category H2 line reveal
  → Project H3 entrance (+0.1s)
  → Body paragraphs stagger (+0.3s)
  → Image entrance (+0.45s)
```
Repeats for each category as it scrolls into view.

---

## 10. team.astro Subpage

**File:** `src/pages/team.astro`

### Back Navigation Link
- **Animation:** CSS hover (already present). No GSAP needed.

### H1: "Our Team" (with gold "Team" span)
- **Animation:** Line Reveal with Color Highlight Wipe (Tier 1)
- **How it looks:** Heading masks in left-to-right; gold overlay wipes. The word "Team" is already gold — the overlay flash briefly accents it, then settles
- **Trigger:** `top 90%`. Mark with `data-anim-heading`
- **Notes:** Stagger 0.15s per line if heading wraps at smaller viewports.

### Team Member Card Grid (`.grid.grid-cols-2.md:grid-cols-3`, 9 members)
- **Animation:** Staggered Grid Entrance (Tier 1)
- **How it looks:** All 9 cards enter from `y: 40, autoAlpha: 0` in a cascade, top-left to bottom-right
- **Trigger:** `top 85%`. Mark parent `.grid` with `data-anim-stagger`
- **Notes:** `{ amount: 0.05, from: 'start' }` per card = 0.4s total spread (9 × 0.05s). Duration 0.5s per card.

### Member Headshot Images
- **Animation:** Inherit from parent card stagger + optional `scale: 0.95 → 1.0`
- **Notes:** Adding subtle scale in the `gsap.from()` gives images a gentle sense of arrival. 4 members have `grayscale` CSS filter — this is static, no animation.

### Member Names, Titles, Bios
- **Animation:** Inherit from parent card stagger — all enter as one unified unit
- **Notes:** No sub-element stagger within each card. Members with empty bio field (`Cristian Perez` etc.) simply animate with fewer children — stagger still applies to visible elements.

### Page-Level Notes
- Only 2 data attributes needed: `data-anim-heading` on `h1`, `data-anim-stagger` on `.grid`
- Scripts needed: `headings.js` (line reveals) + `entrances.js` (staggered grid)
- No marquee, stat counters, or parallax
- No nav theme switching needed (cream background throughout)

---

## Cross-Cutting Notes

### Animation Guide Tiers at a Glance
| Tier | What it covers |
|---|---|
| 1 — Core Premium | Line reveals, entrance reveals, staggered grids |
| 2 — Polish | Hover micro-interactions, marquee, accordion, nav theme, modal |
| 3 — Refinement | Ellipse reveals, divider wipes, optional parallax touches |

### Consistent Easing Convention
- Entrance reveals: `power2.out`
- Highlight/overlay: `power2.inOut`
- Micro-interactions (hover): `power1.inOut`
- Scrub-linked (parallax): linear / no ease

### Consistent Durations
- Heading line reveal: `0.6s` per line
- Content blocks: `0.5s`
- Accordion open: `0.5s` / close: `0.4s`
- Modal slide-up: `0.5s`
- Micro-interactions: `0.2–0.3s`

### Data Attribute System (from animation-guide.md)
| Attribute | Applied to | Effect |
|---|---|---|
| `data-anim-heading` | `<h1>`, `<h2>`, `<h3>` | Line reveal + gold wipe |
| `data-anim-enter` | Any block element | Fade + slide up |
| `data-anim-stagger` | Parent containers | Staggered entrance on children |
| `data-hero-bg` | Hero image container | Parallax background |
| `data-hero-text` | Hero content wrapper | Parallax text layer |
| `data-nav-theme` | `<section>` | Navbar text color switching |

### Implementation Reminder
Per `CLAUDE.md`, **no animations should be implemented until Phase 2 is explicitly instructed.** This document is a planning resource only — no source files were modified.
