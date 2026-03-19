import React from 'react'
import './FeatureSection.css'
import FeatureCard from './FeatureCard'
import ImageFeatureCard from './ImageFeatureCard'
import type { FeatureSectionData, FeatureCardData } from '@/lib/docs'

interface FeatureSectionProps {
  section: FeatureSectionData
}

const xsMap: Record<string, string> = {
  '12': 'col-span-1',
  '6': 'col-span-6',
  '4': 'col-span-4',
  '3': 'col-span-3',
  '8': 'col-span-8',
}

const mdMap: Record<string, string> = {
  '12': 'md:col-span-12',
  '6': 'md:col-span-6',
  '4': 'md:col-span-4',
  '3': 'md:col-span-3',
  '8': 'md:col-span-8',
}

const lgMap: Record<string, string> = {
  '12': 'lg:col-span-12',
  '6': 'lg:col-span-6',
  '4': 'lg:col-span-4',
  '3': 'lg:col-span-3',
  '8': 'lg:col-span-8',
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ section }) => {
  const bgClass = section.backgroundColor === 'white' ? 'bg-white dark:bg-gray-50' : 'bg-gray-50 dark:bg-gray-900'

  return (
    <section className={`feature-section py-16 ${bgClass}`}>
      <div className="section-content">
        <h2 className="section-title">{section.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {section.cards.map((card) => {
            const colSize = card.colSize
            const xs = colSize ? (xsMap[colSize.xs || '12'] ?? 'col-span-1') : 'col-span-1'
            const md = colSize ? (mdMap[colSize.md || '6'] ?? 'md:col-span-6') : 'md:col-span-6'
            const lg = colSize ? (lgMap[colSize.lg || '4'] ?? 'lg:col-span-4') : 'lg:col-span-4'

            return (
              <div key={card.id} className={`${xs} ${md} ${lg}`}>
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
