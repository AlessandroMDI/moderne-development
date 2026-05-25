# Animation Guide — MDI Website

**Reference site audited:** https://landonorris.com/  
**Stack approved for MDI Phase 2:** GSAP + ScrollTrigger + Lenis (already in place in Astro)

---

## What the Reference Site Does

landonorris.com is built by the studio OFF+BRAND. It uses a deep animation stack (GSAP, Lenis, Rive, Three.js/WebGL, Taxi.js for page transitions). Most of what makes it feel premium does **not** require Three.js or Rive — it comes from disciplined use of GSAP ScrollTrigger with tight timing and easing choices.

The MDI-relevant techniques are all achievable with GSAP + ScrollTrigger + Lenis alone.

---

## Lenis + ScrollTrigger Setup

Every scroll animation depends on this being wired correctly first.

```js
// src/scripts/scroll.js  (imported once in Layout.astro)
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

export default lenis;
```

---

## Animation Inventory (from landonorris.com)

### 1. Line Reveal with Color Highlight Wipe
**The signature effect on the site.** Every section heading uses it.

How it works:
- Text is split into lines (GSAP SplitText plugin or manual `<span>` wrapping)
- Each line starts hidden via `clip-path: inset(0 100% 0 0)` (masked from the right)
- A colored overlay `<div>` sits on top of the line
- GSAP timeline: clip-path animates to `inset(0 0% 0 0)` (reveal), while the overlay simultaneously shrinks `scaleX: 0` from the opposite end
- Lines stagger at `0.15s` offsets
- ScrollTrigger fires once at `start: "top 90%"`

On landonorris.com the highlight color is lime `#d2ff00`. For MDI it becomes brand-gold `#EBBB10`.

### 2. Scroll-Velocity Marquee
A horizontally looping text/logo strip that speeds up and slows down in response to how fast the user is scrolling. The velocity is read from Lenis on each scroll event and fed into `tween.timeScale()`. Direction inverts on scroll-up.

Used on landonorris.com for a stats row and a footer logo strip. For MDI: stats strip or partner logos.

### 3. Section Entrance Reveals
All non-heading content (cards, body text, stat numbers, images) enters with a simple `y: 40, autoAlpha: 0` → resting position, triggered once at `top 80%`. Stagger of `0.02–0.05s` per item.

### 4. Sticky Hero with Parallax
The hero section is pinned for ~150vh of scroll. The background image moves at a slower rate (`yPercent: 30`) than the text (`yPercent: -20`), creating depth. This is a `scrub: true` ScrollTrigger on the hero.

### 5. Nav Theme Switching
Each section carries a `data-nav-theme` attribute (`"dark"` or `"light"`). As sections scroll into view, the navbar switches its text/icon color. On MDI the dark green sections use a light nav; the cream sections use a dark nav.

### 6. Stat Counter
Numbers count up from 0 to their target value when they scroll into view. Uses `gsap.to({val: 0}, {val: target, duration: 2, snap: {val: 1}, ease: "power2.out", onUpdate: ...})`.

### 7. Hover Image Follower
A floating image preview that follows the cursor as you hover over a list of items (team members, projects). On mouseleave the image dismisses at `timeScale(2)` — twice as fast — so it snaps away cleanly.

### 8. Accordion Expand with GSAP
Expanding an accordion item animates from `height: 0, autoAlpha: 0` with `overflow: clip` on the container. Cleaner and more controllable than CSS `max-height` transitions.

### 9. Clip-path Ellipse Reveal (Eyebrows / Subheadings)
Softer than the line reveal. Animates from `ellipse(100% 0% at 50% 0%)` to `ellipse(100% 100% at 50% 0%)`. Used for section labels and secondary text.

### 10. Staggered Grid Entrance
Card grids (`#who-we-serve`, `#team`) enter with directional stagger: `{amount: 0.4, from: "start"}` from `y: 40, autoAlpha: 0`.

---

## Implementation Plan for MDI

Listed in priority order (Tier 1 first).

### TIER 1 — Core Premium Feel

#### A. Line Reveal — Section Headings

Apply to every `h1`, `h2`, and any stat/number that is a focal point of a section.

```js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText'; // requires GSAP Club or SplitText free

gsap.registerPlugin(ScrollTrigger, SplitText);

document.querySelectorAll('[data-anim-heading]').forEach(el => {
  const split = new SplitText(el, { type: 'lines', linesClass: 'line' });

  split.lines.forEach((line, i) => {
    // wrap in clip container
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow: clip; position: relative;';
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);

    // gold highlight overlay
    const overlay = document.createElement('span');
    overlay.style.cssText = `
      position: absolute; inset: 0;
      background: #EBBB10;
      transform-origin: right center;
    `;
    wrapper.appendChild(overlay);

    gsap.set(line, { clipPath: 'inset(0 100% 0 0)' });

    const tl = gsap.timeline({ paused: true });
    tl.to(line, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.out' }, i * 0.15)
      .to(overlay, { scaleX: 0, duration: 0.6, ease: 'power2.inOut' }, i * 0.15 + 0.3);

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top 90%',
      once: true,
      onEnter: () => tl.play()
    });
  });
});
```

