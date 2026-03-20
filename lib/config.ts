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

export type { AppMeta } from './docs'

interface SiteFooterConfig {
  copyright: { name: string; year: number }
  contact: { email: string; links: { label: string; url: string }[] }
  icp?: string
  customerServiceHours: string
}

export const siteFooter: SiteFooterConfig = {
  copyright: {
    name: "ai-scan.top",
    year: 2026,
  },
  contact: {
    email: "support@theone.io",
    links: [
      { label: "GitHub", url: "https://github.com/TheOne1006" },
    ],
  },
  icp: "闽ICP备14001334号",
  customerServiceHours: "9:00-18:00",
}
