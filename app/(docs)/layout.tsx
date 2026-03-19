export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t">
        © {new Date().getFullYear()} Docs. All rights reserved.
      </footer>
    </div>
  )
}
