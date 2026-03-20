import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageCardProps {
  image: string
  alt: string
  caption?: string
  className?: string
}

export function ImageCard({ image, alt, caption, className }: ImageCardProps) {
  return (
    <div
      className={cn(
        'mt-6 mb-6 rounded-xl overflow-hidden bg-white dark:bg-gray-800',
        'border border-gray-100 dark:border-gray-700',
        className
      )}
    >
      <div className="relative w-full h-auto aspect-[9/16]">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain"
        />
      </div>
      {caption && (
        <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
          {caption}
        </div>
      )}
    </div>
  )
}
