# AGENTS.md

Guidance for coding agents working in this repository.

## 1) Project Snapshot

- **Stack**: Astro 6, React 19, TypeScript strict mode, Tailwind CSS v4.
- **Package manager**: pnpm (`pnpm-lock.yaml` present).
- **Rendering model**: Astro pages with selective React hydration (`client:load`). No React components exist yet despite the integration being configured.
- **Content**: Three Astro content collections (`proceso-graduacion`, `preguntas-frecuentes`, `contacto-recursos`) loaded via glob from Markdown files with Zod schemas.
- **Key libraries**: `marked` (MD-to-HTML rendering in FAQ answers).
- **Primary folders**:
  - `src/pages/` — route pages (`.astro`, lowercase kebab-case filenames)
  - `src/components/` — reusable UI (`.astro`, PascalCase filenames)
  - `src/layouts/` — `Layout.astro` page shell
  - `src/content/` — Markdown content organized by collection
  - `src/styles/` — `global.css` (Tailwind + fonts + base resets)
  - `public/` — static assets (images, favicons, downloads)
  - `src/content.config.ts` — collection definitions and Zod schemas
- **Build output**: `dist/`.

## 2) Source Of Truth For Commands

Use `package.json` scripts first.

```bash
pnpm dev          # Local dev server
pnpm build        # Production build
pnpm preview      # Preview production build locally
pnpm astro        # Astro CLI passthrough
```

## 3) Build / Lint / Test Commands

### Install dependencies
```bash
pnpm install
```

### Type/Astro diagnostics (closest lint equivalent)
```bash
pnpm astro check
```

### Production build
```bash
pnpm build
```

### Lint status
- No ESLint, Biome, or Prettier config is committed.
- No `pnpm lint` script exists.
- Until lint tooling is added, use `pnpm astro check` + focused manual review.

### Test status
- No test runner is configured. No `pnpm test` script exists.

### Running a single test
- Not available (no tests configured).
- If you add Vitest:
  ```bash
  pnpm vitest run src/path/to/file.test.ts
  pnpm vitest run src/path/to/file.test.ts -t "specific test name"
  ```
- If you introduce tests, add `pnpm test` and `pnpm test:watch` scripts to `package.json`.

## 4) Working Agreements For Agents

- Make minimal, scoped changes; avoid broad rewrites.
- Do not reformat unrelated files.
- Preserve existing tone and language — **all UI copy is in Spanish**.
- Prefer existing patterns over introducing new architecture.
- Keep pages responsive; used breakpoints are `768px`, `480px`, `360px`, and `320px`.
- All new content pages should use `PageHero` for consistent hero sections.
- Sort content collections by `order` field before rendering.

## 5) Code Style Guidelines

### 5.1 General formatting

- Match the style already used in each touched file.
- 2-space indentation throughout.
- Keep lines readable; split long attributes/properties when needed.
- Avoid mass formatting unless explicitly requested.
- Add comments only for non-obvious logic.

### 5.2 Imports

- In `.astro` frontmatter, order imports as:
  1. `astro:content` / `astro:transitions` framework imports
  2. Third-party libraries (`marked`, etc.)
  3. Local components/layouts
  4. Style imports
- Use relative paths consistent with nearby files.
- Use `import type` for TS/TSX type-only imports (currently not used but apply when adding React).
- Remove unused imports.

### 5.3 TypeScript and typing

- Respect `astro/tsconfigs/strict` settings.
- Avoid `any`; use explicit types/interfaces.
- Define `Props` interfaces inline in `.astro` frontmatter (see `PageHero.astro`, `GraduationTabContent.astro`).
- Destructure props with defaults: `const { title, active = false } = Astro.props;`
- Type React handlers explicitly (`React.FormEvent`, etc.) when adding React components.
- Guard browser-only APIs with `typeof window !== 'undefined'`.
- Narrow unknown errors before reading `.message`.
- Collection schemas use `z.object()` with `z.string()`, `z.number()`, `z.array()`.

### 5.4 Naming

- Components/files: `PascalCase` (e.g., `FaqItem.astro`, `GraduationTabContent.astro`).
- Variables/functions: `camelCase` (e.g., `rawSecciones`, `rendered`).
- CSS classes: `kebab-case` (e.g., `hero-section`, `faq-question`, `content-layout`).
- Route filenames in `src/pages/`: lowercase kebab-case (e.g., `preguntas-frecuentes.astro`).
- Content collection IDs: lowercase kebab-case (e.g., `tramites-finales`).
- Prefer descriptive names (`isTransitioning`, `collapseFaqItem`) over abbreviations.

