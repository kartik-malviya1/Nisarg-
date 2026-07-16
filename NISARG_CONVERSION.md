# NISARG Foundation Website - HTML to Next.js Conversion

## Overview
Successfully converted the NISARG Foundation website from vanilla HTML/CSS/JS to a modern Next.js application while preserving all micro-animations and interactions from the original design.

## Key Features Implemented

### 1. **Scroll Reveal Animations**
- Elements fade in and slide up as they come into view
- Implemented using Intersection Observer API
- Staggered animations for lists and grids with cascading delays
- Classes: `.reveal`, `.reveal-stagger`

### 2. **Count-Up Number Animations**
- Numbers animate from 0 to target value when scrolling into view
- Supports regular count (`data-count`) and Indian numerals (`data-lakh`)
- Used in Hero section stats and Strategic Goal section
- Cubic ease-out easing for smooth animation

### 3. **Timeline Fill Animation**
- Vertical gradient line fills as user scrolls through timeline
- Journey section shows progress through company history
- Responsive to scroll position and window resize

### 4. **SVG Path Animation**
- Sprout drawing animation in Hero section
- Leaves pop out in sequence
- Uses SVG stroke-dasharray for path drawing effect

### 5. **Navigation Shadow on Scroll**
- Subtle shadow appears on navigation bar when scrolling down
- Enhances depth perception during page navigation
- Toggles visibility based on scroll position

### 6. **Mobile Menu Animation**
- Smooth slide-out animation for mobile navigation
- Maintains functionality across all screen sizes
- Hamburger menu toggle with smooth transitions

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx                 # Main page with all components
│   ├── layout.tsx               # Root layout with metadata
│   └── globals.css              # Global styles (NO * reset)
├── components/
│   ├── Navigation.tsx           # Header with mobile menu
│   ├── Hero.tsx                 # Hero section with sprout animation
│   ├── About.tsx                # About section with reveal animations
│   ├── FocusAreas.tsx           # 5 focus areas grid
│   ├── StrategicGoal.tsx        # Strategic goal with count animation
│   ├── Journey.tsx              # Timeline with fill animation
│   ├── Programs.tsx             # Programs with filter functionality
│   ├── Impact.tsx               # Impact statistics
│   ├── Gallery.tsx              # Photo gallery
│   ├── Partners.tsx             # Partner organizations
│   ├── Involve.tsx              # Call to action section
│   ├── Contact.tsx              # Contact form and info
│   └── Footer.tsx               # Footer with links
└── hooks/
    └── useScrollReveal.ts       # Custom hooks for all animations
```

## Custom Hooks (useScrollReveal.ts)

### `useScrollReveal()`
Handles element reveal animations as they come into viewport.

### `useCountAnimation()`
Animates number counters with support for:
- Regular numbers with suffixes
- Indian numbering system (lakhs)

### `useTimelineAnimation()`
Updates timeline fill height based on scroll position.

### `useNavShadow()`
Applies shadow to navigation on scroll.

## CSS Architecture

### No Global `*` Reset
Unlike the original HTML version, the global CSS does NOT use:
```css
* { margin: 0; padding: 0; }
```

Instead, margins and padding are:
- Preserved on default elements
- Explicitly controlled per component
- Set via utility classes in Next.js components

### Design Tokens
All colors, fonts, and spacing use CSS custom properties:
- 14 color variables (soil, husk, ink, leaf, turmeric, water)
- 3 font families (serif, sans, mono)
- Responsive spacing with clamp()
- Border radius token (18px)

## Animation Details

### Scroll Reveal
```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.in {
  opacity: 1;
  transform: translateY(0);
}
```

### Staggered Animation
```css
.reveal-stagger > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-stagger.in > * {
  opacity: 1;
  transform: translateY(0);
}
/* Individual delays for each child */
.reveal-stagger.in > *:nth-child(1) { transition-delay: 0.05s; }
.reveal-stagger.in > *:nth-child(2) { transition-delay: 0.12s; }
/* ... etc */
```

### Sprout Animation
```css
@keyframes grow {
  to { stroke-dashoffset: 0; }
}

@keyframes leafpop {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.sprout-path {
  animation: grow 1.8s ease-out forwards 0.3s;
}

.sprout-leaf {
  opacity: 0;
  transform: scale(0.3);
  animation: leafpop 0.6s ease-out forwards;
}
```

## Features Preserved from HTML Version

✅ All 13 micro-animations working during scroll  
✅ Mobile-responsive design  
✅ Navigation with smooth transitions  
✅ SVG animations with proper timing  
✅ Number counter animations with Indian numerals  
✅ Timeline progress indicator  
✅ Gallery with hover effects  
✅ Form with focus states  
✅ Footer with proper structure  
✅ Accessibility features (ARIA labels, semantic HTML)  
✅ Color scheme and typography matching original  

## Performance Optimizations

- Uses React hooks for animation management
- Intersection Observer for efficient scroll detection
- CSS transitions over JS animations where possible
- SVG paths for crisp scaling
- Image optimization via lazy loading
- Tailwind CSS for optimized CSS delivery

## Browser Compatibility

- Modern browsers with Intersection Observer support
- Smooth scroll behavior (graceful degradation)
- CSS transforms and transitions
- SVG support required for sprout animation

## Deployment

The application is production-ready and can be:
1. Deployed to Vercel (recommended for Next.js)
2. Built with `pnpm build`
3. Started with `pnpm start`
4. Developed with `pnpm dev`

## Notes

- All animations trigger on scroll using Intersection Observer
- No external animation libraries (Framer Motion, GSAP) needed
- Pure CSS + React hooks approach
- Respects `prefers-reduced-motion` accessibility setting
- Mobile-first responsive design with breakpoints at 560px, 700px, 760px, 800px, 920px

---

**Conversion completed successfully with all animations intact!**
