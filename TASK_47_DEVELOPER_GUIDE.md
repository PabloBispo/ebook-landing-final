# Task #47: Developer Guide - Modern Form Components

## Quick Reference

### Floating Label Pattern
Use this pattern for all text inputs:

```tsx
<div className="relative">
  <input
    id="uniqueId"
    type="text"
    placeholder=" "  // IMPORTANT: Space character required for CSS peer selector
    className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
  />
  <label
    htmlFor="uniqueId"
    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
  >
    Label Text
  </label>
</div>
```

**Key Points:**
- Always use `placeholder=" "` (single space) - this enables the CSS peer selector
- Use `peer` class on input
- Use `peer-focus:` and `peer-[:not(:placeholder-shown)]:` on label
- `pt-6 pb-2` creates space for the floating label
- `pointer-events-none` prevents label from blocking input clicks

---

### Floating Label for Textarea

```tsx
<div className="relative">
  <textarea
    id="uniqueId"
    placeholder=" "
    rows={4}
    className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-200 rounded-xl resize-none transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
  />
  <label
    htmlFor="uniqueId"
    className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-xs"
  >
    Label Text
  </label>
</div>
```

**Differences from Input:**
- Label starts at `top-3` instead of `top-1/2`
- No vertical centering needed
- Use `resize-none` to prevent textarea resizing

---

### Floating Label for Select

```tsx
<div className="relative">
  <select
    id="uniqueId"
    className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-200 rounded-xl appearance-none transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300 cursor-pointer bg-white"
  >
    <option value="">Select option...</option>
    <option value="1">Option 1</option>
  </select>
  <label
    htmlFor="uniqueId"
    className="absolute left-4 top-3 text-xs text-gray-500 pointer-events-none peer-focus:text-primary"
  >
    Label Text
  </label>
  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>
```

**Key Points:**
- Use `appearance-none` to remove default select arrow
- Add custom dropdown arrow with SVG
- Label always at `top-3 text-xs` (not animated)
- Must include `bg-white` for the select background

---

### Modern Button Styles

#### Primary Button (Gradient)
```tsx
<button
  type="submit"
  disabled={loading}
  className="px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all duration-200 font-semibold text-base transform hover:scale-[1.02] active:scale-[0.98]"
>
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Loading...
    </span>
  ) : (
    'Button Text'
  )}
</button>
```

#### Secondary Button (Outlined)
```tsx
<button
  type="button"
  className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold text-base"
>
  Cancel
</button>
```

#### Tertiary Button (Subtle)
```tsx
<button
  type="button"
  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-all duration-200 border border-primary/20 hover:border-primary/30"
>
  <Plus className="h-4 w-4" />
  Add Item
</button>
```

---

### Toggle Button (Pill Style)

```tsx
<button
  type="button"
  onClick={() => setIsActive(!isActive)}
  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
    isActive
      ? 'bg-primary/10 text-primary hover:bg-primary/20'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
  }`}
