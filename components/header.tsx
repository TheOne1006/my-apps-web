import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

interface HeaderProps {
  appName?: string
  appIcon?: string
}

export function Header({ appName, appIcon }: HeaderProps) {
  const name = appName ?? 'Docs'
  const icon = appIcon ?? '📄'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto max-w-5xl">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl">{icon}</span>
          <span className="font-semibold">{name}</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
