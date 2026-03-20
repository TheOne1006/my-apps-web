# 多应用文档站点实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建一个多应用文档展示站点，支持 4-10 个 APP 的法律文档（隐私政策、用户协议等）展示，部署到 Vercel。

**Architecture:** 使用 Next.js 15 App Router + @next/mdx 实现文件系统路由，MDX 文件放在 content/ 目录，通过动态路由 `[app]/[...slug]` 渲染。使用 Tailwind CSS v4 + next-themes 实现明暗主题切换。

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, @next/mdx, next-themes, Vitest

---

## Task 1: 项目初始化与依赖安装

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`

**Step 1: 初始化 Next.js 项目**

Run: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*" --use-npm`

选择：
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No (我们使用根目录 app/)
- App Router: Yes
- Turbopack: Yes
- Import alias: @/*

**Step 2: 安装 MDX 相关依赖**

Run: `npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx remark-gfm`

**Step 3: 安装主题和工具依赖**

Run: `npm install next-themes tailwind-merge clsx`

**Step 4: 安装测试依赖**

Run: `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom`

**Step 5: 验证安装**

Run: `npm ls --depth=0`

Expected: 显示所有已安装的依赖

**Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json
git commit -m "chore: initialize project with dependencies"
```

---

## Task 2: Tailwind CSS v4 配置

**Files:**
- Create: `postcss.config.mjs`
- Modify: `app/globals.css`

**Step 1: 创建 PostCSS 配置**

```javascript
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

**Step 2: 更新全局样式**

```css
/* app/globals.css */
@import 'tailwindcss';
@plugin "@tailwindcss/typography";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: system-ui, -apple-system, sans-serif;
}
```

**Step 3: 验证 Tailwind 配置**

Run: `npm run build`

Expected: 构建成功，无错误

**Step 4: Commit**

```bash
git add postcss.config.mjs app/globals.css
git commit -m "style: configure Tailwind CSS v4 with typography plugin"
```

---

## Task 3: MDX 配置

**Files:**
- Create: `next.config.ts`
- Create: `mdx-components.tsx`

**Step 1: 创建 Next.js + MDX 配置**

```typescript
// next.config.ts
import { NextConfig } from 'next'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

**Step 2: 创建全局 MDX 组件注册**

```typescript
// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b pb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mt-6 mb-3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    ...components,
  }
}
```

**Step 3: 验证 MDX 配置**

Run: `npm run build`

Expected: 构建成功

**Step 4: Commit**

```bash
git add next.config.ts mdx-components.tsx
git commit -m "feat: configure MDX with custom components"
```

---

## Task 4: 工具函数

**Files:**
- Create: `lib/utils.ts`
- Create: `lib/docs.ts`

**Step 1: 创建类名合并工具**

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Step 2: 创建文档读取工具**

```typescript
// lib/docs.ts
import fs from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'

export interface AppMeta {
  id: string
  name: string
  description: string
  icon: string
}

export interface DocMeta {
  title: string
  description: string
}

export interface DocInfo {
  slug: string[]
  meta: DocMeta
}

// 读取 APP 列表配置
export const getApps = cache(async (): Promise<AppMeta[]> => {
  const content = await fs.readFile(
    path.join(process.cwd(), 'content/apps.json'),
    'utf-8'
  )
  return JSON.parse(content)
})

// 获取单个 APP 信息
export const getApp = cache(async (appId: string): Promise<AppMeta | null> => {
  const apps = await getApps()
  return apps.find(app => app.id === appId) ?? null
})

// 获取 APP 下所有文档路径
export const getDocPaths = cache(async (appId: string): Promise<string[][]> => {
  const appDir = path.join(process.cwd(), 'content', appId)

  try {
    await fs.access(appDir)
  } catch {
    return []
  }

  const paths: string[][] = []

  async function scan(dir: string, segments: string[] = []) {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        await scan(path.join(dir, entry.name), [...segments, entry.name])
      } else if (entry.name.endsWith('.mdx') && entry.name !== '_index.mdx') {
        const slug = entry.name.replace(/\.mdx$/, '')
        paths.push([...segments, slug])
      }
    }
  }

  await scan(appDir)
  return paths
})

// 获取 APP 下所有文档信息
export const getDocs = cache(async (appId: string): Promise<DocInfo[]> => {
  const paths = await getDocPaths(appId)
  const docs: DocInfo[] = []

  for (const slug of paths) {
    try {
      const mod = await import(`@/content/${appId}/${slug.join('/')}.mdx`)
      docs.push({
        slug,
        meta: mod.metadata ?? { title: slug.at(-1) ?? '', description: '' },
      })
    } catch {
      // 忽略导入失败的文件
    }
  }

  return docs
})

// 读取文档内容
export const getDoc = cache(async (
  appId: string,
  slug: string[]
): Promise<{ meta: DocMeta; content: React.ComponentType } | null> => {
  try {
    const mod = await import(`@/content/${appId}/${slug.join('/')}.mdx`)
    return {
      meta: mod.metadata ?? { title: slug.at(-1) ?? '', description: '' },
      content: mod.default,
    }
  } catch {
    return null
  }
})
```

