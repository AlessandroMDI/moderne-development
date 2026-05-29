# ADA Compliance Audit — Moderne Development Inc.

**Standard:** WCAG 2.1 Level AA (legal benchmark for ADA Title III)
**Audit date:** 2026-05-29
**Scope:** All source files in `src/` — layout, global styles, components, sections, all pages

---

## How to read this document

Findings are grouped by category, not by file, so related fixes can be batched. Each finding includes:

- **File(s):** source location(s)
- **Criterion:** WCAG success criterion and level (A = must-fix, AA = must-fix, AAA = recommended)
- **Severity:** `FAIL` (confirmed WCAG violation) · `RISK` (borderline or conditional) · `ADVISORY` (best practice / future-proofing)

Fix all `FAIL` items before launch. Address `RISK` items before launch where feasible.

---

## 1. Page Structure & Landmark Navigation

### 1.1 No skip navigation link anywhere on the site
**File:** `src/layouts/Layout.astro` — no skip link present in `<body>`
**Criterion:** WCAG 2.4.1 Bypass Blocks — **Level A — FAIL**

A "Skip to main content" link must be the first focusable element on every page. Without it, keyboard users must tab through the entire navbar on every page load before reaching content.

**Fix:** Add as the very first child of `<body>` in `Layout.astro`:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```
Style it visually hidden until focused (do not use `display:none` or `visibility:hidden` — use a CSS translate/clip technique). Also requires fix 1.2 below.

---

### 1.2 No `<main>` landmark on any page
**File:** `src/layouts/Layout.astro` line 52; `src/pages/index.astro`, `platform.astro`, `projects.astro`, `team.astro`
**Criterion:** WCAG 1.3.1 Info and Relationships (A); WCAG 2.4.1 Bypass Blocks (A) — **FAIL**

The `<slot />` in `Layout.astro` dumps all section content directly into `<body>` with no `<main>` wrapper. Screen reader users cannot use landmark navigation ("jump to main content"), and the skip link from 1.1 has no target to send focus to.

**Fix:** Wrap the `<slot />` in `Layout.astro` in `<main id="main-content">`.

---

### 1.3 Section labels (`site-lbl`) are `<span>` elements — lost from heading outline
**File:** All section files — `WhoWeServe.astro`, `Projects.astro`, `Team.astro`, `WhatWeDo.astro`, `Platform.astro`
**Criterion:** WCAG 2.4.6 Headings and Labels — **Level AA — FAIL**

Every section uses a pattern like:
```html
<span class="site-lbl">Who We Serve</span>
<h2>Built for the People Who Build.</h2>
```
The `<span>` label ("Who We Serve", "Our Projects", "Our Team", etc.) is not part of the heading outline. Screen reader users navigating by headings only hear the `<h2>` text, losing the section context label entirely.

**Fix (two options):**
- Option A: Make the `<span>` a visually-styled `<h2>` and demote the current `<h2>` to `<h3>`.
- Option B: Incorporate the label text into the `<h2>` using a nested `<span>` with distinct visual treatment: `<h2><span class="site-lbl block">Who We Serve</span>Built for the People Who Build.</h2>`

Option B is lower-risk structurally.

---

### 1.4 Team member names are `<p>` elements, not headings
**File:** `src/sections/Team.astro` lines 102–103
**Criterion:** WCAG 1.3.1 Info and Relationships — **Level A — FAIL**

Team member names are marked up as `<p>` elements inside cards. Screen reader users navigating by headings cannot jump to individual team members. Names should be `<h3>` (subordinate to the section `<h2>`).

**Fix:** Change name `<p>` to `<h3 class="team-name">`.

---

### 1.5 Projects page category sections have no heading
**File:** `src/pages/projects.astro` lines 71–137
**Criterion:** WCAG 1.3.1 / 2.4.6 — **Level A — FAIL**

Each category (`Multi-Unit`, `Residential`, etc.) is rendered as a `<section>` with no heading. The category label is never output as an `<h2>` or `<h3>`. Keyboard/screen reader users cannot identify which category section they are in.

**Fix:** Add `<h2 class="...">{ category.label }</h2>` as the first element inside each category `<section>`.

---

### 1.6 Platform page tab panels missing `aria-labelledby`
**File:** `src/pages/platform.astro` lines 217–224
**Criterion:** WCAG 4.1.2 Name, Role, Value — **Level A — FAIL**

Tab buttons have `aria-controls={m.id}` and panels have matching `id` attributes (correct), but the tab buttons have no `id` of their own, so tab panels cannot use `aria-labelledby` to reference their controlling tab. Each `[tabpanel]` must be labelled by its tab.

**Fix:** Add `id="tab-{m.id}"` to each tab button; add `aria-labelledby="tab-{m.id}"` to each panel.

---

## 2. Color Contrast

All ratios calculated using the WCAG relative luminance formula.

### 2.1 Brand gold (#b8952a) on white or cream — FAILS for all text sizes
**File:** `src/styles/global.css` (CSS token `--color-brand-gold`); `src/sections/Platform.astro` line 47; `src/sections/WhoWeServe.astro` line 33; any use of `text-brand-gold` on light backgrounds
**Criterion:** WCAG 1.4.3 Contrast Minimum — **Level AA — FAIL**

`#b8952a` on `#ffffff` = **2.85:1**
`#b8952a` on `#f6f8f6` (cream) = **2.77:1**

