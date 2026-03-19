# MDX GFM Table Support Fix — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enable GFM table rendering in MDX documents by registering `remark-gfm` and adding table component overrides.

**Architecture:** Two-file change: register `remark-gfm` in Next.js MDX config, then add table HTML element components in `mdx-components.tsx` using Tailwind Typography's built-in prose table classes.

**Tech Stack:** Next.js 16, `@next/mdx`, `remark-gfm`, `@tailwindcss/typography`

---

### Task 1: Register `remark-gfm` in MDX config

**Files:**
- Modify: `next.config.ts`

**Step 1: Add `remark-gfm` import and plugin registration**

Replace the empty `remarkPlugins` comment with:

```ts
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  remarkPlugins: [remarkGfm],
})
```

**Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors

**Step 3: Commit**

```bash
git add next.config.ts
git commit -m "fix: register remark-gfm for GFM table support"
```

---

### Task 2: Add table components to MDX overrides

**Files:**
- Modify: `mdx-components.tsx`

**Step 1: Add table, thead, tbody, tr, th, td components**

Add these entries after the `pre` component in `useMDXComponents`, before `...components`:

```tsx
table: ({ children }) => (
  <table className="prose-table w-full my-4">{children}</table>
),
thead: ({ children }) => (
  <thead className="prose-thead">{children}</thead>
),
tbody: ({ children }) => (
  <tbody className="prose-tbody">{children}</tbody>
),
tr: ({ children }) => (
  <tr className="prose-tr border-b border-gray-200 dark:border-gray-700">{children}</tr>
),
th: ({ children }) => (
  <th className="prose-th text-left px-4 py-2 font-semibold bg-gray-50 dark:bg-gray-800">{children}</th>
),
td: ({ children }) => (
  <td className="prose-td px-4 py-2">{children}</td>
),
```

**Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors

**Step 3: Verify tables render correctly**

Run dev server and navigate to a page with tables (e.g., `/poker-scan/privacy`), confirm tables render as styled HTML (not raw markdown).

**Step 4: Commit**

```bash
git add mdx-components.tsx
git commit -m "fix: add table components to MDX overrides for GFM tables"
```

---

### Task 3: Verify dark mode

Navigate to a table page with dark mode enabled, confirm table styles adapt correctly.
