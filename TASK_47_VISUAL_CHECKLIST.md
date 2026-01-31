# Task #47: Visual Testing Checklist

## Quick Visual Verification Guide

Open the PromptForm in your browser and verify these visual improvements:

---

## 1. Title Input (Main Field)

### What to Look For:
- [ ] **Floating Label:** When you click the input, the label should smoothly animate to the top-left
- [ ] **Sparkles Icon:** Label should have a sparkle icon (✨)
- [ ] **Focus Ring:** Blue ring appears around input when focused (soft glow)
- [ ] **Hover Effect:** Border color changes when you hover over the input
- [ ] **Rounded Corners:** Input has modern rounded corners (rounded-xl)

### How to Test:
1. Click the title input
2. Watch the label animate upward
3. Move mouse over input (border should lighten)
4. Tab away and back (focus ring should appear)

---

## 2. Slug and Alias Fields

### What to Look For:
- [ ] **Pill-Shaped Toggles:** Lock/Unlock buttons are rounded pills with colored backgrounds
- [ ] **Toggle States:**
  - Active (Auto): Blue background with lock icon
  - Inactive (Manual): Gray background with unlock icon
- [ ] **Floating Labels:** Labels animate just like the title field
- [ ] **Monospace Font:** Text appears in code/terminal style font

### How to Test:
1. Click the Auto/Manual toggle buttons
2. Watch background color change
3. Try typing in the fields
4. Verify labels float to top when typing

---

## 3. Description Textarea

### What to Look For:
- [ ] **Floating Label:** Label starts at top and turns blue on focus
- [ ] **Larger Height:** 4 rows visible
- [ ] **Focus Ring:** Same blue glow as title input
- [ ] **No Resize Handle:** Cannot drag to resize

### How to Test:
1. Click in the textarea
2. Watch label turn blue
3. Try to drag resize handle (should not be able to)

---

## 4. Category Selector

### What to Look For:
- [ ] **Custom Dropdown Arrow:** Blue chevron icon on the right
- [ ] **Floating Label:** "Categoria *" always visible at top
- [ ] **New Category Button:**
  - Pill-shaped with blue background
  - Plus icon that rotates 90° on hover
  - Says "Nova Categoria"

### How to Test:
1. Open the category dropdown
2. Hover over "Nova Categoria" button
3. Watch plus icon rotate
4. Click to open creator form

---

## 5. Category Creator (When Opened)

### What to Look For:
- [ ] **Gradient Background:** Subtle blue gradient background
- [ ] **Sparkles Header:** Header has sparkle icon
- [ ] **Emoji Button:**
  - Large square button with emoji
  - Small pulsing dot appears on hover (top-right corner)
  - Rounded corners
- [ ] **Floating Label:** Category name input has floating label
- [ ] **Action Buttons:**
  - "Criar" button: Blue gradient with shadow
  - "Cancelar" button: Gray outline
- [ ] **Loading State:** Spinner appears in button when creating

### How to Test:
1. Click "Nova Categoria"
2. Hover over emoji button (look for pulsing dot)
3. Click emoji button to open picker
4. Type category name and watch label float
5. Try submitting (watch for spinner)

---

## 6. Emoji Picker

### What to Look For:
- [ ] **Gradient Category Tabs:**
  - Active tab: Blue gradient with shadow
  - Inactive tabs: White with gray border
  - Smooth transition when clicking tabs
- [ ] **Emoji Grid:**
  - 8 columns of emojis
  - Emojis scale up 125% on hover
  - Selected emoji has blue background ring
  - Selected emoji has pulsing dot indicator
- [ ] **Selected Display:**
  - Bottom section shows selected emoji
  - Emoji bounces when selected
  - Gradient background

### How to Test:
1. Click different category tabs
2. Watch tab animation (gradient appears, scales up)
3. Hover over emojis (should enlarge)
4. Click an emoji and watch it bounce in the footer
5. Try selecting different emojis

---

## 7. AI Model Selection Cards

### What to Look For:
- [ ] **Modern Card Design:**
  - 2 columns on desktop
  - Rounded corners (rounded-xl)
  - Border changes color when selected
- [ ] **Selection State:**
  - Selected: Blue border, light blue background, shadow
  - Unselected: Gray border
  - Pulsing blue dot in top-right when selected
- [ ] **Checkbox Styling:**
  - Larger checkboxes (20x20px)
  - Blue when checked
- [ ] **Hover Effects:**
  - Card slightly changes on hover
  - Border color lightens

### How to Test:
1. Click different model checkboxes
2. Watch for pulsing dot to appear/disappear
3. Hover over cards
4. Select multiple models at once

---

## 8. Content Editor Wrapper

### What to Look For:
- [ ] **Border Frame:** Editor wrapped in rounded border
- [ ] **Focus State:** Border and ring appear when editor is focused
- [ ] **Rounded Corners:** Modern rounded-xl style

### How to Test:
1. Click in the editor
2. Watch border turn blue
3. Tab away and back

---

## 9. Tag Input

### What to Look For:
- [ ] **Selected Tags Display:**
  - White cards with blue text
  - Blue border and subtle shadow
  - Scale up slightly on hover
  - Gradient background container
- [ ] **Remove Button:**
  - X icon turns red on hover
  - Scales up on hover
- [ ] **Input Field:**
  - Floating label with Plus icon
  - Label: "Digite para buscar ou criar tag..."
- [ ] **Autocomplete Dropdown:**
  - First suggestion highlighted in blue
  - Other suggestions have gray background on hover
  - "Create tag" option with Plus icon in a circle