Mark headings in Astro with `data-anim-heading`:
```astro
<h2 data-anim-heading class="font-display text-5xl uppercase tracking-tight">
  Building a Better Tomorrow
</h2>
```

**Note on SplitText:** GSAP's SplitText plugin requires GSAP Club (paid) for commercial use, or the free community version. An alternative is to manually wrap each line in `<span class="line">` tags in the Astro markup — less flexible but zero dependency cost.

#### B. Section Entrance Reveals

Apply to all body text blocks, cards, and images as they scroll into view.

```js
document.querySelectorAll('[data-anim-enter]').forEach(el => {
  gsap.from(el, {
    y: 40,
    autoAlpha: 0,
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.05,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true
    }
  });
});
```

For groups (cards, list items), put `data-anim-enter` on the parent and target children:

```js
document.querySelectorAll('[data-anim-stagger]').forEach(parent => {
  gsap.from(parent.children, {
    y: 40,
    autoAlpha: 0,
    duration: 0.5,
    ease: 'power2.out',
    stagger: { amount: 0.4, from: 'start' },
    scrollTrigger: {
      trigger: parent,
      start: 'top 85%',
      once: true
    }
  });
});
```

#### C. Sticky Hero with Parallax

In `src/sections/Hero.astro`, give the hero a fixed height and mark elements:

```astro
<section id="hero" class="relative h-screen overflow-hidden">
  <div data-hero-bg class="absolute inset-0">
    <img src="/hero-bg.jpg" class="w-full h-full object-cover" />
  </div>
  <div data-hero-text class="relative z-10 ...">
    <!-- headline, subhead, CTA -->
  </div>
</section>
```

```js
const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 0.5,
    invalidateOnRefresh: true
  }
});
heroTl
  .to('[data-hero-bg]', { yPercent: 30, ease: 'none' }, 0)
  .to('[data-hero-text]', { yPercent: -15, autoAlpha: 0.3, ease: 'none' }, 0);
```

### TIER 2 — Add Once Core Animations Work

#### D. Scroll-Velocity Marquee (Stats Strip / Partner Logos)

```js
function initMarquee(el) {
  const track = el.querySelector('[data-marquee-track]');
  const duration = parseFloat(el.dataset.marqueeSpeed) || 30;
  const dir = el.dataset.marqueeDirection === 'right' ? 100 : -100;

  // clone track for seamless loop
  const clone = track.cloneNode(true);
  el.appendChild(clone);

  const tween = gsap.to([track, clone], {
    xPercent: dir,
    repeat: -1,
    ease: 'none',
    duration
  });

  // velocity response via Lenis
  import('./scroll.js').then(({ default: lenis }) => {
    lenis.on('scroll', ({ velocity }) => {
      const speed = 1 + Math.min(Math.abs(velocity) * 0.003, 3);
      tween.timeScale(velocity < 0 ? -speed : speed);
    });
  });
}

document.querySelectorAll('[data-marquee]').forEach(initMarquee);
```

Usage in Astro:
```astro
<div data-marquee data-marquee-speed="30" data-marquee-direction="left">
  <div data-marquee-track class="flex gap-16 whitespace-nowrap">
    <!-- stat items or logos -->
  </div>
</div>
```

#### E. Nav Theme Switching

Each section declares its nav theme. The navbar reads this as sections enter.

In section files:
```astro
<!-- Dark green sections -->
<section id="hero" data-nav-theme="light" ...>

<!-- Cream sections -->
<section id="what-we-do" data-nav-theme="dark" ...>
```

In `Navbar.astro` or the animation init script:
```js
const nav = document.querySelector('[data-navbar]');

document.querySelectorAll('[data-nav-theme]').forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 64px',
    end: 'bottom 64px',
    onEnter: () => setNavTheme(section.dataset.navTheme),
    onEnterBack: () => setNavTheme(section.dataset.navTheme)
  });
});

function setNavTheme(theme) {
  nav.dataset.theme = theme;
  // CSS handles the color change: [data-navbar][data-theme="light"] { color: white; }
}
```

#### F. Stat Counter

```js
document.querySelectorAll('[data-stat-count]').forEach(el => {
  const target = parseFloat(el.dataset.statCount);
  const obj = { val: 0 };

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        snap: { val: 1 },
        onUpdate: () => { el.textContent = obj.val.toLocaleString(); }
      });
    }
  });
});
```

Usage:
```astro
<span data-stat-count="47">0</span>
```

#### G. GSAP-Powered Accordion (Projects Section)

Replace any CSS transition on the projects accordion with GSAP for tighter control.

```js
document.querySelectorAll('[data-accordion-item]').forEach(item => {
  const trigger = item.querySelector('[data-accordion-trigger]');
  const content = item.querySelector('[data-accordion-content]');
  let isOpen = false;

  gsap.set(content, { height: 0, autoAlpha: 0, overflow: 'clip' });

  trigger.addEventListener('click', () => {
    if (isOpen) {
      gsap.to(content, { height: 0, autoAlpha: 0, duration: 0.4, ease: 'power2.inOut' });
    } else {
      gsap.to(content, { height: 'auto', autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
      ScrollTrigger.refresh(); // page height changed
    }
    isOpen = !isOpen;
    trigger.setAttribute('aria-expanded', isOpen);
  });
});
```

