# Task #46: CSS Classes Quick Reference

A quick reference guide for the TailwindCSS classes used in the Admin Dashboard refinement.

---

## Gradient Classes

### Background Gradients
```css
/* Subtle card backgrounds */
from-blue-500/10 to-cyan-500/10
from-green-500/10 to-emerald-500/10
from-yellow-500/10 to-orange-500/10
from-gray-500/10 to-slate-500/10

/* Icon badges */
from-blue-500 to-cyan-500
from-green-500 to-emerald-500
from-yellow-500 to-orange-500
from-gray-500 to-slate-500

/* Button gradients */
from-blue-600 to-cyan-600
hover:from-blue-700 hover:to-cyan-700

/* Text gradients */
from-gray-900 via-gray-800 to-gray-900
dark:from-white dark:via-gray-200 dark:to-white

/* Glass morphism overlays */
from-white/50 to-transparent
dark:from-white/5 to-transparent
```

### Gradient Directions
```css
bg-gradient-to-r    /* Left to right */
bg-gradient-to-br   /* Top-left to bottom-right */
bg-gradient-to-b    /* Top to bottom */
```

---

## Border Radius

```css
rounded-lg      /* 0.5rem - 8px - Badges */
rounded-xl      /* 0.75rem - 12px - Buttons, inputs */
rounded-2xl     /* 1rem - 16px - Cards, panels */
rounded-full    /* 9999px - Pills, circles */
```

---

## Shadows

### Base Shadows
```css
shadow-sm       /* Small subtle shadow */
shadow-md       /* Medium shadow */
shadow-lg       /* Large shadow */
shadow-xl       /* Extra large shadow */
```

### Colored Shadows
```css
/* Blue shadows (actions, buttons) */
hover:shadow-blue-500/20
hover:shadow-blue-500/50

/* Dynamic shadows based on card gradient */
hover:shadow-lg hover:shadow-${color}-500/20
```

---

## Spacing

### Padding
```css
p-2         /* 0.5rem - 8px - Icons */
p-2.5       /* 0.625rem - 10px - Action buttons */
p-4         /* 1rem - 16px - Table cells (old) */
p-5         /* 1.25rem - 20px - Table cells (new) */
p-6         /* 1.5rem - 24px - Cards */
px-2 py-1   /* Horizontal 8px, Vertical 4px - Small badges */
px-3 py-1.5 /* Horizontal 12px, Vertical 6px - Badges */
px-4 py-2   /* Horizontal 16px, Vertical 8px - Buttons */
px-4 py-3   /* Horizontal 16px, Vertical 12px - Inputs */
px-6 py-3   /* Horizontal 24px, Vertical 12px - Primary button */
```

### Gaps
```css
gap-1       /* 0.25rem - 4px */
gap-1.5     /* 0.375rem - 6px */
gap-2       /* 0.5rem - 8px - Inline elements */
gap-4       /* 1rem - 16px - Flex rows */
gap-6       /* 1.5rem - 24px - Grid */
```

### Margins
```css
mb-1        /* 0.25rem - 4px */
mb-2        /* 0.5rem - 8px */
mb-4        /* 1rem - 16px - Elements */
mb-6        /* 1.5rem - 24px - Components */
mb-8        /* 2rem - 32px - Sections */
mb-10       /* 2.5rem - 40px - Major sections */
mt-1        /* Margin top 4px */
mt-4        /* Margin top 16px */
```

---

## Typography

### Font Sizes
```css
text-xs     /* 0.75rem - 12px - Meta, labels */
text-sm     /* 0.875rem - 14px - Content, badges */
text-base   /* 1rem - 16px - Descriptions */
text-lg     /* 1.125rem - 18px */
text-xl     /* 1.25rem - 20px - Card titles */
text-2xl    /* 1.5rem - 24px - Icons */
text-3xl    /* 1.875rem - 30px */
text-4xl    /* 2.25rem - 36px - Stats, titles */
text-5xl    /* 3rem - 48px - Page title */
```

### Font Weights
```css
font-medium     /* 500 - Labels */
font-semibold   /* 600 - Secondary emphasis */
font-bold       /* 700 - Primary emphasis */
```

### Font Variants
```css
font-mono       /* Monospace - Slugs, code */
tabular-nums    /* Tabular numerals - Numbers */
```

### Text Transforms
```css
uppercase           /* UPPERCASE */
tracking-wider      /* Letter spacing - Headers */
tracking-wide       /* Letter spacing - Labels */
```

### Text Colors
```css
/* Contextual text */
text-foreground         /* Primary text */
text-muted-foreground   /* Secondary text */

/* Status colors */
text-green-600 dark:text-green-400
text-yellow-600 dark:text-yellow-400
text-red-600 dark:text-red-400
text-blue-600 dark:text-blue-400
text-purple-600 dark:text-purple-400

/* Hover states */
group-hover:text-blue-600
dark:group-hover:text-blue-400
```

