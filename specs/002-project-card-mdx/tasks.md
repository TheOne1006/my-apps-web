# Tasks: 项目卡片展示 (Project Card Display)

**Input**: Design documents from `/specs/002-project-card-mdx/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: No explicit test tasks generated — existing Vitest framework covers existing functionality; new features are UI components validated through manual testing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create component directory structure and TypeScript types that all user stories depend on

- [X] T001 Create `components/project/` directory and its CSS files (HeroSection.css, FeatureSection.css, FeatureCard.css, ImageFeatureCard.css)
- [X] T002 Define TypeScript interfaces for project card types in `lib/docs.ts` (ProjectMDX, HeroSectionData, FeatureSectionData, FeatureCardData, TextCardData, ImageCardData, ColSize)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data layer and page routing that MUST be complete before ANY user story

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Add `getProject()` and `getProjectPaths()` functions in `lib/docs.ts` — reads MDX module, extracts `projectData` export, returns structured data
- [X] T004 Create `app/(docs)/[app]/project/page.tsx` — project page route that uses `getProject()` to load data and renders HeroSection + FeatureSection components
- [X] T005 Update `app/(docs)/[app]/[...slug]/page.tsx` — modify `generateStaticParams` to exclude `project.mdx` from doc slug list (so it doesn't appear as a doc page)
- [X] T006 Configure `next.config.ts` — add `images: { unoptimized: true }` so content directory images can be served
- [X] T007 Copy sample images from `/Users/theone/theone/Programme/my-apps/SolverJigsawPuzzle-web/src/components/AppStore/images/` to `content/solver-jigsaw-puzzle/images/`

**Checkpoint**: Foundation ready — project route is functional with placeholder components, user story implementation can begin

---

## Phase 3: User Story 1 - 内容编辑者以 MDX 方式编写项目介绍卡片 (Priority: P1) 🎯 MVP

**Goal**: 内容编辑者通过编辑 `project.mdx` 中的 `projectData` 导出对象，页面自动渲染对应的卡片布局

**Independent Test**: 创建/修改 `content/solver-jigsaw-puzzle/project.mdx` 中的 `projectData`，访问 `/solver-jigsaw-puzzle/project` 验证页面渲染

### Implementation for User Story 1

- [X] T008 [P] [US1] Implement HeroSection component in `components/project/HeroSection.tsx` — renders multi-line title (string[]) and description, centered layout
- [X] T009 [P] [US1] Implement FeatureSection component in `components/project/FeatureSection.tsx` — renders section title and maps cards to FeatureCard/ImageFeatureCard with responsive grid
- [X] T010 [P] [US1] Implement FeatureCard component in `components/project/FeatureCard.tsx` — renders icon (optional), title, subtitle in card style
- [X] T011 [P] [US1] Add CSS for HeroSection in `components/project/HeroSection.css`
- [X] T012 [P] [US1] Add CSS for FeatureSection in `components/project/FeatureSection.css`
- [X] T013 [P] [US1] Add CSS for FeatureCard in `components/project/FeatureCard.css`
- [X] T014 [US1] Add CSS for ImageFeatureCard in `components/project/ImageFeatureCard.css`
- [X] T015 [US1] Update `content/solver-jigsaw-puzzle/project.mdx` — convert from prose text to `export const projectData = {...}` structure matching ProjectFeaturesConstant.tsx data
- [X] T016 [US1] Add error boundary — if `project.mdx` is missing for an app, show 404 or default placeholder

**Checkpoint**: At this point, US1 is fully functional — MDX data drives the page, text cards render correctly

---

## Phase 4: User Story 2 - 项目展示支持图片内容 (Priority: P1)

**Goal**: 图片卡片能正确加载和展示 `content/{appId}/images/` 目录下的图片，支持 text-top / text-bottom 布局，图片加载失败有降级处理

**Independent Test**: 在 MDX 中配置 `type: "image"` 和 `imageUrl: "./images/xxx.png"`，验证图片加载和布局

### Implementation for User Story 2

- [X] T017 [P] [US2] Implement ImageFeatureCard component in `components/project/ImageFeatureCard.tsx` — renders img + title + subtitle with text-top/text-bottom layout, uses `loading="lazy"` and `onError` fallback
- [X] T018 [US2] Wire ImageFeatureCard into FeatureSection — when card `type === "image"`, render ImageFeatureCard; otherwise render FeatureCard
- [X] T019 [US2] Implement image placeholder — when image fails to load, show placeholder div with card title as alt text instead of broken image

**Checkpoint**: At this point, US2 is fully functional — images display correctly with proper layout and error handling

---

## Phase 5: User Story 3 - 多区域分组展示项目特点 (Priority: P2)

**Goal**: FeatureSection 支持 light/white 背景色交替，区域之间有明确视觉分隔

**Independent Test**: 在 MDX 中为不同 section 设置 `backgroundColor: "light"` 和 `"white"`，验证视觉差异

### Implementation for User Story 3

- [X] T020 [P] [US3] Add background color support to FeatureSection — apply CSS class based on `backgroundColor: "light" | "white"`
- [X] T021 [P] [US3] Style section title in `components/project/FeatureSection.css` — consistent heading style across all sections
- [X] T022 [US3] Ensure responsive column layout — lg: 4col, md: 2col, xs: 1col works correctly for both card types

**Checkpoint**: At this point, US3 is fully functional — multiple FeatureSections render with visual separation

---

## Phase 6: User Story 4 - 文字卡片支持图标和颜色 (Priority: P3)

**Goal**: FeatureCard 支持 icon 和 iconColor 配置，颜色主题（stories/unlock/purchase/security）正确应用

**Independent Test**: 在 MDX 中为 feature 卡片配置 `icon` 和 `iconColor`，验证图标颜色显示

### Implementation for User Story 4

- [X] T023 [P] [US4] Add icon color theming in `components/project/FeatureCard.css` — define CSS variables or utility classes for iconColor values (stories/unlock/purchase/security)
- [X] T024 [P] [US4] Integrate icon colors into FeatureCard component — pass iconColor to CSS class for color styling

**Checkpoint**: At this point, US4 is fully functional — icon color cards render with themed colors

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that ensure all user stories work well together

- [X] T025 [P] Dark mode support — verify all project components (HeroSection, FeatureSection, FeatureCard, ImageFeatureCard) render correctly with `dark:` Tailwind variants in dark mode
- [X] T026 [P] Verify doc routing compatibility — ensure existing `/{appId}/privacy`, `/{appId}/terms`, `/{appId}/faq` routes are unaffected
- [X] T027 Update CLAUDE.md — add project card feature documentation for future reference

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — can start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS all user stories
- **Phase 3–6 (User Stories)**: All depend on Phase 2 completion
  - US1, US2, US3, US4 can proceed in parallel after Phase 2
- **Phase 7 (Polish)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Foundation → HeroSection + FeatureSection + FeatureCard + MDX data
- **User Story 2 (P1)**: Foundation → ImageFeatureCard → wired into FeatureSection (depends on US1 FeatureSection)
- **User Story 3 (P2)**: Foundation → background color styling (depends on US1 FeatureSection)
- **User Story 4 (P3)**: Foundation → icon color theming (depends on US1 FeatureCard)

### Within Each User Story

- Types (T002) → Data layer (T003) → Components (T008–T013, T017, T020, T023)
- Parallelize where components don't touch the same files

### Parallel Opportunities

- T008 + T009 + T010 can run in parallel (3 component files, 3 CSS files)
- T011 + T012 + T013 can run in parallel (3 CSS files)
- T020 + T021 + T022 can run in parallel (FeatureSection refinements)
- T023 + T024 can run in parallel (FeatureCard icon colors)

---

## Parallel Example

```bash
# After Phase 2 completes — build all components in parallel:
Task T008: Implement HeroSection in components/project/HeroSection.tsx
Task T009: Implement FeatureSection in components/project/FeatureSection.tsx
Task T010: Implement FeatureCard in components/project/FeatureCard.tsx
Task T017: Implement ImageFeatureCard in components/project/ImageFeatureCard.tsx
```

---

## Implementation Strategy

### MVP First (US1 + US2)

1. Complete Phase 1: Setup (T001–T002)
2. Complete Phase 2: Foundational (T003–T007) — CRITICAL
3. Complete Phase 3: User Story 1 (T008–T016) — **MVP delivery**
4. **STOP and VALIDATE**: Test at `/solver-jigsaw-puzzle/project`
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 → Test independently → Deploy/Demo (MVP!)
3. US2 → Test independently → Deploy/Demo
4. US3 → Test independently → Deploy/Demo
5. US4 → Test independently → Deploy/Demo
6. Polish → Final release

### Sequential Order (Single Developer)

T001 → T002 → T003–T007 → T008–T016 (US1) → T017–T019 (US2) → T020–T022 (US3) → T023–T024 (US4) → T025–T027 (Polish)

---

## Task Summary

| Phase | Tasks | Count |
|-------|-------|-------|
| Phase 1: Setup | T001–T002 | 2 |
| Phase 2: Foundational | T003–T007 | 5 |
| Phase 3: US1 (P1) MVP | T008–T016 | 9 |
| Phase 4: US2 (P1) | T017–T019 | 3 |
| Phase 5: US3 (P2) | T020–T022 | 3 |
| Phase 6: US4 (P3) | T023–T024 | 2 |
| Phase 7: Polish | T025–T027 | 3 |
| **Total** | | **27** |

### Files Created: 12 (9 components/styles + 3 data/config)
### Files Modified: 4 (lib/docs.ts, 2 route files, next.config.ts, project.mdx)
### Content Files: 1 (content/solver-jigsaw-puzzle/project.mdx updated)
### Images Copied: 1 directory (content/solver-jigsaw-puzzle/images/)

### Suggested MVP Scope

**US1 only** — 16 tasks total (Phase 1 + Phase 2 + Phase 3):
- Types, data layer, page route, 3 components + 3 CSS files, updated MDX
- Deliverable: A working project page at `/{appId}/project` with hero and feature sections rendering from MDX data