>
  {isActive ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
  {isActive ? 'Active' : 'Inactive'}
</button>
```

---

### Card/Panel Styles

#### Basic Card
```tsx
<div className="p-6 border-2 border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
  {/* Card content */}
</div>
```

#### Highlighted Card (with gradient)
```tsx
<div className="p-6 border-2 border-primary/20 rounded-xl bg-gradient-to-br from-primary/5 to-transparent shadow-sm">
  {/* Card content */}
</div>
```

#### Selectable Card
```tsx
<label className={`group relative flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
  isSelected
    ? 'border-primary bg-primary/5 shadow-sm shadow-primary/20'
    : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50/50'
}`}>
  <input type="checkbox" checked={isSelected} />
  {/* Card content */}
  {isSelected && (
    <div className="absolute top-3 right-3">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
    </div>
  )}
</label>
```

---

### Tag/Chip Styles

```tsx
<span className="group inline-flex items-center gap-2 px-4 py-2 bg-white text-primary rounded-lg text-sm font-medium border-2 border-primary/20 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
  <span className="font-semibold">Tag Name</span>
  <button
    type="button"
    onClick={handleRemove}
    className="hover:bg-red-50 rounded-full p-1 transition-all duration-200 text-red-500 hover:text-red-700 hover:scale-110"
  >
    <X className="h-3.5 w-3.5" />
  </button>
</span>
```

---

### Error/Alert Messages

#### Error Message
```tsx
<div className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
  <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  </svg>
  <p className="text-sm font-medium text-red-800">Error message here</p>
</div>
```

#### Info Message
```tsx
<p className="mt-2 text-sm text-gray-500 flex items-start gap-2">
  <span className="text-primary">✨</span>
  Info message here
</p>
```

---

### Loading Spinner (Inline)

```tsx
<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
  <circle
    className="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    strokeWidth="4"
    fill="none"
  />
  <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  />
</svg>
```

---

### Animated Icons

#### Rotating Plus Icon
```tsx
<Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
```

#### Pulsing Indicator
```tsx
<div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
```

#### Bouncing Element
```tsx
<span className="inline-block animate-bounce">{emoji}</span>
```

---

## Common Patterns

### 1. Focus Ring
All interactive elements should have:
```css
focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary
```

### 2. Hover States
All clickable elements should have:
```css
hover:border-gray-300  // For inputs
hover:bg-gray-50      // For buttons
hover:scale-105       // For cards/chips
```

### 3. Transitions
Standard transition for all animations:
```css
transition-all duration-200
```

### 4. Shadows
- Subtle: `shadow-sm`
- Medium: `shadow-md`
- Large: `shadow-lg`
- Colored: `shadow-md shadow-primary/30`

### 5. Border Radius
- Small elements: `rounded-lg` (8px)
- Inputs/buttons: `rounded-xl` (12px)
- Cards/modals: `rounded-2xl` (16px)
- Pills: `rounded-full`

### 6. Spacing Scale
- Tight: `gap-2` (0.5rem)
- Normal: `gap-3` or `gap-4` (0.75rem or 1rem)
- Loose: `gap-6` (1.5rem)

---

## Color Palette

### Primary Color (with opacity)
- `primary` - Full color
- `primary/5` - 5% opacity (very light backgrounds)
- `primary/10` - 10% opacity (light backgrounds, focus rings)
- `primary/20` - 20% opacity (borders, hover states)
- `primary/30` - 30% opacity (shadows)
- `primary/40` - 40% opacity
- `primary/90` - 90% opacity (gradient end)

### Gray Scale
- `gray-50` - Lightest (backgrounds)
- `gray-100` - Very light (inactive states)
- `gray-200` - Light (borders)
- `gray-300` - Medium-light (hover borders)
- `gray-400` - Medium (icons)
- `gray-500` - Medium-dark (labels)
- `gray-600` - Dark (text)
- `gray-700` - Darker (headings)
- `gray-800` - Very dark
- `gray-900` - Darkest (primary text)

### Semantic Colors
- `red-50`, `red-200`, `red-600`, `red-800` - Errors
- `green-50`, `green-200`, `green-600` - Success
- `blue-50`, `blue-200`, `blue-600` - Info

---

## Typography

### Font Weights
- `font-normal` - 400 (body text)
- `font-medium` - 500 (labels, buttons)
- `font-semibold` - 600 (headings, important text)
- `font-bold` - 700 (emphasis)

### Font Sizes
- `text-xs` - 0.75rem (12px) - Small labels, captions
- `text-sm` - 0.875rem (14px) - Body text, descriptions
- `text-base` - 1rem (16px) - Default, buttons
- `text-lg` - 1.125rem (18px) - Large inputs
- `text-xl` - 1.25rem (20px) - Headings
- `text-2xl` - 1.5rem (24px) - Emojis, large icons
- `text-3xl` - 1.875rem (30px) - Selected emoji

---

## Responsive Breakpoints

### Mobile First Approach
```tsx
className="
  flex-col          // Mobile: Stack vertically
  sm:flex-row       // Small screens and up: Horizontal
  md:grid-cols-2    // Medium screens and up: 2 columns
  lg:grid-cols-3    // Large screens and up: 3 columns
"
```

### Common Breakpoints
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

---

## Accessibility Checklist

- [ ] All inputs have associated labels with `htmlFor`
- [ ] Use semantic HTML (`button`, `label`, `input`, etc.)
- [ ] Focus states are clearly visible
- [ ] Color is not the only indicator of state
- [ ] Interactive elements have adequate size (min 44x44px)
- [ ] Icons supplement text, not replace it
- [ ] Form validation errors are clear
- [ ] Keyboard navigation works
- [ ] `disabled` states are properly handled
- [ ] Loading states inform the user

---

## Common Mistakes to Avoid

### ❌ Don't Do This:
```tsx
// Missing space in placeholder - floating label won't work
<input placeholder="" />

// No peer class - label won't respond to input state
<input className="w-full px-4 py-2" />

// Label can block clicks
<label className="absolute left-4 top-1/2">Label</label>

// No transition - animations will be janky
<button className="hover:scale-105">Click</button>
```

### ✅ Do This Instead:
```tsx
// Correct placeholder
<input placeholder=" " />

// Peer class included
<input className="peer w-full px-4 pt-6 pb-2" />

// Pointer events disabled on label
<label className="absolute left-4 top-1/2 pointer-events-none">Label</label>

// Transition included
<button className="hover:scale-105 transition-all duration-200">Click</button>
```

---

## Testing Tips

### Visual Testing
1. Test all focus states by tabbing through the form
2. Verify hover states on all interactive elements
3. Check animations are smooth (60fps)
4. Test on different screen sizes
5. Verify color contrast meets WCAG AA standards

### Functional Testing
1. Test keyboard navigation (Tab, Enter, Escape)
2. Verify form validation works
3. Test loading states
4. Check error messages display correctly
5. Verify all buttons work when clicked

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Performance Optimization

### CSS Best Practices
- Use GPU-accelerated properties (`transform`, `opacity`)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Keep transitions under 300ms
- Use `transform: scale()` instead of width/height changes

### React Best Practices
- Use `transition-all duration-200` for all transitions
- Avoid inline styles for animations
- Use TailwindCSS utilities (already optimized)
- Leverage CSS instead of JavaScript for animations

---

## Quick Copy-Paste Templates

### Complete Form Field
```tsx
<div className="space-y-3">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Field Label
    </label>
    <p className="text-sm text-gray-500">
      Helper text here
    </p>
  </div>
  <div className="relative">
    <input
      id="fieldId"
      type="text"
      placeholder=" "
      className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
    />
    <label
      htmlFor="fieldId"
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
    >
      Floating Label
    </label>
  </div>
</div>
```

### Form Actions
```tsx
<div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-100">
  <button
    type="submit"
    disabled={loading}
    className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-base transform hover:scale-[1.02] active:scale-[0.98]"
  >
    {loading ? 'Loading...' : 'Submit'}
  </button>
  <button
    type="button"
    className="flex-1 sm:flex-none px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold text-base"
  >
    Cancel
  </button>
</div>
```

---

## Support

For questions or issues:
1. Check this guide first
2. Review the completed components for examples
3. Test in browser dev tools
4. Verify TailwindCSS classes are correct
5. Check responsive behavior at different breakpoints