### Special Text Effects
```css
/* Gradient text */
bg-gradient-to-r from-gray-900 to-gray-800
bg-clip-text text-transparent
```

---

## Borders

### Border Width
```css
border          /* 1px all sides */
border-t        /* 1px top */
border-b        /* 1px bottom */
```

### Border Colors
```css
/* Light/Dark mode */
border-gray-200 dark:border-gray-800

/* Contextual borders */
border-blue-200 dark:border-blue-800
border-purple-200 dark:border-purple-800
border-green-200 dark:border-green-800
border-red-200 dark:border-red-800

/* Transparent borders */
border-current/20   /* 20% opacity of current color */
```

---

## Background Colors

### Solid Backgrounds
```css
/* Light/Dark mode */
bg-white dark:bg-gray-950
bg-gray-50 dark:bg-gray-900
bg-gray-100 dark:bg-gray-800

/* Contextual backgrounds */
bg-blue-50 dark:bg-blue-900/20
bg-blue-100 dark:bg-blue-900/30
bg-green-50 dark:bg-green-900/20
bg-purple-50 dark:bg-purple-900/20
bg-yellow-100 dark:bg-yellow-900/30
bg-red-50 dark:bg-red-900/20

/* Hover states */
hover:bg-blue-100 dark:hover:bg-blue-900/40
hover:bg-muted
```

---

## Layout

### Flexbox
```css
/* Container */
flex
inline-flex
flex-col                /* Stack vertically */
flex-row                /* Stack horizontally */

/* Alignment */
items-center            /* Vertical center */
items-start             /* Vertical top */
items-baseline          /* Align to text baseline */
justify-between         /* Space between */
justify-end             /* Align to end */

/* Responsive */
flex-col sm:flex-row    /* Column on mobile, row on desktop */
```

### Grid
```css
grid
grid-cols-1             /* 1 column */
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

/* Gaps */
gap-4
gap-6
```

### Sizing
```css
w-full          /* Width 100% */
w-1             /* Width 0.25rem (4px) */
w-2             /* Width 0.5rem (8px) */
w-5             /* Width 1.25rem (20px) */
w-14            /* Width 3.5rem (56px) */
w-16            /* Width 4rem (64px) */

h-1.5           /* Height 0.375rem (6px) */
h-3.5           /* Height 0.875rem (14px) */
h-4             /* Height 1rem (16px) */
h-5             /* Height 1.25rem (20px) */
h-14            /* Height 3.5rem (56px) */
h-16            /* Height 4rem (64px) */

min-h-screen    /* Minimum height 100vh */
```

### Positioning
```css
relative        /* Relative positioning */
absolute        /* Absolute positioning */
inset-0         /* top:0, right:0, bottom:0, left:0 */
inset-y-0       /* top:0, bottom:0 */
left-0          /* left:0 */
```

---

## Transforms

### Scale
```css
scale-105           /* 105% */
scale-110           /* 110% */
group-hover:scale-105
group-hover:scale-110
hover:scale-105
hover:scale-110
```

### Translate
```css
-translate-y-1      /* Move up 0.25rem (4px) */
hover:-translate-y-1

translate-y-0       /* Reset position */
```

### Rotate
```css
rotate-6                    /* Rotate 6 degrees */
group-hover:rotate-6
group-hover:rotate-90       /* Rotate 90 degrees */
```

---

## Transitions

### Duration
```css
transition-all              /* All properties */
transition-colors           /* Color properties only */
transition-opacity          /* Opacity only */
transition-transform        /* Transform only */

duration-150                /* 150ms */
duration-200                /* 200ms */
duration-300                /* 300ms */
duration-500                /* 500ms */
```

### Easing
```css
ease-out        /* Ease out timing */
ease-in-out     /* Ease in-out timing */
```

---

## Opacity

```css
opacity-0               /* Fully transparent */
opacity-50              /* 50% opacity */
opacity-100             /* Fully opaque */

/* Group hover states */
group-hover:opacity-100
```

---

## Effects

### Filter
```css
filter              /* Enable filters */
drop-shadow-sm      /* Drop shadow */
backdrop-blur-sm    /* Backdrop blur */
```

### Blur
```css
blur-sm             /* Small blur */
backdrop-blur       /* Backdrop blur */
backdrop-blur-sm    /* Small backdrop blur */
```

---

## Pseudo-classes

### Hover
```css
hover:bg-blue-100
hover:shadow-lg
hover:scale-105
hover:-translate-y-1

group-hover:opacity-100
group-hover:scale-110
group-hover:rotate-6
```

### Focus
```css
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:ring-purple-500
focus:border-transparent
```

### Disabled
```css
disabled:opacity-50
disabled:cursor-not-allowed
```

---

## Responsive Breakpoints

```css
/* Mobile first (default) */
text-4xl

/* Small (640px+) */
sm:text-5xl
sm:flex-row

/* Medium (768px+) */
md:grid-cols-2

/* Large (1024px+) */
lg:grid-cols-4
lg:px-8
```

