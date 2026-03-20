import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface InfoSectionProps {
  title: string
  description?: string
  children?: ReactNode
  icon?: ReactNode
  className?: string
}

export function InfoSection({ title, description, children, icon, className }: InfoSectionProps) {
  return (
    <section
      className={cn(
        'mt-6 mb-6 p-6 rounded-xl bg-white dark:bg-gray-800',
        'border border-gray-100 dark:border-gray-700',
        className
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="text-2xl md:text-3xl flex-shrink-0 mt-0.5">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-4 text-sm md:text-base text-gray-600 dark:text-gray-400">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
