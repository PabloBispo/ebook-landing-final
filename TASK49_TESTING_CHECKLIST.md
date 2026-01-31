# Task #49 - Testing Checklist

## Manual Testing Guide

Use this checklist to verify that the minimalist redesign is working correctly.

---

## Setup

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the prompt management pages:
   - **Create New:** `http://localhost:3000/prompts/manage/new`
   - **Edit Existing:** `http://localhost:3000/prompts/manage/[slug]/edit`

---

## Visual Inspection Checklist

### ✅ General Form Appearance

- [ ] All labels are positioned ABOVE inputs (not floating)
- [ ] All borders are consistent gray (`border-gray-300`)
- [ ] All rounded corners are subtle (`rounded-md`, 6px)
- [ ] No gradients visible anywhere
- [ ] Color palette is grayscale + blue accents only
- [ ] Spacing feels generous and clean
- [ ] No decorative animations (pulse, bounce, rotate)

### ✅ Input Fields

**Title Input**
- [ ] Label: `text-sm font-medium text-gray-700`
- [ ] Border: `border-gray-300`
- [ ] Focus: Blue ring appears (`focus:border-blue-600 focus:ring-1`)
- [ ] Placeholder: Light gray (`text-gray-400`)
- [ ] Rounded: `rounded-md` (6px)

**Slug & Alias Inputs**
- [ ] Lock/Unlock buttons: Gray background when auto, border when manual
- [ ] Both inputs have same minimal styling as title
- [ ] Font is monospace
- [ ] Alias is uppercase

**Description Textarea**
- [ ] Same border and focus styling as inputs
- [ ] No floating label
- [ ] Resizable disabled

**Source Chapter Input**
- [ ] Monospace font
- [ ] Minimal styling consistent with other inputs

### ✅ Select Dropdowns

**Category Select**
- [ ] Border: `border-gray-300`
- [ ] Focus: Blue ring
- [ ] Custom arrow icon (chevron down)
- [ ] White background

**Status Select**
- [ ] Same styling as category select

### ✅ AI Model Cards (Multi-Select)

- [ ] Cards have simple border (`border-gray-300`) when unselected
- [ ] Selected cards: `border-black bg-gray-50`
- [ ] Checkboxes use standard browser style with `accent-black`
- [ ] No colored indicators (no blue/green/purple)
- [ ] No pulse or star animations
- [ ] Hover shows subtle background change

**Test Multi-Select:**
- [ ] Click multiple cards - all should maintain consistent styling
- [ ] Unselect a card - border returns to gray
- [ ] Form shows error when no models selected

### ✅ Prompt Editor

**Content Textarea**
- [ ] Border matches other inputs (`border-gray-300`)
- [ ] Focus state works correctly
- [ ] Minimum height is adequate (12 rows)

**Placeholder Detection Box**
- [ ] Appears when typing `{{variable}}`
- [ ] Shows Info icon (ℹ️) NOT sparkles (✨)
- [ ] Background: `bg-blue-50`
- [ ] Border: `border-blue-200`
- [ ] Rounded: `rounded-md` (6px)
- [ ] Placeholder chips: `bg-gray-100 text-gray-700 border-gray-200 rounded-md`

**Test Detection:**
- [ ] Type: "Hello {{name}}, welcome to {{city}}"
- [ ] Two placeholders should be detected
- [ ] Each chip should show variable name with `{{ }}`
- [ ] Chips should be in gray, NOT blue

### ✅ Category Creator

**Closed State**
- [ ] Button: `border border-gray-300 text-gray-700`
- [ ] Text: "Nova Categoria"
- [ ] Plus icon visible

**Open State**
- [ ] Card has `border-gray-300` (not gray-200)
- [ ] Padding: `p-5`
- [ ] Title: "Nova Categoria" in `text-sm font-medium`
- [ ] Close button: Small X icon (`h-4 w-4`) in `text-gray-400`

**Emoji Selection**
- [ ] Emoji button: Large square (68px × 56px)
- [ ] Shows placeholder emoji (📚) if none selected
- [ ] Border: `border-gray-300`
- [ ] Background: `bg-white`

**Name Input**
- [ ] Single label: "Ícone e Nome" (not two separate labels)
- [ ] Input next to emoji button
- [ ] Standard minimal styling

**Action Buttons**
- [ ] "Criar" button: `bg-black text-white hover:bg-gray-800`
- [ ] "Cancelar" button: `border border-gray-300 text-gray-700 hover:bg-gray-50`
- [ ] Both buttons: `rounded-md px-6 py-2.5`

**Test Emoji Picker:**
- [ ] Click emoji button - picker appears
- [ ] Category tabs have minimal design (see next section)

### ✅ Emoji Picker

**Container**
- [ ] Border: `border-gray-300` (stronger than before)
- [ ] Shadow: `shadow-sm` (subtle)
- [ ] Rounded: `rounded-md`

