import React from 'react'
import './FeatureSection.css'
import FeatureCard from './FeatureCard'
import ImageFeatureCard from './ImageFeatureCard'
import { cn } from '@/lib/utils'
import type { FeatureSectionData, FeatureCardData } from '@/lib/docs'

interface FeatureSectionProps {
  section: FeatureSectionData
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ section }) => {
  const bgClass = section.backgroundColor === 'white' ? 'bg-white dark:bg-gray-50' : 'bg-gray-50 dark:bg-gray-900'

  return (
    <section className={`feature-section py-16 ${bgClass}`}>
      <div className="section-content">
        <h2 className="section-title">{section.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {section.cards.map((card) => (
            <CardWrapper key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CardWrapper({ card }: { card: FeatureCardData }) {
  const colSize = card.colSize
  const defaultCol = 'col-span-1 md:col-span-6 lg:col-span-6'

  const xsClass = colSize?.xs === '6' ? 'col-span-6'
    : colSize?.xs === '4' ? 'col-span-4'
    : colSize?.xs === '3' ? 'col-span-3'
    : colSize?.xs === '8' ? 'col-span-8'
    : !colSize ? '' : ''

  const mdClass = colSize?.md === '12' ? 'md:col-span-12'
    : colSize?.md === '4' ? 'md:col-span-4'
    : colSize?.md === '3' ? 'md:col-span-3'
    : colSize?.md === '8' ? 'md:col-span-8'
    : colSize ? '' : 'md:col-span-6'

  const lgClass = colSize?.lg === '12' ? 'lg:col-span-12'
    : colSize?.lg === '6' ? 'lg:col-span-6'
    : colSize?.lg === '3' ? 'lg:col-span-3'
    : colSize?.lg === '8' ? 'lg:col-span-8'
    : !colSize ? '' : 'lg:col-span-4'

  const wrapperClass = colSize
    ? cn(xsClass, mdClass, lgClass)
    : defaultCol

  if (card.type === 'image') {
    return (
      <div className={wrapperClass}>
        <ImageFeatureCard
          title={card.title}
          subtitle={card.subtitle}
          imageUrl={card.imageUrl}
          imageAlt={card.imageAlt}
          layout={card.layout}
        />
      </div>
    )
  }

  return (
    <div className={wrapperClass}>
      <FeatureCard
        icon={card.icon}
        iconColor={card.iconColor}
        title={card.title}
        subtitle={card.subtitle}
      />
    </div>
  )
}

export default FeatureSection
