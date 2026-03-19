import React from 'react'
import './FeatureSection.css'
import FeatureCard from './FeatureCard'
import ImageFeatureCard from './ImageFeatureCard'
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
  const wrapperClass = getWrapperClass(card)

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

function getWrapperClass(card: FeatureCardData): string {
  const colSize = card.colSize
  if (!colSize) {
    return 'col-span-1 md:col-span-6 lg:col-span-6'
  }

  const xs = colSize.xs || '12'
  const md = colSize.md || '6'
  const lg = colSize.lg || '4'

  const xsClass = xs === '12' ? 'col-span-1' : `col-span-${xs}`
  const mdClass = md === '6' ? 'md:col-span-6' : md === '4' ? 'md:col-span-4' : md === '12' ? 'md:col-span-12' : md === '3' ? 'md:col-span-3' : md === '8' ? 'md:col-span-8' : ''
  const lgClass = lg === '4' ? 'lg:col-span-4' : lg === '6' ? 'lg:col-span-6' : lg === '12' ? 'lg:col-span-12' : lg === '3' ? 'lg:col-span-3' : lg === '8' ? 'lg:col-span-8' : ''

  return `${xsClass} ${mdClass} ${lgClass}`.trim()
}

export default FeatureSection