#### H. Hover Image Follower (Team / Projects Section)

```js
function initHoverFollower(listEl, imageEl) {
  const items = listEl.querySelectorAll('[data-hover-item]');
  let currentTween;

  listEl.addEventListener('mousemove', e => {
    const rect = listEl.getBoundingClientRect();
    gsap.to(imageEl, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const src = item.dataset.hoverSrc;
      if (src) imageEl.querySelector('img').src = src;
      gsap.killTweensOf(imageEl);
      currentTween = gsap.to(imageEl, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
    });

    item.addEventListener('mouseleave', () => {
      if (currentTween) currentTween.timeScale(2).reverse();
    });
  });
}
```

### TIER 3 — Polish (Phase 2 Extras)

- **Clip-path ellipse reveals** for eyebrow labels / section subheadings
- **Staggered grid from center** for the `#who-we-serve` grid using `{amount: 0.4, from: "center"}`
- **Horizontal scroll panel** for a projects showcase (if client approves)
- **Background color crossfade** between sections using a GLSL shader or a simple `gsap.to(body, {backgroundColor: ...})`

---

## Easing Reference

Use these values from the landonorris.com codebase — they are the foundation of the premium feel.

| Use case | Ease |
|----------|------|
| Standard content reveal | `power2.out` |
| Highlight overlay / scrub | `power2.inOut` |
| Scroll-linked / parallax | `none` (linear) |
| Dramatic panel transitions | `expo.inOut` |
| Cards entering grid | `power3.out` |
| Micro-interactions (hover) | `power1.inOut` |
| **Avoid for MDI** | `elastic`, `bounce`, `back` — too playful |

---

## Duration Reference

| Element type | Duration |
|---|---|
| Primary heading reveal (per line) | `0.6s` |
| Content block entrance | `0.5s` |
| Hover state change | `0.3s` |
| Hover image dismiss (timeScale × 2) | effectively `0.15s` |
| Stat counter count-up | `2.0s` |
| Accordion open | `0.5s` |
| Accordion close | `0.4s` |
| Page-level transitions | `1.5–2.0s` |

Sub-`0.4s` durations should be reserved for micro-interactions only. Short durations on primary reveals feel cheap.

---

## GSAP Best Practices (MDI-Specific)

1. **Use `autoAlpha` not `opacity`** — controls `visibility` too, preventing invisible elements blocking clicks.

2. **`once: true` on entrance triggers** — elements reveal on scroll-in and stay revealed. Reversing on scroll-back is jarring on content sites.

3. **`invalidateOnRefresh: true`** on any ScrollTrigger that uses viewport-relative values (`vh`, `%`). The accordion expand changes page height — call `ScrollTrigger.refresh()` after it opens.

4. **`scrub: 0.5` for parallax** not `scrub: true`. The 0.5s lag adds physical inertia that matches Lenis's eased scroll feel.

5. **`gsap.matchMedia()`** — disable or simplify scroll-scrub animations on mobile. Parallax and pinned sections often feel sluggish on mobile.

6. **Register plugins once**, in the scroll init file, not per-component.

7. **Stagger tightness signals quality:**
   - Text lines: `0.015–0.03s` (tight = premium)
   - Cards / list items: `0.05–0.08s` (room to breathe, items are distinguishable)

8. **Gold highlight accent (`#EBBB10`)** matches the design system rule: gold on 2–3 words maximum per section. The line-reveal highlight is a 1-frame flash, not a persistent color, so it does not violate the "gold sparingly" rule.

---

## File Structure (Proposed)

```
src/
  scripts/
    scroll.js          — Lenis + ScrollTrigger init (imported once in Layout.astro)
    animations/
      headings.js      — Line reveal for [data-anim-heading]
      entrances.js     — Section entrance for [data-anim-enter], [data-anim-stagger]
      hero.js          — Sticky hero parallax
      marquee.js       — Velocity-linked marquee
      nav-theme.js     — Nav theme switching per section
      stats.js         — Stat counter
      accordion.js     — GSAP accordion (replaces CSS transition)
      team-hover.js    — Hover image follower
```

Each file exports an `init()` function called from a central `src/scripts/index.js` after DOM ready.

---

## What We Are Not Implementing

These techniques from landonorris.com are out of scope for MDI:

| Technique | Reason |
|---|---|
| Three.js / WebGL (3D head, background scene) | Requires specialist 3D artist + performance budget not appropriate for a construction-tech B2B site |
| Rive animations | Requires custom Rive illustrations — no assets available |
| Page transitions (Taxi.js / Rive wipe) | MDI is a single-page site with no page routing |
| Horizontal scroll panels | No approved content layout requires it — add only if client requests |
| Custom WebGL cursor effect | Overly stylized for MDI brand |

The premium feel of landonorris.com is primarily carried by the line reveals, scroll velocity marquee, and tight scroll-triggered entrances — all of which are in scope.
