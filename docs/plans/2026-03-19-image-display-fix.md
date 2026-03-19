# Image Display Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Fix image display so screenshots are shown in full (uncropped) with preserved aspect ratio, while keeping card rows height-aligned.

**Architecture:** Two separate projects need parallel fixes:
- **SolverJigsawPuzzle-web** (Ionic app) — needs ImageFeatureCard + FeatureSection updates
- **my-apps-web** (Next.js site) — needs ImageFeatureCard.css + FeatureSection.css updates

**Tech Stack:** CSS (no JS changes needed), Ionic components, Next.js/Tailwind

---

## Task 1: Fix SolverJigsawPuzzle-web — ImageFeatureCard.tsx

**Files:** Modify: `src/components/AppStore/ImageFeatureCard.tsx`

**Change:** Replace `IonCard` with native `<div>` to avoid Ionic layout constraints.

```tsx
import React from 'react';
import './ImageFeatureCard.css';

export interface ImageFeatureCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  layout?: 'text-top' | 'text-bottom';
  className?: string;
  onClick?: () => void;
}

const ImageFeatureCard: React.FC<ImageFeatureCardProps> = ({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  layout = 'text-top',
  className = '',
  onClick
}) => {
  const cardClass = `image-feature-card ${layout} ${className}`;

  const headerContent = (
    <div className="image-card-header">
      <h3 className="image-card-title">{title}</h3>
      {subtitle && <p className="image-card-subtitle">{subtitle}</p>}
    </div>
  );

  const cardBodyContent = (
    <div className="image-card-body">
      <img
        src={imageUrl}
        alt={imageAlt}
        className="image-card-image"
        loading="lazy"
      />
    </div>
  );

  return (
    <div className={cardClass} onClick={onClick}>
      {layout === 'text-top' ? (
        <>
          {headerContent}
          {cardBodyContent}
        </>
      ) : (
        <>
          {cardBodyContent}
          {headerContent}
        </>
      )}
    </div>
  );
};

export default ImageFeatureCard;
```

---

## Task 2: Fix SolverJigsawPuzzle-web — ImageFeatureCard.css

**Files:** Modify: `src/components/AppStore/ImageFeatureCard.css`

**Change:** Remove fixed `min-height`, change image to `width:100; height:auto`, body uses flex centering.

```css
/* ImageFeatureCard 基础样式 */
.image-feature-card {
  margin: 0;
  border-radius: 18px;
  background: var(--ion-color-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image-feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* 内容区域 */
.image-card-header {
  padding: 1.25rem 1.25rem 0.75rem;
  text-align: center;
  flex-shrink: 0;
}

.image-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: var(--ion-color-dark);
}

.image-card-subtitle {
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0.375rem 0 0;
  color: var(--ion-color-color-step-600, #666);
}

.image-card-body {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.25rem 1.25rem;
}

.image-card-image {
  width: 100%;
  height: auto;
  display: block;
}

/* 布局变体 */
.image-feature-card.text-top {
  flex-direction: column;
}

.image-feature-card.text-bottom {
  flex-direction: column-reverse;
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
  .image-feature-card {
    background: var(--ion-color-dark);
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.05);
  }

  .image-feature-card:hover {
    box-shadow: 0 8px 30px rgba(255, 255, 255, 0.08);
  }

  .image-card-title {
    color: var(--ion-color-light);
  }

  .image-card-subtitle {
    color: var(--ion-color-color-step-400, #999);
  }
}

/* 无障碍支持 */
@media (prefers-reduced-motion: reduce) {
  .image-feature-card {
    transition: none;
  }

  .image-feature-card:hover {
    transform: none;
  }
}
```

---

## Task 3: Fix SolverJigsawPuzzle-web — FeatureSection.tsx

**Files:** Modify: `src/components/AppStore/FeatureSection.tsx`

**Change:** Replace `IonGrid/IonRow/IonCol` with native `div` grid so CSS Grid controls alignment.

```tsx
import React from 'react';
import FeatureCard from './FeatureCard';
import ImageFeatureCard from './ImageFeatureCard';
import './FeatureSection.css';

interface Feature {
  id: string;
  icon?: string;
  iconColor?: string;
  title: string;
  subtitle?: string;
  variant?: 'default' | 'stats';
  colSize?: {
    xs?: string;
    md?: string;
    lg?: string;
  };
  type?: 'feature' | 'image';
  imageUrl?: string;
  imageAlt?: string;
  layout?: 'text-top' | 'text-bottom';
}

interface FeatureSectionProps {
  title: string;
  features: Feature[];
  backgroundColor?: 'light' | 'white';
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  features,
  backgroundColor = 'light',
  className = ''
}) => {
  return (
    <section className={`feature-section feature-section--${backgroundColor} ${className}`}>
      <div className="section-content">
        <h2 className="section-title">{title}</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <div key={feature.id} className="grid-item">
              {feature.type === 'image' ? (
                <ImageFeatureCard
                  title={feature.title}
                  subtitle={feature.subtitle}
                  imageUrl={feature.imageUrl || ''}
                  imageAlt={feature.imageAlt}
                  layout={feature.layout}
                />
              ) : (
                <FeatureCard
                  icon={feature.icon}
                  iconColor={feature.iconColor}
                  title={feature.title}
                  subtitle={feature.subtitle}
                  variant={feature.variant}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
```

