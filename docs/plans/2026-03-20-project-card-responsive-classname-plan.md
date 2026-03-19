# Project Card 响应式布局 + className 扩展实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 修复 `FeatureSection` 的响应式网格布局（核心 bug），同时为所有 project 组件添加 `className` prop 以支持自定义扩展。

**Architecture:** 通过在 `components/project/` 下修改 8 个文件，修复 Tailwind grid 父级 class 为 12 列系统，添加响应式 CSS 媒体查询，并统一在最外层元素支持 `className` prop。

**Tech Stack:** React 19 + TypeScript + Tailwind CSS v4 + CSS custom properties

**Note:** 本次改动全为纯展示层（CSS + TSX props），无测试需求，无需 TDD。

---

## 前置条件

在开始前，请确保：
- 当前分支：`002-project-card-mdx`
- 工作目录：`/Users/theone/theone/Programme/my-apps/my-apps-web`
- 所有文件路径均基于此根目录

---

## Task 1: 修复 FeatureSection 响应式网格 + className

**Files:**
- Modify: `components/project/FeatureSection.tsx`
- Modify: `components/project/FeatureSection.css`

**Step 1: 修改 FeatureSection.tsx — 修复 grid 父级 class**

打开 `components/project/FeatureSection.tsx`，找到当前 grid 部分：

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
```

替换为：

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

同时，`colSize` 的 span 映射需要调整。当前代码：

```tsx
const xsMap: Record<string, string> = {
  '12': 'col-span-1',  // 错误！1列网格中 col-span-1 无意义
  '6': 'col-span-6',   // 在1列网格中等价于 col-span-1
  '4': 'col-span-4',   // 同上
  '3': 'col-span-3',
  '8': 'col-span-8',
}

const mdMap: Record<string, string> = {
  '12': 'md:col-span-12',
  '6': 'md:col-span-6',
  '4': 'md:col-span-4',
  '3': 'md:col-span-3',
  '8': 'md:col-span-8',
}

