# MDX 组件增强设计

**日期:** 2026-03-20
**状态:** 已批准

## 背景

当前 MDX 文档站点已有 HeroSection、FeatureCard、FeatureGrid、StepList、DataTable 等组件。需要增强视觉表现，同时新增 InfoSection 组件以支持更丰富的内容区块展示。

参考页面: https://poker.ai-scan.top/project

## 目标

- 增强功能卡片的视觉表现（悬停效果、变体支持）
- 新增 InfoSection 组件用于信息展示区
- 保持与现有组件风格一致（圆角、阴影、dark mode）

## 组件设计

### 1. FeatureCard 增强

**文件:** `components/mdx/FeatureCard.tsx`

**Props:**
```typescript
interface FeatureCardProps {
  icon?: ReactNode        // 可选图标
  title: string           // 卡片标题
  description: string     // 卡片描述
  variant?: 'default' | 'bordered' | 'gradient'  // 样式变体
  className?: string
}
```

**视觉增强:**
- 悬停效果: `hover:-translate-y-1` + 阴影加深
- `bordered` 变体: 边框样式
- `gradient` 变体: 渐变背景边框
- 保留原有接口兼容

### 2. InfoSection 新增

**文件:** `components/mdx/InfoSection.tsx`

**Props:**
```typescript
interface InfoSectionProps {
  title: string
  description?: string
  children?: ReactNode      // 支持列表或其他内容
  icon?: ReactNode          // 可选左侧图标
  className?: string
}
```

**视觉设计:**
- 标题: `text-xl font-semibold`
- 描述: `text-base text-gray-600 dark:text-gray-400`
- 子节点渲染: 直接传递 ReactNode
- 整体: `rounded-xl bg-white dark:bg-gray-800`

## 文件变更

| 文件 | 操作 |
|------|------|
| `components/mdx/FeatureCard.tsx` | 原地增强 |
| `components/mdx/InfoSection.tsx` | 新增 |
| `components/mdx/index.ts` | 导出 InfoSection |

## 使用示例

```mdx
import { FeatureCard, FeatureGrid, InfoSection } from '@/components/mdx'

<FeatureCard
  icon="⚡"
  title="快速高效"
  description="采用先进的算法优化..."
  variant="gradient"
/>

<InfoSection title="隐私与安全" description="安全合规，非外挂工具">
  - 仅使用 Apple 登录邮箱作为身份标识
  - 屏幕信息，用后即毁
</InfoSection>
```
