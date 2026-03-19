import { notFound } from 'next/navigation'
import { getApp, getApps, getProject, getProjectPaths } from '@/lib/docs'
import HeroSection from '@/components/project/HeroSection'
import FeatureSection from '@/components/project/FeatureSection'

interface PageProps {
  params: Promise<{ app: string }>
}

export async function generateStaticParams() {
  const apps = await getApps()
  const params: { app: string }[] = []

  for (const app of apps) {
    const hasProject = await getProjectPaths(app.id)
    if (hasProject) {
      params.push({ app: app.id })
    }
  }

  return params
}

export async function generateMetadata({ params }: PageProps) {
  const { app: appId } = await params
  const project = await getProject(appId)

  if (!project) return { title: 'Not Found' }

  const title = project.hero.title[0] || '项目介绍'

  return {
    title: `${title}`,
    description: project.hero.description,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { app: appId } = await params
  const [appMeta, project] = await Promise.all([
    getApp(appId),
    getProject(appId),
  ])

  if (!appMeta || !project) notFound()

  return (
    <main>
      <HeroSection
        title={project.hero.title}
        description={project.hero.description}
      />
      {project.sections.map((section) => (
        <FeatureSection key={section.id} section={section} />
      ))}
    </main>
  )
}
