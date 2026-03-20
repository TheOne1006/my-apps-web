# Poker-Scan 项目页面设计

**日期:** 2026-03-20
**状态:** 已批准

## 背景

为 poker-scan 应用创建 `project.mdx` 页面，展示产品功能和使用截图。参考页面: https://poker.ai-scan.top/project

## 目标

- 使用 MDX 组件（HeroSection、FeatureGrid、FeatureCard、InfoSection、DataTable）
- 新增 ImageCard 组件用于展示产品截图
- 图片复制到 `public/images/poker-scan/` 目录

## 页面结构

### 1. HeroSection
- title: "AI 记牌助手"
- subtitle: 产品简介（目标识别算法 + 十万级真实场景数据训练）

### 2. FeatureGrid (发现与探索) - 3列
- 精选多种流行扑克
- 快捷编辑与扩展
- 完整使用导航

### 3. ImageCard (首页截图)
- 使用 `hone-page-list.png`

### 4. FeatureGrid (设置与自定义) - 2列
- 设置页面（用户信息、VIP购买、用户反馈）
- 自定义画中画

### 5. ImageCard (设置页面截图)
- 使用 `setting-page_540x960.png`

### 6. FeatureGrid (核心功能) - 2x2
- OCR 图片识别技术
- 剩余牌数统计
- 出牌历史记录
- 7天免费VIP试用

### 7. ImageCard (画中画截图)
- 使用 `small-window-setting_540x960.png`

### 8. InfoSection (隐私与安全)
- 非外挂工具
- 隐私至上
- 屏幕信息用后即毁

### 9. DataTable (支持游戏)
| 游戏 | 支持状态 |
|------|---------|
| 斗地主 | ✅ |
| 跑得快 | ✅ |
| 510K | ✅ |
| 掼蛋 | ✅ |

## 组件设计

### ImageCard

**文件:** `components/mdx/ImageCard.tsx`

```typescript
interface ImageCardProps {
  image: string      // 图片路径
  alt: string        // 描述文字
  caption?: string    // 可选标题
  className?: string
}
```

**视觉:**
- `rounded-xl overflow-hidden`
- `bg-white dark:bg-gray-800`
- `border border-gray-100 dark:border-gray-700`
- 图片宽度 100%，保持比例
- caption 可选显示在图片下方

## 文件变更

| 文件 | 操作 |
|------|------|
| `public/images/poker-scan/` | 复制图片 |
| `components/mdx/ImageCard.tsx` | 新建 |
| `components/mdx/index.ts` | 导出 ImageCard |
| `content/poker-scan/project.mdx` | 新建 |

## 图片清单

从 `/Users/theone/theone/Programme/forks/poker-scan-web/public/images/` 复制:
- `hone-page-list.png` → 首页截图
- `setting-page_540x960.png` → 设置页面截图
- `small-window-setting_540x960.png` → 画中画截图