Both values fail the 4.5:1 minimum for normal text AND the 3:1 minimum for large text (18pt+ / 14pt+ bold). The gold token cannot be used for any text on light backgrounds.

**Fix:** For light backgrounds, darken gold to approximately `#7a6000` (≈ 4.5:1 on white) or use `--color-dark` (`#0d1310`) as the contrasting text color. Reserve gold as a decorative accent only, never as the sole text color on light backgrounds.

---

### 2.2 CSS `--gold` variable (rgba overlay) on white — severe failure
**File:** `src/styles/global.css` line 35 (`--gold: rgba(200,169,110,0.85)`)
**Criterion:** WCAG 1.4.3 — **Level AA — FAIL**

Composited effective color on white ≈ `rgb(208, 182, 132)` → **1.96:1** against white. Severe failure. Any text using `--gold` on a white or cream background will fail by a wide margin.

**Fix:** Do not use `--gold` for text on light backgrounds. Audit all usages in component styles.

---

### 2.3 Footer copyright text — rgba white at 30% opacity on dark green
**File:** `src/components/Footer.astro` line 6 (`text-white/30`)
**Criterion:** WCAG 1.4.3 — **Level AA — FAIL**

`rgba(255,255,255,0.30)` composited on `#1a4a3a` ≈ effective `#7e9a8e` → **2.4:1** against `#1a4a3a`. Fails 4.5:1 minimum.

**Fix:** Use `text-white/70` minimum (≈ 4.5:1) or solid `text-white` for copyright text.

---

### 2.4 Hero subhead text — rgba white at 65% opacity
**File:** `src/sections/Hero.astro` line 35
**Criterion:** WCAG 1.4.3 — **Level AA — FAIL**

`rgba(255,255,255,0.65)` on the overlay background `rgba(26,74,58,0.62)` composited over a photo. Effective foreground ≈ `rgb(165,194,190)` → approximately **3.1:1**. Fails 4.5:1 for normal body text.

**Fix:** Increase opacity to at least `rgba(255,255,255,0.85)` (≈ 5.5:1 on the overlay color), or use solid white.

---

### 2.5 Platform page — multiple semi-transparent white text on dark green
**File:** `src/pages/platform.astro`
**Criterion:** WCAG 1.4.3 — **Level AA — FAIL**

Three separate failures:
- `rgba(255,255,255,0.40)` on `#1a4a3a` → **~2.5:1** — FAIL (lines with `.abox-d`, `.alpha-li`)
- `rgba(255,255,255,0.45)` on `#1a4a3a` → **~2.8:1** — FAIL (`.sk`, `.alpha-sp`)
- `rgba(255,255,255,0.50)` on `#1a4a3a` → **~3.1:1** — FAIL for 12–15px normal text (`.alpha-li` body text, `.alpha-sp`)

