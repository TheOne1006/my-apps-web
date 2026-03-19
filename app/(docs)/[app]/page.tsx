import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getApp, getApps, getDocs } from '@/lib/docs'

interface PageProps {
  params: Promise<{ app: string }>
}

export async function generateStaticParams() {
  const apps = await getApps()
  return apps.map((app) => ({ app: app.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { app: appId } = await params
  const appMeta = await getApp(appId)

  if (!appMeta) return { title: 'Not Found' }

  return {
    title: `${appMeta.name} - Docs`,
    description: appMeta.description,
  }
}

export default async function AppPage({ params }: PageProps) {
  const { app: appId } = await params
  const [appMeta, docs] = await Promise.all([
    getApp(appId),
    getDocs(appId),
  ])

  if (!appMeta) notFound()

  return (
    <div className="container px-4 py-12 mx-auto max-w-3xl">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
      >
        ← 返回首页
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{appMeta.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{appMeta.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{appMeta.description}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 border-b pb-2">文档列表</h2>

      {docs.length === 0 ? (
        <p className="text-gray-500">暂无文档</p>
      ) : (
        <ul className="space-y-3">
          {docs.map((doc) => (
            <li key={doc.slug.join('/')}>
              <Link
                href={`/${appId}/${doc.slug.join('/')}`}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <span className="font-medium">{doc.meta.title}</span>
                <span className="text-gray-400">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
