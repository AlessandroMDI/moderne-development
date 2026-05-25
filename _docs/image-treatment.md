# MDI Image Treatment & Optimization
> Reference document for Claude Code. Apply these rules to every image in the site. Do not deviate without explicit instruction.

---

## Image Delivery: Netlify Image CDN

This project uses the `@astrojs/netlify` adapter, which wires Astro's `<Image>` component to Netlify's Image CDN automatically. Images are **not** resized at build time — they are transformed on first request at the CDN edge and cached globally.

Practical effects:
- Builds are faster (no local resizing pass)
- The `<Image>` API is unchanged — use `widths`, `sizes`, `quality`, `loading` exactly as documented below
- WebP/AVIF format negotiation is handled by Netlify based on the browser's `Accept` header
- The KB caps still apply — Netlify respects the `quality` prop you pass

No extra configuration is needed beyond the adapter in `astro.config.mjs`.

---

## Asset Locations

All images live in `src/assets/images/` and are imported into components — never referenced by URL string. This is required for Astro's `<Image>` component to process them.

```
src/assets/images/
  hero/
    hero.jpg                        ← full-bleed hero background

  team/
    full-team.jpg                   ← full team group photo (used in hero or about section if needed)
    edgar-munoz.jpg
    alessandro-lannes.jpg
    robert-mechielsen.jpg
    daniel-white.jpg
    zackary-howley.jpg
    paul-cejas.jpg
    james-guiang.jpg
    paul-groepler.jpg

  projects/
    commercial.jpg                  ← accordion row preview image
    residential.jpg
    multi-unit.jpg
```

**File format:** Drop originals in whatever format the client provides (JPG/PNG). Astro converts to WebP at build time. Do not manually convert before dropping in.

**Importing in components:**
```astro
import heroImg from '../assets/images/hero/hero.jpg';
import edgarImg from '../assets/images/team/edgar-munoz.jpg';
```

---

## Component Standard

Use Astro's built-in `<Image>` component from `astro:assets` for all images unless the source is a remote URL with no fixed dimensions. It auto-generates WebP/AVIF + srcset and enforces width/height (preventing layout shift).

```astro
import { Image } from 'astro:assets';
```

Do not use a plain `<img>` tag for local assets.

---

## Formats

| Priority | Format | Notes |
|----------|--------|-------|
| Primary  | WebP   | Default output from `<Image>` |
| Optional | AVIF   | Better compression; add `format="avif"` only if build times allow |
| Fallback | JPEG   | Astro handles this automatically via `<picture>` when needed |

---

## Quality Settings

Quality is a starting point — tune down if the output exceeds the KB cap for its context.

| Context | Quality | KB Cap |
|---------|---------|--------|
| Hero | 85% | < 200 KB |
| Project / card images | 80% | < 80 KB |
| Team headshots | 80% | < 60 KB |
| Partner logos (raster fallback) | 75% | < 30 KB |

Partner logos should be SVG wherever possible. Only use raster for logos the client supplies as JPEG/PNG.

---

## Aspect Ratios

| Context | Ratio | Notes |
|---------|-------|-------|
| Hero | Full viewport height (`h-screen`) | No fixed pixel crop — CSS controls framing |
| Project / card images | 4:3 | Consistent grid rhythm |
| Team headshots | 3:4 (portrait) | Tighter crop for faces |
| Partner logos | Variable | Constrain by height, not ratio |

---

## Responsive Breakpoints & srcset

Define widths to pass to `<Image widths={[…]}>`. Astro generates one `<source>` per width.

### Hero
```astro
<Image
  src={heroImg}
  widths={[375, 768, 1280, 1920]}
  sizes="100vw"
  alt="…"
  loading="eager"
  fetchpriority="high"
  quality={85}
/>
```

### Project / card images (2-column grid above 768 px)
```astro
<Image
  src={cardImg}
  widths={[375, 640, 960]}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="…"
  loading="lazy"
  quality={80}
/>
```

### Team headshots (3-column grid above 1024 px, 2-column 768–1023 px)
```astro
<Image
  src={headshot}
  widths={[320, 480, 640]}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="…"
  loading="lazy"
  quality={80}
/>
```

### Partner logos
```astro
<Image
  src={logo}
  widths={[120, 240]}
  sizes="120px"
  alt="…"
  loading="lazy"
  quality={75}
/>
```

---

## Loading Priority

| Context | `loading` | `fetchpriority` |
|---------|-----------|-----------------|
| Hero image | `eager` | `high` |
| Everything below the fold | `lazy` | (omit) |

Only the hero gets `fetchpriority="high"`. All other images omit it.

---

## Placeholder Treatment

These four asset types are pending client delivery. Use the treatments below until real assets arrive.

### Team headshots
Use a solid `bg-surface-dark` block at the correct 3:4 aspect ratio. Add initials in Bebas Neue centered in `text-brand-gold`. Do not use a generic avatar icon.

```astro
<!-- placeholder until headshot delivered -->
<div class="aspect-[3/4] bg-surface-dark flex items-center justify-center">
  <span class="font-display text-4xl text-brand-gold">JD</span>
</div>
```

### Partner logos
Use a `bg-surface-warm border border-text-divider` pill at a fixed height of 48 px. Insert the partner name as `text-text-secondary text-sm font-sans`. Do not use a broken-image icon.

```astro
<!-- placeholder until logo delivered -->
<div class="h-12 px-4 bg-surface-warm border border-text-divider flex items-center">
  <span class="font-sans text-sm text-text-secondary">Partner Name</span>
</div>
```

### Project photography
Use a `bg-surface-dark` block at the correct 4:3 ratio with a centered `text-text-secondary text-xs` label: `"Photography pending"`. Apply no decorative elements.

```astro
<!-- placeholder until photography delivered -->
<div class="aspect-[4/3] bg-surface-dark flex items-center justify-center">
  <span class="font-sans text-xs text-text-secondary">Photography pending</span>
</div>
```

### Stats strip numbers
Render the stat label normally but replace the number with `"—"` (em dash) in `text-brand-gold`. Insert an HTML comment: `<!-- TODO: client to confirm stat -->`.

```astro
<!-- TODO: client to confirm stat -->
<span class="font-display text-5xl text-brand-gold">—</span>
<span class="font-sans text-sm text-text-secondary">Projects completed</span>
```

---

## `alt` Text Rules

- Hero: describe the scene, not the brand ("Construction crew reviewing blueprints on an active job site")
- Project images: name the project and category ("Elm Street mixed-use development — structural frame phase")
- Team headshots: full name and title ("Jordan Davies, Project Manager")
- Partner logos: company name only ("Procore")
- Decorative images with no informational value: `alt=""`

---

## No Manual `<picture>` Tags

Do not write `<picture>` or `<source>` elements by hand. Astro's `<Image>` generates them. If a use case genuinely requires manual `<picture>` markup, note the reason in a comment.
