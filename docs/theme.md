# Theme System Documentation

This document describes the dark mode theme system implementation and how to extend it.

## Overview

The theme system supports both light and dark modes, with automatic detection of the user's OS preference and the ability to manually toggle between themes. The user's preference is persisted in `localStorage`.

## Architecture

### Theme Variables

Theme tokens are defined in `styles/_variables.scss` and organized into semantic color tokens:

- `--palette-bg`: Background color
- `--palette-text`: Primary text color
- `--palette-text-secondary`: Secondary text color (e.g., subtitles)
- `--palette-card`: Card/container background color
- `--palette-border`: Border color
- `--palette-accent`: Accent color (links, highlights)
- `--palette-code-bg`: Code block background
- `--palette-code-border`: Code block border
- `--palette-hr`: Horizontal rule color

Variables are scoped under `[data-theme="light"]` and `[data-theme="dark"]` selectors on `:root`.

### Theme Provider

The `ThemeProvider` component (`components/layout/ThemeProvider.tsx`) manages theme state:

- Reads OS preference via `window.matchMedia('(prefers-color-scheme: dark)')`
- Restores saved preference from `localStorage` (key: `theme-preference`)
- Applies `data-theme` attribute to `document.documentElement`
- Listens for OS theme changes and updates automatically (if no manual preference is set)
- Exposes `theme` and `setTheme` via React context

### SSR Safety

To prevent flash of incorrect theme on initial page load, an inline script in `app/layout.tsx` runs before React hydration to:
1. Check `localStorage` for saved preference
2. Fall back to OS preference if no saved preference exists
3. Set `data-theme` attribute immediately

The `suppressHydrationWarning` prop on the `<html>` tag prevents React hydration warnings from the initial script.

### Theme Toggle

The `ThemeToggle` component (`components/layout/ThemeToggle/ThemeToggle.tsx`) provides:
- Accessible button with ARIA labels
- Sun/moon icons (SVG)
- Keyboard support (Enter and Space keys)
- Visual feedback on hover and focus

The toggle is integrated into the site header for global accessibility.

## Usage

### Using Theme in Components

To access theme state in a component:

```tsx
import { useTheme } from "@/components/layout/ThemeProvider";

const MyComponent: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current theme: {theme}
    </button>
  );
};
```

### Using Theme Variables in Styles

Use CSS custom properties in your SCSS modules:

```scss
.myComponent {
  background-color: var(--palette-bg);
  color: var(--palette-text);
  border: 1px solid var(--palette-border);
}
```

### Adding New Theme Tokens

1. Add the token to both light and dark theme sections in `styles/_variables.scss`:

```scss
[data-theme="light"] {
  // ... existing tokens
  --palette-new-token: #value;
}

[data-theme="dark"] {
  // ... existing tokens
  --palette-new-token: #value;
}
```

2. Use the token in your styles:

```scss
.myElement {
  property: var(--palette-new-token);
}
```

## Testing

Key pages to verify theme functionality:
- Home page (`app/page.tsx`)
- Notes page (`app/notes/page.tsx`)
- Contacts page (`app/contacts/page.tsx`)

Test both themes for:
- Proper contrast ratios
- Consistent styling across components
- Smooth transitions between themes
- Persistence of user preference across page reloads
- OS preference detection on first visit

## Browser Support

The theme system works in all modern browsers that support:
- CSS custom properties (CSS variables)
- `window.matchMedia` API
- `localStorage` API

For older browsers, the system gracefully falls back to light theme.
