import React from 'react';
import { getIconComponent } from '../utils/icons';
import './ModernCard.scss';

const ModernCard = ({
  children,
  icon,
  title,
  gradient,
  className = '',
  hoverEffect = true,
  stepNumber,
  ...props
}) => {
  return (
    <div
      className={`modern-card ${className} ${hoverEffect ? 'modern-card--hover' : ''}`}
      {...props}
    >
      {icon && (
        <div className="modern-card__icon-container">
          <div className="modern-card__icon">
            {getIconComponent(icon, 32, 'modern-card__icon-svg')}
          </div>
          {stepNumber && (
            <div className="modern-card__step-badge">
              {stepNumber}
            </div>
          )}
        </div>
      )}
      {title && (
        <h3 className="modern-card__title">{title}</h3>
      )}
      <div className="modern-card__content">
        {children}
      </div>
    </div>
  );
};

export default ModernCard;