# AppFooter 组件实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建一个 4 分区布局的 AppFooter 组件，用于 App 文档页面，支持从 apps.json 配置下载地址、联系信息、法律信息。

**Architecture:** 新建 `components/AppFooter/` 目录，扩展 `lib/config.ts` 类型定义，更新 `content/apps.json` 配置示例，将组件集成到 `app/(docs)/[app]/layout.tsx`。

**Tech Stack:** Next.js 15 + React + TypeScript + Tailwind CSS

---

### Task 1: 扩展类型定义

**Files:**
- Modify: `lib/config.ts`

**Step 1: 读取现有 config.ts**

**Step 2: 扩展类型定义**

在 `lib/config.ts` 中添加 `AppFooterConfig` 类型和扩展 `siteFooter`：

```ts
export interface AppFooterQuickLinks {
  faq?: string
  contact?: string
}

export interface AppFooterLegal {
  privacy?: string
  terms?: string
}

export interface AppFooterConfig {
  iosAppStoreUrl?: string
  iosMinVersion?: string
  copyrightName?: string
  contactEmail?: string
  customerServiceHours?: string
  quickLinks?: AppFooterQuickLinks
  legal?: AppFooterLegal
}

export interface AppMeta {
  id: string
  name: string
  description: string
  icon: string
  footer?: AppFooterConfig
}

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

**Step 3: 提交**

```bash
git add lib/config.ts
git commit -m "feat(config): extend siteFooter with AppFooter types"
```

---

### Task 2: 更新 apps.json 示例配置

**Files:**
- Modify: `content/apps.json`

**Step 1: 为第一个 app 添加 footer 配置**

```json
{
  "id": "my-app",
  "name": "My App",
  "description": "这是我的第一个应用，提供优质的服务体验",
  "icon": "📱",
  "footer": {
    "iosAppStoreUrl": "https://apps.apple.com/app/example",
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

**Step 2: 提交**

```bash
git add content/apps.json
git commit -m "feat(apps): add footer config to my-app"
```

---

### Task 3: 创建 AppFooter 组件

**Files:**
- Create: `components/AppFooter/AppFooter.tsx`
- Create: `components/AppFooter/index.ts`

**Step 1: 创建 AppFooter.tsx**

```tsx
import Link from "next/link"
import { siteFooter, AppFooterConfig } from "@/lib/config"

interface AppFooterProps {
  config?: AppFooterConfig
  appName: string
}

export function AppFooter({ config, appName }: AppFooterProps) {
  const iosMinVersion = config?.iosMinVersion ?? "iOS 16.0 及以上版本"
  const customerServiceHours = config?.customerServiceHours ?? siteFooter.customerServiceHours

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-16 py-10 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {/* 立即下载 */}
          {config?.iosAppStoreUrl && (
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
                立即下载
              </h3>
              <a
                href={config.iosAppStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-700 text-white rounded-xl font-medium text-sm hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-gray-900/50 mb-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store 下载
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                支持 {iosMinVersion}
              </p>
            </div>
          )}

          {/* 快速链接 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
              快速链接
            </h3>
            <div className="flex flex-col gap-2">
              {config?.quickLinks?.faq ? (
                <Link
                  href={config.quickLinks.faq}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  常见问题
                </Link>
              ) : (
                <Link
                  href={`/${appName}/md/faq`}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  常见问题
                </Link>
              )}
              {config?.quickLinks?.contact ? (
                <Link
                  href={config.quickLinks.contact}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  联系我们
                </Link>
              ) : (
                <Link
                  href={`/${appName}/md/contact`}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  联系我们
                </Link>
              )}
            </div>
          </div>

          {/* 联系信息 */}
          {config?.contactEmail && (
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
                联系信息
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${config.contactEmail}`}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  邮箱：{config.contactEmail}
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  客服时间：{customerServiceHours}
                </p>
              </div>
            </div>
          )}

          {/* 法律信息 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
              法律信息
            </h3>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                © {siteFooter.copyright.year} {config?.copyrightName ?? siteFooter.copyright.name}
              </p>
              {siteFooter.icp && (
                <a
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {siteFooter.icp}
                </a>
              )}
              <div className="flex gap-3 pt-1">
                {config?.legal?.privacy ? (
                  <Link
                    href={config.legal.privacy}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    隐私政策
                  </Link>
                ) : (
                  <Link
                    href={`/${appName}/md/privacy`}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    隐私政策
                  </Link>
                )}
                {config?.legal?.terms && (
                  <>
                    <span className="text-gray-400">|</span>
                    <Link
                      href={config.legal.terms}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      服务条款
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: 创建 index.ts**

```ts
export { AppFooter } from "./AppFooter"
```

**Step 3: 提交**

```bash
git add components/AppFooter/
git commit -m "feat: add AppFooter component with 4-column layout"
```

---

### Task 4: 集成到 App Layout

**Files:**
- Modify: `app/(docs)/[app]/layout.tsx`

**Step 1: 修改 layout.tsx**

在 `app/(docs)/[app]/layout.tsx` 中：

1. 导入 `AppFooter` 组件
2. 将 `<AppFooter>` 添加到布局底部

```tsx
import { notFound } from 'next/navigation'
import { getApp } from '@/lib/docs'
import { Header } from '@/components/header'
import { AppFooter } from '@/components/AppFooter'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ app: string }>
}

export default async function AppLayout({ children, params }: LayoutProps) {
  const { app: appId } = await params
  const appMeta = await getApp(appId)

  if (!appMeta) notFound()

  return (
    <div className="min-h-screen flex flex-col">
      <Header appName={appMeta.name} appIcon={appMeta.icon} />
      <main className="flex-1">{children}</main>
      <AppFooter config={appMeta.footer} appName={appMeta.id} />
    </div>
  )
}
```

**Step 2: 提交**

```bash
git add app/\(docs\)/\[app\]/layout.tsx
git commit -m "feat: integrate AppFooter into app layout"
```

---

### Task 5: 运行测试和 lint

**Step 1: 运行 lint 和类型检查**

```bash
cd /Users/theone/theone/Programme/my-apps/my-apps-web && npm run lint
```

**Step 2: 运行构建**

```bash
npm run build
```

**Step 3: 如果有 lint 错误或构建错误，修复后重新提交**

---

### Task 6: 最终提交

确保所有更改已提交，git status 干净。
