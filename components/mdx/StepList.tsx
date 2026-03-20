import { cn } from '@/lib/utils'

interface Step {
  title: string
  description: string
}

interface StepListProps {
  steps: Step[]
  className?: string
}

export function StepList({ steps, className }: StepListProps) {
  return (
    <ol className={cn('space-y-4', className)}>
      {steps.map((step, index) => (
        <li
          key={index}
          className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
        >
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100">
              {step.title}
            </h4>
            <p className="mt-1 text-sm md:text-base text-gray-600 dark:text-gray-400">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
