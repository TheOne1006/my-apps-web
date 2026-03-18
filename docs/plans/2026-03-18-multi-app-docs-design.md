# 多应用文档站点设计文档

## 概述

构建一个多应用文档展示站点，用于展示各应用的用户协议、隐私政策等法律文档。支持 iOS 内嵌访问，部署到 Vercel。

## 需求总结

| 项目 | 选择 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 样式 | Tailwind CSS v4 + next-themes + tailwind-merge |
| MDX | @next/mdx（文件即路由） |
| 测试 | Vitest |
| APP 数量 | 4-10 个 |
| URL 结构 | `/app-name/category/document-name` |
| 首页 | 简单列表展示所有 APP |
| 元数据 | title, description |
| 部署 | Vercel |

## 技术栈

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "@next/mdx": "^15.x",
    "@mdx-js/loader": "^3.x",
    "@mdx-js/react": "^3.x",
    "next-themes": "^0.4.x",
    "tailwind-merge": "^3.x",
    "clsx": "^2.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/node": "^22.x",
    "@types/react": "^19.x",
    "@types/mdx": "^2.x",
    "tailwindcss": "^4.x",
    "@tailwindcss/postcss": "^4.x",
    "@tailwindcss/typography": "^0.5.x",
    "vitest": "^3.x",
    "@vitejs/plugin-react": "^4.x"
  }
}
```

## 项目结构

```
my-apps-web/
├── app/
│   ├── (docs)/                 # 文档路由组
│   │   ├── layout.tsx          # 共享布局（Header + 主题）
│   │   ├── page.tsx            # 首页：APP 列表
│   │   └── [app]/              # 动态 APP 路由
│   │       ├── page.tsx        # APP 详情页（文档列表）
│   │       └── [...slug]/      # 嵌套文档路径
│   │           └── page.tsx    # 文档渲染页面
│   ├── layout.tsx              # 根布局（主题 Provider）
│   ├── globals.css             # 全局样式 + Tailwind
│   └── not-found.tsx           # 404 页面
├── components/
│   ├── ui/                     # 基础 UI 组件
│   │   └── button.tsx
│   ├── header.tsx              # 顶部导航
│   ├── app-card.tsx            # 首页 APP 卡片
│   ├── theme-toggle.tsx        # 主题切换按钮
│   └── mdx-components.tsx      # MDX 自定义组件
├── lib/
│   ├── utils.ts                # 工具函数（cn 等）
│   └── docs.ts                 # 文档读取工具
├── content/                    # MDX 内容目录
│   └── apps.json               # APP 元数据配置
├── mdx-components.tsx          # 全局 MDX 组件注册
├── next.config.ts              # Next.js + MDX 配置
├── postcss.config.mjs          # PostCSS 配置
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

## 路由设计

### URL 映射规则

```
URL                                    →  文件位置
─────────────────────────────────────────────────────────
/                                      →  app/(docs)/page.tsx (首页)
/my-app                                →  app/(docs)/[app]/page.tsx (APP 详情)
/my-app/legal/privacy-policy           →  content/my-app/legal/privacy-policy.mdx
/my-app/legal/terms-of-service         →  content/my-app/legal/terms-of-service.mdx
/my-app/faq                            →  content/my-app/faq.mdx
```

### Content 目录结构

```
content/
├── apps.json                    # APP 元数据配置
├── my-app/
│   ├── legal/
│   │   ├── privacy-policy.mdx
│   │   └── terms-of-service.mdx
│   └── faq.mdx
├── another-app/
│   ├── privacy.mdx
│   └── terms.mdx
└── third-app/
    └── legal/
        ├── privacy-policy.mdx
        └── terms-of-service.mdx
```

### apps.json 配置

```json
[
  {
    "id": "my-app",
    "name": "My App",
    "description": "这是我的第一个应用",
    "icon": "📱"
  },
  {
    "id": "another-app",
    "name": "Another App",
    "description": "另一个应用描述",
    "icon": "🚀"
  }
]
```

### MDX 文件格式

每个 MDX 文件导出 metadata 对象：

```mdx
export const metadata = {
  title: '隐私政策',
  description: 'My App 的隐私政策，说明我们如何收集和使用您的数据。',
}

# 隐私政策

最后更新：2024年1月1日

## 数据收集

我们收集以下数据...
```

## 页面布局

```
┌─────────────────────────────────────────────────┐
│  Header (Logo + Theme Toggle)                   │
├─────────────────────────────────────────────────┤
│                                                 │
│              Main Content                       │
│                                                 │
│   - 首页：APP 卡片网格                          │
│   - APP 详情页：文档列表                        │
│   - 文档页：Prose 排版的 MDX 内容               │
│                                                 │
├─────────────────────────────────────────────────┤
│  Footer (可选)                                  │
└─────────────────────────────────────────────────┘
```

## 核心组件

### Header

- 左侧：Logo + 站点名称（点击返回首页）
- 右侧：主题切换按钮（明/暗模式）

### 首页 - APP 卡片网格

展示所有 APP 的卡片，每个卡片包含：
- 图标
- APP 名称
- 描述
- 查看链接

### APP 详情页 - 文档列表

- 返回首页链接
- APP 名称和图标
- 该 APP 下所有文档的列表

### 文档页面

- 返回 APP 详情页链接
- MDX 内容渲染（使用 prose 样式）

## 样式系统

- **主题**：使用 `next-themes` 实现明/暗主题切换
- **排版**：`@tailwindcss/typography` 插件，`prose` 类美化 MDX 内容
- **工具函数**：`tailwind-merge` + `clsx` 合并类名

## 核心实现

### Next.js + MDX 配置

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

### 文档读取工具 (lib/docs.ts)

主要功能：
- `getApps()` - 读取 APP 列表配置
- `getApp(appId)` - 获取单个 APP 信息
- `getDocPaths(appId)` - 获取 APP 下所有文档路径
- `getDoc(appId, slug)` - 读取文档内容和元数据

### 动态路由 (app/(docs)/[app]/[...slug]/page.tsx)

- `generateStaticParams()` - 生成所有静态路径
- `generateMetadata()` - 生成页面元数据
- 默认导出 - 渲染文档内容

## 配置文件

### PostCSS

```javascript
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### 全局样式

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
}
```

### MDX 全局组件

```typescript
// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-blue-600 dark:text-blue-400 underline">
        {children}
      </a>
    ),
    ...components,
  }
}
```

## 测试

使用 Vitest 进行单元测试：

- 测试 `lib/docs.ts` 中的工具函数
- 测试 APP 配置读取
- 测试文档路径生成

## 部署

- 平台：Vercel
- 构建命令：`next build`
- 输出：静态生成（SSG）

## 参考资源

- [Getting started with Next.js 15 and MDX](https://dev.to/ptpaterson/getting-started-with-nextjs-15-and-mdx-305k)
- [Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)
- [vercel-labs/json-render](https://github.com/vercel-labs/json-render)
