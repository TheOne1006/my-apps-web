# Implementation Plan: 项目卡片展示 (Project Card Display)

**Branch**: `002-project-card-mdx` | **Date**: 2026-03-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-project-card-mdx/spec.md`

## Summary

将现有纯文本格式的 `project.mdx` 从 Markdown prose 渲染升级为基于卡片组件的富展示页面。核心方案：在 `app/(docs)/[app]/project/page.tsx` 新建独立路由，通过 `lib/docs.ts` 新增的 `getProject(appId)` 函数从 MDX 文件中读取导出的结构化数据（HeroSection + FeatureSection 数组），渲染为 HeroSection、FeatureSection、FeatureCard、ImageFeatureCard 组件。图片通过 `content/{appId}/images/` 目录管理，Next.js 图片优化自动处理。

## Technical Context

**Language/Version**: TypeScript / Next.js 16 + React 19
**Primary Dependencies**: `@next/mdx`, `@tailwindcss/typography`, `next-themes`
**Storage**: Filesystem — MDX content in `content/{appId}/`, images in `content/{appId}/images/`
**Testing**: Vitest (existing test framework)
**Target Platform**: Web (static generation, SSG)
**Project Type**: Web content site (Next.js App Router, MDX-driven)
**Performance Goals**: 页面加载 <3s，图片懒加载
**Constraints**: 保持与现有 doc 路由（privacy/terms/faq）的兼容性；暗黑模式支持；响应式布局

## Constitution Check

*GATE: Constitution file is a template with no content — no gates to evaluate.*

**Post-Phase-1 Status**: Constitution remains a template. No compliance issues identified.

## Phase 0: Research

### Research Findings

#### Decision 1: 如何从 MDX 文件导出结构化数据

**Chosen**: MDX 支持在文件内直接 export JavaScript 对象。

```mdx
export const projectData = {
  hero: { title: ["标题"], description: "描述" },
  sections: [
    {
      title: "区域标题",
      backgroundColor: "light",
      cards: [
        { id: "card-1", type: "image", title: "卡片标题", subtitle: "副标题", imageUrl: "./images/example.png", layout: "text-top" }
      ]
    }
  ]
}
```

**Rationale**: MDX 编译为 React 组件时，支持顶层 `export const`，与普通 JS 模块一致。MDX 内容主体可为空（只作为数据文件使用），或包含简介文字供 SEO 使用。参考现有 `privacy.mdx` 中的 `export const metadata = {...}` 模式。

**Alternatives rejected**:
- 将 project.mdx 改为纯 JS/TS 文件 → 失去 MDX 的编辑友好性（纯文本编辑体验）
- 使用 frontmatter（gray-matter）→ 需要额外的 remark 插件，增加复杂度，且 frontmatter 不支持复杂数据结构

#### Decision 2: 图片引用方式

**Chosen**: 图片存放于 `content/{appId}/images/`，MDX 中使用相对路径 `./images/xxx.png` 引用，通过 Next.js `<img>` 标签或 `next/image` 渲染。

**Rationale**:
- 与现有 SolverJigsawPuzzle-web 项目的图片引用方式一致（`imageUrl: "images/ipad-use-001.gif"`）
- `content/` 目录可通过 Next.js 配置为静态资源目录
- `next/image` 提供自动优化、懒加载、WebP 转换

**Alternatives considered**:
- 使用 `public/` 目录 → 需要手动同步图片到 public，麻烦
- 使用外部 CDN URL → 依赖网络，不适合离线场景

#### Decision 3: 路由设计

**Chosen**: 新建 `app/(docs)/[app]/project/page.tsx` 作为独立路由。

**Rationale**:
- Project 页面与 doc 页面（privacy/terms/faq）有本质区别——前者是卡片组件布局，后者是 prose 排版
- 独立路由使逻辑更清晰，避免在 doc 渲染 pipeline 中引入条件分支
- `generateStaticParams` 中为 project 路由单独处理
- URL 为 `/{appId}/project`，符合文档路由约定

## Project Structure

### Source Code

```text
my-apps-web/
├── app/
│   └── (docs)/
│       └── [app]/
│           └── project/
│               └── page.tsx          # NEW: Project MDX 渲染页面
│           └── [...slug]/
│               └── page.tsx          # MODIFIED: generateStaticParams 排除 project.mdx
├── components/
│   ├── project/                      # NEW: 独立 project 展示组件
│   │   ├── HeroSection.tsx          # NEW: 英雄区域组件
│   │   ├── HeroSection.css          # NEW: 英雄区域样式
│   │   ├── FeatureSection.tsx       # NEW: 功能区域组件
│   │   ├── FeatureSection.css      # NEW: 功能区域样式
│   │   ├── FeatureCard.tsx         # NEW: 文字卡片组件（移植自 Ionic）
│   │   ├── FeatureCard.css         # NEW: 文字卡片样式
│   │   └── ImageFeatureCard.tsx     # NEW: 图片卡片组件（移植自 Ionic）
│   │       └── ImageFeatureCard.css # NEW: 图片卡片样式
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   └── docs.ts                      # MODIFIED: 新增 getProject() 函数
├── content/
│   └── solver-jigsaw-puzzle/         # 示例应用
│       ├── project.mdx              # MODIFIED: 从纯文本改为结构化数据导出
│       └── images/                   # NEW: 项目展示图片目录
│           ├── iphone-home-empty.png
│           ├── iphone-load-ref.png
│           └── ...
├── mdx-components.tsx
└── next.config.ts                    # MODIFIED: 配置 content/ 目录静态资源支持

tests/
├── unit/
│   └── lib/
│       └── docs.test.ts              # MODIFIED: 新增 getProject 测试
```

### Key Files to Create

| File | Description |
|------|-------------|
| `app/(docs)/[app]/project/page.tsx` | Project 页面路由 |
| `components/project/HeroSection.tsx` | 英雄区域组件 |
| `components/project/HeroSection.css` | 英雄区域样式 |
| `components/project/FeatureSection.tsx` | 功能区域组件 |
| `components/project/FeatureSection.css` | 功能区域样式 |
| `components/project/FeatureCard.tsx` | 文字卡片组件 |
| `components/project/FeatureCard.css` | 文字卡片样式 |
| `components/project/ImageFeatureCard.tsx` | 图片卡片组件 |
| `components/project/ImageFeatureCard.css` | 图片卡片样式 |
| `lib/docs.ts` (modified) | 新增 `getProject()` 函数 |
| `tests/unit/lib/docs.test.ts` | 新增测试 |

### Key Files to Modify

| File | Modification |
|------|-------------|
| `content/solver-jigsaw-puzzle/project.mdx` | 改为导出结构化数据（projectData），移除纯文本内容 |
| `content/solver-jigsaw-puzzle/images/` | 复制 SolverJigsawPuzzle-web 的图片 |
| `lib/docs.ts` | 新增 `getProject()` 和 `getProjectPaths()` 函数 |
| `app/(docs)/[app]/[...slug]/page.tsx` | generateStaticParams 排除 `project.mdx` |
| `app/(docs)/[app]/project/page.tsx` | 在 generateStaticParams 中添加 project 路由 |

## Complexity Tracking

No complexity violations. All components are adaptations of existing Ionic components from the SolverJigsawPuzzle-web reference project. Single project, no new external services or databases.
