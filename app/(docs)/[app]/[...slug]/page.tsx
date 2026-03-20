import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { app, slug } = await params
  const doc = await getDoc(app, slug)

  if (!doc) return { title: 'Not Found' }

  return {
    title: `${doc.meta.title}`,
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
  const isProjectPage = slug.includes('project')

  return (
    <article className="container px-4 py-12 mx-auto">
      <div className={isProjectPage ? '' : 'prose dark:prose-invert max-w-none'}>
        <Content />
      </div>
    </article>
  )
}