---

## Task 4: Fix SolverJigsawPuzzle-web — FeatureSection.css

**Files:** Modify: `src/components/AppStore/FeatureSection.css`

**Change:** Use CSS Grid with `align-items: stretch` so row cards have equal height.

```css
.feature-section {
  padding: 60px 0;
}

.feature-section--light {
  background: var(--ion-color-light);
}

.feature-section--white {
  background: var(--ion-background-color);
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--ion-padding);
}

.section-title {
  font-size: 2rem;
  line-height: 1.125;
  font-weight: 600;
  letter-spacing: 0.004em;
  margin: 0 0 40px 0;
  color: var(--ion-color-dark);
  text-align: center;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: stretch;
  gap: 1.5rem;
}

.grid-item {
  display: flex;
  flex-direction: column;
}

/* 响应式设计 */
@media (min-width: 576px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .section-content {
    padding: 0 40px;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 60px;
  }
}

@media (min-width: 1024px) {
  .section-content {
    padding: 0 60px;
  }

  .section-title {
    font-size: 3rem;
  }

  .feature-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .section-content {
    padding: 0 80px;
  }
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  .section-title {
    color: var(--ion-color-light);
  }
}
```

---

## Task 5: Fix my-apps-web — ImageFeatureCard.css

**Files:** Modify: `components/project/ImageFeatureCard.css`

**Change:** Update `.image-card-image` to `width:100%; height:auto` and body to flex centering.

```css
.image-feature-card {
  background-color: var(--card-bg, #ffffff);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dark .image-feature-card {
  background-color: var(--card-bg-dark, #1f2937);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3);
}

.image-feature-card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.dark .image-feature-card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.4);
}

/* text-top: header (text) on top, body (image) below */
.image-card--text-top {
  flex-direction: column;
}

/* text-bottom: body (image) on top, header (text) below */
.image-card--text-bottom {
  flex-direction: column-reverse;
}

.image-card-header {
  padding: 1.25rem 1.25rem 0.75rem;
  text-align: center;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--card-title-color, #111827);
  margin: 0;
}

.dark .image-card-title {
  color: var(--card-title-color-dark, #f9fafb);
}

.image-card-subtitle {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--card-subtitle-color, #6b7280);
  margin: 0.375rem 0 0;
}

.dark .image-card-subtitle {
  color: var(--card-subtitle-color-dark, #9ca3af);
}

.image-card-body {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.25rem 1.25rem;
}

.image-card-image {
  width: 100%;
  height: auto;
  display: block;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 8rem;
  background-color: var(--placeholder-bg, #f3f4f6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.dark .image-placeholder {
  background-color: var(--placeholder-bg-dark, #374151);
}

.placeholder-text {
  font-size: 0.875rem;
  color: var(--card-subtitle-color, #6b7280);
  text-align: center;
}

.dark .placeholder-text {
  color: var(--card-subtitle-color-dark, #9ca3af);
}
```

---

## Task 6: Fix my-apps-web — FeatureSection.css

**Files:** Modify: `components/project/FeatureSection.css`

**Change:** Add `align-items: stretch` to `.feature-grid` so row cards equal height.

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

.dark .section-title {
  color: var(--section-title-color-dark, #f9fafb);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: stretch;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## Task 7: Commit changes

**Files:** All modified files above

**Commands:**
```bash
cd /Users/theone/theone/Programme/my-apps/SolverJigsawPuzzle-web && git add -A && git commit -m "fix: preserve image aspect ratio and align card row heights

- Replace IonCard with native div in ImageFeatureCard
- Update FeatureSection to use CSS Grid with align-items: stretch
- Change image CSS to width:100%; height:auto (no cropping)
- Add dark mode support for new elements

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"

cd /Users/theone/theone/Programme/my-apps/my-apps-web && git add -A && git commit -m "fix: preserve image aspect ratio and align card row heights

- Update ImageFeatureCard CSS: width:100%; height:auto
- Add align-items:stretch to FeatureSection grid
- Add dark mode support for new elements

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
