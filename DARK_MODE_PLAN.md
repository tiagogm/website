# Dark Mode Implementation Plan

## Overview
Implement a dark mode feature that:
- Toggles between light and dark themes
- Defaults to system preference
- Persists user preference
- Uses CSS custom properties for easy theme switching

## Suggested Dark Mode Palette

Based on your current light theme colors, here's a suggested dark mode palette:

### Color Palette

**Light Theme (Current)**
- Background: `#ffffff` (white)
- Text: `#000000` (black)
- Primary Blue: `#03579e`
- Grey Light: `#f1f1f1`
- Grey Mid: `#e1e1e1` (inferred from code border)
- Subtitle Text: `#686767`
- Article Link: `#484848`
- Code Background: `#f1f1f1`
- Code Border: `#e1e1e1`

**Dark Theme (Suggested)**
- Background: `#1a1a1a` (very dark grey, almost black)
- Surface: `#242424` (slightly lighter for cards/sections)
- Text Primary: `#e5e5e5` (light grey, high contrast)
- Text Secondary: `#a0a0a0` (medium grey for subtitles)
- Primary Blue: `#4a9eff` (lighter, more vibrant blue for better visibility)
- Primary Blue Hover: `#6bb0ff` (even lighter on hover)
- Grey Light: `#2d2d2d` (dark grey for backgrounds)
- Grey Mid: `#404040` (border color)
- Code Background: `#2d2d2d`
- Code Border: `#404040`
- Border Accent: `#4a9eff` (top border)

**Rationale:**
- Dark background (`#1a1a1a`) reduces eye strain while maintaining contrast
- Lighter blue (`#4a9eff`) ensures links remain visible and accessible
- Text colors follow WCAG contrast guidelines
- Surface color provides subtle depth for components

## Implementation Strategy

### 1. CSS Variables Architecture

**Approach:** Use CSS custom properties with `[data-theme]` attribute selector

**Structure:**
```scss
:root {
  // Light theme (default)
  --color-bg: #ffffff;
  --color-surface: #ffffff;
  --color-text-primary: #000000;
  --color-text-secondary: #686767;
  --color-primary: #03579e;
  --color-primary-hover: #0468b8;
  --color-grey-light: #f1f1f1;
  --color-grey-mid: #e1e1e1;
  --color-code-bg: #f1f1f1;
  --color-code-border: #e1e1e1;
  --color-border-accent: #03579e;
}

[data-theme="dark"] {
  // Dark theme overrides
  --color-bg: #1a1a1a;
  --color-surface: #242424;
  --color-text-primary: #e5e5e5;
  --color-text-secondary: #a0a0a0;
  --color-primary: #4a9eff;
  --color-primary-hover: #6bb0ff;
  --color-grey-light: #2d2d2d;
  --color-grey-mid: #404040;
  --color-code-bg: #2d2d2d;
  --color-code-border: #404040;
  --color-border-accent: #4a9eff;
}
```

### 2. Theme Detection & Storage

**System Preference Detection:**
- Use `window.matchMedia('(prefers-color-scheme: dark)')` to detect system preference
- Check on initial load and listen for changes

**Storage:**
- Store user preference in `localStorage` with key `theme-preference`
- Values: `'light'`, `'dark'`, or `'system'`
- Default to `'system'` if no preference stored

**Initialization:**
- Client-side script in root layout to prevent flash of wrong theme
- Apply theme before React hydration

### 3. Theme Toggle Component

**Location:** `components/layout/ThemeToggle/`

**Features:**
- Toggle button (sun/moon icons or text)
- Three states: Light, Dark, System
- Visual indicator of current theme
- Accessible (ARIA labels, keyboard navigation)

**Implementation:**
- Client component (use `'use client'`)
- Uses React context or prop drilling to update theme
- Updates `data-theme` attribute on `<html>` element

### 4. Migration Steps

1. **Update CSS Variables** (`styles/_variables.scss`)
   - Replace hardcoded colors with CSS variables
   - Add dark theme overrides

2. **Update Component Styles**
   - Replace hardcoded colors with CSS variables
   - Files to update:
     - `styles/app.scss`
     - `components/layout/AppLayout.module.scss`
     - `app/notes/components/ArticleLink.module.scss`
     - `components/home/SocialLinks/SocialLinks.module.scss`
     - `components/layout/LinkRainbow/LinkRainbow.module.scss`

3. **Create Theme Context/Provider**
   - Theme state management
   - Theme toggle functionality
   - System preference listener

4. **Create Theme Toggle Component**
   - UI component for toggling
   - Add to Header component

5. **Add Theme Script**
   - Inline script in root layout for instant theme application
   - Prevents flash of unstyled content

6. **Update Root Layout**
   - Add theme provider
   - Add theme initialization script

## Technical Details

### Theme Provider Structure

```typescript
// Context for theme management
interface IThemeContext {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}
```

### Theme Script (Inline in `<head>`)

```javascript
(function() {
  const getStoredTheme = () => localStorage.getItem('theme-preference') || 'system';
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  const theme = getStoredTheme() === 'system' ? getSystemTheme() : getStoredTheme();
  document.documentElement.setAttribute('data-theme', theme);
})();
```

### Component Updates Required

1. **styles/_variables.scss** - Add all CSS variables
2. **styles/app.scss** - Use CSS variables
3. **components/layout/AppLayout.module.scss** - Use CSS variables
4. **app/notes/components/ArticleLink.module.scss** - Use CSS variables
5. **components/home/SocialLinks/SocialLinks.module.scss** - Use CSS variables
6. **components/layout/LinkRainbow/LinkRainbow.module.scss** - Use CSS variables (keep animation colors or adjust)
7. **app/layout.tsx** - Add theme script and provider
8. **components/layout/Header/Header.tsx** - Add theme toggle button

## Testing Checklist

- [ ] Theme persists across page reloads
- [ ] System preference is detected correctly
- [ ] System preference changes are detected
- [ ] No flash of wrong theme on initial load
- [ ] All components render correctly in both themes
- [ ] Code blocks have proper contrast
- [ ] Links are visible and accessible
- [ ] Toggle button is accessible (keyboard, screen reader)
- [ ] Theme works on mobile devices
- [ ] Animation colors work in dark mode (LinkRainbow)

## Accessibility Considerations

- Ensure WCAG AA contrast ratios (4.5:1 for text, 3:1 for UI components)
- Provide clear visual indicators for theme state
- Support keyboard navigation for theme toggle
- Announce theme changes to screen readers
- Test with browser zoom at 200%

## Future Enhancements

- Smooth transitions between themes
- Per-component theme overrides (if needed)
- Theme-aware images/assets
- Reduced motion support for animations
