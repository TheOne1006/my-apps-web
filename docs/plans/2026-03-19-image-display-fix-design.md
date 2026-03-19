# 图片展示修复设计方案

## 问题

两个项目中 `ImageFeatureCard` 的图片被裁剪：

1. **SolverJigsawPuzzle-web** (Ionic) — `ImageFeatureCard` 使用固定 `min-height` + `object-fit: cover`，图片被裁剪
2. **my-apps-web** (Next.js) — 图片同样被 `object-fit: cover` 裁剪，且同行卡片高度未对齐

## 目标

- 图片保持原始比例完整显示，不被裁剪
- 每行卡片高度对齐，整齐美观
- 移除固定高度限制，改为内容自适应

## 解决方案

### SolverJigsawPuzzle-web

#### ImageFeatureCard.tsx
- 改用原生 `<div>` 替代 `IonCard`，避免 Ionic 样式干扰布局

#### ImageFeatureCard.css
- 卡片移除固定 `min-height`
- 图片改用 `width: 100%; height: auto` 保持原始比例
- body 容器用 `display: flex; align-items: center` 居中
- 添加 `object-fit: contain` 作为 fallback

#### FeatureSection.css
- 改用 CSS Grid (`display: grid; grid-template-columns: repeat(4, 1fr)`)
- 启用 `align-items: stretch` 使同行卡片高度对齐

### my-apps-web

#### ImageFeatureCard.css
- 图片改用 `width: 100%; height: auto; object-fit: contain`
- body 容器 `display: flex; align-items: center; justify-content: center`

#### FeatureSection.css
- `feature-grid` 保持 CSS Grid，添加 `align-items: stretch`

## 核心 CSS 逻辑

```css
/* Grid 容器：同行卡片等高 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: stretch;
  gap: 1.5rem;
}

/* 每张卡片占满行高 */
.image-feature-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 图片区域 */
.image-card-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

/* 图片不裁剪，保持比例 */
.image-card-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}
```

## 修改文件清单

| 项目 | 文件 |
|------|------|
| SolverJigsawPuzzle-web | `src/components/AppStore/ImageFeatureCard.tsx` |
| SolverJigsawPuzzle-web | `src/components/AppStore/ImageFeatureCard.css` |
| SolverJigsawPuzzle-web | `src/components/AppStore/FeatureSection.css` |
| my-apps-web | `components/project/ImageFeatureCard.css` |
| my-apps-web | `components/project/FeatureSection.css` |
