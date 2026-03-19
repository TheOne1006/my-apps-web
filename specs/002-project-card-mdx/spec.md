# Feature Specification: 项目卡片展示 (Project Card Display)

**Feature Branch**: `002-project-card-mdx`
**Created**: 2026-03-19
**Status**: Draft
**Input**: User description: "接下来需要支持 project.mdx 源代码在 /Users/theone/theone/Programme/my-apps/SolverJigsawPuzzle-web/src/pages/Project.tsx 他是以一种 card 方式构建的一系列组件。希望可以实现，以及需要设置对应的图片。总之，也是希望以一种方式简易的编辑用以更好的展示。项目的特点。2. 需要让项目支持图片"

## User Scenarios & Testing

### User Story 1 - 内容编辑者以 MDX 方式编写项目介绍卡片 (Priority: P1)

内容编辑者（如应用开发者）希望以简单直观的方式编辑项目介绍页面，通过编写 MDX 文件即可定义页面上展示的内容卡片，无需编写代码或修改前端组件。

**Why this priority**: 这是核心使用场景——让非技术人员也能通过编辑 MDX 文件来管理项目展示内容，是本功能的主要价值交付。

**Independent Test**: 可通过创建或修改一个 `project.mdx` 文件，验证页面渲染出对应的卡片内容，无需修改任何代码。

**Acceptance Scenarios**:

1. **Given** 内容编辑者在 `content/{appId}/project.mdx` 中编写了英雄区域和功能区域内容，**When** 访问该应用的 project 页面，**Then** 页面渲染出与 MDX 内容一致的卡片布局。
2. **Given** 内容编辑者新增了一个 FeatureSection 区域并包含多张图片卡片，**When** 访问该页面，**Then** 所有卡片正确显示，图片正常加载。
3. **Given** 某个 FeatureSection 只包含文字卡片（无图片），**When** 访问该页面，**Then** 该区域正常渲染文字卡片，不显示空白图片区域。

---

### User Story 2 - 项目展示支持图片内容 (Priority: P1)

内容编辑者希望项目介绍页面中的卡片能够展示应用截图、功能示意图片等视觉内容，丰富信息表达。

**Why this priority**: 图片是项目展示的核心需求，从用户原始需求（"需要设置对应的图片"）和现有 Project.tsx 中大量使用 ImageFeatureCard 可以看出，图片支持是必不可少的。

**Independent Test**: 可通过在 MDX 中为某张卡片配置图片，验证图片正确加载并按照指定布局（文字在上/在下）渲染。

**Acceptance Scenarios**:

1. **Given** 图片文件已放置在 `content/{appId}/images/` 目录，**When** MDX 中的卡片引用该图片路径（如 `imageUrl="./images/iphone-home-empty.png"`），**Then** 图片在页面中正确显示。
2. **Given** MDX 中某张图片卡片设置了 `layout="text-bottom"` 布局，**When** 页面渲染，**Then** 该卡片的文字显示在图片下方。
3. **Given** 某张卡片引用的图片文件不存在，**When** 页面渲染，**Then** 显示友好的占位图或 alt 文本，不导致页面崩溃。

---

### User Story 3 - 多区域分组展示项目特点 (Priority: P2)

项目介绍页面按功能模块分组展示（如"界面与预览"、"设置与自定义"、"核心功能"、"隐私与安全"），每组有独立的标题和内容卡片。

**Why this priority**: 良好的内容组织方式，让用户能够按类别快速了解项目不同方面的特点，与用户原始需求（"以 card 方式构建的一系列组件"）一致。

**Independent Test**: 可通过在 MDX 中定义多个 FeatureSection，验证每个区域独立渲染、标题正确显示、区域之间有视觉分隔。

**Acceptance Scenarios**:

1. **Given** MDX 中定义了 4 个 FeatureSection，每个有不同的 title，**When** 页面渲染，**Then** 4 个区域按顺序显示，标题各自独立。
2. **Given** 相邻的 FeatureSection 使用了不同的背景色配置（light/white），**When** 页面渲染，**Then** 区域之间有可区分的背景色差异。

---

### User Story 4 - 文字卡片支持图标和颜色 (Priority: P3)

部分项目特点适合用图标+文字的方式展示，文字卡片组件支持配置图标样式和颜色主题。

**Why this priority**: 图标是可选的增强功能，适合不需要图片的简短功能点描述。优先级较低因为现有项目内容中图片卡片占主导。

**Independent Test**: 可通过在 MDX 中定义带图标属性的文字卡片，验证图标正确显示且颜色符合配置。

**Acceptance Scenarios**:

