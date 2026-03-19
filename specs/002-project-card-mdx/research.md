# Research: 项目卡片展示 (Project Card Display)

**Feature**: 002-project-card-mdx
**Date**: 2026-03-19
**Status**: Complete

## Research Questions

### RQ-1: 如何从 MDX 文件导出结构化数据

**Finding**: MDX 编译为 JavaScript/TypeScript 后，支持顶层 `export const` 语法，与标准 ES 模块一致。

```mdx
export const projectData = {
  hero: { title: ["标题"], description: "描述" },
  sections: [...]
}
```

**Decision**: 采用直接 export 对象方式。原因：
1. 与现有 `export const metadata = {...}` 模式一致
2. 无需额外插件或构建工具
3. 类型安全（可定义 TypeScript interface）
4. 纯文本可编辑，体验友好

**Alternatives rejected**:
- gray-matter frontmatter → 需要 remark 插件，不支持复杂嵌套数据结构
- 纯 JS/TS 文件 → 失去 MDX 的 Markdown 友好编辑体验

---

### RQ-2: 图片引用和渲染策略

**Finding**: 现有 SolverJigsawPuzzle-web 项目通过 `imageUrl: "images/ipad-use-001.gif"` 字符串引用图片，在 `<img>` 标签中渲染。

**Decision**: 保持一致的字符串引用方式。原因：
1. 与现有参考实现完全一致，减少迁移成本
2. `content/{appId}/images/` 作为静态资源目录
3. 使用 `next/image` 的 `unoptimized` 模式或标准 `<img>` + `loading="lazy"` 避免构建时图片处理复杂性
4. 图片加载失败时通过 `onError` 降级显示占位图

**Note**: 需要在 `next.config.ts` 中配置 `images.unoptimized: true` 或将 `content/` 目录作为 static 资源处理。

---

### RQ-3: 组件库选择

**Finding**: SolverJigsawPuzzle-web 使用 Ionic React 组件（`IonCard`, `IonGrid`, `IonRow`, `IonCol`, `IonIcon`）。

**Decision**: 本项目不使用 Ionic，而是使用 Tailwind CSS 重建等价组件。原因：
1. 现有项目（my-apps-web）使用 Tailwind v4 + 原生 HTML，无 Ionic 依赖
2. 避免引入重型 UI 框架
3. 卡片样式使用 `@tailwindcss/typography` 的 prose 概念，但为项目页面定制组件
4. 组件逻辑简单，直接用 div + Tailwind 类实现

---

### RQ-4: 暗黑模式兼容性

**Finding**: 现有 docs 页面使用 `dark:prose-invert` 实现暗黑模式。Tailwind v4 支持 `dark:` 变体。

**Decision**: 所有 project 组件使用 Tailwind `dark:` 变体实现暗黑模式，与文档页面保持一致。

---

### RQ-5: 路由设计 — 独立 route vs 扩展现有 doc pipeline

**Finding**: 现有 doc route `app/(docs)/[app]/[...slug]/page.tsx` 将 MDX 作为 React 组件渲染，包裹在 `prose` 容器中。

**Decision**: 新建独立路由 `app/(docs)/[app]/project/page.tsx`。原因：
1. Project 页面布局与 doc 页面（prose）完全不同，不适合共用渲染逻辑
2. 独立路由避免在 doc pipeline 中引入条件分支（`if (slug === 'project') {...}`）
3. 未来如果需要更多定制化展示页面（如 changelog），扩展模式更清晰
4. generateStaticParams 中 project 作为独立入口

---

### RQ-6: 图片目录配置

**Finding**: Next.js 默认从 `public/` 目录提供静态文件。`content/` 目录默认不会被 Serve。

**Decision**: 在 `next.config.ts` 中添加 `images: { unoptimized: true }` 配置，并使用标准 `<img>` 标签引用 `content/{appId}/images/` 路径。

**Alternative considered**: 将图片复制到 `public/` → 增加了内容管理复杂度（需要在两个目录维护图片）

---

### Resolution Summary

| Question | Decision |
|----------|----------|
| MDX 数据导出 | 直接 `export const projectData = {...}` |
| 图片引用 | 字符串路径 + `<img loading="lazy">` + `onError` 降级 |
| 组件库 | Tailwind CSS 重建（无 Ionic） |
| 暗黑模式 | Tailwind `dark:` 变体 |
| 路由设计 | 独立 `project/page.tsx` 路由 |
| 图片目录 | `content/{appId}/images/` + `next/image unoptimized` |