**Fix:** Replace all semi-transparent white text on dark green with `rgba(255,255,255,0.85)` minimum, or use solid white. Full white (`#ffffff`) on `#1a4a3a` = **10.1:1** — well within AA.

---

### 2.6 Muted text at small sizes — borderline to failing
**File:** `src/sections/Projects.astro` (panel body text), `src/sections/Team.astro` (`.team-role`), `src/sections/CTA.astro` / `src/components/Footer.astro` (11px copyright)
**Criterion:** WCAG 1.4.3 — **Level AA — FAIL / RISK**

`#637066` on `#f6f8f6` (cream) = **~4.3:1** — fails 4.5:1 minimum for normal text.
`#637066` on `#ffffff` = **~4.86:1** — passes AA, but is borderline.

Any use of `--muted` / `#637066` on cream background fails. Additionally, 11px text using this color on white at ~4.3:1 fails because the required 4.5:1 applies to all text under 18px (non-bold) / 14px (bold).

**Fix:** For text on cream (`#f6f8f6`), darken muted to at least `#5c6960` (≈ 4.6:1 on cream). Increase 11px copyright text to at least 14px.

---

### 2.7 Contact modal select placeholder — near-invisible
**File:** `src/components/ContactModal.astro` line 77
**Criterion:** WCAG 1.4.3 — **Level AA — FAIL**

`rgba(255,255,255,0.25)` on `#044239` (brand-green) → **~1.7:1**. The "Select one" placeholder option is visible and readable to sighted users before selection — it must meet contrast requirements.

**Fix:** Use `rgba(255,255,255,0.70)` minimum for the placeholder option text.

---

## 3. Keyboard Accessibility & Focus Management

### 3.1 No global `:focus-visible` style — all interactive elements have invisible focus
**File:** `src/styles/global.css` — no `:focus-visible` rule in `@layer base`; `src/styles/global.css` lines 113–148 (`.site-btn-p`, `.site-btn-s`) — no `:focus-visible` state defined
**Criterion:** WCAG 2.4.7 Focus Visible — **Level AA — FAIL**

Tailwind v4's preflight reset removes browser-default focus outlines. There is no replacement `:focus-visible` rule anywhere in the codebase. Every interactive element (links, buttons, inputs) has invisible focus for keyboard users.

**Fix:** Add to `@layer base` in `global.css`:
```css
:focus-visible {
  outline: 3px solid var(--color-brand-gold);
  outline-offset: 2px;
}
```
Additionally add explicit `:focus-visible` overrides to `.site-btn-p`, `.site-btn-s`, and any component that resets `outline`.

---

### 3.2 Projects accordion card button removes focus ring
**File:** `src/sections/Projects.astro` line 74 (`focus:outline-none` Tailwind class on `.project-card` button)
**Criterion:** WCAG 2.4.7 Focus Visible — **Level AA — FAIL**

`focus:outline-none` is applied directly to the card buttons. The only ring shown is a box-shadow when `aria-expanded="true"`, meaning an un-expanded focused card has no focus indicator at all.

**Fix:** Replace `focus:outline-none` with `focus-visible:outline-3 focus-visible:outline-brand-gold` (or a custom ring). Never use `focus:outline-none` without an immediate replacement.

---

### 3.3 Projects accordion: no `aria-controls` on trigger buttons
**File:** `src/sections/Projects.astro` lines 73–99
**Criterion:** WCAG 4.1.2 Name, Role, Value — **Level A — FAIL**

Each accordion `<button>` has `aria-expanded` but no `aria-controls` linking it to its panel. Screen reader users cannot determine which panel the button controls.

**Fix:** Add `aria-controls="panel-{cat.id}"` to each button; add matching `id="panel-{cat.id}"` to each panel `<div>`.

---

### 3.4 Projects accordion panels have no accessible region semantics
**File:** `src/sections/Projects.astro` lines 105–117
**Criterion:** WCAG 4.1.2 Name, Role, Value — **Level A — FAIL**

