# Quickstart: 项目卡片展示 (Project Card Display)

**Feature**: 002-project-card-mdx
**Date**: 2026-03-19

## Adding a New Project Page

### 1. Create content files

在 `content/{appId}/` 目录下创建/修改文件：

**`content/{appId}/project.mdx`**:

```mdx
export const projectData = {
  hero: {
    title: ["应用名称"],
    description: "应用一句话描述"
  },
  sections: [
    {
      id: "overview",
      title: "功能总览",
      backgroundColor: "light",
      cards: [
        {
          id: "feature-1",
          type: "image",
          title: "功能截图",
          subtitle: "功能描述文字",
          imageUrl: "./images/screenshot.png",
          layout: "text-top"
        }
      ]
    }
  ]
}
```

**`content/{appId}/images/`**: 放置所有项目展示图片（PNG、JPG、GIF、WebP）。

### 2. Add images directory

Copy images to `content/{appId}/images/` directory. Reference them using relative paths in MDX: `./images/filename.png`.

### 3. That's it

No code changes required. The page at `/{appId}/project` will automatically render with the new content.

## Card Types

### Image Card

```typescript
{
  id: "unique-id",
  type: "image",
  title: "标题",
  subtitle: "副标题（可选）",
  imageUrl: "./images/screenshot.png",
  imageAlt: "图片说明（可选，默认用 title）",
  layout: "text-top" | "text-bottom",
  colSize: { xs: "12", md: "6", lg: "4" } // 可选，默认响应式
}
```

### Text Card (with icon)

```typescript
{
  id: "unique-id",
  type: "feature", // 可省略，默认为 feature
  icon: "searchOutline", // Ionicons 图标名
  iconColor: "stories" | "unlock" | "purchase" | "security",
  title: "标题",
  subtitle: "副标题"
}
```

## Icon Colors

| Color Key | Theme |
|-----------|-------|
| `stories` | Stories theme |
| `unlock` | Unlock theme |
| `purchase` | Purchase theme |
| `security` | Security theme |

## Background Colors

Each `FeatureSection` can set `backgroundColor` to alternate between `light` and `white` for visual separation.
