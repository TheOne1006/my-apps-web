# MDX 项目详情页组件设计

**日期**: 2026-03-20

## 概述

为项目详情页构建 MDX 组件，支持灵活的内容组织和展示。

## 需求

- 组件方式: 简单语法 - MDX 中直接使用 `<HeroSection />` 等标签
- 视觉风格: 现代简洁 - 岩石风格、暗黑模式支持、干净简洁
- 内容类型: 功能特性、步骤指南、数据表格
- 响应式: 移动端优先
- 动画: 无动画

## 组件清单

### 1. HeroSection
Hero 区域，展示项目标题和副标题。

```tsx
<HeroSection
  title="AI 记牌助手"
  subtitle="一款专为扑克牌爱好者打造的智能辅助工具"
/>
```

**Props:**
- `title: string` - 主标题
- `subtitle?: string` - 副标题（可选）
- `className?: string` - 自定义类名

### 2. FeatureCard
功能特性卡片，展示图标、标题和描述。

```tsx
<FeatureCard
  icon="🎯"
  title="精准识别"
  description="基于先进的目标识别算法"
/>
```

**Props:**
- `icon?: string` - 图标（emoji 或 React 组件）
- `title: string` - 标题
- `description: string` - 描述
- `className?: string` - 自定义类名

### 3. FeatureGrid
功能卡片网格容器，自动布局子卡片。

```tsx
<FeatureGrid cols={2}>
  <FeatureCard ... />
  <FeatureCard ... />
</FeatureGrid>
```

**Props:**
- `cols?: 1 | 2 | 3` - 列数（默认 2）
- `className?: string` - 自定义类名
- `children: ReactNode` - 子元素（FeatureCard）

### 4. StepList
步骤列表，展示操作指南。

```tsx
<StepList
  steps={[
    { title: "步骤 1", description: "..." },
    { title: "步骤 2", description: "..." }
  ]}
/>
```

**Props:**
- `steps: Array<{ title: string; description: string }>` - 步骤数据
- `className?: string` - 自定义类名

### 5. DataTable
数据表格，展示结构化数据。

```tsx
<DataTable
  headers={["游戏类型", "支持状态"]}
  rows={[
    ["斗地主", "✅"],
    ["跑得快", "✅"]
  ]}
/>
```

**Props:**
- `headers: string[]` - 表头
- `rows: string[][]` - 表格数据
- `className?: string` - 自定义类名

## 文件结构

```
components/mdx/
├── HeroSection.tsx
├── FeatureCard.tsx
├── FeatureGrid.tsx
├── StepList.tsx
└── DataTable.tsx
```

## 样式规范
- 配色: 继承 Tailwind prose 风格，暗色模式自动适配
- 间距: 移动端 `py-8`， PC端 `py-12`
- 圆角: 统一 `rounded-xl` (12px)
- 阴影: 轻量阴影 `shadow-sm`

## 使用示例

```mdx
import { HeroSection, FeatureGrid, FeatureCard, StepList, DataTable } from '@/components/mdx'

export const metadata = {
  title: 'AI 记牌助手',
  description: '智能记牌工具'
}

<HeroSection
  title="AI 记牌助手"
  subtitle="一款专为扑克牌爱好者打造的智能辅助工具"
/>

<FeatureGrid cols={2}>
  <FeatureCard
    icon="🎯"
    title="精准识别"
    description="基于先进的目标识别算法"
  />
  <FeatureCard
    icon="⚡"
    title="实时统计"
    description="实时统计场上剩余牌张数量"
  />
</FeatureGrid>

<StepList
  steps={[
    { title: "打开应用", description: "启动 AI 记牌助手" },
    { title: "开始游戏", description: "进入您想要记录的牌局" }
  ]}
/>

<DataTable
  headers={["游戏类型", "支持状态"]}
  rows={[
    ["斗地主", "✅"],
    ["跑得快", "✅"]
  ]}
/>
```