const lgMap: Record<string, string> = {
  '12': 'lg:col-span-12',
  '6': 'lg:col-span-6',
  '4': 'lg:col-span-4',
  '3': 'lg:col-span-3',
  '8': 'lg:col-span-8',
}
```

全部替换为简洁的 Record，直接对应 12 列系统：

```tsx
const colSpanMap: Record<string, string> = {
  '12': 'col-span-12',
  '6': 'col-span-6',
  '4': 'col-span-4',
  '3': 'col-span-3',
  '8': 'col-span-8',
}
```

然后修改渲染逻辑：

```tsx
const FeatureSection: React.FC<FeatureSectionProps> = ({ section, className }) => {
  const bgClass = section.backgroundColor === 'white' ? 'bg-white dark:bg-gray-50' : 'bg-gray-50 dark:bg-gray-900'

  return (
    <section className={`feature-section py-16 ${bgClass} ${className ?? ''}`}>
      <div className="section-content">
        <h2 className="section-title">{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.cards.map((card) => {
            const colSize = card.colSize
            const colClass = colSize
              ? `col-span-12 ${colSize.md ? `md:col-span-${colSize.md}` : 'md:col-span-6'} ${colSize.lg ? `lg:col-span-${colSize.lg}` : 'lg:col-span-4'}`
              : 'col-span-12 md:col-span-6 lg:col-span-4'

            return (
              <div key={card.id} className={colClass}>
```

同时在接口中添加 `className?`：

```tsx
interface FeatureSectionProps {
  section: FeatureSectionData
  className?: string
}
```

**Step 2: 修改 FeatureSection.css — 添加响应式 padding**

打开 `components/project/FeatureSection.css`，当前内容：

```css
.feature-section {
  padding: 4rem 1rem;
}

.section-content {
  max-width: 80rem;
  margin: 0 auto;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--section-title-color, #111827);
}
```

替换为（参考 Ionic 实现）：

```css
.feature-section {
  padding: 3.75rem 1rem;
}

.section-content {
  max-width: 75rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--section-title-color, #111827);
}

.dark .section-title {
  color: var(--section-title-color-dark, #f9fafb);
}

/* Responsive */
@media (min-width: 768px) {
  .feature-section {
    padding: 3.75rem 2.5rem;
  }

  .section-content {
    padding: 0 2.5rem;
  }

  .section-title {
    font-size: 1.875rem;
    margin-bottom: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .feature-section {
    padding: 3.75rem 3.75rem;
  }

  .section-content {
    padding: 0 3.75rem;
    max-width: 80rem;
  }

  .section-title {
    font-size: 2.25rem;
    margin-bottom: 3rem;
  }
}
```

**Step 3: 提交**

```bash
git add components/project/FeatureSection.tsx components/project/FeatureSection.css
git commit -m "$(cat <<'EOF'
fix(project): fix grid responsive layout and add className prop

- Change parent grid from grid-cols-1 lg:grid-cols-3 to grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Simplify colSize mapping to 12-column system
- Add className prop for custom styling
- Add responsive padding and title sizing

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: HeroSection 添加 className + 响应式字体

**Files:**
- Modify: `components/project/HeroSection.tsx`
- Modify: `components/project/HeroSection.css`

**Step 1: 修改 HeroSection.tsx — 添加 className prop**

打开 `components/project/HeroSection.tsx`，当前：

```tsx
interface HeroSectionProps {
  title: string[]
  description: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  return (
    <section className="hero-section">
```

修改为：

```tsx
interface HeroSectionProps {
  title: string[]
  description: string
  className?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description, className }) => {
  return (
    <section className={`hero-section ${className ?? ''}`}>
```

同时修改内部的 `hero-content`，添加响应式 max-width：

```tsx
<div className="hero-content text-center max-w-3xl mx-auto">
```

**Step 2: 修改 HeroSection.css — 响应式字体大小**

打开 `components/project/HeroSection.css`，当前：

```css
.hero-section {
  padding: 4rem 1rem;
  background-color: var(--hero-bg, #f9fafb);
}

.hero-content {
  max-width: 48rem;
  margin: 0 auto;
}

.hero-title {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--hero-title-color, #111827);
}

.dark .hero-title {
  color: var(--hero-title-color-dark, #f9fafb);
}

.hero-title-line {
  display: block;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--hero-desc-color, #6b7280);
  max-width: 36rem;
  margin: 0 auto;
}

.dark .hero-description {
  color: var(--hero-desc-color-dark, #9ca3af);
}
```

替换为：

```css
.hero-section {
  padding: 3.75rem 1rem;
  background-color: var(--hero-bg, #f9fafb);
}

.hero-content {
  max-width: 48rem;
  margin: 0 auto;
}

.hero-title {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--hero-title-color, #111827);
}

.dark .hero-title {
  color: var(--hero-title-color-dark, #f9fafb);
}

.hero-title-line {
  display: block;
}

.hero-description {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--hero-desc-color, #6b7280);
}

.dark .hero-description {
  color: var(--hero-desc-color-dark, #9ca3af);
}

/* Responsive */
@media (min-width: 768px) {
  .hero-section {
    padding: 4.5rem 1.5rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.125rem;
  }
}

@media (min-width: 1024px) {
  .hero-section {
    padding: 5rem 2rem;
  }

  .hero-title {
    font-size: 3rem;
  }

  .hero-description {
    font-size: 1.25rem;
  }
}
```

**Step 3: 提交**

```bash
git add components/project/HeroSection.tsx components/project/HeroSection.css
git commit -m "$(cat <<'EOF'
feat(project): add className prop and responsive typography to HeroSection

- Add className prop for custom hero styling
- Add responsive font sizes: 1.75rem mobile → 2.5rem md → 3rem lg
- Add responsive padding
- Adjust max-width to max-w-3xl via Tailwind

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: FeatureCard 添加 className + hover 效果

**Files:**
- Modify: `components/project/FeatureCard.tsx`
- Modify: `components/project/FeatureCard.css`

**Step 1: 修改 FeatureCard.tsx — 添加 className prop**

打开 `components/project/FeatureCard.tsx`，找到当前：

```tsx
interface FeatureCardProps {
  icon?: string
  iconColor?: string
  title: string
  subtitle?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconColor = 'stories',
  title,
  subtitle,
}) => {
  return (
    <div className="feature-card">
```

修改为：

```tsx
interface FeatureCardProps {
  icon?: string
  iconColor?: string
  title: string
  subtitle?: string
  className?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconColor = 'stories',
  title,
  subtitle,
  className,
}) => {
  return (
    <div className={`feature-card ${className ?? ''}`}>
```

**Step 2: 修改 FeatureCard.css — 添加 hover 上浮效果**

打开 `components/project/FeatureCard.css`，当前内容已是较完整的样式。找到 `.feature-card:hover` 部分，当前：

```css
.feature-card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
```

替换为（参考 Ionic）：

```css
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgb(0 0 0 / 0.12);
}

.dark .feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgb(0 0 0 / 0.4);
}
```

同时在 `.feature-card` 中添加 `transition`：

```css
.feature-card {
  background-color: var(--card-bg, #ffffff);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 180px;
}
```

添加响应式 min-height：

```css
/* Responsive */
@media (min-width: 768px) {
  .feature-card {
    min-height: 220px;
  }
}
```

**Step 3: 提交**

```bash
git add components/project/FeatureCard.tsx components/project/FeatureCard.css
git commit -m "$(cat <<'EOF'
feat(project): add className prop and hover effect to FeatureCard

- Add className prop for custom card styling
- Add hover translateY(-5px) with shadow upgrade
- Add transition for smooth animations
- Add responsive min-height: 180px mobile, 220px md+

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: ImageFeatureCard 添加 className + 响应式样式

**Files:**
- Modify: `components/project/ImageFeatureCard.tsx`
- Modify: `components/project/ImageFeatureCard.css`

**Step 1: 修改 ImageFeatureCard.tsx — 添加 className prop**

打开 `components/project/ImageFeatureCard.tsx`，找到当前：

```tsx
interface ImageFeatureCardProps {
  title: string
  subtitle?: string
  imageUrl: string
  imageAlt?: string
  layout?: 'text-top' | 'text-bottom'
}

const ImageFeatureCard: React.FC<ImageFeatureCardProps> = ({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  layout = 'text-top',
}) => {
  const [imgError, setImgError] = useState(false)

  return (
    <div className={`image-feature-card image-card--${layout}`}>
```

修改为：

```tsx
interface ImageFeatureCardProps {
  title: string
  subtitle?: string
  imageUrl: string
  imageAlt?: string
  layout?: 'text-top' | 'text-bottom'
  className?: string
}

const ImageFeatureCard: React.FC<ImageFeatureCardProps> = ({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  layout = 'text-top',
  className,
}) => {
  const [imgError, setImgError] = useState(false)

  return (
    <div className={`image-feature-card image-card--${layout} ${className ?? ''}`}>
```

**Step 2: 修改 ImageFeatureCard.css — 响应式 + hover**

打开 `components/project/ImageFeatureCard.css`，找到当前 `.image-feature-card:hover`：

```css
.image-feature-card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.dark .image-feature-card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.4);
}
```

替换为（参考 Ionic）：

```css
.image-feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgb(0 0 0 / 0.12);
}

.dark .image-feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgb(0 0 0 / 0.4);
}
```

在 `.image-feature-card` 中添加 `transition`：

```css
.image-feature-card {
  background-color: var(--card-bg, #ffffff);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 300px;
}
```

添加响应式 min-height 和图片缩放效果：

在文件末尾添加：

```css
/* Image hover zoom */
.image-card-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-feature-card:hover .image-card-image {
  transform: scale(1.05);
}

/* Responsive */
@media (min-width: 768px) {
  .image-feature-card {
    min-height: 350px;
  }
}

@media (max-width: 767px) {
  .image-feature-card {
    min-height: 280px;
  }
}
```

**Step 3: 提交**

```bash
git add components/project/ImageFeatureCard.tsx components/project/ImageFeatureCard.css
git commit -m "$(cat <<'EOF'
feat(project): add className prop and responsive styles to ImageFeatureCard

- Add className prop for custom styling
- Add hover translateY(-2px) with enhanced shadow
- Add image scale(1.05) on card hover
- Add responsive min-height: 280px mobile, 350px md+
- Add transition for smooth animations

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: 验证构建

**Step 1: 运行构建检查**

```bash
npm run build
```

预期：构建成功，无 TypeScript 错误，无 ESLint 错误。

**Step 2: 如有错误，修复后重新提交**

```bash
git add -A
git commit -m "fix(project): resolve build errors"
```

---

## 总结

改动涉及 8 个文件，4 个提交：

| Task | 提交信息 |
|------|----------|
| Task 1 | fix(project): fix grid responsive layout and add className prop |
| Task 2 | feat(project): add className prop and responsive typography to HeroSection |
| Task 3 | feat(project): add className prop and hover effect to FeatureCard |
| Task 4 | feat(project): add className prop and responsive styles to ImageFeatureCard |
| Task 5 | (验证) npm run build |
