import Link from "next/link"
import { siteFooter, type AppFooterConfig } from "@/lib/config"

interface AppFooterProps {
  config?: AppFooterConfig
  appName: string
}

export function AppFooter({ config, appName }: AppFooterProps) {
  const year = siteFooter.copyright.year ?? new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-16 py-10 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {/* Zone 1 - Download */}
          {config?.iosAppStoreUrl && (
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
                立即下载
              </h3>
              <a
                href={config.iosAppStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:-translate-y-0.5 transition-transform"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store 下载
              </a>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                支持 {config?.iosMinVersion ?? "iOS 16.0 及以上版本"}
              </p>
            </div>
          )}

          {/* Zone 2 - Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
              快速链接
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={config?.quickLinks?.faq ?? `/${appName}/md/faq`}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  常见问题
                </Link>
              </li>
              <li>
                <Link
                  href={config?.quickLinks?.contact ?? `/${appName}/md/contact`}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Zone 3 - Contact Info */}
          {config?.contactEmail && (
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
                联系信息
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${config.contactEmail}`}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {config.contactEmail}
                  </a>
                </li>
                <li className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  客服时间: {config?.customerServiceHours ?? siteFooter.customerServiceHours}
                </li>
              </ul>
            </div>
          )}

          {/* Zone 4 - Legal */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
              法律信息
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  &copy; {year} {config?.copyrightName ?? siteFooter.copyright.name}
                </span>
              </li>
              {siteFooter.icp && (
                <li>
                  <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {siteFooter.icp}
                  </a>
                </li>
              )}
              <li>
                <Link
                  href={config?.legal?.privacy ?? `/${appName}/md/privacy`}
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  隐私政策
                </Link>
              </li>
              {config?.legal?.terms && (
                <li>
                  <Link
                    href={config.legal.terms}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    服务条款
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
