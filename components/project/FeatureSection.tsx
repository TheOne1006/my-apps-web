import React from 'react'
import './FeatureSection.css'
import FeatureCard from './FeatureCard'
import ImageFeatureCard from './ImageFeatureCard'
import type { FeatureSectionData } from '@/lib/docs'

interface FeatureSectionProps {
  section: FeatureSectionData
  className?: string
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ section, className }) => {
  const bgClass = section.backgroundColor === 'white' ? 'bg-white dark:bg-gray-50' : 'bg-gray-50 dark:bg-gray-900'

  return (
    <section className={`feature-section py-16 ${bgClass} ${className ?? ''}`}>
      <div className="section-content">
        <h2 className="section-title">{section.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.cards.map((card) => {
            const colSize = card.colSize
            const colClass = colSize
              ? `col-span-12 ${colSize.md !== undefined ? `md:col-span-${colSize.md}` : 'md:col-span-6'} ${colSize.lg !== undefined ? `lg:col-span-${colSize.lg}` : 'lg:col-span-4'}`
              : 'col-span-12 md:col-span-6 lg:col-span-4'

            return (
              <div key={card.id} className={colClass}>
                {card.type === 'image' ? (
                  <ImageFeatureCard
                    title={card.title}
                    subtitle={card.subtitle}
                    imageUrl={card.imageUrl}
                    imageAlt={card.imageAlt}
                    layout={card.layout}
                  />
                ) : (
                  <FeatureCard
                    icon={card.icon}
                    iconColor={card.iconColor}
                    title={card.title}
                    subtitle={card.subtitle}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
