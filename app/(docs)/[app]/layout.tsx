import { notFound } from 'next/navigation'
import { getApp } from '@/lib/docs'
import { Header } from '@/components/header'

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
      {children}
    </div>
  )
}
