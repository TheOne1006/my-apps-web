# Feature Specification: Rename "Legal Docs" to "Docs"

**Feature Branch**: `001-rename-legal-docs`
**Created**: 2026-03-19
**Status**: Draft
**Input**: User description: "将项目中的 'Legal Docs' 重命名为 'Docs'，因为这是一个文档收集项目，收集的是 iOS App Store 和安卓应用市场上架所需的文件和文档，而非法律文档"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 访问文档站点首页 (Priority: P1)

用户打开文档站点，看到清晰的标题和导航，能够正确理解这是一个 APP 文档收集站点。

**Why this priority**: 这是用户进入站点的第一印象，标题直接影响用户对站点用途的理解。

**Independent Test**: 可通过访问站点首页验证标题显示为 "Docs" 而非 "Legal Docs"。

**Acceptance Scenarios**:

1. **Given** 用户首次访问站点首页, **When** 页面加载完成, **Then** 页面标题显示为 "Docs"
2. **Given** 用户访问首页, **When** 查看页面主标题, **Then** 主标题文字为 "Docs"
3. **Given** 用户访问首页, **When** 查看页脚, **Then** 页脚版权信息中包含 "Docs" 而非 "Legal Docs"

---

### User Story 2 - 访问单个应用文档页面 (Priority: P1)

用户通过导航或 URL 访问某个具体应用的文档页面，页面标题和元数据正确反映 "Docs" 名称。

**Why this priority**: 用户最终会浏览各个应用的详情页面，页面标题必须准确。

**Independent Test**: 可通过访问各应用的详情页面验证标题、元数据中均使用 "Docs"。

**Acceptance Scenarios**:

1. **Given** 用户点击导航进入 my-app 文档页, **When** 页面加载完成, **Then** 浏览器标签页标题为 "[应用名] - Docs"
2. **Given** 用户访问 another-app 文档页, **When** 页面加载完成, **Then** 浏览器标签页标题为 "[应用名] - Docs"
3. **Given** 用户访问 third-app 文档页, **When** 页面加载完成, **Then** 浏览器标签页标题为 "[应用名] - Docs"
4. **Given** 用户访问 fourth-app 文档页, **When** 页面加载完成, **Then** 浏览器标签页标题为 "[应用名] - Docs"

---

### User Story 3 - 应用元数据默认值 (Priority: P2)

当应用没有指定自定义名称时，系统使用默认的 "Docs" 作为站点名称，而非旧的 "Legal Docs"。

**Why this priority**: 保障所有边界场景的一致性，确保没有遗漏的展示。

**Independent Test**: 可通过模拟未设置应用名的场景验证默认值正确。

**Acceptance Scenarios**:

1. **Given** 应用数据中没有 name 字段, **When** 组件渲染站点名称, **Then** 默认显示 "Docs"

---

### Edge Cases

- 应用文档的 meta title 中仍保留旧名称 "Legal Docs" 导致 SEO 问题
- 页脚版权年份和站点名称不匹配
- 路由或 URL 路径中包含旧名称（如 "/legal-docs/"）

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统必须在所有页面标题中显示 "Docs" 而非 "Legal Docs"
- **FR-002**: 首页主标题（H1）必须显示为 "Docs"
- **FR-003**: 页脚版权信息中必须使用 "Docs" 而非 "Legal Docs"
- **FR-004**: 应用详情页的动态标题必须包含 "Docs"（格式为 "[应用名] - Docs"）
- **FR-005**: Header 组件中应用名回退值必须使用 "Docs" 而非 "Legal Docs"
- **FR-006**: 所有文档计划文件中的相关引用必须同步更新
- **FR-007**: 应用文档页面的 meta description 和 title 标签必须使用 "Docs"

### Key Entities

- **站点名称配置**: 整个站点的品牌名称，影响标题、页脚、meta 等多处展示
- **应用文档**: 每个应用的文档页面，其标题依赖于父级站点名称

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 站点所有页面（首页 + 4个应用详情页）加载后，浏览器标签页标题中均显示 "Docs"，旧名称 "Legal Docs" 出现次数为 0
- **SC-002**: 页面主标题（H1）、页脚版权信息、Header 回退值三处可见文本均正确显示 "Docs"
- **SC-003**: 文档计划文件（.md）中所有 "Legal Docs" 引用均已替换为 "Docs"
