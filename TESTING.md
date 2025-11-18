# Dark Mode Testing Guide

## Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:3000`

## Manual Testing Checklist

### 1. Theme Toggle Button
- [ ] **Location**: The toggle button should appear in the header (top right, next to "//tiagogm")
- [ ] **Visual**: 
  - Light mode: Shows moon icon (dark mode available)
  - Dark mode: Shows sun icon (light mode available)
- [ ] **Click**: Clicking the button should toggle between light and dark themes
- [ ] **Keyboard**: Press Tab to focus the button, then Enter or Space to toggle
- [ ] **Hover**: Button should show hover effect (background color change)
- [ ] **Focus**: Button should show focus outline when focused

### 2. Theme Persistence
- [ ] **Refresh**: Toggle to dark mode, refresh the page → should stay in dark mode
- [ ] **New Tab**: Open a new tab to the same site → should use the same theme
- [ ] **Close/Reopen**: Close browser, reopen → should remember your preference

### 3. OS Preference Detection
- [ ] **First Visit**: Clear localStorage and visit site → should match your OS theme
  - **To test**: Open DevTools → Application → Local Storage → Delete `theme-preference` key
  - Change your OS theme preference (System Settings)
  - Refresh the page → should match OS preference

### 4. Visual Verification (Light Mode)
- [ ] Background: White (#ffffff)
- [ ] Text: Black (#000000)
- [ ] Links: Blue (#03579e)
- [ ] Code blocks: Light gray background (#f1f1f1)
- [ ] Borders: Light gray (#e1e1e1)

### 5. Visual Verification (Dark Mode)
- [ ] Background: Dark gray (#1a1a1a)
- [ ] Text: Light gray (#e0e0e0)
- [ ] Links: Light blue (#4a9eff)
- [ ] Code blocks: Dark gray background (#2d2d2d)
- [ ] Borders: Medium gray (#404040)

### 6. Page Coverage
Test these pages in both themes:
- [ ] **Home page** (`/`) - Main landing page
- [ ] **Notes page** (`/notes`) - Article listing
- [ ] **Contacts page** (`/contacts`) - Contact links
- [ ] **Individual note** (`/notes/[slug]`) - Article detail page

### 7. Transitions
- [ ] **Smooth**: Theme changes should animate smoothly (0.2s transition)
- [ ] **No Flash**: No flash of wrong theme on page load (SSR safety working)

### 8. Accessibility
- [ ] **Screen Reader**: Button has proper ARIA labels
- [ ] **Keyboard Navigation**: Can navigate and activate with keyboard only
- [ ] **Focus Indicators**: Clear focus indicators visible
- [ ] **Contrast**: Text has sufficient contrast in both themes

## Browser DevTools Testing

### Test Theme Attribute
1. Open DevTools (F12)
2. Inspect `<html>` element
3. Check `data-theme` attribute:
   - Should be `data-theme="light"` or `data-theme="dark"`
   - Should update when you toggle

### Test localStorage
1. Open DevTools → Application tab → Local Storage
2. Look for key: `theme-preference`
3. Value should be `"light"` or `"dark"`
4. Manually change it and refresh → theme should match

### Test CSS Variables
1. Open DevTools → Elements tab
2. Inspect `<html>` or `<body>`
3. In Styles panel, check computed CSS variables:
   - `--palette-bg`
   - `--palette-text`
   - `--palette-accent`
   - Should change values when theme toggles

### Simulate OS Preference
1. Open DevTools → Rendering tab (or More Tools → Rendering)
2. Find "Emulate CSS media feature prefers-color-scheme"
3. Select "dark" or "light"
4. Clear localStorage first to test OS detection
5. Refresh page → should match emulated preference

## Common Issues to Watch For

- **Flash of wrong theme**: If you see a brief flash of light theme before dark loads, the SSR script might not be working
- **Toggle not working**: Check browser console for JavaScript errors
- **Styles not updating**: Verify CSS variables are being used (not hardcoded colors)
- **Toggle not visible**: Check if Header component is rendering correctly

## Automated Testing (Future)

Consider adding:
- Unit tests for ThemeProvider logic
- Integration tests for theme persistence
- Visual regression tests for both themes
- Accessibility tests for the toggle button
