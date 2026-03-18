import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getApp, getApps, getDoc, getDocPaths } from '@/lib/docs'

interface PageProps {
  params: Promise<{ app: string; slug: string[] }>
}

export async function generateStaticParams() {
  const apps = await getApps()
  const params: { app: string; slug: string[] }[] = []

  for (const app of apps) {
    const paths = await getDocPaths(app.id)
    params.push(...paths.map((slug) => ({ app: app.id, slug })))
  }

  return params
}

export async function generateMetadata({ params }: PageProps) {
  const { app, slug } = await params
  const doc = await getDoc(app, slug)

  if (!doc) return { title: 'Not Found' }

  return {
    title: `${doc.meta.title} - Legal Docs`,
    description: doc.meta.description,
  }
}

export default async function DocPage({ params }: PageProps) {
  const { app: appId, slug } = await params
  const [appMeta, doc] = await Promise.all([
    getApp(appId),
    getDoc(appId, slug),
  ])

  if (!appMeta || !doc) notFound()

  const Content = doc.content

  return (
    <article className="container px-4 py-12 mx-auto max-w-3xl">
      <nav className="mb-8">
        <Link
          href={`/${appId}`}
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          ← {appMeta.name}
        </Link>
      </nav>

      <div className="prose dark:prose-invert max-w-none">
        <Content />
      </div>
    </article>
  )
}
