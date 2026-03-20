# Quickstart: Rename "Legal Docs" to "Docs"

**Feature**: `001-rename-legal-docs`
**Date**: 2026-03-19

## What This Does

将项目源代码中所有 "Legal Docs" 字符串替换为 "Docs"，共涉及 5 个源文件和 2 个计划文档。

## Files to Modify

1. `app/layout.tsx` — `title: 'Docs'`
2. `app/(docs)/page.tsx` — `<h1>Docs</h1>`
3. `app/(docs)/layout.tsx` — 页脚版权
4. `app/(docs)/[app]/page.tsx` — 动态标题
5. `components/header.tsx` — 回退默认值
6. `docs/plans/*.md` — 计划文档引用

## Verification

```bash
# 确保无遗漏
grep -r "Legal Docs" app/ components/
# 应返回空

# 启动开发服务器并手动验证页面
npm run dev
```
