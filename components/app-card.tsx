import Link from 'next/link'
import type { AppMeta } from '@/lib/docs'

interface AppCardProps {
  app: AppMeta
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Link
      href={`/${app.id}`}
      className="group block p-6 rounded-xl border bg-card hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{app.icon}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {app.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {app.description}
          </p>
        </div>
        <span className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          →
        </span>
      </div>
    </Link>
  )
}
