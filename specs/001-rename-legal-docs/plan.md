# Implementation Plan: Rename "Legal Docs" to "Docs"

**Branch**: `001-rename-legal-docs` | **Date**: 2026-03-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-rename-legal-docs/spec.md`

## Summary

将项目中所有 "Legal Docs" 文本替换为 "Docs"。这是一个文本替换任务，影响 5 个源文件和 2 个计划文档中的字符串字面量。无需架构变更或新增依赖。

## Technical Context

**Language/Version**: TypeScript / Next.js (Next.js 15, React, TypeScript)
**Primary Dependencies**: Next.js 框架本身，无需新增依赖
**Storage**: N/A（纯文本替换）
**Testing**: 无需测试框架变更，验证通过页面手动访问
**Target Platform**: Web（Next.js 应用）
**Project Type**: Web application / Documentation site
**Performance Goals**: N/A
**Constraints**: 替换必须完整，不得遗漏任何出现 "Legal Docs" 的位置
**Scale/Scope**: 5 个源文件 + 2 个计划文档，共约 7 处引用

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution 为模板文件，无实际约束规则。本次任务为纯文本替换，无技术复杂度，无需论证。

**Gate Result**: PASS — Constitution 无约束条件适用于本任务

## Phase 0: Research

本任务无技术未知项，无需研究。所有替换目标已在 grep 结果中明确：

| 文件 | 替换位置 | 行号 |
|------|---------|------|
| `app/layout.tsx` | `title: 'Legal Docs'` | 6 |
| `app/(docs)/page.tsx` | H1 主标题 `<h1>Legal Docs</h1>` | 13 |
| `app/(docs)/layout.tsx` | 页脚版权 `© ... Legal Docs` | 12 |
| `app/(docs)/[app]/page.tsx` | 动态标题 `${appMeta.name} - Legal Docs` | 21 |
| `components/header.tsx` | 回退值 `appName ?? 'Legal Docs'` | 10 |
| `docs/plans/*.md` | 计划文档中 4 处引用 | 多行 |

## Phase 1: Design & Contracts

本任务为纯文本替换，不涉及数据模型变更或接口契约。

### Source Code Changes

```text
app/
├── layout.tsx               # title: 'Docs'
├── (docs)/
│   ├── page.tsx             # <h1>Docs</h1>
│   ├── layout.tsx           # © {year} Docs. All rights reserved.
│   └── [app]/
│       └── page.tsx         # title: `${appMeta.name} - Docs`

components/
└── header.tsx               # appName ?? 'Docs'

docs/plans/
├── 2026-03-18-multi-app-docs-design.md
└── 2026-03-18-multi-app-docs-implementation.md
```

**变更说明**: 所有出现 "Legal Docs" 字面量的位置替换为 "Docs"。

### Data Model

N/A — 本次变更不涉及数据模型。

### Contracts

N/A — 本次变更不涉及接口契约。

## Phase 2: Implementation Tasks

> 由 `/speckit.tasks` 命令生成

## Verification

手动验证清单：
- [ ] 访问首页，确认 H1 标题为 "Docs"
- [ ] 访问 `/my-app`，确认浏览器标题为 "My App - Docs"
- [ ] 访问 `/another-app`，确认浏览器标题为 "Another App - Docs"
- [ ] 访问 `/third-app`，确认浏览器标题为 "Third App - Docs"
- [ ] 访问 `/fourth-app`，确认浏览器标题为 "Fourth App - Docs"
- [ ] 确认页脚版权信息为 "Docs"
- [ ] 确认 Header 组件无 "Legal Docs" 字面量
- [ ] `grep -r "Legal Docs" app/ components/` 返回空结果
