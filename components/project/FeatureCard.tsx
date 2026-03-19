import React from 'react'
import './FeatureCard.css'

interface FeatureCardProps {
  icon?: string
  iconColor?: string
  title: string
  subtitle?: string
}

const iconColorMap: Record<string, string> = {
  stories: 'icon-placeholder--stories',
  unlock: 'icon-placeholder--unlock',
  purchase: 'icon-placeholder--purchase',
  security: 'icon-placeholder--security',
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconColor = 'stories',
  title,
  subtitle,
}) => {
  return (
    <div className="feature-card">
      <div className="feature-card-header">
        {icon && (
          <div className="feature-icon">
            <div className={`icon-placeholder ${iconColorMap[iconColor] || iconColorMap.stories}`}>
              <span className="icon-emoji">{getIconEmoji(iconColor)}</span>
            </div>
          </div>
        )}
        <h3 className="feature-card-title">{title}</h3>
      </div>
      {subtitle && <p className="feature-card-subtitle">{subtitle}</p>}
    </div>
  )
}

function getIconEmoji(color: string): string {
  const map: Record<string, string> = {
    stories: '📖',
    unlock: '🔓',
    purchase: '🛒',
    security: '🛡️',
  }
  return map[color] || map.stories
}

export default FeatureCard