**Step 3: 创建 lib 目录（如果不存在）**

Run: `mkdir -p lib`

**Step 4: Commit**

```bash
git add lib/
git commit -m "feat: add utility functions for docs handling"
```

---

## Task 5: 主题 Provider

**Files:**
- Create: `components/theme-provider.tsx`

**Step 1: 创建主题 Provider 组件**

```typescript
// components/theme-provider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

**Step 2: 创建 components 目录**

Run: `mkdir -p components`

**Step 3: Commit**

```bash
git add components/theme-provider.tsx
git commit -m "feat: add theme provider component"
```

---

## Task 6: Header 组件

**Files:**
- Create: `components/header.tsx`
- Create: `components/theme-toggle.tsx`

**Step 1: 创建主题切换按钮**

```typescript
// components/theme-toggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 w-9 h-9" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```

**Step 2: 创建 Header 组件**

```typescript
// components/header.tsx
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto max-w-5xl">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl">📄</span>
          <span className="font-semibold">Docs</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
```

**Step 3: Commit**

```bash
git add components/theme-toggle.tsx components/header.tsx
git commit -m "feat: add header and theme toggle components"
```

---

## Task 7: AppCard 组件

**Files:**
- Create: `components/app-card.tsx`

**Step 1: 创建 APP 卡片组件**

```typescript
// components/app-card.tsx
import Link from 'next/link'
import type { AppMeta } from '@/lib/docs'

interface AppCardProps {
  app: AppMeta
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Link
      href={`/${app.id}`}
      className="group block p-6 rounded-xl border bg-card hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{app.icon}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {app.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {app.description}
          </p>
        </div>
        <span className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          →
        </span>
      </div>
    </Link>
  )
}
```

**Step 2: Commit**

```bash
git add components/app-card.tsx
git commit -m "feat: add app card component"
```

---

## Task 8: 根布局

**Files:**
- Modify: `app/layout.tsx`

**Step 1: 更新根布局**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Docs',
  description: '多应用法律文档展示站点',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: update root layout with theme provider"
```

---

## Task 9: 文档布局

**Files:**
- Create: `app/(docs)/layout.tsx`

**Step 1: 创建文档路由组目录**

Run: `mkdir -p "app/(docs)"`

**Step 2: 创建文档布局**

```typescript
// app/(docs)/layout.tsx
import { Header } from '@/components/header'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t">
        © {new Date().getFullYear()} Docs. All rights reserved.
      </footer>
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add "app/(docs)/layout.tsx"
git commit -m "feat: add docs layout with header and footer"
```

---

## Task 10: 首页

**Files:**
- Create: `app/(docs)/page.tsx`

**Step 1: 创建首页**

```typescript
// app/(docs)/page.tsx
import { getApps } from '@/lib/docs'
import { AppCard } from '@/components/app-card'

