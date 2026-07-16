# NISARG Foundation - Animations Reference Guide

## Quick Overview

All animations are implemented using React hooks in `/hooks/useScrollReveal.ts` and CSS classes in `/app/globals.css`.

## Animation Categories

### 1. Scroll Reveal Animations

**Trigger:** Element enters viewport  
**Method:** Intersection Observer API  
**Duration:** 0.7s ease for single elements, 0.6s for staggered  

#### Usage:
Add the `reveal` class to any element that should fade in when scrolling:
```jsx
<div className="section-head reveal">
  <h2>Section Title</h2>
</div>
```

#### Implementation:
- Hook: `useScrollReveal()`
- Classes: `.reveal`, `.reveal.in`
- CSS file: `/app/globals.css` lines 145-189

#### Behavior:
- Elements start with `opacity: 0` and `translateY(28px)`
- When intersecting with viewport (15% threshold), class `.in` is added
- Transitions to `opacity: 1` and `translateY(0)`

---

### 2. Staggered List Animations

**Trigger:** Parent element enters viewport  
**Method:** Same Intersection Observer, different delays per child  
**Duration:** 0.6s ease per element with cascading delays  

#### Usage:
Wrap list items in container with `reveal-stagger` class:
```jsx
<div className="acronym reveal-stagger">
  <div className="letter-card">N</div>
  <div className="letter-card">I</div>
  <div className="letter-card">S</div>
  {/* ... */}
</div>
```

#### Implementation:
- Hook: `useScrollReveal()` (same hook detects both classes)
- Classes: `.reveal-stagger`, `.reveal-stagger.in`
- Delays: 50ms, 120ms, 190ms, 260ms, 330ms, 400ms for 6 children
- CSS file: `/app/globals.css` lines 156-189

#### Behavior:
- Each child animates individually with increasing delay
- First child starts at 0.05s, each subsequent +0.07s
- Creates waterfall effect

---

### 3. Number Count Animations

**Trigger:** Element with `data-count` or `data-lakh` enters viewport  
**Method:** RequestAnimationFrame loop with easing  
**Duration:** 1.4s (standard count), 1.6s (lakh)  

#### Usage:
```jsx
<span className="stat-num" data-count="800" data-suffix="+">0</span>
<span className="stat-num" data-lakh="10">0</span>
<span className="stat-num" data-lakh-big="10">0</span>
```

#### Implementation:
- Hook: `useCountAnimation()`
- Attributes: `data-count`, `data-suffix`, `data-lakh`, `data-lakh-big`
- Easing: Cubic ease-out: `1 - Math.pow(1 - progress, 3)`
- Intersection threshold: 0.4

#### Features:
- Regular count: `data-count="800"` → animates 0 to 800
- With suffix: `data-suffix="+"` → shows "800+"
- Indian numerals: `data-lakh="10"` → shows "10,00,000" (10 lakhs)
- Large lakh: `data-lakh-big="10"` → same as above, different threshold

#### Used in:
- Hero section stats
- Strategic Goal section

---

### 4. Timeline Fill Animation

**Trigger:** Scroll position during journey section  
**Method:** Window scroll + window resize events  
**Duration:** 1.4s cubic-bezier(0.22, 0.9, 0.34, 1)  

#### Usage:
```jsx
<div className="timeline" id="timeline">
  <div className="timeline-fill" id="timelineFill"></div>
  {/* Timeline items */}
</div>
```

#### Implementation:
- Hook: `useTimelineAnimation()`
- Calculation: Visible height ÷ Total height × 100%
- Viewport trigger: 75% from top
- CSS file: `/app/globals.css` lines 804-812

#### How it works:
1. Gets timeline element's bounding rectangle
2. Calculates visible portion from 75% down viewport to timeline bottom
3. Updates `timelineFill` height percentage
4. Smooth transition with cubic-bezier easing

---

### 5. SVG Path Animation (Sprout)

**Trigger:** Page load (no scroll needed)  
**Method:** CSS keyframe animations on SVG elements  
**Duration:** 1.8s for path + 0.6s for each leaf  

#### Usage:
```jsx
<svg width="140" height="150" viewBox="0 0 140 150">
  <path className="sprout-path" d="M70 150 L70 70" />
  <path className="sprout-leaf sl1" d="..." fill="#4F8C3E" />
  <path className="sprout-leaf sl2" d="..." fill="#3C7534" />
  <path className="sprout-leaf sl3" d="..." fill="#D89B2E" />
</svg>
```