Content panels have no `id`, no `role="region"`, and no `aria-labelledby`. When a panel opens, AT users have no indication a named region has appeared.

**Fix:** Add `id="panel-{cat.id}"`, `role="region"`, and `aria-labelledby="{button-id}"` to each panel.

---

### 3.5 Mobile project modal has no focus trap
**File:** `src/sections/Projects.astro` lines 124–145; `src/components/ContactModal.astro`
**Criterion:** WCAG 2.1.2 No Keyboard Trap / 2.1.1 Keyboard — **Level A — FAIL**

Neither the mobile project modal nor the contact modal implements a focus trap. When open, Tab exits the modal and cycles through background page content. Focus must be confined to the modal while it is open, and restored to the triggering element on close.

**Fix:** Implement a focus trap on open: collect all focusable elements within the modal, intercept Tab/Shift+Tab to cycle only within that set. On close, call `.focus()` on the triggering element. The Navbar hamburger menu (`Navbar.astro` lines 169–178) already implements this pattern — replicate it for both modals.

---

### 3.6 "Work With Us" button has no wired behavior
**File:** `src/components/Navbar.astro` lines 51–56 and 128; `src/sections/CTA.astro` line 53
**Criterion:** WCAG 2.1.1 Keyboard — **Level A — FAIL**

The `<button data-contact-trigger>` elements have no event listener in their respective component scripts. Clicking or activating by keyboard produces no action. An operable-looking button that does nothing is a WCAG 2.1.1 failure.

**Fix:** Wire the `data-contact-trigger` attribute to open the contact modal. If the contact modal is in a separate component, ensure the event is dispatched globally and caught by the modal's script.

---

### 3.7 Ticker and marquees have no pause/stop control
**File:** `src/components/Ticker.astro` line 13 (`animation: marquee 35s linear infinite`); `src/pages/platform.astro` (`.ticker-track`, `animation: platTicker 30s linear infinite`)
**Criterion:** WCAG 2.2.2 Pause, Stop, Hide — **Level AA — FAIL**

Both marquee animations start automatically and run indefinitely with no user control to pause or stop them. WCAG 2.2.2 requires that auto-moving content lasting more than 5 seconds has a pause/stop mechanism.

**Fix:** Add a pause button adjacent to each ticker (can be visually minimal — an icon button). On click, apply `animation-play-state: paused` to the track. Alternatively, add a CSS rule that stops the animation for users with `prefers-reduced-motion: reduce`.

---

### 3.8 CTA "Request Access" uses `href="#"`
**File:** `src/sections/CTA.astro` line 62
**Criterion:** WCAG 2.4.4 Link Purpose — **Level AA — FAIL**

`href="#"` is a non-functional link that scrolls to the top of the page. Screen reader users following this link receive no destination feedback. If this is meant to trigger a JS action, it must be a `<button>`, not an `<a>`.

**Fix:** If this triggers a modal or action, change to `<button type="button">`. If it links to a real destination, replace `#` with the real URL.

---

## 4. Images & Non-text Content

### 4.1 Decorative SVG icons not hidden from assistive technology
**File:** `src/sections/WhoWeServe.astro` line 51 (Lucide icons via `astro-icon`); `src/sections/Projects.astro` close button SVG line 133
**Criterion:** WCAG 1.1.1 Non-text Content — **Level A — FAIL**

Decorative icons rendered via `astro-icon` produce inline `<svg>` without `aria-hidden="true"`. Screen readers announce them with no meaningful label. The Projects modal close button SVG at line 133 also lacks `aria-hidden` (the button has `aria-label="Close"`, but the SVG is still announced redundantly by some AT).

**Fix:** Pass `aria-hidden="true"` to all decorative icon instances. For the close button SVG, add `aria-hidden="true"` directly to the `<svg>` element.

---

### 4.2 Ticker content duplicated for animation — duplicate AT output
**File:** `src/components/Ticker.astro` lines 13–19; `src/pages/platform.astro` ticker
**Criterion:** WCAG 1.3.2 Meaningful Sequence — **Level A — FAIL**

