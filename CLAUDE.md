# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

This is the website for **Moderne Development Inc. (MDI)** — a construction technology company. It is a **single-page site** with scroll-based navigation. There are no separate routes or pages.

The site is hosted on **Netlify**.

---

## Reference Documents

Read the relevant document before acting. Each doc has a specific scope — use the right one for the task at hand. Do not invent decisions that are already made in these docs.

| Document | Read when… | What it covers |
|----------|-----------|----------------|
| `_docs/design-system.md` | Building any UI component, layout, or section | Colors, fonts, spacing, all component specs (navbar, buttons, cards, hero, CTA), logo rules. **Note:** tokens are implemented in `src/styles/global.css` using Tailwind v4 `@theme` — not `tailwind.config`. |
| `_docs/content-brief.md` | Writing copy, using any stat, referencing any company fact | Company identity, all approved facts and figures, team bios, project details, site map with section anchors. Do not use any figure not listed here. |
| `_docs/tone-style.md` | Writing or reviewing any copy | Voice, formality register, sentence-level rules, MDI-specific banned words, capitalization, punctuation. |
| `_docs/ai-writing-guide.md` | Before any copy is committed to the codebase | AI-marker banned word list, structural patterns to avoid, pre-publish checklist. Run every piece of copy through the checklist at the bottom of the doc before it goes in. |
| `_docs/image-treatment.md` | Adding any image to the site | `<Image>` component patterns, formats (WebP/AVIF/JPEG), quality targets, KB caps, srcset breakpoints, loading priority, placeholder treatment for all pending assets. |
| `_docs/mobile-responsive.md` | Building any section or component | All breakpoint decisions — do not invent mobile layouts. Covers navbar mobile behavior, all seven section layouts at mobile/tablet/desktop, type scale mobile overrides, and copy-paste Tailwind patterns. |
| `_docs/placeholder-copy.md` | **Copy only** — when you need text to fill a section during build | Section headings confirmed from the mockup. Body copy placeholders drawn from `content-brief.md`. **Do not use for structure, layout, or image placement decisions.** Replace with approved copy as it is delivered. |
| `_docs/projects-copy.md` | **`#projects` accordion only** — expanded state copy | Copy for Commercial, Residential, and Multi-Unit accordion items fetched from the live MDI site. **Run through `ai-writing-guide.md` before final use — see warning in that file.** |

The `_brief/` folder contains raw source materials (mockup image, PDFs, logo SVG). Do not reference `_brief/` directly in code — all relevant information has been synthesized into `_docs/`.

---

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

---

## Tech Stack

- **Framework:** Astro + Tailwind CSS v4
- **Fonts:** Bebas Neue (display), Inter (body) — loaded via Google Fonts in `src/layouts/Layout.astro` using non-blocking pattern
- **Images:** Astro `<Image>` component from `astro:assets` — see `_docs/image-treatment.md` for all usage rules
- **Adapter:** `@astrojs/netlify` — configured in `astro.config.mjs` with Sharp image service
- **Hosting:** Netlify
- **Animations:** GSAP + ScrollTrigger + Lenis — **Phase 2 only. Do not implement animations until explicitly instructed.**

---

## Project Structure

```
src/
  layouts/Layout.astro   — Base HTML shell, font imports, meta tags
  pages/index.astro      — Single page, imports all sections
  sections/              — One .astro file per section (#hero, #what-we-do, etc.)
  components/            — Shared UI components (Navbar, Button, etc.)
  styles/global.css      — Tailwind import + all brand tokens (@theme)
public/                  — Static assets (logo, images)
_docs/                   — Reference documents (read before building)
_brief/                  — Raw source materials (do not reference in code)
```

---

## Tailwind Brand Tokens

All brand tokens are defined in `src/styles/global.css` using Tailwind v4 `@theme`. Use them as standard Tailwind classes:

```
bg-brand-green      text-brand-gold      bg-surface-cream
font-display        font-sans            text-text-secondary
```

---

## Site Structure

Single-page, scroll-nav. Seven sections in order:

```
#hero         — Hero section
#what-we-do   — What We Do
#platform     — Platform (MDOS)
#who-we-serve — Who We Serve
#projects     — Projects (accordion — Commercial, Residential, Multi-Unit)
#team         — Our Team
#cta          — CTA / Footer
```

The navbar links scroll to these anchors. There is no client-side routing.

---

## Key Design Rules (summary — full spec in `_docs/design-system.md`)

- **Two fonts only:** `font-display` (Bebas Neue) for all headings, `font-sans` (Inter) for all body text
- **Two brand colors:** `#044239` (brand-green) and `#EBBB10` (brand-gold). Gold is used on 2–3 words maximum per section — never whole sentences
- **No shadows, no gradients on UI elements.** The logo icon is the only gradient in the brand
- **No border-radius on buttons or cards** — sharp corners (`rounded-none`) throughout
- **Section backgrounds alternate** dark green / cream / dark / cream following the pattern in the design system
- All section headings: Bebas Neue, ALL CAPS, tight tracking
- **Build mobile-first.** Base styles are for mobile; tablet and desktop are progressive enhancements via `sm:`, `md:`, `lg:`. See `_docs/mobile-responsive.md` for all breakpoint decisions.

---

## Key Content Rules (summary — full spec in `_docs/content-brief.md`)

- Company name: "Moderne Development" or "MDI" — never "Moderne" alone on first reference
- Platform: always "MDOS" in all-caps
- **Do not fabricate stats or company details** — only use figures documented in `_docs/content-brief.md`
- If content is missing for a section, insert `<!-- TODO: client to provide -->` rather than inventing copy
- Stats strip numbers need client confirmation before hardcoding — use placeholder values until confirmed

### Hero Headline — Conflict to Resolve

`_docs/content-brief.md` designates **"Building a Better Tomorrow"** as the primary hero headline.

`_brief/mockups/MDI Website Mockup 2.png` shows **"BUILD. SMARTER. SCALE FASTER."** — which is the logo tagline. The content brief explicitly states this tagline is already on the logo and should **not** be repeated as a standalone headline.

**Use "Building a Better Tomorrow" as the hero headline until the client confirms otherwise.** If the client approves the tagline as the hero, update `_docs/content-brief.md` first.

---

## Projects Section

The `#projects` section has three categories: **Commercial**, **Residential**, and **Multi-Unit**. Each category is a clickable row that expands an accordion to reveal a text block — full-width, same width as the section. Do not render all project content at once — accordion interaction only.

- **Collapsed state structure:** See `_docs/mobile-responsive.md` Section 4
- **Expanded state copy:** See `_docs/projects-copy.md`
- **Responsive accordion behavior:** See `_docs/mobile-responsive.md` Section 4

---

## Assets Pending from Client

These are needed but not yet available — use placeholders as specified in `_docs/image-treatment.md`:

- Team headshots (all 8 members) — use initials placeholder
- Partner logos — use text pill placeholder
- Project photography — use `bg-surface-dark` block placeholder
- Stats strip final numbers (client to confirm) — use em dash placeholder

---

## Animations

**Do not implement animations in Phase 1.** Build all sections fully without animation. GSAP + ScrollTrigger + Lenis are the approved Phase 2 stack — do not add them until explicitly instructed.