#### Implementation:
- Classes: `.sprout-path`, `.sprout-leaf`, `.sl1`, `.sl2`, `.sl3`
- Keyframes: `grow`, `leafpop`
- CSS file: `/app/globals.css` lines 484-521

#### Animations:
- **Path (grow):** 1.8s starting at 0.3s → stroke-dashoffset 400 → 0
- **Leaf 1 (sl1):** 0.6s starting at 1.3s → scale 0.3 → 1, opacity 0 → 1
- **Leaf 2 (sl2):** 0.6s starting at 1.5s
- **Leaf 3 (sl3):** 0.6s starting at 1.7s

---

### 6. Navigation Shadow on Scroll

**Trigger:** Scroll position > 40px  
**Method:** Window scroll event listener  
**Duration:** Instant toggle  

#### Implementation:
- Hook: `useNavShadow()`
- Selector: `.nav`
- Shadow applied: `0 8px 24px -12px rgba(0,0,0,0.4)`
- CSS file: `/app/globals.css` lines 245-363

#### Behavior:
- When page not scrolled: no shadow
- When scrolled down 40px or more: box-shadow applied
- Creates depth perception while scrolling

---

### 7. Mobile Menu Animation

**Trigger:** Hamburger button click  
**Method:** CSS transform, JS state toggle  
**Duration:** 0.35s ease  

#### Usage:
```jsx
<ul className={`nav-links ${isOpen ? 'open' : ''}`}>
  {/* Navigation links */}
</ul>
<button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>
```

#### Implementation:
- Component: `Navigation.tsx`
- State: `isOpen` (boolean)
- CSS: `transform: translateX(100%)` / `translateX(0)`
- CSS file: `/app/globals.css` lines 330-363

#### Responsive:
- Hidden on desktop (display: none)
- Shows on screens < 920px width
- Full viewport height menu

---

### 8. Hover & Interaction Animations

All interactive elements have smooth transitions:

#### Buttons:
- `transform: translateY(-2px)` on hover
- Background color change: 0.25s
- Box shadow transition: 0.25s

#### Images (Gallery):
- Scale: 1 → 1.08 on hover
- Caption slide up: translateY(8px) → translateY(0)

#### Program Cards:
- Lift effect: translateY(-5px)
- Shadow increase on hover

#### CSS file: `/app/globals.css` lines 141-154, 192-234

---

## Adding New Animations

### To add scroll reveal to a new element:

1. Add `reveal` class:
```jsx
<section className="section reveal">
  {/* content */}
</section>
```

2. Hook is already active in component (called once in parent)

### To add count animation:

1. Add data attribute:
```jsx
<span data-count="1000">0</span>
```

2. Ensure `useCountAnimation()` hook is called in component

### To track scroll position:

1. Use `useTimelineAnimation()` for custom scroll tracking
2. Element must have `id="timeline"` and target must have `id="timelineFill"`

---

## CSS Variables (Animations Use These Colors)

```css
--soil-950: #1b140d         /* darkest brown */
--leaf-500: #4f8c3e         /* primary green */
--leaf-300: #9ac77c         /* light green */
--turmeric-300: #f0c878     /* gold accent */
--husk-50: #f6efe1          /* cream background */
--husk-100: #efe3c9         /* light tan */
```

---

## Accessibility

All animations respect `prefers-reduced-motion`:
```css
@media (prefers-color-scheme: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## Performance Notes

- Intersection Observer: Efficient scroll detection
- RequestAnimationFrame: Smooth 60fps animations
- CSS transforms: GPU-accelerated (opacity, transform only)
- No jank on mobile devices
- Event listeners cleaned up on component unmount

---

## Testing Animations

1. **Scroll reveal:** Scroll down page, elements fade in
2. **Count animation:** Scroll to hero stats or strategic goal
3. **Timeline:** Scroll through journey section, line fills
4. **Sprout:** Page loads, drawing animation plays immediately
5. **Nav shadow:** Scroll down, shadow appears on header
6. **Mobile menu:** Click hamburger, menu slides from right

---

**Last updated:** 2026  
**Framework:** Next.js 16+ React 19+  
**Browser Support:** All modern browsers with Intersection Observer
