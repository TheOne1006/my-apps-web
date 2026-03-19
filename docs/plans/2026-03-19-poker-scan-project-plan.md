# poker-scan 项目展示页面实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 poker-scan 的 `project.mdx` 改造为卡片式 MDX 页面，支持响应式列宽，参考 solver-jigsaw-puzzle 的结构。

**Architecture:** `project.mdx` 导出 `projectData` 对象，页面通过 `getProject()` 读取并渲染 HeroSection + FeatureSection。FeatureSection 使用 CSS grid 实现响应式布局，`getWrapperClass` 控制每张卡片的列宽。

**Tech Stack:** Next.js 16 + Tailwind CSS v4 + MDX + TypeScript

---

## Task 1: 添加 iconColor 映射

**Files:**
- Modify: `components/project/FeatureCard.tsx` — 扩展 iconColorMap 和 getIconEmoji
- Modify: `components/project/FeatureCard.css` — 添加对应颜色样式

扩展 FeatureCard 支持更多 iconColor：content（📊）、purchase（🛒）、guidelines（🎮）、isolation（👁️）、data（🔒）。

参考 `poker-scan-web/src/components/AppStore/FeatureCard.tsx` 中用到的颜色。

---

## Task 2: 为 FeatureCard 添加 colSize 支持

**Files:**
- Modify: `lib/docs.ts` — TextCardData 类型添加 colSize 属性
- Modify: `components/project/FeatureSection.tsx` — getWrapperClass 支持完整三档 xs/md/lg

当前 feature card（TextCardData）没有 colSize 支持，导致无法控制响应式列宽。

---

## Task 3: 复制图片

**Files:**
- Create: `public/images/poker-scan/`（7 张图片）

```bash
mkdir -p public/images/poker-scan
cp /Users/theone/theone/Programme/forks/poker-scan-web/public/images/*.png public/images/poker-scan/
```

---

## Task 4: 重写 poker-scan/project.mdx

**Files:**
- Modify: `content/poker-scan/project.mdx`

5 个 sections：
1. **发现与探索**（light, 3 个 image card）
2. **设置与自定义**（white, 2 个 image card）
3. **核心功能**（light, 4 个 feature card）
4. **支持游戏**（white, 2 个 feature card）
5. **隐私与安全**（light, 3 个 feature card）

参考 `ProjectFeaturesConstant.tsx` 中的数据，图片路径使用 `/images/poker-scan/xxx.png`。