### 5.5 Astro conventions

- Keep frontmatter at the top between `---` fences.
- Use semantic structure (`<main>`, `<section>`, ordered headings).
- Define `Props` interface directly in frontmatter; destructure from `Astro.props`.
- Use `<slot />` for children, `<slot name="title" />` for named slots, `<Fragment set:html={...} />` for raw HTML.
- Use scoped `<style>` by default; use `<style is:global>` only when targeting child/global elements (e.g., `preguntas-frecuentes.astro`).
- Use `<Fragment slot="title">` to pass multi-line content into named slots.

### 5.6 Client-side scripts

- Use `<script is:inline>` for page-level JS (avoids Astro bundling that can break transitions).
- Follow the **global state guard pattern** to prevent duplicate bindings across Astro transitions:
  ```js
  if (!window.__componentNameState) {
    window.__componentNameState = { bound: false /*, other state */ };
  }
  function initComponentName() { /* ... */ }
  if (!window.__componentNameLoadBound) {
    document.addEventListener('astro:page-load', initComponentName);
    window.__componentNameLoadBound = true;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponentName, { once: true });
  } else {
    initComponentName();
  }
  ```
- Narrow DOM elements with `instanceof` checks (e.g., `HTMLElement`, `HTMLButtonElement`) before accessing properties.
- Use `event.preventDefault()` explicitly on delegated click handlers when needed.

### 5.7 Content collections

- Define new collections in `src/content.config.ts` using `defineCollection`, `glob` loader, and `z.object()` schema.
- Place Markdown files under `src/content/<collection-name>/<slug>/index.md` for nested collections or `src/content/<collection-name>/<slug>.md` for flat ones.
- Always include `title` and `order` fields in frontmatter schemas.
- Sort collection entries by `order` before rendering: `entries.sort((a, b) => a.data.order - b.data.order)`.
- Use `render()` from `astro:content` to get `{ Content }` for rendering Markdown bodies.

### 5.8 React conventions (when adding React components)

- Use functional components and hooks.
- Keep state minimal and local unless reuse justifies extraction.
- For async actions: set loading state, block repeated submits, show safe failure feedback.
- Prefer small helper functions for transformations.
- Apply `client:load` directive when hydrating React islands in Astro pages.

### 5.9 CSS and UI

- **Color palette**: Primary red `#d32f2f`, dark reds `#ad3333` / `#fa6a6a` / `#ff6b6b`, navy `#003366`, link blue `#1976d2`, text grays `#333` / `#555` / `#666`, light backgrounds `#f8f9fa` / `#f5f5f5`.
- **Font stack**: `'Inter', 'Roboto', 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (loaded via Google Fonts `@import`).
- **Container**: `.container` class — `max-width: 1200px`, auto margins, `padding: 0 20px`.
- Preserve existing visual language unless a redesign is requested.
- Reuse established spacing rhythm, colors, and responsive behavior.
- Keep contrast/focus states accessible.
- Avoid unused selectors and dead CSS.
- Border radius convention: `8px`–`12px` for cards, `50px` for pill buttons, `14px`–`20px` for images.
- Shadow convention: `0 4px–10px rgba(0,0,0,0.08–0.15)` for cards.

### 5.10 Error handling and resilience

- Wrap network operations in `try/catch`.
- Check `response.ok` before parsing JSON.
- Show clear user-facing errors (Spanish when UI context is Spanish).
- Log technical details via `console.error`.
- Fail gracefully; never leave UI stuck in a loading/blocked state.

## 6) Responsive Design Patterns

This project targets four breakpoints:

| Breakpoint | Target |
|---|---|
| `>768px` | Desktop (default styles) |
| `768px` | Tablets / small laptops |
| `480px` | Large phones |
| `360px` | Small phones |
| `320px` | Very small devices (occasional) |

Guidelines:
- Write mobile-first overrides in `@media (max-width: ...)` blocks.
- Reduce font sizes, padding, and gaps progressively at each breakpoint.
- Switch grid layouts from multi-column to single-column at 768px.
- Hide non-essential elements (e.g., certification logos) at 480px.
- Test all new components at 320px width.

## 7) Validation Checklist Before Handoff

When a change affects runtime behavior, run:

```bash
pnpm astro check
pnpm build
```

Then manually verify affected routes with `pnpm dev`.

## 8) Cursor / Copilot Rule Files

Checked and not found in this repo:
- `.cursorrules`
- `.cursor/rules/`
- `.github/copilot-instructions.md`

If any of these files are added later, treat them as mandatory instructions and update this document accordingly.