# AGENTS.md

Guidance for coding agents working in this repository.

## 1) Project Snapshot
- Stack: Astro 6, React 19, TypeScript strict mode, Tailwind CSS v4.
- Package manager: pnpm (`pnpm-lock.yaml` present).
- Rendering model: Astro pages with selective React hydration (`client:load`).
- Primary folders:
  - `src/pages/` route pages (`.astro`)
  - `src/components/` reusable UI (`.astro`, `.tsx`)
  - `src/layouts/` page shell/layout wrappers
  - `src/styles/` global styles
- Build output: `dist/`.

## 2) Source Of Truth For Commands
Use `package.json` scripts first.

```bash
pnpm dev
pnpm build
pnpm preview
pnpm astro
```

## 3) Build / Lint / Test Commands
### Install dependencies
```bash
pnpm install
```

### Local development server
```bash
pnpm dev
```

### Production build
```bash
pnpm build
```

### Preview production build locally
```bash
pnpm preview
```

### Type/Astro diagnostics (closest lint equivalent in this repo)
```bash
pnpm astro check
```

### Lint status
- No ESLint, Biome, or Prettier config is committed.
- No `pnpm lint` script exists.
- Until lint tooling is added, use `pnpm astro check` + focused manual review.

### Test status
- No test runner (Vitest/Jest/Playwright/Cypress) is configured.
- No `pnpm test` script exists.

### Running a single test (important)
- Current state: not available (no tests configured).
- If you add Vitest, use these single-test patterns:
```bash
pnpm vitest run src/path/to/file.test.ts
pnpm vitest run src/path/to/file.test.ts -t "specific test name"
```
- If you introduce tests, add stable scripts (`pnpm test`, optionally `pnpm test:watch`) to `package.json`.

## 4) Working Agreements For Agents
- Make minimal, scoped changes; avoid broad rewrites.
- Do not reformat unrelated files.
- Preserve existing tone and language (most UI copy is Spanish).
- Prefer existing patterns over introducing new architecture.
- Keep pages responsive; `768px` and `480px` breakpoints are actively used.

## 5) Code Style Guidelines
### 5.1 General formatting
- Match the style already used in each touched file.
- Use consistent indentation (typically 2 spaces).
- Keep lines readable; split long attributes/properties when needed.
- Avoid mass formatting unless explicitly requested.
- Add comments only for non-obvious logic.

### 5.2 Imports
- In `.astro` frontmatter, order imports as:
  1) framework/external,
  2) local components/layouts/modules,
  3) style imports.
- Use relative paths consistent with nearby files.
- Prefer `import type` for TS/TSX type-only imports.
- Remove unused imports.

### 5.3 TypeScript and typing
- Respect `astro/tsconfigs/strict` settings.
- Avoid `any`; use explicit types/interfaces.
- Type React handlers (`React.FormEvent`, etc.) explicitly.
- Guard browser-only APIs with `typeof window !== 'undefined'`.
- Narrow unknown errors before reading `.message`.

### 5.4 Naming
- Components/files: `PascalCase` (e.g., `ChatBot.tsx`, `Navbar.astro`).
- Variables/functions: `camelCase`.
- CSS classes: `kebab-case`.
- Route filenames in `src/pages/`: lowercase kebab-case.
- Prefer descriptive names (`isTyping`, `toggleMobileMenu`) over abbreviations.

### 5.5 Astro conventions
- Keep frontmatter at the top between `---` fences.
- Use semantic structure (`main`, `section`, ordered headings).
- Use `script is:inline` only when page-level JS is needed.
- Ensure scripts are safe with Astro transitions (`astro:page-load`).
- Avoid duplicate global listeners across page transitions.

### 5.6 React conventions
- Use functional components and hooks.
- Keep state minimal and local unless reuse justifies extraction.
- For async actions: set loading state, block repeated submits, and show safe failure feedback.
- Prefer small helper functions for transformations.

### 5.7 CSS and UI
- Preserve existing visual language unless redesign is requested.
- Reuse established colors, spacing rhythm, and responsive behavior.
- Keep contrast/focus states accessible.
- Avoid unused selectors and dead CSS.

### 5.8 Error handling and resilience
- Wrap network operations in `try/catch`.
- Check `response.ok` before parsing JSON.
- Show clear user-facing errors (Spanish when UI context is Spanish).
- Log technical details via `console.error`.
- Fail gracefully; never leave UI stuck in loading/blocked state.

## 6) Validation Checklist Before Handoff
When a change affects runtime behavior, run:

```bash
pnpm astro check
pnpm build
```

Then manually verify affected routes with `pnpm dev`.

## 7) Cursor / Copilot Rule Files
Checked and not found in this repo at the time of writing:
- `.cursorrules`
- `.cursor/rules/`
- `.github/copilot-instructions.md`

If any of these files are added later, treat them as mandatory instructions and update this document accordingly.