---

## Dark Mode

```css
/* Background */
bg-white dark:bg-gray-950
bg-gray-50 dark:bg-gray-900

/* Text */
text-gray-900 dark:text-white
text-gray-700 dark:text-gray-300

/* Borders */
border-gray-200 dark:border-gray-800

/* Gradients */
from-gray-50 dark:from-gray-950
from-white/50 dark:from-white/5
```

---

## Animations

### Built-in
```css
animate-pulse       /* Pulse animation */
animate-spin        /* Spin animation */
```

### Custom (defined in page.tsx)
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Usage */
animation: fadeInUp 0.5s ease-out forwards
animationDelay: ${index * 50}ms
opacity: 0  /* Initial state */
```

---

## Common Patterns

### Card Container
```css
className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10
  border border-gray-200 dark:border-gray-800 rounded-xl
  hover:shadow-lg transition-all duration-300"
```

### Primary Button
```css
className="inline-flex items-center gap-2 px-6 py-3
  bg-gradient-to-r from-blue-600 to-cyan-600
  hover:from-blue-700 hover:to-cyan-700
  text-white font-semibold rounded-xl shadow-lg
  hover:shadow-xl hover:-translate-y-1
  transition-all duration-300"
```

### Badge
```css
className="inline-flex items-center gap-1.5 px-3 py-1.5
  rounded-full border border-current/20 backdrop-blur-sm
  transition-all duration-300 hover:scale-105"
```

### Action Button
```css
className="p-2.5 bg-blue-50 hover:bg-blue-100
  dark:bg-blue-900/20 dark:hover:bg-blue-900/40
  text-blue-600 dark:text-blue-400 rounded-lg
  transition-all duration-200 hover:scale-110
  border border-blue-200 dark:border-blue-800"
```

### Glass Morphism Overlay
```css
className="absolute inset-0 bg-gradient-to-br
  from-white/50 to-transparent dark:from-white/5
  opacity-0 group-hover:opacity-100
  transition-opacity duration-300 pointer-events-none"
```

### Table Header
```css
className="text-left p-5 text-xs font-bold
  uppercase tracking-wider text-muted-foreground"
```

### Table Row
```css
className="group hover:bg-gradient-to-r
  hover:from-gray-50/50 hover:to-transparent
  dark:hover:from-gray-800/30 dark:hover:to-transparent
  transition-all duration-200"
```

---

## Color Reference

### Primary Palette
```
Blue-500:    #3B82F6
Cyan-500:    #06B6D4
Green-500:   #10B981
Emerald-500: #10B981
Yellow-500:  #F59E0B
Orange-500:  #F97316
Red-500:     #EF4444
Purple-500:  #A855F7
Pink-500:    #EC4899
```

### Gray Palette
```
Gray-50:   #F9FAFB
Gray-100:  #F3F4F6
Gray-200:  #E5E7EB
Gray-300:  #D1D5DB
Gray-500:  #6B7280
Gray-700:  #374151
Gray-800:  #1F2937
Gray-900:  #111827
Gray-950:  #030712
```

---

## Tips & Best Practices

### 1. Gradient Backgrounds
Use subtle opacity (/10, /20, /30) for card backgrounds to avoid overwhelming the UI:
```css
from-blue-500/10 to-cyan-500/10
```

### 2. Hover States
Combine multiple effects for rich interactions:
```css
hover:shadow-lg hover:scale-105 hover:-translate-y-1
transition-all duration-300
```

### 3. Dark Mode
Always pair light and dark variants:
```css
bg-white dark:bg-gray-950
text-gray-900 dark:text-white
```

### 4. Group Hovers
Use `group` and `group-hover:` for parent-child interactions:
```css
<div className="group">
  <button className="opacity-0 group-hover:opacity-100">
```

### 5. Staggered Animations
Use inline styles for dynamic delays:
```css
style={{
  animationDelay: `${index * 50}ms`,
  animation: 'fadeInUp 0.5s ease-out forwards'
}}
```

### 6. Responsive Design
Start mobile-first, then add breakpoints:
```css
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

### 7. Focus States
Always include focus states for accessibility:
```css
focus:outline-none focus:ring-2 focus:ring-blue-500
```

---

## Quick Copy Templates

### Gradient Card
```jsx
<div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
  {/* Content */}
</div>
```

### Icon Badge
```jsx
<span className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
  🎯
</span>
```

### Status Badge
```jsx
<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-current/20 backdrop-blur-sm hover:scale-105 transition-all duration-300">
  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs">✓</span>
  <span className="text-sm font-semibold">Active</span>
</div>
```

### Action Button
```jsx
<button className="p-2.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md border border-blue-200 dark:border-blue-800">
  <Edit className="h-4 w-4" />
</button>
```

---

**Reference:** Task #46 - Admin Dashboard Refinement
**Framework:** TailwindCSS 3.x
**Project:** E-book Landing Page - Prompt Management System
