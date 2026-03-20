# MDX GFM Table Support Fix

## Problem

MDX files contain GFM tables (e.g., permission tables in privacy policies), but they render as raw markdown instead of styled HTML tables. The issue has two root causes:

1. `remark-gfm` (v4.0.1) is installed but **not registered** in `@next/mdx` plugin configuration
2. `mdx-components.tsx` has **no table component mappings** — no components for `table`, `thead`, `tbody`, `tr`, `th`, `td`

## Solution

### 1. Configure `remark-gfm` in `next.config.ts`

Register `remark-gfm` as an MDX remark plugin to parse GFM table syntax:

```ts
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  remarkPlugins: [remarkGfm],
})
```

### 2. Add table components in `mdx-components.tsx`

Map HTML table elements to components that use Tailwind Typography's built-in prose table classes (which already support dark mode via `dark:prose-invert`):

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

## Files to Change

| File | Change |
|------|--------|
| `next.config.ts` | Add `remarkPlugins: [remarkGfm]` |
| `mdx-components.tsx` | Add table/th/thead/tbody/tr/td component overrides |

## Verification

After applying changes, navigate to a page with a table (e.g., `/poker-scan/privacy`) and verify:
- Tables render as styled HTML `<table>` elements (not raw markdown text)
- Dark mode renders correctly
- No build errors from Next.js