**Category Tabs**
- [ ] Background: `bg-gray-50` (subtle gray)
- [ ] Active tab: `bg-white text-black shadow-sm` (no border)
- [ ] Inactive tabs: transparent with `text-gray-600`
- [ ] Gap between tabs: Very tight (`gap-1`)
- [ ] Padding: `p-2` (compact)

**Emoji Grid**
- [ ] Grid: 8 columns
- [ ] Gap: Very tight (`gap-1`)
- [ ] Each emoji cell: `p-2.5 text-2xl`
- [ ] Selected emoji: `bg-gray-100 ring-1 ring-black` (no border)
- [ ] Unselected emojis: No border, just hover bg
- [ ] Hover: `hover:bg-gray-50`

**Selection Footer**
- [ ] Shows "Selecionado: [emoji]"
- [ ] Background: `bg-white` (not gray-50)
- [ ] Border top: `border-gray-200`

**Test Interaction:**
- [ ] Click different category tabs - content changes
- [ ] Select an emoji - ring appears around it
- [ ] Footer shows selected emoji
- [ ] Click emoji again - closes picker and fills button

### ✅ Tag Input

**Selected Tags Container**
- [ ] Background: `bg-white` (not gray-50)
- [ ] Border: `border-gray-200`
- [ ] Only appears when tags are selected

**Tag Chips**
- [ ] Background: `bg-gray-100`
- [ ] Text: `text-gray-700`
- [ ] Border: `border-gray-200`
- [ ] Rounded: `rounded-md` (NOT rounded-full)
- [ ] Remove X button: `text-gray-500` hover to `text-gray-900`
- [ ] Hover: Entire chip `hover:bg-gray-200`

**Input Field**
- [ ] Placeholder: "Digite para buscar ou criar tag..."
- [ ] Same minimal styling as other inputs
- [ ] Focus: Blue ring

**Suggestions Dropdown**
- [ ] Border: `border-gray-300` (stronger)
- [ ] Shadow: `shadow-sm` (subtle)
- [ ] Padding: `p-1` (tight)

**Tag Suggestions**
- [ ] First suggestion: `bg-gray-50 font-medium`
- [ ] Other suggestions: Normal weight
- [ ] Hover: `hover:bg-gray-50`
- [ ] Click adds tag to selected list

**Create New Tag Button**
- [ ] Icon: Plus in `border border-gray-300` container (not bg-gray-100)
- [ ] Icon color: `text-gray-600`
- [ ] Text: `text-sm font-medium`
- [ ] Shows: Criar tag "[typed text]"
- [ ] Border separator: `border-b border-gray-100`

**Test Autocomplete:**
- [ ] Type "market" - existing tags appear
- [ ] Type "newtagxyz" - "Criar tag" button appears
- [ ] Click suggestion - adds to selected
- [ ] Press Enter - creates new or selects first
- [ ] Remove tag - X button works

### ✅ Action Buttons

**Submit Button**
- [ ] Background: `bg-black`
- [ ] Text: `text-white`
- [ ] Hover: `hover:bg-gray-800`
- [ ] Disabled when no model selected: `opacity-50 cursor-not-allowed`
- [ ] Rounded: `rounded-md`
- [ ] Padding: `px-6 py-2.5`

**Cancel Button**
- [ ] Border: `border border-gray-300`
- [ ] Text: `text-gray-700`
- [ ] Hover: `hover:bg-gray-50`
- [ ] Same dimensions as submit

**Loading State**
- [ ] Spinner appears when submitting
- [ ] Spinner is white (visible on black button)
- [ ] Text changes to "Salvando..."

### ✅ Validation & Errors

**Model Selection Error**
- [ ] Red box appears when no models selected
- [ ] Background: `bg-red-50`
- [ ] Border: `border-red-200`
- [ ] Text: `text-red-800`
- [ ] Icon: Red X or alert icon

**Test Validation:**
- [ ] Submit without models - error appears
- [ ] Select a model - error disappears
- [ ] Form can submit successfully

---

## Functional Testing Checklist

### ✅ Auto-Generation Features

**Auto-Slug**
- [ ] Type in title: "My Amazing Prompt"
- [ ] Slug auto-generates: "my-amazing-prompt"
- [ ] Click lock icon - slug becomes editable
- [ ] Edit slug manually - lock changes to unlock
- [ ] Click unlock (auto) - slug auto-generates again

**Auto-Alias**
- [ ] Same title generates alias: "MY_AMAZING_PROMPT"
- [ ] Lock/unlock works same as slug
- [ ] Manual edits disable auto mode

### ✅ Category Management

**Create Category**
- [ ] Click "Nova Categoria"
- [ ] Card expands
- [ ] Click emoji button
- [ ] Select an emoji from picker
- [ ] Type category name
- [ ] Click "Criar"
- [ ] Category appears in dropdown
- [ ] Dropdown auto-selects new category

**Cancel Category**
- [ ] Click "Cancelar" - card closes
- [ ] Click X button - card closes

### ✅ Tag Management

