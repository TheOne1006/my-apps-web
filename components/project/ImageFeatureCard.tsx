'use client'

import React, { useState } from 'react'
import './ImageFeatureCard.css'

interface ImageFeatureCardProps {
  title: string
  subtitle?: string
  imageUrl: string
  imageAlt?: string
  layout?: 'text-top' | 'text-bottom'
  className?: string
}

const ImageFeatureCard: React.FC<ImageFeatureCardProps> = ({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  layout = 'text-top',
  className,
}) => {
  const [imgError, setImgError] = useState(false)

  return (
    <div className={`image-feature-card image-card--${layout} ${className ?? ''}`}>
      {/* text-top: header first (text on top). text-bottom: body first (image on top). */}
      <div className="image-card-header">
        <h3 className="image-card-title">{title}</h3>
        {subtitle && <p className="image-card-subtitle">{subtitle}</p>}
      </div>
      <div className="image-card-body">
        {imgError ? (
          <div className="image-placeholder">
            <span className="placeholder-text">{imageAlt || title}</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="image-card-image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </div>
  )
}

export default ImageFeatureCard
