# AppFooter 组件设计方案

## 概述

为 `my-apps-web` 项目构建一个新的 `AppFooter` 组件，用于 App 文档页面。参考 SolverJigsawPuzzle-web 的 4 分区 Footer 布局，改写为 Next.js + Tailwind CSS 实现。

## 技术栈

- **框架**：Next.js 15 + React + TypeScript
- **样式**：Tailwind CSS
- **数据来源**：`lib/config.ts`（全局默认值）+ `content/apps.json`（每个 app 的覆盖配置）

## 配置结构

### 全局配置 — `lib/config.ts`

扩展 `siteFooter`：

```ts
export const siteFooter = {
  copyright: { name: "ai-scan.top", year: 2026 },
  contact: {
    email: "support@theone.io",
    links: [{ label: "GitHub", url: "https://github.com/TheOne1006" }],
  },
  icp: "闽ICP备14001334号",
  customerServiceHours: "9:00-18:00",
}
```

### App 配置 — `content/apps.json`

扩展每个 app 对象，所有 footer 字段可选：

```json
{
  "id": "my-app",
  "name": "My App",
  "description": "...",
  "icon": "📱",
  "footer": {
    "iosAppStoreUrl": "https://apps.apple.com/app/xxx",
    "iosMinVersion": "iOS 16.0 及以上版本",
    "copyrightName": "🧩拼图助手",
    "contactEmail": "297190869@qq.com",
    "customerServiceHours": "9:00-18:00",
    "quickLinks": {
      "faq": "/my-app/md/faq",
      "contact": "/my-app/md/contact"
    },
    "legal": {
      "privacy": "/my-app/md/privacy",
      "terms": "/my-app/md/terms"
    }
  }
}
```

## 组件分区

| 分区 | 条件 | 内容 |
|------|------|------|
| **立即下载** | 配置了 `iosAppStoreUrl` | App Store 下载按钮 + 最低版本说明 |
| **快速链接** | 固定展示 | 常见问题、联系我们 |
| **联系信息** | 配置了 `contactEmail` | 邮箱 + 客服时间 |
| **法律信息** | 固定展示 | 版权年份 + 版权名称 + ICP + 隐私政策/服务条款链接 |

## 响应式布局

- **移动端**：垂直堆叠
- **平板（≥768px）**：2 列网格
- **桌面（≥1024px）**：4 列网格

## 样式特性

- 暗色模式支持（Tailwind dark: 变体）
- 无障碍支持（prefers-reduced-motion）
- hover 动画效果

## 组件 Props

```ts
interface AppFooterProps {
  appId: string  // 用于查找对应的 apps.json 配置
}
```

## 实现文件

- `components/AppFooter/AppFooter.tsx` — 主组件
- `components/AppFooter/index.ts` — 导出
- 更新 `lib/config.ts` — 扩展 siteFooter 类型
- 更新 `content/apps.json` — 添加示例 footer 配置
- 更新 `app/(docs)/[app]/layout.tsx` — 集成 AppFooter