**Autocomplete**
- [ ] Type partial tag name
- [ ] Suggestions appear
- [ ] Click suggestion - adds to selected
- [ ] Type non-existent tag
- [ ] "Criar tag" appears
- [ ] Click create - new tag added

**Keyboard Navigation**
- [ ] Press Enter on first suggestion - adds it
- [ ] Press Enter on new tag - creates it
- [ ] Arrow keys work in suggestions (if implemented)

**Remove Tags**
- [ ] Click X on selected tag
- [ ] Tag removed from selected list
- [ ] Tag still available in suggestions

### ✅ Model Selection

**Multi-Select**
- [ ] Click Universal - checkbox checked
- [ ] Click GPT-4 - both checked
- [ ] Click Universal again - unchecked
- [ ] At least one must be selected for form submission

### ✅ Form Submission

**Create New Prompt**
- [ ] Fill all required fields
- [ ] Select at least one model
- [ ] Click "Criar Prompt"
- [ ] Loading state shows
- [ ] Success: Redirects to prompt page
- [ ] Error: Shows error message

**Edit Existing Prompt**
- [ ] Form loads with existing data
- [ ] Auto-slug/alias disabled by default
- [ ] Can enable auto mode if needed
- [ ] Click "Atualizar Prompt"
- [ ] Loading state shows
- [ ] Success: Redirects or shows confirmation

---

## Browser Compatibility

Test in multiple browsers:

- [ ] **Chrome/Edge** - All features work
- [ ] **Firefox** - All features work
- [ ] **Safari** - All features work
- [ ] **Mobile Safari (iOS)** - Touch targets work, layout responsive
- [ ] **Mobile Chrome (Android)** - Touch targets work, layout responsive

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all form fields in logical order
- [ ] All interactive elements are focusable
- [ ] Focus indicators are visible (blue ring)
- [ ] Enter key works on buttons
- [ ] Escape key closes modals/pickers (if implemented)

### Screen Reader
- [ ] All labels are properly associated with inputs
- [ ] Required fields announced
- [ ] Error messages announced
- [ ] Button states announced (disabled, loading)

### Color Contrast
- [ ] Text on white background meets WCAG AA (4.5:1)
- [ ] Gray text meets minimum contrast (gray-700 on white)
- [ ] Focus indicators are visible
- [ ] Disabled states are distinguishable

---

## Performance Testing

- [ ] Form loads quickly (<1s)
- [ ] Typing in inputs has no lag
- [ ] Category/tag creation is responsive
- [ ] No console errors
- [ ] No console warnings
- [ ] Network requests are efficient

---

## Visual Consistency Checklist

Compare all elements to ensure consistency:

### Borders
- [ ] All inputs: `border-gray-300`
- [ ] All cards: `border-gray-300` or `border-gray-200`
- [ ] All selects: `border-gray-300`
- [ ] All modals: `border-gray-300`

### Rounded Corners
- [ ] Everything uses `rounded-md` (6px)
- [ ] NO `rounded-lg`, `rounded-xl`, `rounded-full` (except remove buttons)

### Focus States
- [ ] All inputs: `focus:border-blue-600 focus:ring-1 focus:ring-blue-600`
- [ ] No colored shadows
- [ ] No offset rings

### Typography
- [ ] Labels: `text-sm font-medium text-gray-700`
- [ ] Inputs: Regular weight
- [ ] Buttons: `font-medium`
- [ ] Headings: `text-sm font-medium` or `font-medium`

### Spacing
- [ ] Consistent gaps: `gap-1`, `gap-2`, `gap-3`
- [ ] Consistent padding: `p-4`, `p-5`, `px-4 py-2.5`
- [ ] Consistent spacing: `space-y-2`, `space-y-3`, `space-y-4`

---

## Final Sign-Off

Once all items are checked:

- [ ] **Visual Design** - Matches minimalist Nike/OpenAI style
- [ ] **Functionality** - All features work as expected
- [ ] **Performance** - No lag or errors
- [ ] **Accessibility** - Meets WCAG AA standards
- [ ] **Responsiveness** - Works on mobile and desktop
- [ ] **Browser Support** - Works in all major browsers

**Tested By:** _________________
**Date:** _________________
**Status:** ✅ APPROVED / ⚠️ NEEDS FIXES

---

## Common Issues & Solutions

### Issue: Focus ring not visible
**Solution:** Check that `focus:ring-1` is present, not just `focus:border-blue-600`

### Issue: Borders look too light
**Solution:** Ensure using `border-gray-300` not `border-gray-200`

### Issue: Rounded corners too large
**Solution:** Replace `rounded-lg` with `rounded-md`

### Issue: Tags are circles instead of rectangles
**Solution:** Change `rounded-full` to `rounded-md`

### Issue: Colors still visible (blue chips, etc)
**Solution:** Replace colored backgrounds with gray equivalents

### Issue: Gradients still showing
**Solution:** Remove `bg-gradient-to-r` and replace with solid colors

### Issue: Emoji picker tabs have borders
**Solution:** Active tab should use `shadow-sm` not `border`

---

**End of Testing Checklist**