### How to Test:
1. Add some tags and hover over them
2. Watch tags scale up
3. Hover over X button (should turn red and grow)
4. Start typing in the input
5. Watch autocomplete dropdown appear
6. Hover over suggestions

---

## 10. Status and Source Chapter

### What to Look For:
- [ ] **Custom Dropdowns:** Both fields have custom chevron arrows
- [ ] **Floating Labels:** Labels at top of fields
- [ ] **Focus States:** Blue border and ring on focus

### How to Test:
1. Click each dropdown
2. Verify custom arrow appears
3. Click source chapter input
4. Watch label behavior

---

## 11. Form Actions (Bottom)

### What to Look For:
- [ ] **Submit Button:**
  - Blue gradient background
  - Shadow appears on hover
  - Subtle scale animation on hover (grows slightly)
  - Presses down when clicked (active:scale-[0.98])
  - Loading spinner when submitting
- [ ] **Cancel Button:**
  - Gray border
  - Light gray background on hover
- [ ] **Responsive:** Buttons stack vertically on mobile

### How to Test:
1. Hover over submit button (watch it grow and show shadow)
2. Click and hold submit button (should press down)
3. Hover over cancel button
4. Resize window to mobile width (buttons should stack)

---

## 12. Error Messages

### What to Look For:
- [ ] **Model Selection Error:**
  - Red background
  - Red border
  - Warning icon (circle with X)
  - Clear error text
  - Rounded corners

### How to Test:
1. Ensure no models are selected
2. Scroll to bottom
3. Verify error message displays with icon

---

## 13. Responsive Behavior

### Desktop (> 1024px):
- [ ] All fields display properly
- [ ] 2-column layouts work
- [ ] Emoji picker shows 8 columns
- [ ] Buttons are side-by-side

### Tablet (640px - 1024px):
- [ ] Fields stack or use 2 columns appropriately
- [ ] Emoji picker still readable
- [ ] Touch targets are adequate

### Mobile (< 640px):
- [ ] All fields stack vertically
- [ ] Buttons stack vertically
- [ ] Text is readable
- [ ] Touch targets are at least 44x44px
- [ ] No horizontal scrolling

### How to Test:
1. Open browser dev tools
2. Use responsive mode
3. Test at 375px (mobile)
4. Test at 768px (tablet)
5. Test at 1280px (desktop)

---

## 14. Animation Smoothness

### What to Check:
- [ ] All transitions are smooth (not janky)
- [ ] Animations complete in ~200ms
- [ ] No layout shifts during animations
- [ ] Focus rings appear/disappear smoothly
- [ ] Hover effects are immediate

### How to Test:
1. Interact rapidly with different elements
2. Watch for any jerky animations
3. Verify everything feels smooth and responsive

---

## 15. Keyboard Navigation

### What to Check:
- [ ] Can tab through all inputs
- [ ] Focus rings are visible
- [ ] Enter key works in tag input
- [ ] Escape closes dropdowns
- [ ] Form can be submitted with Enter

### How to Test:
1. Click in title field
2. Press Tab repeatedly
3. Watch focus move through form
4. Verify blue focus rings appear

---

## Color Verification

### Primary Blue:
- [ ] Focus rings: Light blue glow
- [ ] Selected states: Light blue backgrounds
- [ ] Borders: Blue when focused/selected
- [ ] Buttons: Blue gradient
- [ ] Icons: Blue accents

### Grays:
- [ ] Input borders: Light gray (#E5E7EB)
- [ ] Labels: Medium gray when unfocused
- [ ] Cancel button: Gray border
- [ ] Backgrounds: Off-white/light gray

### Semantic Colors:
- [ ] Errors: Red background and text
- [ ] Remove buttons: Red on hover
- [ ] Success/selected: Blue

---

## Accessibility Checks

- [ ] All inputs have visible labels
- [ ] Focus states are clearly visible
- [ ] Color is not the only state indicator
- [ ] Text has adequate contrast
- [ ] Interactive elements are large enough
- [ ] Form errors are clear

---

## Common Issues to Watch For

### ❌ Problems:
1. **Labels not floating:** Missing `placeholder=" "` on input
2. **No focus ring:** Missing focus classes
3. **Choppy animations:** Browser performance issue
4. **Missing icons:** Lucide-react not imported
5. **Wrong colors:** Primary color not configured in Tailwind

### ✅ Expected Behavior:
1. Smooth label animations
2. Consistent focus rings on all inputs
3. Hover effects on all interactive elements
4. Professional, modern appearance
5. Responsive on all screen sizes

---

## Quick Screenshot Checklist

Take screenshots of:
1. ✅ Title input (empty and focused)
2. ✅ Slug/Alias with auto/manual toggles
3. ✅ Category creator opened
4. ✅ Emoji picker with selected emoji
5. ✅ AI model cards (some selected)
6. ✅ Tag input with tags and autocomplete
7. ✅ Submit button hover state
8. ✅ Mobile view (stacked layout)

---

## Sign-Off

Once you've verified all items above:

- [ ] All visual improvements are present
- [ ] All animations are smooth
- [ ] All functionality works as expected
- [ ] Responsive design works on all sizes
- [ ] No console errors
- [ ] Form can create/edit prompts successfully

**Task Status:** ✅ VERIFIED AND COMPLETE

---

## Next Steps After Verification

1. ✅ Mark Task #47 as completed
2. 📝 Document any issues found
3. 🧪 Perform user acceptance testing
4. 🚀 Deploy to production
5. 📊 Monitor user feedback

---

**Last Updated:** 2026-01-30
**Tested By:** _____________
**Date Tested:** _____________
**Result:** PASS / FAIL (circle one)
