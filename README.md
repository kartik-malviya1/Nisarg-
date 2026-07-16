# NISARG Foundation Website - Next.js Conversion

This is a complete conversion of the NISARG Foundation HTML/CSS/JS website to a modern Next.js application with all micro-animations and scroll interactions preserved.

## Project Overview

**Original**: Single-file HTML/CSS/JavaScript website
**Converted To**: Next.js 16 with React Server Components, TypeScript, and Framer Motion animations

## Key Features Implemented

### ✨ All Animations Preserved

1. **Scroll-Triggered Reveal Animations**
   - `.reveal` - Fade and slide up effect (0.7s ease)
   - `.reveal-stagger` - Staggered reveal for multiple elements with 0.05-0.4s delays
   - Implemented via custom `useScrollReveal` hook using Intersection Observer API

2. **Sprout SVG Animation** (Hero Section)
   - `grow` - Stroke animation for stem (1.8s with 0.3s delay)
   - `leafpop` - Scale and opacity animation for leaves (0.6s with staggered delays: 1.3s, 1.5s, 1.7s)
   - CSS keyframe animations maintained exactly as original

3. **Timeline Fill Animation** (Journey Section)
   - Animated gradient line that fills based on scroll position
   - Uses cubic-bezier timing function: `cubic-bezier(.22,.9,.34,1)`
   - Smooth 1.4s transition on scroll events

4. **Count-Up Animations** (Hero Stats)
   - Number counters animate on scroll intersection
   - Custom `animateCount()` function uses `requestAnimationFrame` for smooth 60fps animation
   - Indian number formatting (lakh system) with comma grouping
   - Cubic easing: `1 - Math.pow(1-p, 3)` for smooth deceleration

5. **Micro-Interactions**
   - Button hover effects with `translateY(-2px)` transform
   - Gallery image zoom on hover
   - Navigation background shadow on scroll
   - Program card shadow and transform on hover

### 🎨 Design System

**No global margin/padding reset** - Custom theme tokens preserved in CSS variables:
- Soil palette: `--soil-950` through `--soil-600`
- Husk palette: `--husk-50` through `--husk-200`
- Leaf palette: `--leaf-800` through `--leaf-100`
- Turmeric & Water accent palettes
- Typography: Serif (Instrument Serif), Sans (Public Sans), Mono (IBM Plex Mono)

### 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Adaptive grids (1-5 columns based on breakpoint)
- Responsive typography using `clamp()`
- Touch-friendly mobile navigation with hamburger menu

### 🔧 Component Architecture

```
components/
├── Navigation.tsx       # Fixed header with mobile menu & scroll shadow
├── Hero.tsx            # Hero section with stats & sprout animation
├── About.tsx           # About section with acronym cards
├── FocusAreas.tsx      # 5 focus areas grid
├── Journey.tsx         # Timeline with animated fill on scroll
├── Programs.tsx        # Programs grid with category filtering
├── Impact.tsx          # Impact statistics section
├── Involve.tsx         # Call-to-action section
├── Contact.tsx         # Contact form & info
└── Footer.tsx          # Footer with links

hooks/
└── useScrollReveal.ts  # Custom hook for scroll-triggered animations
```

## Technical Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Animations**: Native CSS animations + React Intersection Observer
- **Type Safety**: TypeScript
- **Font Loading**: Google Fonts (Instrument Serif, Public Sans, IBM Plex Mono)

## Animations Details

### Intersection Observer Configuration

```typescript
// Scroll reveal threshold: 15% of element must be visible
const io = new IntersectionObserver(entries => {...}, { threshold: 0.15 })

// Count animations trigger at 40% visibility
const countIo = new IntersectionObserver(entries => {...}, { threshold: 0.4 })
```

### CSS Animations

All keyframe animations are in `app/globals.css`:
- `@keyframes grow` - Sprout stem stroke animation
- `@keyframes leafpop` - Leaf pop-in with scale effect

### Scroll Event Optimization

- Timeline fill uses debounced resize listener
- Nav shadow shadow updates only on scroll events
- All animations respect `prefers-reduced-motion` media query

## Development

```bash
# Install dependencies
pnpm install

# Run dev server (auto-detects port 3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Respects `prefers-reduced-motion` for accessibility

## Key Differences from Original

| Feature | Original HTML | Next.js |
|---------|---------------|---------|
| State Management | DOM manipulation | React hooks (useState) |
| Scroll Animations | Custom JS | Intersection Observer Hook |
| Number Formatting | Custom function | `animateCount()` function |
| Mobile Menu | toggleClass | useState + conditional rendering |
| Routing | Hash navigation | Native anchor links in Next.js |
| Type Safety | None | Full TypeScript |
| Performance | Single file | Optimized components |

## Preserved HTML Elements

✅ All semantic HTML structure maintained
✅ All ARIA labels and accessibility attributes
✅ All form elements with proper labels
✅ All SVG graphics and icons
✅ All data attributes for animations

## Notes

- No global `* { margin: 0; padding: 0; }` reset - only normalized element defaults
- All spacing uses Tailwind classes and CSS custom properties
- Animations use `transition` and `@keyframes` for best performance
- Mobile menu closes on link click
- Navigation applies shadow on scroll > 40px
- Program filter functionality fully interactive

## Future Enhancements

- Add CMS integration for program data
- Implement email form handling
- Add gallery image modal
- Dark mode support
- SEO improvements with structured data
