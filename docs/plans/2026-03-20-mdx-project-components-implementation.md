# MDX Project Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create MDX components for project detail pages with HeroSection, FeatureCard, FeatureGrid, StepList, and DataTable.

**Architecture:** Create 5 reusable React components in `components/mdx/` directory, register them in `mdx-components.tsx`, follow Tailwind styling with dark mode support, mobile-first responsive design.

**Tech Stack:** React 19, Next.js 16, Tailwind CSS v4, MDX

---

## Task 1: Create HeroSection Component

**Files:**
- Create: `components/mdx/HeroSection.tsx`

**Step 1: Create HeroSection component**

```tsx
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  title: string
  subtitle?: string
  className?: string
}

export function HeroSection({ title, subtitle, className }: HeroSectionProps) {
  return (
    <section className={cn('py-8 md:py-12', className)}>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add components/mdx/HeroSection.tsx
git commit -m "feat(mdx): add HeroSection component"
```

---

## Task 2: Create FeatureCard Component

**Files:**
- Create: `components/mdx/FeatureCard.tsx`

**Step 1: Create FeatureCard component**

```tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface FeatureCardProps {
  icon?: ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn(
      'p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm',
      'border border-gray-100 dark:border-gray-700',
      className
    )}>
      {icon && (
        <div className="text-2xl md:text-3xl mb-3">
          {icon}
        </div>
      )}
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/mdx/FeatureCard.tsx
git commit -m "feat(mdx): add FeatureCard component"
```

---

## Task 3: Create FeatureGrid Component

**Files:**
- Create: `components/mdx/FeatureGrid.tsx`

**Step 1: Create FeatureGrid component**

```tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface FeatureGridProps {
  cols?: 1 | 2 | 3
  className?: string
  children: ReactNode
}

export function FeatureGrid({ cols = 2, className, children }: FeatureGridProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <div className={cn(
      'grid gap-4 md:gap-6',
      colsClass[cols],
      className
    )}>
      {children}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/mdx/FeatureGrid.tsx
git commit -m "feat(mdx): add FeatureGrid component"
```

---

## Task 4: Create StepList Component

**Files:**
- Create: `components/mdx/StepList.tsx`

**Step 1: Create StepList component**

```tsx
import { cn } from '@/lib/utils'

interface Step {
  title: string
  description: string
}

interface StepListProps {
  steps: Step[]
  className?: string
}

export function StepList({ steps, className }: StepListProps) {
  return (
    <ol className={cn('space-y-4', className)}>
      {steps.map((step, index) => (
        <li
          key={index}
          className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
        >
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100">
              {step.title}
            </h4>
            <p className="mt-1 text-sm md:text-base text-gray-600 dark:text-gray-400">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
```

**Step 2: Commit**

```bash
git add components/mdx/StepList.tsx
git commit -m "feat(mdx): add StepList component"
```

---

## Task 5: Create DataTable Component

**Files:**
- Create: `components/mdx/DataTable.tsx`

**Step 1: Create DataTable component**

```tsx
import { cn } from '@/lib/utils'

interface DataTableProps {
  headers: string[]
  rows: string[][]
  className?: string
}

export function DataTable({ headers, rows, className }: DataTableProps) {
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700', className)}>
      <table className="w-full text-sm md:text-base">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-gray-600 dark:text-gray-400"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/mdx/DataTable.tsx
git commit -m "feat(mdx): add DataTable component"
```

---

## Task 6: Register Components in mdx-components.tsx

**Files:**
- Modify: `mdx-components.tsx`

**Step 1: Add imports and register components**

Add at top of file:
```tsx
import { HeroSection } from '@/components/mdx/HeroSection'
import { FeatureCard } from '@/components/mdx/FeatureCard'
import { FeatureGrid } from '@/components/mdx/FeatureGrid'
import { StepList } from '@/components/mdx/StepList'
import { DataTable } from '@/components/mdx/DataTable'
```

Add to return object (before `...components`):
```tsx
    HeroSection,
    FeatureCard,
    FeatureGrid,
    StepList,
    DataTable,
```

**Step 2: Commit**

```bash
git add mdx-components.tsx
git commit -m "feat(mdx): register MDX components in mdx-components.tsx"
```

---

## Task 7: Create Index Export File

**Files:**
- Create: `components/mdx/index.ts`

**Step 1: Create index file for convenient imports**

```tsx
export { HeroSection } from './HeroSection'
export { FeatureCard } from './FeatureCard'
export { FeatureGrid } from './FeatureGrid'
export { StepList } from './StepList'
export { DataTable } from './DataTable'
```

**Step 2: Commit**

```bash
git add components/mdx/index.ts
git commit -m "feat(mdx): add index export file for MDX components"
```

---

## Task 8: Update Example MDX File

**Files:**
- Modify: `content/my-app/project.mdx`

**Step 1: Update project.mdx with example usage**

```mdx
import { HeroSection, FeatureGrid, FeatureCard, StepList, DataTable } from '@/components/mdx'

export const metadata = {
  title: '项目简介',
  description: '关于 My App 的项目简介。',
}

<HeroSection
  title="My App"
  subtitle="这是一个示例项目页面，展示 MDX 组件的使用方式"
/>

<FeatureGrid cols={2}>
  <FeatureCard
    icon="⚡"
    title="快速高效"
    description="采用先进技术，提供流畅的使用体验"
  />
  <FeatureCard
    icon="🔒"
    title="安全可靠"
    description="数据安全是我们的首要任务"
  />
</FeatureGrid>

<StepList
  steps={[
    { title: "第一步", description: "开始使用应用" },
    { title: "第二步", description: "探索更多功能" }
  ]}
/>

<DataTable
  headers={["功能", "状态"]}
  rows={[
    ["核心功能", "✅ 已上线"],
    ["高级功能", "🚧 开发中"]
  ]}
/>
```

**Step 2: Commit**

```bash
git add content/my-app/project.mdx
git commit -m "feat(content): update project.mdx with MDX components example"
```

---

## Verification

After all tasks complete, verify:

```bash
npm run build
```

Expected: Build succeeds without errors.

---

## File Summary

| File | Action |
|------|--------|
| `components/mdx/HeroSection.tsx` | Create |
| `components/mdx/FeatureCard.tsx` | Create |
| `components/mdx/FeatureGrid.tsx` | Create |
| `components/mdx/StepList.tsx` | Create |
| `components/mdx/DataTable.tsx` | Create |
| `components/mdx/index.ts` | Create |
| `mdx-components.tsx` | Modify |
| `content/my-app/project.mdx` | Modify |
