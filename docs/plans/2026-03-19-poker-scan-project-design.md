# Design: poker-scan 项目展示页面 MDX 卡片化

## 概览

将 `poker-scan` 的 `project.mdx` 从纯 markdown 内容改造为与 `solver-jigsaw-puzzle` 一致的卡片式 MDX 展示页面，参考 `poker-scan-web/src/pages/Project.tsx` 的数据结构。

## 需要修改的文件

### 1. 复制图片
- 源：`/forks/poker-scan-web/public/images/`
- 目标：`/public/images/poker-scan/`
- 文件：7 张截图（hone-page-list_540x960.png, home_list_contextmenu_540x960.png, edit_game_showcase_540x960.png, setting-page_540x960.png, small-window-setting_540x960.png 等）

### 2. `content/poker-scan/project.mdx`
- 移除旧 markdown 内容
- 导出 `projectData`，包含 `hero` + 5 个 `sections`
- 每个 card 使用 `type: "feature"` 或 `type: "image"`
- feature card 使用已有的 emoji iconColor 映射（stories, unlock, purchase, security）

### 3. `components/project/FeatureSection.tsx`
- `getWrapperClass` 函数增加对 `colSize.md` 的支持
- 完整三档映射：`col-span-{xs}` + `md:col-span-{md}` + `lg:col-span-{lg}`

### 4. `FeatureCard.tsx` 和 `ImageFeatureCard.tsx`
- 无需改动，已有 emoji 映射和 `colSize` 支持

## poker-scan 5 个 sections 结构

| Section | backgroundColor | Cards |
|---|---|---|
| 发现与探索 | light | 3 个 image card（游戏列表、编辑扩展、使用导航） |
| 设置与自定义 | white | 2 个 image card（设置页面、画中画自定义） |
| 核心功能 | light | 4 个 feature card |
| 支持游戏 | white | 2 个 feature card |
| 隐私与安全 | light | 3 个 feature card |

## 响应式列宽配置
- image card 使用 `colSize: { xs: "12", md: "6", lg: "4" }` 等配置
- feature card 使用 `colSize: { xs: "12", md: "6", lg: "4" }` 或 `{ xs: "12", md: "6", lg: "6" }`