1. **Given** MDX 中某张文字卡片配置了 iconColor 属性（如 "stories"、"security"），**When** 页面渲染，**Then** 该卡片图标以对应颜色显示。
2. **Given** 某张卡片同时设置了 icon 和 imageUrl 属性，**When** 页面渲染，**Then** 系统按照预定义优先级选择图片卡片方式显示。

---

### Edge Cases

- 如果 `project.mdx` 文件不存在（如某应用尚未配置项目介绍），系统应该如何处理——显示 404 还是显示默认占位内容？
- 如果图片路径引用了外部 URL（而非本地文件），系统是否支持？应该如何处理？
- 如果 MDX 中的卡片数据格式不完整（如缺少 title），系统应该如何降级处理？
- HeroSection 的 title 是否支持多行标题（如现有的 `["🧩拼图助手"]` 数组形式）？

## Requirements

### Functional Requirements

- **FR-001**: 系统 MUST 支持在 `content/{appId}/project.mdx` 文件中定义项目介绍页面的所有内容。
- **FR-002**: 系统 MUST 支持在 project.mdx 中定义 HeroSection（英雄区域），包含 title 和 description。
- **FR-003**: 系统 MUST 支持在 project.mdx 中定义一个或多个 FeatureSection（功能区域），每个区域有独立的标题。
- **FR-004**: 系统 MUST 支持在 FeatureSection 中定义文字卡片，包含 title、subtitle、icon（可选）和 iconColor（可选）。
- **FR-005**: 系统 MUST 支持在 FeatureSection 中定义图片卡片，包含 title、subtitle、imageUrl、imageAlt 和 layout（text-top / text-bottom）。
- **FR-006**: 系统 MUST 支持 FeatureSection 的背景色配置（light / white）。
- **FR-007**: 系统 MUST 支持图片文件的引用，图片文件存放于 `content/{appId}/images/` 目录，MDX 中通过相对路径引用。
- **FR-008**: 系统 MUST 在图片加载失败时显示友好的占位图或 alt 文本，不导致页面错误。
- **FR-009**: 系统 MUST 保持与现有隐私政策、用户协议等文档路由的兼容性。
- **FR-010**: 如果某应用没有 `project.mdx` 文件，系统 SHOULD 提供合理的降级展示（如显示应用基础信息或跳转 404）。
- **FR-011**: 图片卡片 SHOULD 支持响应式布局，在不同屏幕尺寸下合理展示（lg: 4列、md: 2列、xs: 1列）。
- **FR-012**: HeroSection SHOULD 支持多行标题（数组形式传入）。

### Key Entities

- **ProjectMDX**: 项目介绍文档，包含 HeroSection 和多个 FeatureSection 的内容定义
- **HeroSection**: 英雄区域，包含标题（数组，支持多行）和描述文字
- **FeatureSection**: 功能区域，包含区域标题和一组 FeatureCard
- **FeatureCard**: 功能卡片，支持两种类型：文字卡片（icon + title + subtitle）和图片卡片（image + title + subtitle + layout）
- **AppImage**: 项目图片资源，存放于 `content/{appId}/images/` 目录，通过相对路径引用

## Success Criteria

### Measurable Outcomes

- **SC-001**: 内容编辑者可以在 10 分钟内通过编辑 MDX 文件完成一个新项目的介绍页面配置（包含英雄区域、2个功能区域、共6张卡片）。
- **SC-002**: 项目介绍页面在桌面端和移动端均能正常渲染，加载时间不超过 3 秒。
- **SC-003**: 所有带图片的卡片在标准网络条件下能正确加载图片，图片加载失败时有降级展示，不影响页面其余内容。
- **SC-004**: 页面支持暗黑模式，在系统切换主题时所有组件（包含自定义 MDX 组件）的颜色样式正确适配。
- **SC-005**: 每个 FeatureSection 区域有明确的视觉分隔，用户能够轻松区分不同内容分组。
- **SC-006**: 新增 project.mdx 的应用自动获得项目介绍页面，无需修改代码或额外配置（约定优于配置）。

## Assumptions

- 图片资源统一存放在 `content/{appId}/images/` 目录下，支持 PNG、JPG、GIF、WebP 等常见图片格式。
- MDX 组件使用与现有文档页面一致的样式系统（Tailwind CSS + dark mode），确保视觉一致性。
- HeroSection 的 title 以数组形式支持多行标题，每行独立显示。
- FeatureSection 之间的背景色交替使用 light/white 以提供视觉区隔。
- 卡片列数遵循响应式设计：桌面端（lg）最多 4 列，平板端（md）最多 2 列，手机端（xs）1 列。
