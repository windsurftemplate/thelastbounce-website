# How to View The Last Bounce Website

## Quick View (Easiest)

Simply double-click the `index.html` file or run:

```bash
cd /Users/nelson/projects/thelastbounce-website
open index.html
```

## Local Server (Recommended)

For best results with all animations and effects, use a local server:

### Option 1: Python (Simplest)
```bash
cd /Users/nelson/projects/thelastbounce-website
python3 -m http.server 8000
```
Then open: http://localhost:8000

### Option 2: Node.js
```bash
cd /Users/nelson/projects/thelastbounce-website
npx serve
```
Then open the URL shown in terminal

### Option 3: PHP
```bash
cd /Users/nelson/projects/thelastbounce-website
php -S localhost:8000
```
Then open: http://localhost:8000

## What to Look For

### Complex Backgrounds ✨

1. **Hero Section**:
   - Watch the animated blue/purple orbs floating
   - Notice the subtle grid pattern scrolling
   - See the multi-layer gradient

2. **Body Background**:
   - Observe the floating particles (tiny dots moving slowly)
   - Notice the subtle blue/purple ambient glow

3. **Dark Sections**:
   - Check the radial gradient orbs
   - See the grid pattern overlay
   - Notice the depth from multiple layers

4. **CTA Section**:
   - Most dramatic! Gradient shifting and scaling
   - Diagonal striped pattern scrolling
   - Multiple animated layers

### Interactive Effects 🎯

**Hover over cards** to see:
- Platform cards: Gradient border glow + inner fill
- Problem cards: Blue glow + shadow
- Tech cards: Elevation + border highlight

**Scroll the page** to see:
- Cards fade in from below
- Navigation shadow appears
- Smooth scroll to sections

## Performance Check

Open DevTools (F12):
- **Performance Tab**: Should show 60fps during animations
- **Network Tab**: Only 3 files loaded (HTML, CSS, JS)
- **Coverage Tab**: All CSS is used

## Animation Details

Watch these carefully:
1. Hero background orbs move positions over 20 seconds
2. Grid pattern scrolls continuously
3. Body particles float slowly (40-second cycle)
4. CTA gradient pulses and rotates (15 seconds)
5. Diagonal stripes scroll (20 seconds)

## Mobile Testing

Open in mobile view (DevTools → Device toolbar):
- All effects remain but optimized
- Grid layouts become single column
- Navigation becomes mobile-friendly
- Animations continue smoothly

## Browser Testing

Test in different browsers:
- **Chrome/Edge**: Full effect support ✓
- **Firefox**: Full effect support ✓
- **Safari**: Full effect support ✓

## Files Overview

```
thelastbounce-website/
├── index.html      ← Open this!
├── styles.css      ← Complex backgrounds here
├── script.js       ← Smooth scrolling
├── README.md       ← Documentation
├── DESIGN.md       ← Design system details
└── VIEW.md         ← This file
```

## Share/Deploy

Ready to deploy? See [README.md](README.md) for deployment options:
- Netlify (drag & drop)
- Vercel (CLI)
- GitHub Pages
- Traditional hosting

---

**Enjoy the complex backgrounds!** 🎨

All effects are pure CSS - no images required!