export default async function HomePage() {
  const apps = await getApps()

  return (
    <div className="container px-4 py-12 mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Docs</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          选择一个应用查看其法律文档
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add "app/(docs)/page.tsx"
git commit -m "feat: add home page with app list"
```

---

## Task 11: APP 详情页

**Files:**
- Create: `app/(docs)/[app]/page.tsx`

**Step 1: 创建动态路由目录**

Run: `mkdir -p "app/(docs)/[app]"`

**Step 2: 创建 APP 详情页**

```typescript
// app/(docs)/[app]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getApp, getApps, getDocs } from '@/lib/docs'

interface PageProps {
  params: Promise<{ app: string }>
}

export async function generateStaticParams() {
  const apps = await getApps()
  return apps.map((app) => ({ app: app.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { app: appId } = await params
  const appMeta = await getApp(appId)

  if (!appMeta) return { title: 'Not Found' }

  return {
    title: `${appMeta.name} - Docs`,
    description: appMeta.description,
  }
}

export default async function AppPage({ params }: PageProps) {
  const { app: appId } = await params
  const [appMeta, docs] = await Promise.all([
    getApp(appId),
    getDocs(appId),
  ])

  if (!appMeta) notFound()

  return (
    <div className="container px-4 py-12 mx-auto max-w-3xl">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
      >
        ← 返回首页
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{appMeta.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{appMeta.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{appMeta.description}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 border-b pb-2">文档列表</h2>

      {docs.length === 0 ? (
        <p className="text-gray-500">暂无文档</p>
      ) : (
        <ul className="space-y-3">
          {docs.map((doc) => (
            <li key={doc.slug.join('/')}>
              <Link
                href={`/${appId}/${doc.slug.join('/')}`}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <span className="font-medium">{doc.meta.title}</span>
                <span className="text-gray-400">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add "app/(docs)/[app]/page.tsx"
git commit -m "feat: add app detail page with doc list"
```

---

## Task 12: 文档页面

**Files:**
- Create: `app/(docs)/[app]/[...slug]/page.tsx`

**Step 1: 创建嵌套动态路由目录**

Run: `mkdir -p "app/(docs)/[app]/[...slug]"`

**Step 2: 创建文档页面**

```typescript
// app/(docs)/[app]/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getApp, getApps, getDoc, getDocPaths } from '@/lib/docs'

interface PageProps {
  params: Promise<{ app: string; slug: string[] }>
}

export async function generateStaticParams() {
  const apps = await getApps()
  const params: { app: string; slug: string[] }[] = []

  for (const app of apps) {
    const paths = await getDocPaths(app.id)
    params.push(...paths.map((slug) => ({ app: app.id, slug })))
  }

  return params
}

export async function generateMetadata({ params }: PageProps) {
  const { app, slug } = await params
  const doc = await getDoc(app, slug)

  if (!doc) return { title: 'Not Found' }

  return {
    title: `${doc.meta.title} - Docs`,
    description: doc.meta.description,
  }
}

export default async function DocPage({ params }: PageProps) {
  const { app: appId, slug } = await params
  const [appMeta, doc] = await Promise.all([
    getApp(appId),
    getDoc(appId, slug),
  ])

  if (!appMeta || !doc) notFound()

  const Content = doc.content

  return (
    <article className="container px-4 py-12 mx-auto max-w-3xl">
      <nav className="mb-8">
        <Link
          href={`/${appId}`}
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          ← {appMeta.name}
        </Link>
      </nav>

      <div className="prose dark:prose-invert max-w-none">
        <Content />
      </div>
    </article>
  )
}
```

**Step 3: Commit**

```bash
git add "app/(docs)/[app]/[...slug]/page.tsx"
git commit -m "feat: add doc page with MDX rendering"
```

---

## Task 13: 404 页面

**Files:**
- Create: `app/not-found.tsx`

**Step 1: 创建 404 页面**

```typescript
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          页面不存在
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90 transition-opacity"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: add 404 not found page"
```

---

## Task 14: 内容文件

**Files:**
- Create: `content/apps.json`
- Create: `content/my-app/legal/privacy-policy.mdx`
- Create: `content/my-app/legal/terms-of-service.mdx`
- Create: `content/another-app/privacy.mdx`

**Step 1: 创建内容目录**

Run: `mkdir -p content/my-app/legal content/another-app`

**Step 2: 创建 APP 配置**

```json
// content/apps.json
[
  {
    "id": "my-app",
    "name": "My App",
    "description": "这是我的第一个应用，提供优质的服务体验",
    "icon": "📱"
  },
  {
    "id": "another-app",
    "name": "Another App",
    "description": "另一个出色的应用，满足您的各种需求",
    "icon": "🚀"
  }
]
```

**Step 3: 创建示例 MDX 文档**

```mdx
// content/my-app/legal/privacy-policy.mdx
export const metadata = {
  title: '隐私政策',
  description: 'My App 的隐私政策，说明我们如何收集、使用和保护您的个人信息。',
}

# 隐私政策

**最后更新：2024年1月1日**

感谢您使用 My App。本隐私政策说明了我们如何收集、使用和保护您的个人信息。

## 信息收集

我们可能收集以下类型的信息：

- **账户信息**：当您注册时，我们会收集您的电子邮件地址和用户名。
- **使用数据**：我们会收集关于您如何使用我们服务的信息。
- **设备信息**：我们可能收集关于您用于访问我们服务的设备的信息。

## 信息使用

我们使用收集的信息用于：

1. 提供和维护我们的服务
2. 改进和个性化您的体验
3. 与您沟通关于服务的信息
4. 保护我们服务的安全

## 信息保护

我们采取适当的安全措施来保护您的个人信息，包括：

- 数据加密
- 访问控制
- 定期安全审计

## 联系我们

如果您对本隐私政策有任何疑问，请通过以下方式联系我们：

- 电子邮件：privacy@myapp.example.com
```

```mdx
// content/my-app/legal/terms-of-service.mdx
export const metadata = {
  title: '服务条款',
  description: 'My App 的服务条款，规定您使用我们服务的条件和规则。',
}

# 服务条款

**最后更新：2024年1月1日**

欢迎使用 My App。使用我们的服务即表示您同意以下条款。

## 服务描述

My App 是一款提供 [服务描述] 的应用程序。

## 使用规则

在使用我们的服务时，您同意：

1. 遵守所有适用的法律法规
2. 不进行任何可能损害服务的行为
3. 不侵犯其他用户的权利

## 知识产权

My App 及其所有内容、功能和设计均受知识产权法保护。

## 免责声明

我们不对以下情况承担责任：

- 因使用或无法使用服务而导致的任何损失
- 第三方的行为或内容

## 条款变更

我们保留随时修改这些条款的权利。变更将在发布后立即生效。
```

```mdx
// content/another-app/privacy.mdx
export const metadata = {
  title: '隐私政策',
  description: 'Another App 的隐私政策。',
}

# 隐私政策

**最后更新：2024年1月1日**

欢迎使用 Another App。本政策说明我们如何处理您的数据。

## 数据收集

我们收集最少必要的数据以提供服务：

- 电子邮件地址
- 使用统计

## 数据安全

您的数据安全是我们的首要任务。我们使用行业标准的安全措施。
```

**Step 4: Commit**

```bash
git add content/
git commit -m "content: add sample apps and documents"
```

---

## Task 15: Vitest 配置与测试

**Files:**
- Create: `vitest.config.ts`
- Create: `lib/docs.test.ts`

**Step 1: 创建 Vitest 配置**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts', '**/*.test.tsx'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

**Step 2: 添加测试脚本到 package.json**

在 `package.json` 的 `scripts` 中添加：

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

**Step 3: 创建文档工具测试**

```typescript
// lib/docs.test.ts
import { describe, it, expect } from 'vitest'
import { getApps } from './docs'

describe('docs utilities', () => {
  it('should load apps from apps.json', async () => {
    const apps = await getApps()
    expect(Array.isArray(apps)).toBe(true)
    expect(apps.length).toBeGreaterThan(0)
  })

  it('should have required app properties', async () => {
    const apps = await getApps()
    for (const app of apps) {
      expect(app).toHaveProperty('id')
      expect(app).toHaveProperty('name')
      expect(app).toHaveProperty('description')
      expect(app).toHaveProperty('icon')
    }
  })
})
```

**Step 4: 运行测试**

Run: `npm run test:run`

Expected: 测试通过

**Step 5: Commit**

```bash
git add vitest.config.ts lib/docs.test.ts package.json
git commit -m "test: add vitest config and initial tests"
```

---

## Task 16: 最终验证与构建

**Step 1: 删除旧的 app/page.tsx（如果存在）**

Run: `rm -f app/page.tsx`

**Step 2: 运行类型检查**

Run: `npm run lint`

Expected: 无错误

**Step 3: 运行构建**

Run: `npm run build`

Expected: 构建成功，显示所有生成的静态页面

**Step 4: 本地测试**

Run: `npm run dev`

访问 http://localhost:3000 验证：
- 首页显示 APP 列表
- 点击 APP 进入详情页
- 点击文档查看 MDX 内容
- 主题切换正常工作

**Step 5: 最终 Commit**

```bash
git add -A
git commit -m "chore: final cleanup and verification"
```

---

## Task 17: 清理和优化

**Step 1: 添加 .gitignore（如果不存在）**

确保 `.gitignore` 包含：

```
# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# next.js
.next/
out/

# production
build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

**Step 2: 验证项目结构**

Run: `find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.mdx" -o -name "*.json" | grep -v node_modules | grep -v .next | sort`

Expected: 显示正确的项目结构

**Step 3: 最终 Commit**

```bash
git add .gitignore
git commit -m "chore: update gitignore"
```

---

## 完成检查清单

- [ ] 项目初始化完成
- [ ] Tailwind CSS v4 配置正确
- [ ] MDX 配置正确
- [ ] 工具函数可用
- [ ] 主题切换正常
- [ ] 首页显示 APP 列表
- [ ] APP 详情页显示文档列表
- [ ] 文档页面正确渲染 MDX
- [ ] 404 页面正常
- [ ] 测试通过
- [ ] 构建成功
