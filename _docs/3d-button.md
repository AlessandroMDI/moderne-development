# 3D Press Button

Pure CSS, no JavaScript. Works as a link or button. Built for the MDI site.

---

## How it works

Four layers stacked with absolute positioning:

| Layer | Role |
|-------|------|
| `.btn-3d-depth` | Back face — same size as front, shifted left+up |
| `.btn-3d-left` | Left wall — skewY parallelogram |
| `.btn-3d-bottom` | Bottom wall — skewX parallelogram |
| `.btn-3d-face` | Front face — sits on top, translates on `:active` |

On `:active`, the front face slides to overlap the back face and the side walls disappear — simulating a physical press.

---

## HTML

```html
<div class="btn-3d-wrapper">
  <div class="btn-3d-depth"></div>
  <div class="btn-3d-left"></div>
  <div class="btn-3d-bottom"></div>
  <a href="#" class="btn-3d-face">
    Button Label
  </a>
</div>
```

Swap `<a>` for `<button>` if you don't need a link.

---

## CSS

Replace the placeholder values with your project's palette:

- `FACE_COLOR` — front face (e.g. `#EBBB10`)
- `SIDE_COLOR` — left wall + hover state, slightly darker (e.g. `#C3922E`)
- `BOTTOM_COLOR` — bottom wall, darkest (e.g. `#7A5518`)
- `DEPTH` — size of the 3D effect in px (e.g. `6px`)

```css
.btn-3d-wrapper {
  position: relative;
  display: inline-block;
}

.btn-3d-depth {
  position: absolute;
  inset: 0;
  background-color: SIDE_COLOR;
  transform: translate(-DEPTH, DEPTH);
  transition: opacity 150ms;
}

.btn-3d-left {
  position: absolute;
  top: 0;
  left: -DEPTH;
  width: DEPTH;
  height: 100%;
  background-color: SIDE_COLOR;
  transform: skewY(-45deg);
  transform-origin: top right;
  transition: opacity 150ms;
}

.btn-3d-bottom {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: DEPTH;
  background-color: BOTTOM_COLOR;
  transform: skewX(-45deg);
  transform-origin: top left;
  transition: opacity 150ms;
}

.btn-3d-face {
  position: relative;
  z-index: 10;
  display: block;
  background-color: FACE_COLOR;
  transition: transform 150ms, background-color 150ms;
  /* Add your own padding, font, and text color */
}

.btn-3d-wrapper:hover .btn-3d-face {
  background-color: SIDE_COLOR;
}

.btn-3d-wrapper:active .btn-3d-face {
  transform: translate(-DEPTH, DEPTH);
}

.btn-3d-wrapper:active .btn-3d-depth,
.btn-3d-wrapper:active .btn-3d-left,
.btn-3d-wrapper:active .btn-3d-bottom {
  opacity: 0;
}
```

### MDI values (for reference)

```css
/* FACE_COLOR  */ #EBBB10
/* SIDE_COLOR  */ #C3922E
/* BOTTOM_COLOR*/ #7A5518
/* DEPTH       */ 6px
```

---

## Adapting the depth

To change the depth, update these four spots with the same value:

1. `.btn-3d-depth` → `transform: translate(-Xpx, Xpx)`
2. `.btn-3d-left` → `left: -Xpx` and `width: Xpx`
3. `.btn-3d-bottom` → `height: Xpx`
4. `.btn-3d-wrapper:active .btn-3d-face` → `transform: translate(-Xpx, Xpx)`

Suggested range: `4px` (subtle) → `8px` (chunky).

---

## Astro component

```astro
---
interface Props {
  href: string;
  variant?: 'primary' | 'secondary';
  fullWidthMobile?: boolean;
  class?: string;
}

const {
  href,
  variant = 'primary',
  fullWidthMobile = false,
  class: className = '',
} = Astro.props;
---

{variant === 'primary' ? (
  <div class:list={['btn-3d-wrapper', fullWidthMobile ? 'w-full sm:w-auto' : '', className]}>
    <div class="btn-3d-depth"></div>
    <div class="btn-3d-left"></div>
    <div class="btn-3d-bottom"></div>
    <a
      href={href}
      class:list={[
        'btn-3d-face',
        fullWidthMobile ? 'w-full sm:w-auto' : '',
      ]}
    >
      <slot />
    </a>
  </div>
) : (
  <a
    href={href}
    class:list={[className]}
  >
    <slot />
  </a>
)}
```
