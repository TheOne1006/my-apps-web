import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageItem {
  src: string
  alt: string
  caption?: string
}

interface ImageCardProps {
  image?: string
  alt?: string
  caption?: string
  images?: ImageItem[]
  className?: string
}

function ImageItem({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div className="relative w-full aspect-[9/16] bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-900/80">
          {caption}
        </div>
      )}
    </div>
  )
}

export function ImageCard({ image, alt, caption, images, className }: ImageCardProps) {
  // Multiple images mode
  if (images && images.length > 0) {
    return (
      <div
        className={cn(
          'mt-6 mb-6 grid gap-4',
          images.length === 1
            ? 'grid-cols-1'
            : images.length === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          className
        )}
      >
        {images.map((img, i) => (
          <ImageItem key={i} {...img} />
        ))}
      </div>
    )
  }

  // Single image mode
  if (!image) return null

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
          alt={alt ?? ''}
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
