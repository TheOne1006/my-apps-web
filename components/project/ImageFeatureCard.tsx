'use client'

import React, { useState } from 'react'
import './ImageFeatureCard.css'

interface ImageFeatureCardProps {
  title: string
  subtitle?: string
  imageUrl: string
  imageAlt?: string
  layout?: 'text-top' | 'text-bottom'
}

const ImageFeatureCard: React.FC<ImageFeatureCardProps> = ({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  layout = 'text-top',
}) => {
  const [imgError, setImgError] = useState(false)
  const isTextTop = layout === 'text-top'

  return (
    <div className={`image-feature-card ${layout}`}>
      {isTextTop ? (
        <>
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
        </>
      ) : (
        <>
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
          <div className="image-card-header">
            <h3 className="image-card-title">{title}</h3>
            {subtitle && <p className="image-card-subtitle">{subtitle}</p>}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageFeatureCard
