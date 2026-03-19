# Footer 全局配置设计方案

## 概述

将 Footer 从内联代码重构为全局配置 + 组件，实现所有权声明、联系方式、备案信息的统一管理和复用。

## 配置数据结构（`lib/config.ts`）

```ts
export const siteFooter = {
  copyright: {
    name: "My Apps",
    year: 2026,
  },
  contact: {
    email: "support@example.com",
    links: [
      { label: "GitHub", url: "https://github.com/xxx" },
      { label: "Twitter", url: "https://twitter.com/xxx" },
    ],
  },
  icp: "京ICP备2026000000号-1",
}
```

- `copyright.name` — 所有者名称
- `copyright.year` — 可选，不填则自动用当前年份
- `contact.email` — 邮箱地址
- `contact.links` — 链接列表 `{ label, url }`
- `icp` — 备案信息，可为空

## Footer 组件（`components/footer.tsx`）

单行紧凑布局：

```
© 2026 My Apps · support@example.com · GitHub · Twitter · 京ICP备2026000000号-1
```

- 用 `·` 分隔各项
- 链接可点击跳转
- 使用现有样式：`text-sm text-gray-500 dark:text-gray-400`

## 集成方式

- 创建 `components/footer.tsx` 组件，从 `lib/config.ts` 读取配置
- 替换 `app/(docs)/layout.tsx` 中的内联 Footer
- 后续所有项目通过修改 `lib/config.ts` 即可统一更新 Footer 内容

## 扩展性

`contact.links` 为数组结构，未来可轻松添加更多联系方式类型（微信、公众号、Telegram 等）。

## 实施步骤

1. 创建 `lib/config.ts`，定义 `siteFooter` 配置对象
2. 创建 `components/footer.tsx` Footer 组件
3. 替换 `app/(docs)/layout.tsx` 中的内联 Footer，引入新组件
4. 运行 `npm test && npm run lint` 验证
