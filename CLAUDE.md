# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- **Dev server**: `npm run dev` (starts Next.js dev server on http://localhost:3000)
- **Build**: `npm run build` (production build)
- **Production server**: `npm run serve` (serves production build)
- **Static export**: `npm run export`

### Code Quality
- **Format check**: `npx prettier --check .`
- **Format write**: `npx prettier --write .`
- **Prettier config**: trailingComma: 'all', bracketSpacing: true, printWidth: 150

### Requirements
- Node.js 20.x (specified in package.json engines)

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode disabled, strictNullChecks disabled)
- **Styling**: SCSS with CSS Modules (`.module.scss`)
- **CMS**: Contentful (headless CMS for blog content and site data)
- **Monitoring**: Sentry for error tracking
- **Analytics**: Vercel Analytics and Speed Insights

### Project Structure
- `app/` - Next.js App Router pages and routes
  - `layout.tsx` - Root layout with theme system, analytics, and typography
  - `page.tsx` - Homepage
  - `notes/` - Blog/notes section with dynamic routes
  - `api/draft/` - Draft preview API route
- `components/` - Reusable React components organized by category (layout/, home/, content/)
- `services/` - Backend service layer for external integrations
  - `contentService.ts` - Raw Contentful API client (fetches entries, handles links/includes)
  - `blogService.ts` - Blog-specific wrapper around contentService
  - `logService.ts` - Logging/error reporting (Sentry integration)
- `contexts/` - React Context providers
  - `ThemeContext.tsx` - Client-side theme management (light/dark mode with system preference detection)
- `utils/` - Utility functions (markdown parsing, date formatting, typography)
- `config/` - Environment configuration (CMS tokens, Sentry DSN)
- `styles/` - Global SCSS styles
- `public/` - Static assets

### Key Architectural Patterns

#### Content Management
- Content is fetched from Contentful CMS via REST API
- `contentService.ts` provides low-level API access with link resolution (flattens nested Contentful references)
- `blogService.ts` provides typed, domain-specific methods for blog posts
- All pages use async Server Components for data fetching (no client-side data fetching)

#### Theme System
- Dual light/dark mode with system preference detection
- Theme is stored in localStorage with key `theme-preference`
- `data-theme` attribute on `<html>` drives CSS custom properties
- Inline script in `app/layout.tsx` prevents flash of wrong theme (runs before React hydration)
- `ThemeContext` manages theme state in client components
- `HighlightTheme` component dynamically loads highlight.js themes based on current theme

#### Component Architecture
- `AppLayout` uses compound component pattern (AppLayout.Main, AppLayout.Title, etc.)
- Async Server Components for pages, client components ('use client') only when needed (e.g., theme toggle, context consumers)
- CSS Modules for all component styling (import as `styles from './Component.module.scss'`)

#### Styling Conventions
- CSS Modules with SCSS: `component-name.module.scss`
- BEM-like naming: `styles.layout__title`, `styles.layout__linkback`
- Typography system via `utils/typography` (injected as inline style in layout)
- Global styles in `styles/app.scss`

### TypeScript Configuration
- Path alias: `@/` maps to project root (e.g., `import { foo } from '@/services/bar'`)
- Strict mode disabled (`strict: false`, `strictNullChecks: false`)
- Interfaces prefixed with 'I' (e.g., `IProps`, `IBlogArticle`)
- Target: ES5, JSX: preserve (Next.js handles transformation)

### Environment Variables
Required in `.env.local`:
- `CMS_API_DOMAIN` - Contentful API domain
- `CMS_API_TOKEN` - Contentful delivery API token
- `CMS_PREVIEW_DOMAIN` - Contentful preview API domain
- `CMS_PREVIEW_API_TOKEN` - Contentful preview API token
- `CMS_SPACEID_SITE` - Contentful space ID
- `SENTRY_DSN` - Sentry error tracking DSN

### External Services
- **Contentful**: Headless CMS for all content (homepage, blog posts, about page)
- **Vercel**: Deployment platform with redirects configured in `vercel.json`
- **Sentry**: Error tracking and monitoring
- **Google Fonts**: Nunito and Raleway font families

### Code Style Notes
- Use `React.FC<Props>` for functional components
- Prefer async Server Components over client-side data fetching
- Group imports: React, external libraries, internal modules (using `@/` alias)
- File naming: PascalCase for components (e.g., `AppLayout.tsx`), kebab-case otherwise
- No inline styles; always use CSS Modules
- Markdown rendering via `remarkable` library with `highlight.js` for syntax highlighting
