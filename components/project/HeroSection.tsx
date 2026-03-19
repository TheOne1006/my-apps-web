import React from 'react'
import './HeroSection.css'

interface HeroSectionProps {
  title: string[]
  description: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  return (
    <section className="hero-section">
      <div className="hero-content text-center">
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
