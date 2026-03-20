import { getApps } from '@/lib/docs'
import { AppCard } from '@/components/app-card'
import { Header } from '@/components/header'

export default async function HomePage() {
  const apps = await getApps()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container px-4 py-12 mx-auto max-w-5xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Docs</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            选择一个应用查看其法律文档
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  )
}
