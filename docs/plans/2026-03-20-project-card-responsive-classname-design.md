# Project Card 页面响应式布局修复 + className 扩展

## 背景

当前 `my-apps-web` 的 project 页面（`app/(docs)/[app]/project/page.tsx`）渲染效果存在两个问题：

1. **响应式网格完全失效** — `FeatureSection` 使用 Tailwind `grid-cols-1 lg:grid-cols-3` 作为父网格，但子元素通过 `col-span-6`、`col-span-4` 等跨列，这些 span 在只有 1 列的网格中无效，导致所有卡片堆叠在一起。
2. **缺少 className 扩展** — `HeroSection`、`FeatureSection`、`FeatureCard`、`ImageFeatureCard` 组件均不支持传入自定义 className，无法进行样式自定义。

参考项目为 Ionic React 实现（`poker-scan-web`），使用 12 列网格系统 (`IonGrid`)，对应映射到 Tailwind 应为 `grid-cols-12` + 响应式 `col-span-*`。

## 设计决策

### 1. 修复响应式网格

**根因**：`FeatureSection` 父网格只有 `grid-cols-1`，子元素的 `col-span-6`/`col-span-4` 等在单列网格中无意义。

**修复**：父网格改为 `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`（12列系统）：

```tsx
// FeatureSection.tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className={`col-span-12 md:col-span-6 lg:col-span-4`}>
```

**colSize 映射规则**（12列系统）：
| MDX colSize | Tailwind class |
|-------------|----------------|
| `xs: "12"` | `col-span-12` |
| `xs: "6"` | `col-span-6` |
| `md: "12"` | `md:col-span-12` |
| `md: "6"` | `md:col-span-6` |
| `md: "4"` | `md:col-span-4` |
| `md: "8"` | `md:col-span-8` |
| `lg: "12"` | `lg:col-span-12` |
| `lg: "6"` | `lg:col-span-6` |
| `lg: "4"` | `lg:col-span-4` |
| `lg: "8"` | `lg:col-span-8` |

注意：xs 默认值 `"12"` 直接输出 `col-span-12`，因为父网格 `grid-cols-1` 等价于 `grid-cols-12` 的视觉效果。

### 2. 统一添加 className prop（方案 A）

所有组件在最外层元素上支持 `className` prop，通过 `clsx` 或字符串拼接合并：

```tsx
// HeroSection
<HeroSection className="..." title={...} description={...} />

// FeatureSection
<FeatureSection className="..." section={...} />

// FeatureCard
<FeatureCard className="..." icon={...} iconColor={...} title={...} subtitle={...} />

// ImageFeatureCard
<ImageFeatureCard className="..." title={...} subtitle={...} imageUrl={...} imageAlt={...} layout={...} />
```

### 3. 样式调整（参考 Ionic 实现）

参考项目的响应式样式关键点：

**HeroSection**:
- 移动端标题 `2.5rem`，md+ `3.5rem`，lg+ `4rem`
- 描述文字类似递增
- 使用 `max-w-3xl mx-auto` 居中

**FeatureSection**:
- 移动端 padding `1rem`，md `2.5rem`，lg `3.75rem`
- 标题移动端 `2rem`，md `2.5rem`，lg `3rem`

**FeatureCard**:
- 移动端 min-height `180px`，md+ `220px`
- hover 上浮 `translateY(-5px)`

**ImageFeatureCard**:
- 移动端 min-height `280px`，md+ `350px`
- hover 轻微上浮 `translateY(-2px)`
- 图片 hover 放大 `scale(1.05)`

## 改动文件清单

| 文件 | 改动内容 |
|------|----------|
| `components/project/FeatureSection.tsx` | 1. 修复 grid class 为 `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`<br>2. 移除 xsMap/mdMap/lgMap 独立 span 映射，改用 `col-span-12` 前缀<br>3. 添加 `className` prop |
| `components/project/FeatureSection.css` | 添加响应式 padding 和间距 |
| `components/project/HeroSection.tsx` | 添加 `className` prop，合并到 `<section>` |
| `components/project/HeroSection.css` | 添加响应式字体大小（移动端 ~ md ~ lg 递增） |
| `components/project/FeatureCard.tsx` | 添加 `className` prop，合并到 `<div className="feature-card">` |
| `components/project/ImageFeatureCard.tsx` | 添加 `className` prop，合并到根 `<div>` |
| `components/project/ImageFeatureCard.css` | 添加响应式 min-height 和 hover 效果 |
| `components/project/FeatureCard.css` | 添加 hover 上浮效果 |

## 数据流

```
project.mdx (export projectData)
    ↓
app/(docs)/[app]/project/page.tsx (generateStaticParams + render)
    ↓
HeroSection (hero)
    ↓
FeatureSection[] (sections)
    ↓
FeatureCard / ImageFeatureCard (cards)
```

所有改动仅涉及渲染层（`components/project/`），不涉及 `lib/docs.ts` 的类型定义或 `content/` 的 MDX 数据。
