# The Last Bounce - Design System

## Visual Design Overview

### Complex Background System

The website features a sophisticated multi-layer background system with no images required.

#### 1. Hero Section Background
- **Base Layer**: Dark gradient (navy → indigo → slate)
- **Orb Layer 1**: Animated blue radial gradient (20% 50%)
- **Orb Layer 2**: Animated purple radial gradient (80% 80%)
- **Orb Layer 3**: Animated cyan radial gradient (40% 20%)
- **Grid Overlay**: Animated 4px grid pattern scrolling infinitely
- **Animation**: 20-second float cycle with position changes

#### 2. Body Background
- **Gradient Layer 1**: Blue radial gradient top-left corner
- **Gradient Layer 2**: Purple radial gradient bottom-right corner
- **Base Gradient**: White to light gray vertical gradient
- **Particle Layer**: 6 animated radial gradients creating floating particle effect
- **Animation**: 40-second particle float cycle

#### 3. Section Backgrounds

**Light Sections:**
- Subtle radial gradients (blue top-left, purple bottom-right)
- 5% opacity for minimal distraction
- Clean, professional appearance

**Dark Sections:**
- Multi-layer radial gradients (blue, purple, cyan)
- Animated grid pattern overlay
- 50px × 50px grid with 50% opacity
- Deep navy → indigo → navy gradient base

#### 4. CTA Section Background
- **Most Complex**: 5-layer system
- **Radial Layer 1**: Central blue gradient (50% center)
- **Radial Layer 2**: Purple gradient (bottom-left)
- **Radial Layer 3**: Cyan gradient (top-right)
- **Base Gradient**: Navy → blue → purple diagonal
- **Diagonal Pattern**: Animated 45° striped overlay
- **Animations**:
  - Gradient shift (15s cycle with scale + rotation)
  - Diagonal scroll (20s infinite)

### Color Palette

```css
Primary Blue:      #2563eb (rgb 37, 99, 235)
Primary Dark:      #1e40af (rgb 30, 64, 175)
Secondary Cyan:    #0ea5e9 (rgb 14, 165, 233)
Accent Purple:     #8b5cf6 (rgb 139, 92, 246)
Dark Navy:         #0f172a (rgb 15, 23, 42)
Darker Navy:       #020617 (rgb 2, 6, 23)
Indigo:            #1e1b4b (rgb 30, 27, 75)
Purple Dark:       #7c3aed (rgb 124, 58, 237)
```

### Animation System

#### Floating Orbs (Hero)
```
Duration: 20 seconds
Easing: ease-in-out
Loop: infinite
Effect: Background position shift
```

#### Grid Scroll (Hero)
```
Duration: 20 seconds
Easing: linear
Loop: infinite
Effect: Translate (50px, 50px)
```

#### Particle Float (Body)
```
Duration: 40 seconds
Easing: ease-in-out
Loop: infinite
Effect: 6-layer background position animation
```

#### Gradient Shift (CTA)
```
Duration: 15 seconds
Easing: ease
Loop: infinite
Effect: Scale (1 → 1.1) + Rotate (0 → 2deg) + Opacity (0.9 → 1)
```

#### Diagonal Scroll (CTA)
```
Duration: 20 seconds
Easing: linear
Loop: infinite
Effect: Translate (20px, 20px)
```

### Hover Effects

#### Problem Cards
- **Default**: Semi-transparent white background, subtle border
- **Hover**:
  - Lift: -4px translateY
  - Border: Blue glow
  - Shadow: 40px blue shadow
  - Inner Glow: Radial blue gradient fade-in

#### Platform Cards
- **Default**: Semi-transparent white background
- **Hover**:
  - Lift: -4px translateY
  - Border: Gradient border (blue → purple)
  - Shadow: 60px blue shadow with 30% opacity
  - Inner Fill: Gradient overlay fade-in

#### Tech Cards
- **Default**: White background, gray border
- **Hover**:
  - Lift: -4px translateY
  - Border: Blue
  - Shadow: Large elevation shadow

### Typography

**Font Family**: Inter (Google Fonts)
**Weights Used**: 400, 500, 600, 700, 800

**Hierarchy**:
- Hero Title: 4rem / 64px, weight 800
- Section Title: 3rem / 48px, weight 800
- Feature Title: 2rem / 32px, weight 800
- Card Title: 1.5rem / 24px, weight 700
- Body Large: 1.25rem / 20px, weight 400
- Body: 1.125rem / 18px, weight 400

### Gradient Text Effect

Used for hero subtitle "It bounces back":
```css
background: linear-gradient(135deg, #60a5fa 0%, #c084fc 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Performance Optimizations

1. **CSS-Only Effects**: No JavaScript animations for background
2. **Hardware Acceleration**: Uses transform and opacity for smooth 60fps
3. **Fixed Background**: Prevents layout recalculation on scroll
4. **Pointer Events None**: Background layers don't block interactions
5. **Will-Change**: Applied to animated elements for GPU optimization

### Responsive Breakpoints

```css
Desktop: 1280px+ (3-column grids)
Tablet:  768px - 1024px (2-column grids)
Mobile:  < 768px (1-column, simplified effects)
```

### Accessibility

- High contrast ratios (WCAG AA compliant)
- Focus states on all interactive elements
- Semantic HTML structure
- No animation dependency for content
- Reduced motion support (can be added)

### Browser Support

- Chrome/Edge: Full support with all animations
- Firefox: Full support with all animations
- Safari: Full support with all animations
- Mobile: Optimized for iOS Safari and Chrome Android

### Design Philosophy

**Principles**:
1. **Depth Through Layers**: Multiple overlapping gradients create visual depth
2. **Subtle Motion**: Slow animations (15-40s) for professional feel
3. **Color Harmony**: Blue/purple/cyan palette maintains brand cohesion
4. **Performance First**: CSS animations over JavaScript
5. **Progressive Enhancement**: Base design works without animations

### Implementation Notes

- All backgrounds are pure CSS (no images)
- Animations run on GPU via transform/opacity
- Fixed position elements prevent scroll jank
- Z-index carefully managed for proper layering
- All effects degrade gracefully on older browsers

---

**Design by**: The Last Bounce Team
**CSS Framework**: Vanilla CSS (no dependencies)
**Total CSS Size**: ~15KB (minified)
