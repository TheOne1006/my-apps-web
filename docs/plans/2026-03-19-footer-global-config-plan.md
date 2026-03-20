# Footer 全局配置实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 Footer 从内联代码重构为全局配置 + 组件，实现所有权声明、联系方式、备案信息的统一管理。

**Architecture:** 在 `lib/config.ts` 定义站点全局配置，创建 `components/footer.tsx` 组件从配置读取数据，在 `app/(docs)/layout.tsx` 中引入组件替换内联代码。

**Tech Stack:** TypeScript, Next.js, React, Tailwind CSS

---

## Task 1: 创建 `lib/config.ts` 全局配置

**Files:**
- Create: `lib/config.ts`

**Step 1: 创建配置文件**

```ts
export const siteFooter = {
  copyright: {
    name: "My Apps",
    year: 2026,
  },
  contact: {
    email: "support@example.com",
    links: [
      { label: "GitHub", url: "https://github.com/xxx" },
      { label: "Twitter", url: "https://twitter.com/xxx" },
    ],
  },
  icp: "京ICP备2026000000号-1",
}
```

**Step 2: 提交**

```bash
git add lib/config.ts
git commit -m "feat: add site footer global config"
```

---

## Task 2: 创建 `components/footer.tsx` Footer 组件

**Files:**
- Create: `components/footer.tsx`

**Step 1: 创建 Footer 组件**

```tsx
import Link from "next/link"
import { siteFooter } from "@/lib/config"

export function Footer() {
  const year = siteFooter.copyright.year ?? new Date().getFullYear()
  const parts: React.ReactNode[] = []

  // Copyright
  parts.push(
    <span key="copyright">
      © {year} {siteFooter.copyright.name}
    </span>
  )

  // Email
  if (siteFooter.contact.email) {
    parts.push(
      <a
        key="email"
        href={`mailto:${siteFooter.contact.email}`}
        className="hover:underline"
      >
        {siteFooter.contact.email}
      </a>
    )
  }

  // Social links
  for (const link of siteFooter.contact.links) {
    parts.push(
      <a
        key={link.label}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {link.label}
      </a>
    )
  }

  // ICP
  if (siteFooter.icp) {
    parts.push(<span key="icp">{siteFooter.icp}</span>)
  }

  return (
    <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t">
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && " · "}
          {part}
        </span>
      ))}
    </footer>
  )
}
```

**Step 2: 提交**

```bash
git add components/footer.tsx
git commit -m "feat: add footer component"
```

---

## Task 3: 在 Docs Layout 中引入 Footer 组件

**Files:**
- Modify: `app/(docs)/layout.tsx`

**Step 1: 更新 layout.tsx**

添加 import 并替换内联 footer：

```tsx
import { Footer } from "@/components/footer"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

**Step 2: 运行验证**

```bash
npm test && npm run lint
```

**Step 3: 提交**

```bash
git add app/(docs)/layout.tsx
git commit -m "feat: use global footer component in docs layout"
```

---

## 预期最终文件结构

```
lib/config.ts          ← 全局配置（新增）
components/footer.tsx  ← Footer 组件（新增）
app/(docs)/layout.tsx  ← 引入 Footer 组件（修改）
```
