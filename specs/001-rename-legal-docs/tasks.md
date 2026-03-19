# Tasks: Rename "Legal Docs" to "Docs"

**Input**: Design documents from `/specs/001-rename-legal-docs/`
**Prerequisites**: plan.md, spec.md, data-model.md, quickstart.md

## Phase 1: User Story 1 — 访问文档站点首页 (Priority: P1) 🎯 MVP

**Goal**: 首页标题从 "Legal Docs" 替换为 "Docs"

**Independent Test**: 访问首页，H1 标题和浏览器标签页标题均显示 "Docs"

- [x] T001 [P] [US1] 替换 `app/layout.tsx` 中的 `title: 'Legal Docs'` 为 `title: 'Docs'`
- [x] T002 [P] [US1] 替换 `app/(docs)/page.tsx` 中的 `<h1>Legal Docs</h1>` 为 `<h1>Docs</h1>`
- [x] T003 [P] [US1] 替换 `app/(docs)/layout.tsx` 页脚版权中的 `Legal Docs` 为 `Docs`
- [x] T004 [US1] 验证首页 — 访问首页，确认 H1 标题为 "Docs"，浏览器标签页标题为 "Docs"

---

## Phase 2: User Story 2 — 访问单个应用文档页面 (Priority: P1)

**Goal**: 所有应用详情页标题从 "[应用名] - Legal Docs" 替换为 "[应用名] - Docs"

**Independent Test**: 访问 4 个应用详情页，浏览器标签页标题均为 "[应用名] - Docs"

- [x] T005 [P] [US2] 替换 `app/(docs)/[app]/page.tsx` 中的 `Legal Docs` 为 `Docs`（`${appMeta.name} - Docs`）
- [x] T006 [P] [US2] 替换 `components/header.tsx` 中的回退默认值 `appName ?? 'Legal Docs'` 为 `appName ?? 'Docs'`
- [x] T007 [US2] 验证所有应用详情页 — 分别访问 `/my-app`、`/another-app`、`/third-app`、`/fourth-app`，确认浏览器标题均为 "[应用名] - Docs"

---

## Phase 3: User Story 3 — 同步更新计划文档 (Priority: P2)

**Goal**: 计划文档中的相关引用同步替换为 "Docs"

**Independent Test**: `grep -r "Legal Docs" docs/` 返回空结果

- [x] T008 [P] [US3] 替换 `docs/plans/2026-03-18-multi-app-docs-design.md` 中的 "Legal Docs" 为 "Docs"
- [x] T009 [P] [US3] 替换 `docs/plans/2026-03-18-multi-app-docs-implementation.md` 中的 "Legal Docs" 为 "Docs"
- [x] T010 [US3] 验证计划文档 — 运行 `grep -r "Legal Docs" docs/` 确认无结果

---

## Phase 4: Polish & 完整性验证 (Cross-Cutting)

**Goal**: 确保项目中不再存在任何 "Legal Docs" 字面量

- [x] T011 运行 `grep -r "Legal Docs" app/ components/docs/` 确认全项目无遗漏
- [x] T012 启动开发服务器 (`npm run dev`)，手动访问首页和所有 4 个应用详情页进行最终验证

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (US1)**: 无依赖 — 可直接开始
- **Phase 2 (US2)**: 无依赖 — 可与 Phase 1 并行执行
- **Phase 3 (US3)**: 无依赖 — 可与 Phase 1/2 并行执行
- **Phase 4 (Polish)**: 依赖所有用户故事完成

### Within Each User Story

- 同一 Phase 内的 [P] 标记任务均为不同文件，可完全并行执行
- US1、US2、US3 的实现任务均可在不同 Phase 间并行

---

## Parallel Opportunities

本任务所有实现任务均为独立文件替换，可完全并行执行：

```bash
# Phase 1 + 2 + 3 所有 [P] 任务并行执行
T001: app/layout.tsx
T002: app/(docs)/page.tsx
T003: app/(docs)/layout.tsx
T005: app/(docs)/[app]/page.tsx
T006: components/header.tsx
T008: docs/plans/design.md
T009: docs/plans/implementation.md
```

---

## Implementation Strategy

### MVP First (Phase 1 Only)

1. 完成 Phase 1 的 3 个替换任务（T001-T003）
2. **验证** — 访问首页确认 "Docs" 显示正确
3. 如无问题，可提前合并 MVP

### Incremental Delivery

1. Phase 1 完成 → 首页验证 → MVP 完成
2. Phase 2 完成 → 所有应用页验证
3. Phase 3 完成 → 计划文档同步
4. Phase 4 完成 → 最终验证

---

## Notes

- [P] 标记的任务 = 不同文件，零依赖，可完全并行
- [Story] 标签用于追溯任务归属
- 本次任务无 Setup/Foundational 阶段，所有替换均为直接编辑
- 无需测试代码变更，验证通过手动页面访问完成
