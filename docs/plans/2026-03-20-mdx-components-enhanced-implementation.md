# MDX 组件增强实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目标:** 增强 FeatureCard 视觉表现（悬停效果、变体支持），新增 InfoSection 组件用于信息展示区。

**架构:** 在现有 `components/mdx/` 目录下增强 FeatureCard 和新增 InfoSection，保持风格一致（rounded-xl、dark mode 支持），通过 `@/` 路径导出供 MDX 使用。

**技术栈:** React 19 + TypeScript + Tailwind CSS v4 + next-themes

---

## Task 1: 增强 FeatureCard 组件

**文件:**
- 修改: `components/mdx/FeatureCard.tsx`

**Step 1: 实现增强版 FeatureCard**

用以下代码替换 `components/mdx/FeatureCard.tsx` 的内容:

```tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface FeatureCardProps {
  icon?: ReactNode
  title: string
  description: string
  variant?: 'default' | 'bordered' | 'gradient'
  className?: string
}

export function FeatureCard({ icon, title, description, variant = 'default', className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm',
        'border border-gray-100 dark:border-gray-700',
        'transition-all duration-200 ease-in-out',
        'hover:-translate-y-1 hover:shadow-md',
        variant === 'bordered' && 'border-2 border-gray-200 dark:border-gray-600',
        variant === 'gradient' && 'border-2 border-transparent bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 bg-clip-padding',
        className
      )}
      style={
        variant === 'gradient'
          ? {
              background:
                'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea 0%, #764ba2 100%) border-box',
            }
          : undefined
      }
    >
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

**Step 2: 验证构建**

运行: `npm run build`
预期: 构建成功，无错误

**Step 3: 提交**

```bash
git add components/mdx/FeatureCard.tsx
git commit -m "feat(mdx): enhance FeatureCard with hover effects and variants

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 2: 创建 InfoSection 组件

**文件:**
- 创建: `components/mdx/InfoSection.tsx`

**Step 1: 创建 InfoSection 组件**

创建 `components/mdx/InfoSection.tsx`:

```tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface InfoSectionProps {
  title: string
  description?: string
  children?: ReactNode
  icon?: ReactNode
  className?: string
}

export function InfoSection({ title, description, children, icon, className }: InfoSectionProps) {
  return (
    <section
      className={cn(
        'p-6 rounded-xl bg-white dark:bg-gray-800',
        'border border-gray-100 dark:border-gray-700',
        className
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="text-2xl md:text-3xl flex-shrink-0 mt-0.5">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-400">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: 验证构建**

运行: `npm run build`
预期: 构建成功，无错误

**Step 3: 提交**

```bash
git add components/mdx/InfoSection.tsx
git commit -m "feat(mdx): add InfoSection component for info display blocks

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 3: 导出 InfoSection

**文件:**
- 修改: `components/mdx/index.ts`

**Step 1: 添加导出**

在 `components/mdx/index.ts` 末尾添加:

```tsx
export { InfoSection } from './InfoSection'
```

**Step 2: 验证构建**

运行: `npm run build`
预期: 构建成功

**Step 3: 提交**

```bash
git add components/mdx/index.ts
git commit -m "feat(mdx): export InfoSection from index

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 4: 更新示例 MDX 页面

**文件:**
- 修改: `content/my-app/project.mdx`

**Step 1: 更新示例展示新功能**

用以下内容更新 `content/my-app/project.mdx`:

```mdx
import { HeroSection, FeatureGrid, FeatureCard, StepList, DataTable, InfoSection } from '@/components/mdx'

export const metadata = {
  title: '项目简介',
  description: '关于 My App 的项目简介。',
}

<HeroSection
  title="My App"
  subtitle="这是一个示例项目页面，展示 MDX 组件的使用方式"
/>

### 功能卡片（增强版）

<FeatureGrid cols={2}>
  <FeatureCard
    icon="⚡"
    title="快速高效"
    description="采用先进技术，提供流畅的使用体验"
    variant="gradient"
  />
  <FeatureCard
    icon="🔒"
    title="安全可靠"
    description="数据安全是我们的首要任务"
    variant="bordered"
  />
  <FeatureCard
    icon="🚀"
    title="简单易用"
    description="直观的界面设计，轻松上手"
  />
  <FeatureCard
    icon="💡"
    title="持续更新"
    description="不断优化迭代，满足您的需求"
  />
</FeatureGrid>

<StepList
  steps={[
    { title: "第一步", description: "开始使用应用" },
    { title: "第二步", description: "探索更多功能" }
  ]}
/>

<InfoSection
  title="隐私与安全"
  description="我们重视您的隐私保护"
  icon="🛡️"
>
  - 仅使用必要的权限
  - 数据本地处理，不上传云端
  - 符合相关法律法规
</InfoSection>

<DataTable
  headers={["功能", "状态"]}
  rows={[
    ["核心功能", "✅ 已上线"],
    ["高级功能", "🚧 开发中"]
  ]}
/>
```

**Step 2: 验证页面渲染**

运行: `npm run build`
预期: 构建成功，MDX 页面正确渲染

**Step 3: 提交**

```bash
git add content/my-app/project.mdx
git commit -m "docs: update project.mdx to showcase new MDX components

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

**Plan complete.** 4 个任务，预计时间 15-20 分钟。