Both tickers duplicate their item arrays (`[...items, ...items]`) for seamless CSS looping. Screen reader users encounter every item twice with no context. The decorative diamond separators (`&#9670;`) are not `aria-hidden`.

**Fix (two-part):**
1. Wrap the entire ticker in a visually-rendered container and add `aria-hidden="true"` to that container.
2. Add a separate, visually-hidden `<ul>` with `class="sr-only"` containing the same items once, for screen readers only.

Alternatively, if the ticker content is purely decorative (logos/names already covered elsewhere), apply `aria-hidden="true"` to the whole component.

---

### 4.3 Capability numbers not semantically connected to their headings
**File:** `src/sections/Platform.astro` lines 73–75
**Criterion:** WCAG 1.3.1 Info and Relationships — **Level A — FAIL**

`<span>01</span>` and `<h3>AI Land & Feasibility Screening</h3>` are sibling elements with no semantic relationship. Screen reader users hear "zero one" as a standalone piece of content with no context.

**Fix:** Either add `aria-hidden="true"` to each number `<span>` (since the number adds no meaningful content not conveyed by position), or incorporate the number into the `<h3>` text.

---

## 5. Typography & Text Sizing

### 5.1 Font sizes defined in absolute `px` — do not scale with user preferences
**File:** `src/styles/global.css`
**Criterion:** WCAG 1.4.4 Resize Text — **Level AA — FAIL**

The following use absolute `px` values that do not respond to the user's browser default font-size setting (only `rem`/`em` units do):

| Selector | Property | Value | Fix |
|---|---|---|---|
| `.site-lbl` | `font-size` | `12px` | `0.75rem` |
| `.site-sh` | `font-size` | `clamp(28px, 3.5vw, 44px)` | `clamp(1.75rem, 3.5vw, 2.75rem)` |
| `.site-sp` | `font-size` | `15px` | `0.9375rem` (or `1rem`) |
| `.site-btn-p` | `font-size` | `14px` | `0.875rem` |
| `.site-btn-s` | `font-size` | `14px` | `0.875rem` |

Converting to `rem` means a user who sets their browser default to 20px will see all text scale proportionally.

---

### 5.2 `.site-lbl` is 12px — below practical legibility threshold
**File:** `src/styles/global.css` line 69
**Criterion:** WCAG 1.4.4 / best practice — **RISK**

12px (9pt) is below the 16px recommended minimum body size and is difficult to read for low-vision users at 100% zoom. While text zooms correctly at 200%, starting from 12px makes this a harder accessibility target.

**Fix:** Increase to at least 14px (0.875rem) for the section label. The uppercase + letter-spacing treatment will still read as a "small label" visually.

---

## 6. Motion & Animation

### 6.1 No `prefers-reduced-motion` support for any animation
**File:** `src/sections/Hero.astro` (lines 85–88), `src/pages/platform.astro` (all keyframe animations), `src/pages/projects.astro`, `src/pages/team.astro`, `src/styles/global.css` (`.animate-marquee`)
**Criterion:** WCAG 2.3.3 Animation from Interactions — **Level AAA** (advisory); WCAG 2.2.2 Pause, Stop, Hide — **Level AA** (for tickers — see 3.7)

No animation in the codebase is wrapped in a `@media (prefers-reduced-motion: no-preference)` query or suppressed by `@media (prefers-reduced-motion: reduce)`. Users with vestibular disorders who have enabled reduced-motion in their OS settings receive no accommodation.

Critically, page-load entrance animations (`heroSlideUp`, `heroFadeUp`, `platSlideUp`, etc.) initialize content at `opacity: 0`. If animations are suppressed by a browser extension or OS setting without a CSS fallback, content may remain invisible.

