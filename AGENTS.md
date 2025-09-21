# AGENTS.md

## Build/Lint/Test Commands

- **Build**: `npm run build` (runs Next.js build)
- **Dev Server**: `npm run dev` (starts development server)
- **Lint**: No ESLint config; use Prettier: `npx prettier --check .` and `npx prettier --write .`
- **Test**: No test framework (e.g., Jest) configured. Add tests via `npm install --save-dev jest @types/jest` if needed.
- **Single Test**: Once Jest is set up, use `npm test -- --testNamePattern=TestName` or `jest path/to/test.ts`.

## Code Style Guidelines

- **Language**: TypeScript with Next.js (React 19+).
- **Formatting**: Prettier (trailingComma: 'all', bracketSpacing: true, printWidth: 150). Run `npx prettier --write .` before commits.
- **Types**: Use interfaces prefixed with 'I' (e.g., `IProps`). Strict mode disabled; avoid `any` where possible. JSX: preserve.
- **Imports**: Absolute paths with `@/` alias (e.g., `import { Component } from '@/components/foo'`). Group by type: React, external, internal.
- **Naming**: Components: PascalCase. Variables/functions: camelCase. Files: kebab-case for non-components, PascalCase for components (e.g., AppLayout.tsx).
- **Components**: Use `React.FC<Props>` for functional components. Async components for data fetching (e.g., `export default async function Page()`).
- **Styling**: CSS Modules (.module.scss) for scoped styles. Import as `styles from './File.module.scss'`.
- **Error Handling**: Use try-catch in async services; log errors via console or Sentry (integrated). Validate props with TypeScript.
- **Conventions**: Follow Next.js App Router patterns. No inline styles; prefer CSS modules. Ensure accessibility (e.g., alt texts).

This guide is inferred from package.json, tsconfig.json, and code samples. Update as project evolves.
