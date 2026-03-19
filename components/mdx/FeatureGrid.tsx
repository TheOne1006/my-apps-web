import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface FeatureGridProps {
  cols?: 1 | 2 | 3
  className?: string
  children: ReactNode
}

export function FeatureGrid({ cols = 2, className, children }: FeatureGridProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <div className={cn(
      'grid gap-4 md:gap-6',
      colsClass[cols],
      className
    )}>
      {children}
    </div>
  )
}
