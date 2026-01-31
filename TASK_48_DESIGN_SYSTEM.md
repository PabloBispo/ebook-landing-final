# Minimalist Design System - Dashboard

## Color Palette

### Backgrounds
```tsx
bg-white           // Primary backgrounds (cards, tables)
bg-gray-50         // Secondary backgrounds (page, headers)
bg-gray-100        // Tertiary (unused, for future)
```

### Text
```tsx
text-gray-900      // Primary text (titles, important content)
text-gray-700      // Secondary text (labels, medium emphasis)
text-gray-600      // Body text, descriptions
text-gray-500      // Meta text, table headers, de-emphasized
text-gray-400      // Icons, decorative elements
```

### Borders
```tsx
border-gray-200    // Standard borders (cards, tables, inputs)
border-gray-300    // Emphasis borders (form inputs)
```

### Accents
```tsx
bg-blue-600        // Primary CTA backgrounds
hover:bg-blue-700  // Primary CTA hover
ring-blue-500      // Focus states

// Status colors (minimal use)
bg-green-50 + text-green-700 + border-green-200  // Success/Published
```

## Typography

### Hierarchy
```tsx
// Page Title
text-3xl font-semibold text-gray-900

// Section Title
text-xl font-semibold text-gray-900

// Subsection Title
text-base font-medium text-gray-900

// Body Text
text-base text-gray-600

// Label
text-sm font-medium text-gray-700

// Meta / Table Header
text-xs font-medium uppercase tracking-wide text-gray-500

// Small Text
text-sm text-gray-600
```

### Font Weights
```tsx
font-semibold      // Titles, important numbers
font-medium        // Labels, section headers
font-normal        // Default (implicit, don't specify)
```

## Spacing

### Layout Spacing
```tsx
py-8               // Page top/bottom padding
px-4 sm:px-6 lg:px-8  // Page left/right responsive padding
gap-8              // Grid/flex gaps between major sections
gap-6              // Gaps in header areas
mb-8               // Margin bottom for sections
```

### Component Spacing
```tsx
p-6                // Card padding
px-6 py-4          // Table cell padding
px-6 py-3          // Button padding
px-4 py-2          // Form input padding
px-3 py-1          // Badge padding
gap-2              // Small gaps in inline elements
```

### Grid Spacing
```tsx
grid gap-8         // Stats cards, major grids
grid gap-4         // Filter inputs, form grids
```

## Border Radius

### Standard
```tsx
rounded-lg         // Cards, tables, buttons (8px)
rounded-md         // Badges, small elements (6px)
```

### Never Use
```tsx
❌ rounded-2xl     // Too playful
❌ rounded-full    // Too playful (except necessary circles)
❌ rounded-xl      // Too soft
```

## Shadows

### Standard
```tsx
// NO shadows by default
// Use borders instead
border border-gray-200
```

### Exceptions
```tsx
shadow-sm          // Only if absolutely necessary for depth
```

### Never Use
```tsx
❌ shadow-lg
❌ shadow-xl
❌ shadow-2xl
❌ shadow-{color}  // Colored shadows
```

## Transitions

### Standard Pattern
```tsx
transition-colors duration-200

// Applied to:
- Button hover states
- Card hover states
- Table row hovers
```

### Never Use
```tsx
❌ transition-all
❌ hover:scale-*
❌ hover:rotate-*
❌ hover:-translate-y-*
❌ animate-pulse
❌ animate-bounce
❌ Custom @keyframes
```

## Hover States

### Backgrounds
```tsx
hover:bg-gray-50   // White cards/rows
hover:bg-gray-100  // Gray buttons
hover:bg-blue-700  // Blue buttons
```

### Never Use
```tsx
❌ hover:scale-*
❌ hover:shadow-*
❌ hover:rotate-*
❌ group-hover:opacity-*
```

## Icons

### Source
```tsx
import { IconName } from 'lucide-react'
```

### Sizing
```tsx
h-5 w-5           // Default icons (stats cards, navigation)
h-4 w-4           // Small icons (action buttons)
h-3.5 w-3.5       // Tiny icons (inline, badges)
```

### Colors
```tsx
text-gray-400     // Default icons
text-gray-600     // Emphasized icons
text-gray-900     // High emphasis icons
```

### Never Use
```tsx
❌ Emojis (📚, ✅, 📝, etc.)
❌ Font icons
❌ Gradient icon backgrounds
```

## Buttons

### Primary CTA
```tsx
className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
```

### Secondary Button
```tsx
className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-300 rounded-lg transition-colors"
```

### Icon Button
```tsx
className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
```

## Form Inputs

### Text Input / Select
```tsx
className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
```

### Label
```tsx
className="text-sm font-medium text-gray-700 mb-2 block"
```

## Cards

### Standard Card
```tsx
className="bg-white border border-gray-200 rounded-lg p-6"
```

### Hoverable Card
```tsx
className="bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors"
```

## Tables

### Container
```tsx
className="border border-gray-200 bg-white rounded-lg overflow-hidden"
```

### Header Row
```tsx
className="border-b border-gray-200 bg-gray-50"
```

### Header Cell
```tsx
className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500"
```

### Body Row
```tsx
className="hover:bg-gray-50 transition-colors"
```

### Body Cell
```tsx
className="px-6 py-4"
```

### Dividers
```tsx
className="divide-y divide-gray-200"
```

## Badges

### Status Badge (Published)
```tsx
className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-md"
```

### Status Badge (Default/Draft)
```tsx
className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md"
```

### Filter Badge (Active)
```tsx
className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm border border-gray-200"
```

## Loading States

### Spinner
```tsx
className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"
```

### Text
```tsx
className="text-gray-600"
```

## Empty States

### Container
```tsx
className="border border-gray-200 bg-white rounded-lg"
```

### Content
```tsx
<div className="text-center py-16 px-4">
  <p className="text-base font-medium text-gray-900 mb-2">Title</p>
  <p className="text-sm text-gray-600">Description</p>
</div>
```

## Gradients

### ❌ NEVER USE
```tsx
❌ bg-gradient-to-*
❌ from-{color}-*
❌ to-{color}-*
❌ via-{color}-*
❌ bg-clip-text
❌ text-transparent
```

## Animations

### ❌ NEVER USE
```tsx
❌ animate-pulse
❌ animate-spin (except loading)
❌ animate-bounce
❌ @keyframes custom animations
❌ motion/framer-motion
```

## Responsive Design

### Breakpoints
```tsx
sm:   640px   // Small tablets
md:   768px   // Tablets
lg:   1024px  // Desktops
xl:   1280px  // Large desktops

// Usage
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

### Container
```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

## Focus States

### Standard
```tsx
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
```

## Accessibility

### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Our system uses gray-900 on white (21:1 ratio ✓)

### Interactive Elements
- All buttons have hover states
- All form inputs have focus states
- All interactive elements are keyboard accessible

## Don'ts Summary

❌ No gradients anywhere
❌ No emojis in UI
❌ No scale/rotate/translate transforms
❌ No colored shadows
❌ No rounded-full (except circles)
❌ No multiple colors in one component
❌ No backdrop-blur or glass effects
❌ No pulse/bounce animations
❌ No progress bars with gradients
❌ No trend indicators with colored backgrounds

## Do's Summary

✅ Use white and gray-50 backgrounds
✅ Use gray scale for most elements
✅ Use blue-600 sparingly for CTAs
✅ Use simple borders everywhere
✅ Use generous spacing (gap-8, p-6)
✅ Use clear typography hierarchy
✅ Use subtle hover states (background only)
✅ Use lucide-react line icons
✅ Focus on content over decoration
✅ Maintain high contrast for readability
