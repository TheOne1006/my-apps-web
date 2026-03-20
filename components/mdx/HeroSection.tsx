import { cn } from '@/lib/utils'

interface HeroSectionProps {
  title: string
  subtitle?: string
  className?: string
}

export function HeroSection({ title, subtitle, className }: HeroSectionProps) {
  return (
    <section className={cn('py-8 md:py-12', className)}>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </section>
  )
}