**Fix:** Add to `global.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
For elements that animate in from `opacity: 0`, also add:
```css
@media (prefers-reduced-motion: reduce) {
  .hero-a1, .hero-a2, .hero-sub, .hero-btns, .anim {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## 7. Forms

### 7.1 Contact modal required fields not marked programmatically
**File:** `src/components/ContactModal.astro` lines 46–92
**Criterion:** WCAG 1.3.1 / 3.3.2 Labels or Instructions — **Level AA — FAIL**

Inputs have the HTML `required` attribute (announced by modern browsers), but labels contain no visible required indicator (asterisk or similar), and no `aria-required="true"` is present. The form gives no upfront instruction about which fields are required.

**Fix:** Add `aria-required="true"` to all required inputs. Add a visible asterisk to required labels with a legend: `<p class="text-xs">Fields marked <span aria-hidden="true">*</span> are required</p>`.

---

### 7.2 No custom error feedback in contact form
**File:** `src/components/ContactModal.astro`
**Criterion:** WCAG 3.3.1 Error Identification / 3.3.3 Error Suggestion — **Level AA — FAIL**

The form relies entirely on browser-native validation popups. There is no custom inline error messaging, no `aria-describedby` linking inputs to error regions, and no focus management to the first failing field on submit.

**Fix:** Add a `<div id="{input-id}-error" class="sr-only" aria-live="polite"></div>` adjacent to each input. On validation failure, populate it with a specific error message and add `aria-describedby="{input-id}-error"` to the input. Move focus to the first failing field on submit.

---

## 8. Links

### 8.1 External links open in new tab without warning
**File:** `src/pages/platform.astro` line 357 (Instagram); `src/pages/projects.astro` lines 118–127 (project links)
**Criterion:** WCAG 3.2.2 On Input / G201 — **Level AA — FAIL**

Links with `target="_blank"` give no warning to AT users or keyboard users. Unexpected context switches (new tab/window) violate WCAG advisory G201.

**Fix:** Add `(opens in new tab)` as visually-hidden text within the link:
```html
<a href="..." target="_blank" rel="noopener">
  Instagram
  <span class="sr-only">(opens in new tab)</span>
</a>
```
Or add an icon with `aria-label="(opens in new tab)"`.

---

## 9. Page-Level Issues

### 9.1 Page `<title>` uses acronym and marketing tagline
**File:** `src/layouts/Layout.astro` line 10
**Criterion:** WCAG 2.4.2 Page Titled — **Level A — ADVISORY**

The default title `MDI | Build Smarter. Scale Faster.` uses an unexplained acronym and a marketing tagline rather than a descriptive title. Screen readers announce this as the first thing on every page.

**Fix:** Change to: `Moderne Development Inc. — Construction Technology` for the main site. For sub-pages, follow the pattern `Page Name | Moderne Development Inc.`

---

### 9.2 Nav links have no `aria-current` state
**File:** `src/components/Navbar.astro` lines 41–47, 116–123
**Criterion:** WCAG 2.4.4 Link Purpose — **ADVISORY**

Neither desktop nor mobile nav links carry `aria-current="page"` for the active page, making it impossible for AT users to know which page is currently loaded.

**Fix:** Add `aria-current={Astro.url.pathname === href ? "page" : undefined}` to each nav link.

---

### 9.3 Custom cursor removes native cursor for all interactive elements
**File:** `src/layouts/Layout.astro` lines 57–59
**Criterion:** WCAG 2.4.7 / general pointer affordance — **ADVISORY**

`cursor: none` is applied globally to `a, button, [role="button"], input, label, select, textarea` on pointer-fine devices. If the JavaScript-driven custom cursor fails (disabled JS, slow load), all pointer devices show no cursor. Users who rely on OS-level cursor customisation (high-contrast cursors for low vision) lose that accommodation.

**Fix:** Scope the custom cursor to `body` only (not individual interactive elements), or ensure a hardware cursor fallback is always visible. At minimum, add `cursor: pointer` or `cursor: default` as a fallback before `cursor: none` in the CSS.

---

### 9.4 Platform page `.anim` elements initialized at `opacity: 0`
**File:** `src/pages/platform.astro` lines 382–390
**Criterion:** WCAG 1.3.3 Sensory Characteristics — **ADVISORY**

All `.anim` elements start at `opacity: 0; transform: translateY(14px)` and depend on `IntersectionObserver` to become visible. If JS is unavailable or fails, all section content (headings, body text, cards) remains invisible.

**Fix:** Add the reduced-motion rule from 6.1 above, which resets `opacity: 1` when animations are suppressed. Also add a `<noscript>` CSS block or a no-JS class pattern that makes all `.anim` content visible without JS.

---

### 9.5 Missing `type="button"` on multiple buttons
**File:** `src/components/Navbar.astro` lines 51, 102, 128; `src/sections/CTA.astro` line 53; `src/pages/platform.astro` line 157
**Criterion:** WCAG 4.1.2 Name, Role, Value — **Level A — ADVISORY**

`<button>` elements without explicit `type="button"` default to `type="submit"` in certain DOM contexts. While not a violation in the current markup (no ancestor form), it is a robustness issue and best practice requires explicit `type` on all buttons.

**Fix:** Add `type="button"` to all `<button>` elements that do not intentionally submit a form.

---

## 10. Priority Fix Order

### Must fix before launch (Level A & AA failures with highest legal exposure)

| Priority | Item | File(s) |
|---|---|---|
| 1 | Add skip link + `<main id="main-content">` | `Layout.astro` |
| 2 | Add global `:focus-visible` rule | `global.css` |
| 3 | Add pause/stop control to all tickers | `Ticker.astro`, `platform.astro` |
| 4 | Fix all contrast failures (gold on light, footer copyright, hero subhead, platform opacity text) | Multiple |
| 5 | Projects accordion: `aria-controls`, panel `id`/`role`/`aria-labelledby`, remove `focus:outline-none` | `Projects.astro` |
| 6 | Implement focus trap in Projects modal and ContactModal | `Projects.astro`, `ContactModal.astro` |
| 7 | Wire `data-contact-trigger` buttons to open ContactModal | `Navbar.astro`, `CTA.astro` |
| 8 | Add `aria-hidden="true"` to all decorative icons and ticker separators | Multiple |
| 9 | Convert absolute `px` font sizes to `rem` | `global.css` |
| 10 | Add `aria-required` and custom error feedback to contact form | `ContactModal.astro` |
| 11 | Fix external links opening new tab without warning | `platform.astro`, `projects.astro` |
| 12 | Add `<h3>` to team member names; `<h2>` to projects category sections | `Team.astro`, `projects.astro` |
| 13 | Fix `.site-lbl` heading outline pattern across all sections | All section files |
| 14 | Add `prefers-reduced-motion` CSS block | `global.css` |

### Address before launch if feasible (AA / borderline)

| Priority | Item | File(s) |
|---|---|---|
| 15 | Platform tab panels: add `id` to buttons, `aria-labelledby` to panels | `platform.astro` |
| 16 | Fix select placeholder contrast in ContactModal | `ContactModal.astro` |
| 17 | Fix muted text on cream background (4.3:1 → 4.6:1+) | `global.css`, multiple sections |
| 18 | Add `aria-current="page"` to nav links | `Navbar.astro` |
| 19 | Resolve `href="#"` on Request Access link | `CTA.astro` |
| 20 | Fix capability number spans with `aria-hidden` | `Platform.astro` |
| 21 | Add `type="button"` to all non-form buttons | Multiple |

---

## Tools recommended for verification

- **axe DevTools** (Chrome/Firefox extension) — automated scan; zero errors required before launch
- **WAVE** (WebAIM) — visual overlay audit
- **WebAIM Contrast Checker** — verify every color pair after fixes
- **Keyboard-only test** — unplug mouse, tab through every interactive element, confirm focus is always visible
- **VoiceOver (Mac)** or **NVDA (Windows, free)** — verify headings, landmarks, accordion, and modal behavior

---

*This audit covers code-level issues detectable from source. A full WCAG 2.1 AA conformance review also requires live browser testing with automated tools and screen readers. Automated tools catch approximately 30–40% of all failures — this audit represents the code-level findings only.*
