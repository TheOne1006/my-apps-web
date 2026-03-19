# Data Model: 项目卡片展示 (Project Card Display)

**Feature**: 002-project-card-mdx
**Date**: 2026-03-19

## Entities

### ProjectMDX

项目介绍 MDX 文件导出的完整数据结构。

```typescript
interface ProjectMDX {
  hero: HeroSectionData;
  sections: FeatureSectionData[];
}
```

### HeroSectionData

英雄区域数据。

```typescript
interface HeroSectionData {
  title: string[];       // 支持多行标题，如 ["🧩拼图助手"]
  description: string;    // 描述文字
}
```

**Validation**: `title` 数组至少包含一个非空字符串，`description` 为非空字符串。

### FeatureSectionData

功能区域数据。

```typescript
interface FeatureSectionData {
  id: string;                          // 唯一标识符
  title: string;                        // 区域标题，如 "界面与预览"
  backgroundColor?: 'light' | 'white';  // 背景色，默认 'light'
  cards: FeatureCardData[];            // 卡片数组，至少 1 个
}
```

**Validation**: `id` 在同一 ProjectMDX 中唯一，`title` 非空。

### FeatureCardData

功能卡片数据，支持两种类型（通过 `type` 字段区分）。

```typescript
// 基础字段（所有卡片都有）
interface BaseCardData {
  id: string;           // 卡片唯一标识
  title: string;       // 卡片标题
  subtitle?: string;   // 副标题/描述
}

// 文字卡片
interface TextCardData extends BaseCardData {
  type?: 'feature';    // 默认 'feature'
  icon?: string;       // Ionicons 图标名称（字符串形式）
  iconColor?: string; // 图标颜色标识：'stories' | 'unlock' | 'purchase' | 'security'
}

// 图片卡片
interface ImageCardData extends BaseCardData {
  type: 'image';
  imageUrl: string;                     // 图片路径，如 "./images/iphone-home-empty.png"
  imageAlt?: string;                   // 图片 alt 文本，默认使用 title
  layout?: 'text-top' | 'text-bottom'; // 文字与图片的相对位置，默认 'text-top'
  colSize?: ColSize;                   // 列宽配置
}

type FeatureCardData = TextCardData | ImageCardData;
```

### ColSize

响应式列宽配置。

```typescript
interface ColSize {
  xs?: string;   // 手机端（默认 "12"）
  md?: string;   // 平板端（默认 "6"）
  lg?: string;   // 桌面端（默认 "4"）
}
```

## Relationships

```
ProjectMDX (1)
  ├── hero: HeroSectionData (1)
  └── sections: FeatureSectionData[] (N)
                └── cards: FeatureCardData[] (N)
```

## Example

```typescript
const projectData: ProjectMDX = {
  hero: {
    title: ["🧩拼图助手"],
    description: "拼图辅助工具，通过对拼图图片进行智能识别和分析，快速定位目标，减轻找块压力，轻松完成拼图。"
  },
  sections: [
    {
      id: "app-list",
      title: "界面与预览",
      backgroundColor: "light",
      cards: [
        {
          id: "overview",
          type: "image",
          title: "拼图总览界面",
          subtitle: "直观展示当前拼图整体情况",
          imageUrl: "./images/iphone-home-empty.png",
          imageAlt: "拼图总览",
          layout: "text-top",
          colSize: { xs: "12", md: "6", lg: "4" }
        },
        {
          id: "core-recognition",
          type: "feature",
          icon: "searchOutline",
          iconColor: "stories",
          title: "智能识别拼图图像",
          subtitle: "基于图像识别算法，对图片进行本地分析"
        }
      ]
    }
  ]
}
```

## MDX Export Format

在 `content/{appId}/project.mdx` 中：

```mdx
export const projectData = {
  hero: {
    title: ["🧩拼图助手"],
    description: "拼图辅助工具..."
  },
  sections: [
    {
      id: "section-1",
      title: "界面与预览",
      backgroundColor: "light",
      cards: [
        {
          id: "card-1",
          type: "image",
          title: "卡片标题",
          subtitle: "卡片描述",
          imageUrl: "./images/example.png",
          layout: "text-top"
        }
      ]
    }
  ]
}
```
