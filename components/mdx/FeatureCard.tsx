import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface FeatureCardProps {
  icon?: ReactNode
  title: string
  description: string
  variant?: 'default' | 'bordered' | 'gradient'
  className?: string
}

export function FeatureCard({ icon, title, description, variant = 'default', className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm',
        'border border-gray-100 dark:border-gray-700',
        'transition-all duration-200 ease-in-out',
        'hover:-translate-y-1 hover:shadow-md',
        variant === 'bordered' && 'border-2 border-gray-200 dark:border-gray-600',
        variant === 'gradient' && 'border-2 border-transparent',
        className
      )}
      style={
        variant === 'gradient'
          ? {
              background:
                'linear-gradient(transparent, transparent) padding-box, linear-gradient(135deg, #667eea 0%, #764ba2 100%) border-box',
            }
          : undefined
      }
    >
      {icon && (
        <div className="text-2xl md:text-3xl mb-3">
          {icon}
        </div>
      )}
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}
