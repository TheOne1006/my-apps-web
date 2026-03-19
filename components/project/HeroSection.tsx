import React from 'react'
import './HeroSection.css'

interface HeroSectionProps {
  title: string[]
  description: string
  className?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description, className }) => {
  return (
    <section className={`hero-section ${className ?? ''}`}>
      <div className="hero-content text-center max-w-3xl mx-auto">
        <h1 className="hero-title">
          {title.map((line, index) => (
            <span key={index} className="hero-title-line">
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-description">{description}</p>
      </div>
    </section>
  )
}

export default HeroSection
