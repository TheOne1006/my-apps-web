import { Header } from '@/components/header'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t">
        © {new Date().getFullYear()} Legal Docs. All rights reserved.
      </footer>
    </div>
  )
}
